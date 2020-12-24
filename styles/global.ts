import { createGlobalStyle } from 'styled-components';
import { color, size } from './common';

export const GlobalStyle = createGlobalStyle`
    html,
    body {
        width: 100%;
        padding: 0;
        margin: 0;
        font-family: Jost, sans-serif;
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

    // Causes anchor links to navigate so that the target appears below the nav bar instead of underneath it.
    // https://stackoverflow.com/a/28824157
    :target::before {
        content: "";
        display: block;
        height: ${size.lg_64};
        margin: -${size.lg_64} 0 0;
    }
`;
