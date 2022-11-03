import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {auth, logout} from '../../auth/FirebaseAuth';
import {getCookies} from "cookies-next";
import {ApiResponse} from './models/ApiResponse';

import Router from 'next/router';
import {ApiPaginatedResponse} from './models/ApiPaginatedResponse';
import {showNotification} from "@mantine/notifications";
import useSWR, {Key} from "swr";
import {ErrorToast} from "../utils/Toasts";

let isRefreshing = false;
let failedRequestsQueue: {
    onSuccess: (token: string) => void;
    onFailure: (err: any) => void;
}[] = [];
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_apiV1Url,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});


export function useFetch<Data = any, Error = any>(key: Key | null, params?: AxiosRequestConfig) {
    const {data, error, mutate} = useSWR<Data, Error>([key, params], async (url) => {
        if (url === null) {
            return null;
        }
        const response = await api.get(url, params);

        return response.data;
    })

    return {data, error, mutate, isLoading: !error && !data}
}

export function useFetchApi<Type>(
    key: Key,
    params?: AxiosRequestConfig) {
    const {data, error, mutate, isLoading} = useFetch<ApiResponse<Type>>(key, params);
    if (error) {
        // showNotification({
        //     title: 'Error',
        //     message: error.message,
        //     color: 'red',
        // });
        // ErrorToast(error.message);
        if (error.errors?.messages) ErrorToast(GetErrorsString(error));
    }
    return {data, error, mutate, isLoading}
}

export function useFetchPaginatedApi<Type>(
    key: Key,
    pageNumber: number,
    pageSize: number,
    search: string | null = null,
    startDate: Date | null = null,
    endDate: Date | null = null,
    params?: AxiosRequestConfig
) {
    const {data, error, mutate, isLoading} = useFetch<ApiPaginatedResponse<Type>>(key, {
        params: {
            pageNumber,
            pageSize,
            search,
            startDate,
            endDate,
            ...params?.params
        }
    });
    if (error) {
        // ErrorToast(error.message);
        if (error.errors?.messages) ErrorToast(GetErrorsString(error));
    }
    return {data, error, mutate, isLoading}
}

export async function ApiGet<Type>(
    url: string,
    params?: AxiosRequestConfig
): Promise<ApiResponse<Type>> {
    let result: AxiosResponse;
    try {
        result = await api.get(url, params);
        return extractResponse<Type>(result);
    } catch (e) {
        const error = e as AxiosError;
        if (error.response) {
            // return extractResponse<Type>(error.response);
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(e);
        }
        // return {} as ApiResponse<any>;
    }
}

export function GetErrorsList(error: ApiResponse<any>): string[] {
    // console.log(error.errors);
    return error.errors?.messages ?? ['An error occurred'];
}

export function GetErrorsString(error: ApiResponse<any>) {
    return GetErrorsList(error).join('\n');
}

export async function ApiGetPaginated<Type>(
    url: string,
    pageNumber: number,
    pageSize: number,
    search: string | null = null,
    startDate: Date | null = null,
    endDate: Date | null = null,
    params?: AxiosRequestConfig
): Promise<ApiPaginatedResponse<Type>> {
    let result: AxiosResponse;
    try {
        result = await api.get(url, {
            params: {pageNumber, pageSize, search, startDate, endDate},
            ...params,
        });
        return extractPaginatedResponse<Type>(result);
    } catch (e) {
        const error = e as AxiosError;
        if (error.response) {
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(e);
        }
    }
}

export async function ApiPost<PostType, ReturnType>(
    url: string,
    data: PostType,
    params?: AxiosRequestConfig
): Promise<ApiResponse<ReturnType>> {
    try {
        const result = await api.post(url, data, params);
        return extractResponse<ReturnType>(result);
    } catch (e) {
        const error = e as AxiosError;
        if (error.response) {
            // return extractResponse<Type>(error.response);
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(e);
        }
        // return {} as ApiResponse<any>;
    }
}

export async function ApiPut<PostType, ReturnType>(
    url: string,
    data: PostType,
    params?: AxiosRequestConfig
): Promise<ApiResponse<ReturnType>> {
    try {
        const result = await api.put(url, data, params);
        return extractResponse<ReturnType>(result);
    } catch (e) {
        const error = e as AxiosError;
        if (error.response) {
            // return extractResponse<Type>(error.response);
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(e);
        }
        // return {} as ApiResponse<any>;
    }
}

function extractResponse<Type>(response: AxiosResponse): ApiResponse<Type> {
    return response.data as ApiResponse<Type>;
}

function extractPaginatedResponse<Type>(
    response: AxiosResponse
): ApiPaginatedResponse<Type> {
    return response.data as ApiPaginatedResponse<Type>;
}

api.interceptors.response.use(
    (config) => {
        return config;
    },
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            logout().then(() => Router.push('/auth/signin'));
        } else if (error.response?.status === 412) {
            // email not verified

            logout().then(() => {
                showNotification({
                    title: 'Email not verified',
                    message: 'Please verify your email before logging in.',
                    autoClose: 4000
                })
                Router.push('/auth/signin');
            });
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    // add authorization header with firebase token
    async (config) => {
        // const profile = Auth.currentUser;
        // const tokendata = await profile?.getIdTokenResult();

        // eslint-disable-next-line prefer-const
        let {'blogger-token': token, 'blogger-token-expire': tokenExpiration} =
            getCookies();

        if (isTokenExpired(tokenExpiration)) {
            // console.log('texpired');
            const originalConfig = config;
            if (!isRefreshing) {
                isRefreshing = true;

                const tokenResult = await auth.currentUser?.getIdTokenResult();
                if (tokenResult) {
                    token = tokenResult.token;
                    failedRequestsQueue.forEach((request) => request.onSuccess(tokenResult.token));
                    failedRequestsQueue = [];
                } else {
                    failedRequestsQueue.forEach((request) =>
                        request.onFailure('Error refreshing Auth')
                    );
                    failedRequestsQueue = [];
                }
                isRefreshing = false;
            } else {
                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({
                        onSuccess: (token: string) => {
                            if (originalConfig.headers) {
                                originalConfig.headers['Authorization'] = 'Bearer ' + token;
                                resolve(config);
                            }
                        },
                        onFailure: (err: any) => {
                            reject(err);
                        },
                    });
                });
            }
        }

        if (token) {
            if (config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
                // console.log(config.headers);
            }
        }

        return config;
    }
    // (error: AxiosError) => {
    //     const originalConfig = error.config;
    //     return Promise.reject(error);
    // }
);

function isTokenExpired(expirationTime?: string): boolean {
    return (
        // is it about to expire in less than 5s?
        Date.parse(expirationTime ?? '1970-01-01T00:00:00Z') < (Date.now() - 5000)
    );
}
