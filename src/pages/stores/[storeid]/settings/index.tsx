import {NextPage} from "next";
import {useRouter} from "next/router";
import {Stack, Text} from "@mantine/core";
import RequestVacationButton from "../../../../components/Dialogs/RequestVacationButton";

const Settings: NextPage = () => {
    const router = useRouter();
    const { storeid } = router.query;

    return (
        <Stack spacing={5} align={'center'}>
            <Text size={'md'}>Store options</Text>
            {storeid && (
                <>
                    <RequestVacationButton />
                    {/*<LeaveStoreButton*/}
                    {/*    storeid={storeid.toString()}*/}
                    {/*    callback={() => {*/}
                    {/*        router.push('/');*/}
                    {/*    }}*/}
                    {/*/>*/}
                </>
            )}
        </Stack>
    );
};

export default Settings;
