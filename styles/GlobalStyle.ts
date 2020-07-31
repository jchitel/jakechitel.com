import { createGlobalStyle } from 'styled-components';
import theme from './theme';
import media from './media';

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        width: 100%;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
        background-color: ${theme.background.normal};
        color: ${theme.primary.normal};
        font-family: ${theme.font.main};
        font-size: ${theme.fontSize.xl};
        ${media.phablet} {
            font-size: ${theme.fontSize.lg};
        }
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default GlobalStyle;
