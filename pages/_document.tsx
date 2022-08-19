import {createGetInitialProps} from '@mantine/next';
import Document, {Head, Html, Main, NextScript} from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
    static getInitialProps: any = getInitialProps;

    render() {
        return (
            <Html>
                <Head>
                    <meta name="description" content="Programmed by Ali Rajabi Nekoo"/>
                    <link rel="icon" href="/assets/images/icon.png"/>
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}