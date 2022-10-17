import {NextPage} from 'next';

import {SubmitHandler, useFieldArray, useForm} from 'react-hook-form';

import {ApiGet, ApiPut} from '../../services/api/Api';
import {BloggerProfileDto} from '../../models/BloggerProfileDto';
import {useEffect} from 'react';
import {BloggerProfilePutDto} from '../../models/BloggerProfilePutDto';
import SocialIcon from '../../components/Icons/SocialIcons';
import {z} from "zod";
import {SuccessToast} from "../../services/utils/Toasts";
import {Button, List, Stack, Text, Textarea, TextInput} from "@mantine/core";
import {IconTrash} from "@tabler/icons";
import {zodResolver} from "@hookform/resolvers/zod";


interface PostFormData {
    description: string;
    urls: { value: string }[];
}

// const UrlMatch =
//   /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
const UrlMatch =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
// const postFormSchema = yup
//     .object({
//         description: yup.string().max(1000, 'Description too long'),
//         urls: yup.array().of(
//             yup.object({
//                 value: yup
//                     .string()
//                     .required('Url is required')
//                     .matches(UrlMatch, 'Invalid url'),
//             })
//         ),
//         // .min(1, 'At least one url required'),
//     })
//     .required();
const postFormSchema = z
    .object({
        description: z.string().max(1000, 'Description too long'),
        urls: z.array(
            z.object({
                    value: z
                        .string()
                        .min(1, 'Url is required')
                        .regex(UrlMatch, 'Invalid url'),
                }
            ))
        // .min(1, 'At least one url required'),
    })
    .required();

const BloggerProfile: NextPage = () => {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors},
    } = useForm<PostFormData>({
        resolver: zodResolver(postFormSchema),
    });

    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray(
        {
            control, // control props comes from useForm (optional: if you are using FormContext)
            name: 'urls', // unique name for your Field Array
            // keyName: "id", default to "id", you can change the key name
        }
    );
    // useEffect(() => {
    //   if (fields.length === 0) {
    //     append('');
    //   }
    // }, [fields]);

    const handlePost: SubmitHandler<PostFormData> = (data) => {
        console.log(data);
        ApiPut<BloggerProfilePutDto, boolean>('/blogger/profile', {
            description: data.description,
            socialLinks: data.urls.map((url) => url.value),
        }).then(
            (result) => {
                SuccessToast('Profile updated successfully');
            },
            (error) => {
                console.error(error);
            }
        );
    };

    const fetchBloggerProfile = () => {
        ApiGet<BloggerProfileDto>(`blogger`).then(
            (res) => {
                // console.log(res);

                setValue('description', res.data?.description ?? '', {
                    shouldDirty: true,
                    shouldTouch: true,
                });
                setValue(
                    'urls',
                    res.data.socialLinks.map((url) => ({value: url}), {
                        shouldDirty: true,
                        shouldTouch: true,
                    })
                );
            },
            (reason) => null
        );
    };

    useEffect(() => {
        fetchBloggerProfile();
    }, []);
    return (
        <Stack>
            <Stack spacing={5} align={'center'}>
                <Stack>
                    <div>
                        <Text size={'lg'} align={'center'}>Blogger Profile</Text>
                    </div>
                    <Text>
                        Add here your blog or social pages urls and write a bit about
                        yourself
                    </Text>
                    <Text>
                        Stores you apply to will also have access to your profile
                    </Text>
                </Stack>

                <form
                    noValidate
                    onSubmit={handleSubmit(handlePost)}
                >
                    <List spacing={2}>
                        <List.Item>
                            <Textarea
                                id="description"
                                // rows={2}
                                maxRows={6}
                                label="Description"
                                {...register('description')}
                                error={!!errors.description && errors.description?.message}
                            />
                        </List.Item>

                        {fields.map((field, index) => (
                            <List.Item
                                key={field.id} // important to include key with field's id
                            >
                                <Stack
                                    // display="flex"
                                    justify={'center'}
                                    align={'center'}
                                    spacing={1}
                                >
                                    <TextInput
                                        sx={{width: '90%'}}
                                        id={field.id}
                                        label={`Blog/social url ${index + 1}`}
                                        {...register(`urls.${index}.value` as const)}
                                        error={(!!errors.urls?.[index]?.value ?? '') && errors.urls?.[index]?.value?.message}
                                    />
                                    <SocialIcon link={''}/>
                                </Stack>
                            </List.Item>
                        ))}
                        <List.Item>
                            {/*<IconButton*/}
                            {/*  disabled={fields.length >= 5}*/}
                            {/*  onClick={() => append('')}*/}
                            {/*>*/}
                            {/*  <AddIcon />*/}
                            {/*</IconButton>*/}
                            <Button
                                disabled={fields.length >= 5}
                                onClick={() => append({value: ''})}
                            >
                                Add Url
                            </Button>
                            {/*<IconButton*/}
                            {/*    disabled={fields.length <= 0}*/}
                            {/*    onClick={() => remove(-1)}*/}
                            {/*>*/}
                            {/*    <RemoveIcon/>*/}
                            {/*</IconButton>*/}
                            <Button disabled={fields.length <= 0}
                                    onClick={() => remove(-1)}><IconTrash/></Button>
                        </List.Item>
                    </List>
                </form>
                <Stack>
                    <Button onClick={handleSubmit(handlePost)}>Save</Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default BloggerProfile;
