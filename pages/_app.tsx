import React from 'react';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/app';

const theme = {
    colors: {
        background: '',
        primary: '#0070f3',
        secondary: '',
        tertiary: ''
    },
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

export default MyApp;
