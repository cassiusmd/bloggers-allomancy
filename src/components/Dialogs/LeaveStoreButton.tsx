import {ApiPost, GetErrorsString, useFetchApi} from "../../services/api/Api";
import {Store} from "../../models/Store";
import {ErrorToast, SuccessToast} from "../../services/utils/Toasts";
import {useState} from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import {Button} from "@mantine/core";

export interface LeaveStoreButtonProps {
    storeid: string;
    callback?: () => void;
}

export default function LeaveStoreButton({
                                             storeid,
                                             callback,
                                         }: LeaveStoreButtonProps) {
    const storeData = useFetchApi<Store>(`blogstores/${storeid}`);
    const store = storeData.data?.data;

    function leaveStore(): void {
        if (!store) return;
        ApiPost(`blogger/leave-store/${storeid}`, {}).then(
            () => {
                SuccessToast(`You have left ${store.name}`);
                if (callback) callback();
            },
            (reason) => {
                ErrorToast(GetErrorsString(reason));
            }
        );
    }

    const [opened, setOpened] = useState(false);

    return (
        <>
            <Button
                onClick={() => setOpened(true)}
                color={'red'}
            >
                Leave Store
            </Button>
            <ConfirmationDialog
                title={`Leave ${store?.name ?? 'store'}?`}
                text={`Are you sure you would like to leave ${
                    store?.name ? '"' + store.name + '"' : 'this store'
                } as blogger?`}
                opened={opened}
                setOpened={setOpened}
                callback={() => {
                    leaveStore();
                    setOpened(false);
                }}
            />
        </>
    );
}
