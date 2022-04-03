import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/global.css";

// https://developers.google.com/fonts/docs/css2
// This is requesting weights 200-900 for both non-italic and italic.
const sansSerif = "family=Jost:ital,wght@0,200..900;1,200..900";
const serif = "family=Bitter";
const monospace = "family=Source+Code+Pro";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Jake Chitel</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href={`https://fonts.googleapis.com/css2?${sansSerif}&${serif}&${monospace}`}
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
