import 'normalize.css/normalize.css';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from '../styles/theme';
import GlobalStyle from '../styles/GlobalStyle';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider theme={theme}>
        <Head>
            <title>Jake Chitel | Software Engineer</title>
            {/* TODO: get a favicon */}
            <link rel="shortcut icon" href="/favicon.ico" />
            <link rel="canonical" href="https://jakechitel.com" />
            <meta name="description" content="Jake Chitel is a Milwaukee-based software engineer with a passion for building awesome stuff." />
            <meta name="keywords" content="Jake Chitel, Jake, Chitel, jchitel, software engineer, developer, marquette" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
    </ThemeProvider>
);

export default MyApp;
