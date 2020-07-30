import 'styled-components';
import chroma from 'chroma-js';

// Colors from the People's Flag of Milwaukee
const BACKGROUND = chroma('#0d2240'); // navy
const PRIMARY = chroma('#00a8e1'); // light blue
const ACCENT = chroma('#f7a800'); // gold

const theme = {
    background: {
        darkest: BACKGROUND.darken(0.5).hex(),
        dark: BACKGROUND.darken(0.25).hex(),
        normal: BACKGROUND.hex(),
        light: BACKGROUND.brighten(0.25).hex(),
        lightest: BACKGROUND.brighten(0.5).hex(),
    },
    primary: {
        darkest: PRIMARY.darken(0.5).hex(),
        dark: PRIMARY.darken(0.25).hex(),
        normal: PRIMARY.hex(),
        light: PRIMARY.brighten(0.25).hex(),
        lightest: PRIMARY.brighten(0.5).hex(),
    },
    accent: {
        darkest: ACCENT.darken(0.5).hex(),
        dark: ACCENT.darken(0.25).hex(),
        normal: ACCENT.hex(),
        light: ACCENT.brighten(0.25).hex(),
        lightest: ACCENT.brighten(0.5).hex(),
    },
    gray: {
        normal: '#8892b0',
        light: '#a8b2d1',
        lightest: '#ccd6f6',
        white: '#e6f1ff'
    },

    font: {
        main: 'Calibre, San Francisco, SF Pro Text, -apple-system, system-ui, BlinkMacSystemFont, Roboto, Helvetica Neue, Segoe UI, Arial, sans-serif',
        mono: 'SF Mono, Fira Code, Fira Mono, Roboto Mono, Lucida Console, Monaco, monospace',
    },

    fontSize: {
        xs: '12px',
        smish: '13px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        xxl: '22px',
        h3: '32px',
    },

    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',

    borderRadius: '3px',
    navHeight: '100px',
    navScrollHeight: '70px',
    margin: '20px',

    tabHeight: 42,
    tabWidth: 120,
    radius: 3,

    hamburgerWidth: 30,
    hamBefore: `top 0.1s ease-in 0.25s, opacity 0.1s ease-in`,
    hamBeforeActive: `top 0.1s ease-out, opacity 0.1s ease-out 0.12s`,
    hamAfter: `bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)`,
    hamAfterActive: `bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s`,

    navDelay: 1000,
    loaderDelay: 2000,
};

export default theme;

type Theme = typeof theme;

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
