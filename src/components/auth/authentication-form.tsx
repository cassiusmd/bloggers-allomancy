import {upperFirst, useToggle} from '@mantine/hooks';

import {
    Anchor,
    Button,
    Checkbox,
    Divider,
    Group,
    Paper,
    PaperProps,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core';
import {IconBrandGoogle} from "@tabler/icons";
import {ErrorToast} from "../../services/utils/Toasts";
import {EmailRegister, EmailSignIn} from "../../auth/FirebaseAuth";

import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const signInFormSchema = z
    .object({
        email: z.string().min(1, 'Email is required').email('Invalid email'),
        password: z.string().min(1, 'Password is required'),
    });

const registerFormSchema = z
    .object({
        email: z.string().email('Invalid email'),
        password: z.string({description: 'Password'}).min(8, 'Password must be at least 8 characters'),
        passwordRepeat: z.string(),
        terms: z.boolean().refine((value) => value, 'You must agree to the terms and conditions'),
    }).superRefine(
        (value, ctx) => {
            if (value.password !== value.passwordRepeat) {
                ctx.addIssue({
                    code: 'custom',
                    message: 'Passwords do not match',
                    path: ['passwordRepeat'],
                });
            }
        }
    );

type SignInFormData = {
    email: string;
    password: string;
    passwordRepeat?: string;
    terms: boolean;
};

export function AuthenticationForm(props: PaperProps) {
    const [type, toggle] = useToggle(['login', 'register']);
    // const form = useForm({
    //     initialValues: {
    //         email: '',
    //         name: '',
    //         password: '',
    //         terms: true,
    //     },
    //
    //     validate: {
    //         email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    //         password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    //     },
    // });

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<SignInFormData>({
        resolver: type === 'login' ? zodResolver(signInFormSchema) : zodResolver(registerFormSchema),
    });
    //
    // const errors: FieldErrors = formState.errors;
    const handleSignIn: SubmitHandler<SignInFormData> = (data) => {
        // console.log(data);
        EmailSignIn(data.email, data.password).then((result) => {
            if (result.success) {
                // console.log('Successfuly signed in');
            } else {
                // console.log(result.error?.split(':')[1].trim());
                ErrorToast(result.error?.split(':')[1].trim() ?? 'Error signing in');
            }
        });
    };
    const handleRegister: SubmitHandler<SignInFormData> = (data) => {
        // console.log(data);
        EmailRegister(data.email, data.password).then((result) => {
            if (result.success) {
                // console.log('Successfuly signed in');
            } else {
                // console.log(result.error?.split(':')[1].trim());
                ErrorToast(result.error?.split(':')[1].trim() ?? 'Error signing up');
            }
        });
    };

    return (
        <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" weight={500}>
                Welcome to Mantine, {type} with
            </Text>

            <Group grow mb="md" mt="md">
                {/*<GoogleButton radius="xl">Google</GoogleButton>*/}
                <Button>Google sign in <IconBrandGoogle size={24}/></Button>
            </Group>

            <Divider label="Or continue with email" labelPosition="center" my="lg"/>

            <form onSubmit={type === 'login' ? handleSubmit(handleSignIn) : handleSubmit(handleRegister)}>
                <Stack>
                    <TextInput
                        required
                        label="Email"
                        id={'email'}
                        placeholder="Your email"
                        autoComplete="email"
                        autoFocus
                        {...register('email')}
                        error={!!errors.email && errors.email?.message}
                    />

                    <PasswordInput
                        required
                        id="password"
                        label="Password"
                        placeholder="Your password"
                        {...register('password')}
                        error={!!errors.password && errors.password?.message}
                    />

                    {type === 'register' && (
                        <>
                            <PasswordInput
                                required
                                id="password-confirm"
                                label="Confirm password"
                                placeholder="Type your password again"
                                {...register('passwordRepeat')}
                                error={!!errors.passwordRepeat && errors.passwordRepeat?.message}
                            />
                            <Checkbox
                                label="I have read and agree with the privacy policy"
                                {...register('terms')}
                            />
                        </>
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        onClick={() => toggle()}
                        size="xs"
                    >
                        {type === 'register'
                            ? 'Already have an account? Login'
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit">{upperFirst(type)}</Button>
                </Group>
            </form>
        </Paper>
    );
}
