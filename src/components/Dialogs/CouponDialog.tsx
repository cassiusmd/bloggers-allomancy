import {useState} from 'react';
import {Box, Button, Group, Modal, Stack, TextInput} from '@mantine/core';
import SocialIcon from "../Icons/SocialIcons";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {ApiPost, GetErrorsString} from "../../services/api/Api";
import {ErrorToast} from "../../services/utils/Toasts";

const postFormSchema = z
    .object({
        code: z
            .string()
            .max(40, 'Your code is too long')
            .min(3, 'Your code is too short'),
    })
    .required();

interface PostFormData {
    code: string;
}

export interface CouponDialogDataProps {
    currentCode?: string;
    storeId: string;
    callback?: () => void;
}

export default function CouponDialog({currentCode, storeId, callback}: CouponDialogDataProps) {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<PostFormData>({
        resolver: zodResolver(postFormSchema),
    });

    const handlePost: SubmitHandler<PostFormData> = (data) => {
        ApiPost(`bloggercoupon/${storeId}`, {code: data.code}).then(
            () => {
                if (callback) callback();
                setOpened(false);
            },
            (err) => {
                ErrorToast(GetErrorsString(err));
            }
        );
    };

    const [opened, setOpened] = useState(false);

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Introduce yourself!"
            >
                {/* Modal content */}
                <Stack align={'center'} spacing={1}>
                    {/*<Typography>Your coupon</Typography>*/}
                    <Box>
                        <TextInput
                            autoFocus={true}
                            sx={{width: '90%'}}
                            label={'Coupon Code'}
                            {...register('code')}
                            error={!!errors.code && errors.code?.message}
                        />
                        <SocialIcon link={''}/>
                    </Box>
                </Stack>
                <Group>
                    <Button onClick={handleSubmit(handlePost)}>Save</Button>
                    <Button onClick={() => setOpened(false)}>Close</Button>
                </Group>
            </Modal>

            <Group position="center">
                <Button onClick={() => setOpened(true)}>Open Modal</Button>
            </Group>
        </>
    );
}
