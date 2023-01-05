import {NextPage} from 'next';
import {useRouter} from 'next/router';
import {BlogApplicationQuestion} from '../../../../models/BlogApplicationQuestion';
import {ApiPost, GetErrorsString, useFetchApi} from '../../../../services/api/Api';


import {SubmitHandler, useFieldArray, useForm} from 'react-hook-form';


import {BlogApplicationDto} from '../../../../models/BlogApplicationDto';

import {Store} from '../../../../models/Store';
import {AuthGuard} from '../../../../auth/AuthGuard';
// use zod
import * as z from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {ErrorToast, SuccessToast} from "../../../../services/utils/Toasts";
import {Box, Button, Center, Loader, Stack, Text, Textarea, TextInput} from "@mantine/core";
import Link from "next/link";
import ImgSl from "../../../../components/Images/ImgSl";
import {useEffect, useState} from "react";

interface ApplicationFormData {
    info: string;
    answers?: { question: string; value: string }[];
}

// const trimString = (u: unknown) => typeof u === "string" ? u.trim() : u;

const postFormSchema = z.object({
    info: z.string().max(500, 'Description too long'),
    answers: z.array(
        z.object({
            question: z.string(),
            value: z.string().trim().min(1, 'Required answer').max(500, 'Answer too long'),
            // value: z.preprocess(trimString, z.string().min(1, 'Required answer').max(500, 'Answer too long')),

        })
    ),
});


const StoreViewPage: NextPage = () => {
    const router = useRouter();
    const {storeViewId} = router.query;

    const [posting, setPosting] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        control,
        formState: {errors},
    } = useForm<ApplicationFormData>({
        resolver: zodResolver(postFormSchema),
    });
    const {fields, append} = useFieldArray(
        {
            control, // control props comes from useForm (optional: if you are using FormContext)
            name: 'answers', // unique name for your Field Array
            // keyName: 'id', // default to "id", you can change the key name
        },
    );

    const postApplication = (applicationData: BlogApplicationDto) => {
        if (!storeViewId) return;
        setPosting(true);
        ApiPost<BlogApplicationDto, boolean>(
            `BlogApplication/store/${storeViewId.toString()}`,
            applicationData
        )
            .then(
                (res) => {
                    if (res) {
                        if (res.data) {
                            SuccessToast('Application sent!');
                            // navigate to /stores
                            router.push('/stores');
                        } else ErrorToast('Error sending application');
                    }
                },
                (error) => {
                    ErrorToast(GetErrorsString(error));
                    setPosting(false);
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
        postApplication(applicationData);
    };


    const storeData = useFetchApi<Store>(storeViewId ? `blogstores/${storeViewId}` : null);
    const store = storeData.data?.data;


    const {
        data: questionsData,
        isLoading
    } = useFetchApi<BlogApplicationQuestion[]>(storeViewId ? `BlogApplication/store/${storeViewId}` : null);
    const questions = questionsData?.data ?? [];

    useEffect(() => {
        if (!questionsData?.data) return;
        reset({});
        // questions.forEach((q) => append({question: q.question, value: ''}));
        // append all at once
        append(questionsData.data.map(q => ({question: q.question, value: ''})));
    }, [questionsData]);

    return (
        <Stack spacing={5}>
            <Link href={'/stores/view'}>
                <Box><Button color={'gray'} variant={'outline'}>Back</Button></Box>
            </Link>
            {(storeData.isLoading || isLoading || posting) ? (
                    <Center><Loader size={'lg'}/></Center>
                )
                : (<>
                    <Stack align={'center'}>
                        <Text weight={700} size={'xl'}>Apply to {store?.name ?? 'store'}</Text>
                        {store && <ImgSl height={'120px'} width={'160px'} uuid={store?.logo}/>}
                    </Stack>
                    <Box mt={10}>
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
                                               label={field.question}
                                               {...register(`answers.${index}.value`)}
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
                </>)}
        </Stack>
    );
};

export default AuthGuard(StoreViewPage);
