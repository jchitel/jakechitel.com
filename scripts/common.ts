import Parcel, { InitialParcelOptions } from '@parcel/core';
import path from 'path';

const devOptions: InitialParcelOptions = {
    mode: 'development',
    hot: false,
    serve: false,
    autoinstall: false,
    defaultConfig: {
        ...require('@parcel/config-default'),
        filePath: require.resolve('@parcel/config-default')
    }
}

const prodOptions: InitialParcelOptions = {
    mode: 'production',
    autoinstall: false,
    defaultConfig: {
        ...require('@parcel/config-default'),
        filePath: require.resolve('@parcel/config-default')
    }
}

export const createServerBundler = (prod: boolean) => new Parcel({
    entries: path.resolve('./src/server/index.ts'),
    targets: {
        server: {
            distDir: path.resolve('./dist/server/'),
            context: 'node',
            outputFormat: 'commonjs'
        }
    },
    ...(prod ? prodOptions : devOptions)
});

export const createClientBundler = (prod: boolean) => new Parcel({
    entries: path.resolve('./src/client/index.tsx'),
    targets: {
        client: {
            distDir: path.resolve('./dist/client/'),
            context: 'browser',
            outputFormat: 'commonjs'
        }
    },
    ...(prod ? prodOptions : devOptions)
});
