import {NextPage} from 'next';


import {SubmitHandler, useForm} from 'react-hook-form';
import {ResetPassword} from '../../auth/FirebaseAuth';


import React from 'react';
import Copyright from "../../components/Copyright/Copyright";
import {ErrorToast, SuccessToast} from "../../services/utils/Toasts";
import {z} from 'zod';
import {Anchor, Button, Center, FocusTrap, Paper, PaperProps, Stack, Text, TextInput} from "@mantine/core";
import Link from "next/link";
import {zodResolver} from "@hookform/resolvers/zod";

type ForgotPasswordFormData = {
    email: string;
};
const forgotPasswordFormSchema = z
    .object({
        email: z.string().min(1, 'Email is required').email('Invalid email'),
    })
    .required();
const ForgotPassword: NextPage = (props: PaperProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordFormSchema),
    });

    const handleSignUp: SubmitHandler<ForgotPasswordFormData> = (data) => {
        ResetPassword(data.email).then((result) => {
            if (result.success) {
                // console.log('Successfuly signed in');
                SuccessToast(result.message ?? 'Successfuly sent reset password email');
            } else {
                ErrorToast(result.error?.split(':')[1].trim() ?? 'Error signing up');
            }
        });
    };
    return (
        <Center mt={'2rem'}>
            <Paper radius="md" p="xl" withBorder {...props} sx={{minWidth: '300px'}}>
                <Stack>
                    <Text size={"lg"}>Recover Password</Text>
                    <form
                        noValidate
                        onSubmit={handleSubmit(handleSignUp)}
                    >
                        <Stack>
                            <FocusTrap>
                                <TextInput
                                    data-autofocus
                                    required
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    autoFocus
                                    {...register('email')}
                                    error={!!errors.email && errors.email?.message}
                                />
                            </FocusTrap>

                            <Button
                                type="submit"
                                fullWidth
                                sx={{mt: 3, mb: 2}}
                                disabled={!!errors.email}
                            >
                                Recover password
                            </Button></Stack>
                    </form>
                    <Center>
                        <Link href="/auth/signin">
                            <Anchor
                                component="a"
                                type="button"
                                color="dimmed"
                                size="md"
                            >
                                Sign in / Sign up
                            </Anchor>
                        </Link>
                    </Center>
                    <Copyright sx={{mt: 8, mb: 4}}/>
                </Stack>

            </Paper>
        </Center>
    );
};
export default ForgotPassword;
