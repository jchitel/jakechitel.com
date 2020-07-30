const maxWidthQuery = (px: number): string =>
    `@media (max-width: ${px / 16}em)`

const media = {
    giant:      maxWidthQuery(1440),
    bigDesktop: maxWidthQuery(1200),
    desktop:    maxWidthQuery(1000),
    tablet:     maxWidthQuery(768),
    thone:      maxWidthQuery(600),
    phablet:    maxWidthQuery(480),
    phone:      maxWidthQuery(376),
    tiny:       maxWidthQuery(330)
};

export default media;
