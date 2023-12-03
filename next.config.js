const nextMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
    reactStrictMode: true,
    experimental: {
        mdxRs: true,
    },
};

const withMDX = nextMDX();

module.exports = withMDX(nextConfig);
