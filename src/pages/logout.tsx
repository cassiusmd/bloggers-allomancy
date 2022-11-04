import {NextPage} from 'next';
import {logout} from '../auth/FirebaseAuth';
import {useEffect} from 'react';
import {useRouter} from 'next/router';

const Logout: NextPage = () => {
    const router = useRouter();
    useEffect(() => {
        // execute once on page load
        logout().then(() => {
            // mutate(/* match all keys */ () => true, undefined, false);
            router.push('/auth/signin')
        });
    }, []);
    return <></>;
};

export default Logout;
