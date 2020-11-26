/**
 * Sizing system: only these values should be used when a fixed value is required.
 * 
 * The prefixes are just a general grouping guide, there is no real strict rule to them.
 * 
 * Values determined by scaling up/down starting from 16px, with no value less than 25% from each other.
 */
export const size = {
    sm_4: '4px',          // 16 * 0.25
    sm_8: '8px',          // 16 * 0.5  (+100%)
    md_12: '12px',        // 16 * 0.75 (+50%)
    md_16: '16px',        // 16 * 1    (+33%)
    md_24: '24px',        // 16 * 1.5  (+50%)
    lg_32: '32px',        // 16 * 2    (+33%)
    lg_48: '48px',        // 16 * 3    (+50%)
    lg_64: '64px',        // 16 * 4    (+33%)
    xl_96: '96px',        // 16 * 6    (+50%)
    xl_128: '128px',      // 16 * 8    (+33%)
    xl_192: '192px',      // 16 * 12   (+50%)
    xxl_256: '256px',     // 16 * 16   (+33%)
    xxl_384: '384px',     // 16 * 24   (+50%)
    xxl_512: '512px',     // 16 * 32   (+33%)
    xxxl_640: '640px',    // 16 * 40   (+25%)
    xxxl_768: '768px',    // 16 * 48   (+20%)
    xxxl_960: '960px',    // 16 * 60   (+25%)
    xxxxl_1152: '1152px', // 16 * 72   (+20%)
    xxxxl_1344: '1344px', // 16 * 84   (+17%)
    xxxxl_1600: '1600px', // 16 * 100  (+21%)
} as const;

/**
 * Font sizing system: only these values should be used when a font size is required.
 * 
 * The prefixes are just a general grouping guide, there is no real strict rule to them.
 * 
 * Values copied from Refactoring UI (similar logic as `size` above, but not as wide because we're dealing with text).
 * 
 * Use `rem` instead of `px` so the font size scales with the configured default font size of the browser.
 */
export const fontSize = {
    sm_10: '0.625rem', // 10px 
    sm_12: '0.75rem',  // 12px
    md_14: '0.875rem', // 14px
    md_16: '1rem',     // 16px
    md_18: '1.125rem', // 18px
    lg_20: '1.25rem',  // 20px
    lg_24: '1.5rem',   // 24px
    lg_30: '1.875rem', // 30px
    xl_36: '2.25rem',  // 36px
    xl_48: '3rem',     // 48px
    xl_60: '3.75rem',  // 60px
    xxl_72: '4.5rem',  // 72px
    xxl_84: '5.25rem', // 84px
} as const;

/**
 * Color set
 */
export const color = {
    background: 'hsl(0, 0%, 10%)',
    foreground: 'hsl(0, 0%, 90%)',
};