import {NextPage} from "next";
import {useRouter} from "next/router";
import {useEffect} from "react";


const StoreView: NextPage = () => {
    const router = useRouter();
    const {storeid} = router.query;

    // useEffect(() => {
    //     if (storeid) {
    //         router.push(`/stores/${storeid}/messages`);
    //     }
    // }, [storeid]);

    return (
        <>Store view</>
    )
}

export default StoreView;
