import {NextPage} from 'next';

import React, {useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';

import {z} from 'zod';

import {ApiGet, GetErrorsString} from '../../services/api/Api';


import {useRouter} from 'next/router';
import {AuthContext} from "../../auth/AuthContext";
import {ErrorToast, SuccessToast} from "../../services/utils/Toasts";
import {Stack, Text, TextInput, Button} from "@mantine/core";
import {zodResolver} from "@hookform/resolvers/zod";

type GenerateTokenFormData = {
    username: string;
};

const generateTokenFormSchema = z
    .object({
        username: z.string().min(1, 'Username is required'),
    })
    .required();

const GenerateToken: NextPage = () => {
    // const { userProfile } = useSelector<State, UserData>((state) => state.user);
    const {userProfile} = useContext(AuthContext);
    const router = useRouter();
    useEffect(() => {
        if (userProfile) {
            router.push('/');
        }
    });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<GenerateTokenFormData>({
        resolver: zodResolver(generateTokenFormSchema),
    });

    const [requested, setRequested] = React.useState(false);
    const handleGenerateToken: SubmitHandler<GenerateTokenFormData> = (data) => {
        // console.log(data);
        setRequested(true);
        ApiGet(`profile/generate-token/${data.username}`, {
            params: {
                TokenRegisterUrl: 'https://bloggers.allomancy.com/account/user-token/',
            },
        }).then(
            (response) => {
                // console.log(response);
                SuccessToast(response.message);
            },
            (error) => {
                // console.log(error);
                ErrorToast(GetErrorsString(error));
                setRequested(false);
            }
        );
    };

    return (
        <Stack
            sx={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                // justifyContent: 'center',
                flexDirection: 'column',
                minHeight: '80vh',
                gap: 1,
            }}
        >
            {/*<Text size="lg" weight={500}>*/}
            {/*    Welcome to Mantine, {type} with*/}
            {/*</Text>*/}
            <Text>Associate your Second Life account</Text>

            <form onSubmit={handleSubmit(handleGenerateToken)}>
                <TextInput
                    // required
                    label={'SL username'}
                    {...register('username')}
                    error={!!errors.username && errors.username?.message}
                    // helperText={errors.username?.message ?? ''}

                />
                <Button
                    type="submit"
                    fullWidth
                    sx={{mt: 3, mb: 2}}
                    disabled={requested}
                >
                    Generate token
                </Button>
            </form>
        </Stack>
    );
};

export default GenerateToken;
