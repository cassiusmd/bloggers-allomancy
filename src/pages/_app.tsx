import {AppProps} from 'next/app';
import Head from 'next/head';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import {useState} from "react";
import {getCookie, setCookie} from 'cookies-next';
import {GetServerSidePropsContext} from "next";
import {NotificationsProvider} from '@mantine/notifications';
import {AuthProvider} from "../auth/AuthContext";
import Layout from "../components/Layouts/Layout";
import myTheme from "../styles/MantineThemeOverride";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
    const {Component, pageProps} = props;

    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        setCookie('mantine-color-scheme', nextColorScheme, {maxAge: 60 * 60 * 24 * 30});
    };

    return (
        <>
            <Head>
                <title>Allomancy Bloggers</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                <link rel="shortcut icon" href="/favicon.ico"/>
            </Head>

            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{colorScheme, ...myTheme}} withGlobalStyles withNormalizeCSS>
                    <AuthProvider>
                        <Layout>
                            <NotificationsProvider position={'top-center'}>
                                <Component {...pageProps} />
                            </NotificationsProvider>
                        </Layout>
                    </AuthProvider>
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}
App.getInitialProps = ({ctx}: { ctx: GetServerSidePropsContext }) => ({
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});
