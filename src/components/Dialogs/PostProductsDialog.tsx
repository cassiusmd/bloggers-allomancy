import {BlogProductListing} from "../../models/BlogProductListing";
import {Box, Button, Card, Grid, Group, Modal, Text, Textarea, TextInput} from "@mantine/core";
import {SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {ErrorToast, SuccessToast} from "../../services/utils/Toasts";
import {ProductsPostData} from "../../models/ProductsPostData";
import {ApiPost, GetErrorsString} from "../../services/api/Api";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import SocialIcon from "../Icons/SocialIcons";
import {z} from "zod";
import {IconMinus, IconPlus} from "@tabler/icons";
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
//         description: yup.string().max(200, 'Description too long'),
//         urls: yup
//             .array()
//             .of(
//                 yup.object({
//                     value: yup
//                         .string()
//                         .required('Post url required')
//                         .matches(UrlMatch, 'Invalid url'),
//                 })
//             )
//             .min(1, 'At least one url required'),
//     })
//     .required();

const postFormSchema = z
    .object({
        description: z.string().max(200, 'Description too long'),
        urls: z
            .array(z.object({value: z.string().regex(UrlMatch, 'Invalid url')}))
            .min(1, 'At least one url required'),
    });

export interface PostProductsDialogProps {
    products: BlogProductListing[];
    callSuccess?: () => void;
    disabled?: boolean;
}

const PostProductsDialog = ({products, callSuccess, disabled}: PostProductsDialogProps) => {
    const router = useRouter();
    const {storeid} = router.query;
    // console.log('storeId: ' + storeid);

    const postProducts = (productsPostData: ProductsPostData) => {
        ApiPost<ProductsPostData, boolean>(`blogpost/${storeid}`, productsPostData)
            .then((res) => {
                if (res) {
                    if (res.data) {
                        SuccessToast('Post sent!');
                        if (callSuccess) callSuccess();
                    } else ErrorToast('Error posting');
                    setOpened(false);
                }
            })
            .catch((e) => {
                // ErrorToast(e.toString());
                ErrorToast(GetErrorsString(e));
            });
    };

    const {
        register,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<PostFormData>({
        resolver: zodResolver(postFormSchema),
        defaultValues: {
            urls: [{value: ''}],
        }
    });

    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray(
        {
            control, // control props comes from useForm (optional: if you are using FormContext)
            name: 'urls', // unique name for your Field Array
            // keyName: "id", default to "id", you can change the key name
        }
    );
    // useEffect(() => {
    //     if (fields.length === 0) {
    //         console.log(fields.length);
    //         append({value: ''});
    //     }
    // }, [fields]);

    const handlePost: SubmitHandler<PostFormData> = (data) => {
        const productPostData: ProductsPostData = {
            description: data.description,
            urls: data.urls.map((f) => f.value),
            products: products.map((p) => p.id),
        };
        // console.log(productPostData);
        postProducts(productPostData);
    };

    const [opened, setOpened] = useState(false);
    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Post products"
            >
                {/* Modal content */}
                <Card>
                    {/*<Typography>{products.map((p) => p.name.split(', '))}</Typography>*/}
                    <Text>
                        Posting {products.length} product{products.length > 1 ? 's' : ''}
                    </Text>
                    {/*<ImgSl uuid={data.image} />*/}

                    <form
                        noValidate
                        onSubmit={handleSubmit(handlePost)}
                    >
                        <Grid>
                            {fields.map((field, index) => (
                                <Grid.Col
                                    xs={12}
                                    key={field.id} // important to include key with field's id
                                >
                                    <Box>
                                        <TextInput
                                            sx={{width: '90%'}}
                                            id={field.id}
                                            label={`Post url ${index + 1}`}
                                            {...register(`urls.${index}.value` as const)}
                                            error={!!errors.urls?.[index]?.value && errors.urls?.[index]?.value?.message}
                                        />
                                        <SocialIcon link={''}/>
                                    </Box>
                                </Grid.Col>
                            ))}
                            <Grid.Col xs={12}>
                                <Group spacing={5}>
                                    <Button
                                        leftIcon={<IconPlus/>}
                                        disabled={fields.length >= 3}
                                        onClick={() => append({value: ''})}
                                    >Add</Button>
                                    <Button
                                        leftIcon={<IconMinus/>}
                                        disabled={fields.length <= 1}
                                        onClick={() => remove(-1)}
                                    >Remove</Button>
                                </Group>
                            </Grid.Col>
                            <Grid.Col xs={12}>
                                <Textarea
                                    id="description"
                                    minRows={4}
                                    // rows={2}
                                    maxRows={7}
                                    label="Description"
                                    {...register('description')}
                                    error={!!errors.description && errors.description?.message}
                                />
                            </Grid.Col>
                        </Grid>
                    </form>
                    <Group mt={10}>
                        <Button onClick={handleSubmit(handlePost)}>Post</Button>
                        <Button onClick={() => setOpened(false)}>Close</Button>
                    </Group>
                </Card>
            </Modal>

            <Group position="center">
                <Button disabled={disabled} onClick={() => setOpened(true)}>Post</Button>
            </Group>

        </>
    );
};

export default PostProductsDialog;
