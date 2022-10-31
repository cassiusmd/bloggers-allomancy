import {Button, Group, Modal, Stack, Text} from "@mantine/core";


export interface ConfirmDialogProps {
    title: string;
    text: string;
    opened: boolean;
    setOpened: (open: boolean) => void;
    callback: () => void;
}

const ConfirmDialog = ({
                           title,
                           text,
                           opened,
                           setOpened,
                           callback,
                       }: ConfirmDialogProps) => {
    // const [open, setOpen] = useState(false);
    return (
        <Modal opened={opened} onClose={() => setOpened(false)} title={title}>
            <Stack spacing={10}>
                <Text>{text}</Text>

                <Group position={'center'}>
                    <Button color={'gray'} onClick={() => setOpened(false)}>
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onClick={() => {
                            callback();
                            setOpened(false);
                        }}
                    >
                        Confirm
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};

export default ConfirmDialog;
