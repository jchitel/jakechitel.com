import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from '../styles/global';

export default function MyApp({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>Jake Chitel</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
    </>
}
