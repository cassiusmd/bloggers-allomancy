import { useRouter } from 'next/router';
import { ComponentType, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
// import LoadingOverlay from '../components/LoadingOverlay';

export function AuthGuard(Component: ComponentType) {
    return function AuthComponent(props: { [prop: string]: any } = {}) {
        const { isAuthenticated, initializing } = useContext(AuthContext);
        const router = useRouter();
        // return <LoadingOverlay />;
        useEffect(() => {
            if (!initializing) {
                //Auth is initialized and there is no user
                if (!isAuthenticated) {
                    // remember the page that user tried to access

                    // redirect
                    router.push({
                        pathname: '/auth/signin',
                        query: { returnUrl: router.asPath },
                    });
                }
            }
        }, [initializing, router, isAuthenticated]);

        /* show loading indicator while the Auth provider is still initializing */
        if (initializing) {
            // return <LoadingOverlay />;
            return <></>
        }

        // if Auth initialized with a valid user show protected page
        if (!initializing && isAuthenticated) {
            return <Component {...props} />;
        }

        /* otherwise don't return anything, will do a redirect from useEffect */
        return <></>;
    };
}
