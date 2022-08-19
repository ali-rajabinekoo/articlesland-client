import {AppProps} from 'next/app';
import Head from 'next/head';
import {createEmotionCache, MantineProvider} from '@mantine/core';
import rtlPlugin from 'stylis-plugin-rtl';
import "../styles/globals.css";

const rtlCache = createEmotionCache({
    key: 'mantine-rtl',
    stylisPlugins: [rtlPlugin],
});

export default function App(props: AppProps) {
    const {Component, pageProps} = props;

    return (
        <>
            <Head>
                <title>Articles Land</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
            </Head>

            <div dir='rtl'>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    emotionCache={rtlCache}
                    theme={{
                        dir: 'rtl',
                        colorScheme: 'light',
                        fontFamily: 'IRANSansX',
                        fontSizes: {
                            xs: 12,
                            sm: 16,
                            md: 18,
                            lg: 22,
                            xl: 32,
                        },
                        headings: {
                            sizes: {
                                h1: {fontWeight: 400, fontSize: 32, lineHeight: 4.5},
                                h2: {fontSize: 22, lineHeight: 3},
                            },
                        },
                        colors: {
                            orange: ['#FAF7EB', '#C9AE39', '#B49820'],
                            purple: ['#D6DCFF', '#361E98'],
                            grey: ['#F0F1F7', '#C2C4C9', '#7B7B7B'],
                        },
                        primaryColor: 'orange',
                        shadows: {
                            sm: '0px 2px 8px rgba(26, 26, 26, .12)',
                            md: '0px 8px 16px rgba(0, 0, 0, .16)',
                            lg: '0px 8px 34px rgba(0, 0, 0, .18)',
                            xl: '0px 16px 34px rgba(0, 0, 0, .18)',
                        },
                        spacing: {
                            xs: 12,
                            sm: 16,
                            md: 18,
                            lg: 22,
                            xl: 32,
                        },
                    }}
                >
                    <Component {...pageProps} />
                </MantineProvider>
            </div>
        </>
    );
}