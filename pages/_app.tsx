import { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from '../styles/global';

let sansSerif = 'family=Jost:ital,wght@0,200..900;1,200..900';
let serif = 'family=Bitter';
let monospace = 'family=Source+Code+Pro'

export default function MyApp({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>Jake Chitel</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?${sansSerif}&${serif}&${monospace}`} />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
    </>
}
