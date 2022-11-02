import {NextPage} from "next";
import {useRouter} from "next/router";
import {Stack, Text} from "@mantine/core";
import RequestVacationButton from "../../../../components/Dialogs/RequestVacationButton";
import LeaveStoreButton from "../../../../components/Dialogs/LeaveStoreButton";
import SelectedStoreLayout from "../../../../components/Layouts/SubLayouts/SelectedStores/SelectedStoreLayout";

const Settings: NextPage = () => {
    const router = useRouter();
    const {storeid} = router.query;

    return (
        <SelectedStoreLayout>
            <Stack spacing={20} align={'center'}>
                <Text weight={600} size={'xl'}>Store options</Text>
                {storeid && (
                    <Stack spacing={10}>
                        <RequestVacationButton storeId={storeid.toString()}/>
                        <LeaveStoreButton
                            storeid={storeid.toString()}
                            callback={() => {
                                router.push('/');
                            }}
                        />
                    </Stack>
                )}
            </Stack>
        </SelectedStoreLayout>
    );
};

export default Settings;
