import {NextPage} from "next";
import {useRouter} from "next/router";
import {Stack, Text} from "@mantine/core";
import RequestVacationButton from "../../../../components/Dialogs/RequestVacationButton";
import LeaveStoreButton from "../../../../components/Dialogs/LeaveStoreButton";

const Settings: NextPage = () => {
    const router = useRouter();
    const {storeid} = router.query;

    return (
        <Stack spacing={5} align={'center'}>
            <Text size={'md'}>Store options</Text>
            {storeid && (
                <>
                    <RequestVacationButton storeId={storeid.toString()}/>
                    <LeaveStoreButton
                        storeid={storeid.toString()}
                        callback={() => {
                            router.push('/');
                        }}
                    />
                </>
            )}
        </Stack>
    );
};

export default Settings;
