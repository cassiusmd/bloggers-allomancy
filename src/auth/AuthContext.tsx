import React, {createContext, useEffect, useState} from 'react';
import {onAuthStateChanged, User} from '@firebase/auth';
import {auth} from './FirebaseApp';

import {setCookie} from 'cookies-next';
import {ApiGet} from '../services/api/Api';

import Router from 'next/router';
import {UserProfile} from "../models/UserProfile";

type SignInCredentials = {
    email: string;
    password: string;
};
type AuthContextData = {
    user: User | null;
    isAuthenticated: boolean;
    initializing: boolean;
    userProfile: UserProfile | null;
};

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

// const authPaths = ['/Auth/signin', '/Auth/signup', '/Auth/forgot-password'];

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [initializing, setInitializing] = useState<boolean>(true);
    const isAuthenticated = !!user;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // const uid = firebaseUser.uid;
                setUser(firebaseUser);
                // setAuthenticated(true);
                const tokenResult = await firebaseUser.getIdTokenResult();
                setCookie('blogger-token', tokenResult.token, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/',
                });
                setCookie(
                    'blogger-token-expire',
                    tokenResult.expirationTime,
                    {
                        maxAge: 60 * 60 * 24 * 30,
                        path: '/',
                    }
                );

                ApiGet<UserProfile>('profile').then(
                    (profile) => {
                        // console.log('profile: ' + profile);
                        setUserProfile(profile.data);

                        if (Router.asPath.startsWith('/auth')) {
                            // get return url from query parameters or default to '/'
                            const returnUrl = Router.query.returnUrl || '/';
                            Router.push(String(returnUrl));
                        }
                    },
                    (error) => {
                        // console.log('profile error: ' + GetErrorsString(error));
                        if (!Router.asPath.startsWith('/account/user-token')) {
                            Router.push('/account/generate-token');
                        }
                    }
                );

                // ...
            } else {
                // User is signed out
                setUser(null);
                setUserProfile(null);
                // ...
            }

            setInitializing(false);
        });

        // return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{user, isAuthenticated, initializing, userProfile}}>
            {children}
        </AuthContext.Provider>
    );
}
