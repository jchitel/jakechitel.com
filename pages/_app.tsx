import 'normalize.css/normalize.css';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/app';
import theme from '../styles/theme';
import GlobalStyle from '../styles/GlobalStyle';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
    </ThemeProvider>
);

export default MyApp;
