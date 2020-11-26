import { createGlobalStyle } from 'styled-components';
import { color } from './common';

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        width: 100%;
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        background-color: ${color.background};
        color: ${color.foreground};
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }
`;
