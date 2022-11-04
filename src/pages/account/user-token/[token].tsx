import Router, { useRouter } from 'next/router';
import { ApiGet, ApiPost, GetErrorsString } from '../../../services/api/Api';
import {ErrorToast, SuccessToast} from "../../../services/utils/Toasts";
import {useEffect} from "react";
import {UserProfile} from "../../../models/UserProfile";


const Token = () => {
    const router = useRouter();
    const { token } = router.query;

    const associateToken = () => {
        if (!token) return;
        // console.log(data);
        ApiPost('profile/insert-token', { token }).then(
            (response) => {
                // console.log(response);

                ApiGet<UserProfile>('profile').then(
                    (profile) => {
                        // console.log('profile: ' + profile);

                        SuccessToast('Success!');
                        router.push('/');
                    },
                    (error) => {
                        ErrorToast(GetErrorsString(error));
                        Router.push('/account/generate-token');
                    }
                );
            },
            (error) => {
                // console.log(error);
                ErrorToast(GetErrorsString(error));
                router.push('/');
            }
        );
    };

    useEffect(() => {
        associateToken();
    }, [token]);
    return <></>;
};

export default Token;
