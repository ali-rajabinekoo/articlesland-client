import {AppProps} from 'next/app';
import Head from 'next/head';
import {createEmotionCache, MantineProvider} from '@mantine/core';
import rtlPlugin from 'stylis-plugin-rtl';
import "../styles/globals.css";
import {appTheme} from "./_app.style";
import {NotificationsProvider} from "@mantine/notifications";
import moment from "moment-jalaali";
import {Provider} from "react-redux";
import store from '../utils/app.store'
import FetchReduxInitStates from "../hooks/fetchReduxInitState";

moment.loadPersian({dialect: 'persian-modern'})

const rtlCache = createEmotionCache({
    key: 'mantine-rtl',
    stylisPlugins: [rtlPlugin],
});

declare global {
    interface Window { editor: any; }
}

export default function App(props: AppProps) {
    const {Component, pageProps} = props;

    return (
        <Provider store={store}>
            <FetchReduxInitStates>
                <Head>
                    <title>Articles Land</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
                </Head>

                <div dir='rtl'>
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        emotionCache={rtlCache}
                        theme={appTheme}
                    >
                        <NotificationsProvider>
                            <Component {...pageProps} />
                        </NotificationsProvider>
                    </MantineProvider>
                </div>
            </FetchReduxInitStates>
        </Provider>
    );
}
