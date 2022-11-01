import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {BlogApplicationQuestion} from '../../../../models/BlogApplicationQuestion';
import {ApiGet, ApiPost, GetErrorsString} from '../../../../services/api/Api';


import {SubmitHandler, useFieldArray, useForm} from 'react-hook-form';


import {BlogApplicationDto} from '../../../../models/BlogApplicationDto';

import {Store} from '../../../../models/Store';
import {AuthGuard} from '../../../../auth/AuthGuard';
// use zod
import * as z from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {ErrorToast, SuccessToast} from "../../../../services/utils/Toasts";
import {Box, Button, Stack, Text, Textarea, TextInput} from "@mantine/core";

interface ApplicationFormData {
    info: string;
    answers?: { question: string; value: string }[];
}

const postFormSchema = z.object({
    info: z.string().max(500, 'Description too long'),
    answers: z.array(
        z.object({
            question: z.string(),
            value: z.string().nonempty('Required field'),
        })
    ),
});


const StoreViewPage: NextPage = () => {
    const router = useRouter();
    const {storeViewId} = router.query;

    const [questions, setQuestions] = useState<BlogApplicationQuestion[]>([]);
    useEffect(() => {
        if (!storeViewId) return;
        ApiGet<BlogApplicationQuestion[]>(
            `BlogApplication/store/${storeViewId}`
        ).then(
            (r) => {
                // console.log(r);
                reset({});
                setQuestions(r.data);
                r.data.forEach((q) => append({question: q.question, value: ''}));
            },
            (e) => {
                // console.log(e);
            }
        );
    }, [storeViewId]);

    const {
        register,
        reset,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<ApplicationFormData>({
        resolver: zodResolver(postFormSchema),
    });
    const {fields, append, prepend, remove, swap, move, insert} = useFieldArray(
        {
            control, // control props comes from useForm (optional: if you are using FormContext)
            name: 'answers', // unique name for your Field Array
            // keyName: 'id', // default to "id", you can change the key name
        }
    );

    const postApplication = (applicationData: BlogApplicationDto) => {
        ApiPost<BlogApplicationDto, boolean>(
            `BlogApplication/store/${storeViewId}`,
            applicationData
        )
            .then(
                (res) => {
                    if (res) {
                        if (res.data) {
                            SuccessToast('Application sent!');
                            router.push({pathname: '/stores', query: {tab: 1}});
                        } else ErrorToast('Error sending application');
                    }
                },
                (error) => {
                    ErrorToast(GetErrorsString(error));
                }
            )
            .catch((error) => {
                ErrorToast(GetErrorsString(error));
            });
    };

    const handlePost: SubmitHandler<ApplicationFormData> = (data) => {
        const applicationData: BlogApplicationDto = {
            info: data.info,
            answers:
                data.answers?.map((x, index) => {
                    return {
                        questionId: questions[index].id,
                        question: questions[index].question,
                        answer: x.value,
                    };
                }) ?? [],
        };
        console.log(applicationData);
        postApplication(applicationData);
        // postProducts(applicationData);
    };

    // const { store } = useSelector<State, SelectedStore>(
    //   (state) => state.selectedStore
    // );

    // ApiGet<Store>(`blogstores/${storeid}`).then((res) => {
    const [store, setStore] = useState<Store>();
    useEffect(() => {
        if (!storeViewId) return;
        ApiGet<Store>(`blogstores/${storeViewId}`).then((res) => {
            setStore(res.data);
        });
    }, [storeViewId]);
    return (
        <Stack spacing={5}>
            <Box>
                {/*<BackButton/>*/}
            </Box>
            <Text weight={700} size={'xl'}>Apply to {store?.name ?? 'store'}</Text>

            <Box mt={15}>
                <Text weight={500} size={'lg'}>About</Text>
                <Text style={{whiteSpace: 'pre-wrap'}}>
                    {store !== undefined && (store?.about?.trim() ?? '') !== ''
                        ? store.about
                        : 'No description yet'}
                </Text>
            </Box>
            <Box
                component="form"
                noValidate
                sx={{mt: 3, mb: 3}}
                onSubmit={handleSubmit(handlePost)}
            >
                <Stack align={'center'} mt={20}>
                    <Stack spacing={10} align={'center'} justify={'center'} sx={{width: '100%'}}>
                        {fields.map((field, index) => (


                            <TextInput key={field.id}
                                       sx={{width: '100%', maxWidth: '1000px'}}
                                       id={field.id}
                                       label={(field as any).question}
                                       {...register(`answers.${index}.value` as const)}
                                       error={!!errors.answers?.[index]?.value && errors.answers?.[index]?.value?.message}
                            />


                        ))}


                        <Textarea
                            sx={{width: '100%', maxWidth: '1000px'}}
                            id="info"
                            minRows={4}
                            maxRows={6}
                            label="Info/details about you"
                            {...register('info')}
                            error={!!errors.info && errors.info?.message}
                        />


                    </Stack>

                    <Box mt={5}>
                        <Button onClick={handleSubmit(handlePost)}>
                            Submit application
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Stack>
    );
};

export default AuthGuard(StoreViewPage);
