const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

/**
 * Available options:
 * - env: an object of environment variables to define in the bundle
 * - webpack: see below
 * - webpackDevMiddleware: ???
 * - poweredByHeader: add an X-Powered-By header (default true)
 * - distDir: sets build destination
 * - assetPrefix: ???
 * - configOrigin: ???
 * - useFileSystemPublicRoutes: ??? (default true)
 * - generateBuildId: ???
 * - generateEtags: ???
 * - pageExtensions: array of extensions to allow for pages
 * - target: can be specified as 'serverless' to build as a serverless app (default null)
 * - onDemandEntries: ???
 * - experimental.amp: ??? (default false)
 */
module.exports = {
    pageExtensions: ['tsx', 'ts', 'js', 'jsx'],
    /**
     * This function receives two parameters:
     * 
     * `config` (the default webpack config):
     * This is the full webpack config that is built by default by Next.js.
     * It is partially dependent on some options.
     * These match those in the `options` object below.
     * These properties can be completely overridden if desired, but Next.js will most likely not perform properly if this is done.
     * To ensure that everything goes smoothly, this configuration should be preserved as much as possible.
     * ```js
     * // __dirname is node_modules/next/dist/build/
     * {
     *     mode: dev ? 'development' : 'production',
     *     devtool: dev ? 'cheap-module-source-map' : false,
     *     name: isServer ? 'server' : 'client',
     *     target: isServer ? 'node' : 'web',
     *     externals: (!isServer || target === 'serverless') ? [] : [
     *         (context, request, callback) => {
     *             // ensure that only on the server, node_modules are not bundled (barring some exceptions)
     *         }
     *     ],
     *     optimization: (isServer && target === 'serverless') ? {
     *         splitChunks: false,
     *         minimizer: [new TerserPlugin({ ...terserPluginConfig, terserOptions: { compress: false, mangle: false, module: false, keep_classnames: true, keep_fnames: true } })]
     *     } : isServer ? {
     *         splitChunks: false,
     *         minimize: false
     *     } : dev ? {
     *         runtimeChunk: {
     *             name: 'static/runtime/webpack.js'
     *         },
     *         splitChunks: {
     *             cacheGroups: {
     *                 default: false,
     *                 vendors: false
     *             }
     *         }
     *     } : {
     *         runtimeChunk: {
     *             name: 'static/runtime/webpack.js'
     *         },
     *         splitChunks: {
     *             cacheGroups: {
     *                 default: false,
     *                 vendors: false,
     *                 commons: {
     *                     name: 'commons',
     *                     chunks: 'all',
     *                     minChunks: totalPages > 2 ? (totalPages / 2) : 2
     *                 },
     *                 react: {
     *                     name: 'commons',
     *                     chunks: 'all',
     *                     test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/
     *                 },
     *             },
     *             chunks: 'all'
     *         },
     *         minimizer: [new TerserPlugin({ ...terserPluginConfig, terserOptions: { safari10: true } })],
     *     },
     *     recordsPath: path.join(dir, config.distDir, isServer ? (target === 'serverless' ? 'serverless' : 'server') : '', 'records.json'),
     *     context: dir,
     *     // disregard this, we can assume it's right
     *     entry: async () => ({
     *         ...clientEntries,
     *         ...entrypoints
     *     }),
     *     output: {
     *         path: path.join(dir, config.distDir, isServer ? (target === 'serverless' ? 'serverless' : 'server') : ''),
     *         filename: ({ chunk }) => ..., // fine
     *         libraryTarget: isServer ? 'commonjs2' : 'jsonp',
     *         hotUpdateChunkFilename: 'static/webpack/[id].[hash].hot-update.js',
     *         hotUpdateMainFilename: 'static/webpack/[hash].hot-update.json',
     *         chunkFilename: isServer ? `${dev ? '[name]' : '[name].[contenthash]'}.js` : `static/chunks/${dev ? '[name]' : '[name].[contenthash]'}.js`,
     *         strictModuleExceptionHandling: true,
     *         crossOriginLoading: config.crossOrigin,
     *         futureEmitAssets: !dev,
     *         webassemblyModuleFilename: 'static/wasm/[modulehash].wasm'
     *     },
     *     performance: { hints: false },
     *     resolve: {
     *         extensions: isServer ? ['.wasm', '.js', '.mjs', '.jsx', '.json'] : ['.wasm', '.mjs', '.js', '.jsx', '.json'],
     *         modules: ['node_modules', ...nodePathList],
     *         alias: {
     *             next: path.join(__dirname, '..', '..'),
     *             'private-next-pages': path.join(dir, 'pages'),
     *             'private-dot-next': path.join(dir, distDir),
     *         },
     *         mainFields: isServer ? ['main', 'module'] : ['browser', 'module', 'main']
     *     },
     *     resolveLoader: {
     *         modules: [
     *             path.join(__dirname, '..', '..', 'node_modules'),
     *             'node_modules',
     *             path.join(__dirname, 'webpack', 'loaders'), // the loaders next.js provides
     *             ...nodePathList
     *         ]
     *     },
     *     module: {
     *         rules: [{
     *             test: /\.(js|mjs|jsx)$/,
     *             include: [dir, /next-server[\\/]dist[\\/]lib/],
     *             exclude: path => !/next-server[\\/]dist[\\/]lib/.exec(path) && /node_modules/.exec(path),
     *             use: defaultLoaders.babel
     *         }]
     *     },
     *     plugins: [
     *         target === 'serverless' && isServer && new ServerlessPlugin(), // from next.js
     *         dev && !isServer && new AutoDllPlugin({
     *             filename: '[name]_[hash].js',
     *             path: './static/development/dll',
     *             context: dir,
     *             entry: { dll: ['react', 'react-dom'] },
     *             config: { mode: this.mode, resolve: this.resolve },
     *         }),
     *         new ChunkNamesPlugin(), // from next.js
     *         !isServer && new ReactLoadablePlugin({ filename: 'react-loadable-manifest.json' }), // from next.js
     *         dev && new NextJsRequireCacheHotReloader(), // from next.js
     *         dev && !isServer && new webpack.HotModuleReplacementPlugin(),
     *         dev && new webpack.NoEmitOnErrorsPlugin(),
     *         dev && new UnlinkFilePlugin(), // from next.js
     *         dev && new CaseSensitivePathPlugin(),
     *         !dev && new webpack.HashedModuleIdsPlugin(),
     *         new webpack.DefinePlugin({
     *             ...{}, // define everything under config.env as process.env.${key}: JSON.stringify(value)
     *             'process.crossOrigin': JSON.stringify(config.crossOrigin),
     *             'process.browser': JSON.stringify(!isServer),
     *         }),
     *         !isServer && dev && new webpack.DefinePlugin({
     *             'process.env.__NEXT_DIST_DIR': JSON.stringify(path.join(dir, distDir))
     *         }),
     *         target !== 'serverless' && isServer && new PagesManifestPlugin(), // from next.js
     *         !isServer && new BuildManifestPlugin(), // from next.js
     *         isServer && new NextJsSsrImportPlugin(), // from next.js
     *         target !== 'serverless' && isServer && new NextJsSSRModuleCachePlugin({ outputPath: path.join(dir, distDir) }), // from next.js
     *         !dev && new webpack.IgnorePlugin({
     *             checkResource: resource => /react-is/.test(resource),
     *             checkContext: context => /next-server[\\/]dist[\\/]/.test(context) || /next[\\/]dist[\\/]/.test(context),
     *         })
     *     ].filter(Boolean)
     * }
     * ```
     * 
     * `options`:
     * - dir: cwd of the app
     * - dev: whether we're building for dev or prod
     * - isServer: whether we're building the client or the server (both are built in all cases)
     * - buildId: ???
     * - config: the ultimate next config (this module.exports object)
     * - defaultLoaders:
     * ```js
     * {
     *     babel: { loader: 'next-babel-loader', options: { dev, isServer, cwd: dir } },
     *     hotSelfAccept: { loader: 'noop-loader' }
     * }
     * ```
     * - totalPages: the number of entrypoints
     */
    webpack(config, options) {
        const { dir, isServer } = options;

        // add typescript files to the resolve extensions
        config.resolve.extensions.unshift('.tsx', '.ts');

        // add a handler for typescript files
        config.module.rules.push({
            test: /\.tsx?$/,
            include: [dir],
            exclude: /node_modules/,
            // use ts-loader, NOT babel, because babel SUCKS for typescript
            loader: 'ts-loader',
            options: {
                // checking is handled by ForkTsCheckerWebpackPlugin, so we only need to transpile here
                transpileOnly: true
            }
        });

        // only on server (to prevent duplicate messages), add a plugin to run the ts checker in a forked process
        if (isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin());

        return config;
    }
}