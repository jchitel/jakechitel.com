/// <reference types="../types/@parcel/core" />

import { BuildEvent, BuildSuccessEvent } from '@parcel/core';
import { createServerBundler, createClientBundler } from './common';
import { ClientBundle } from '../src/server';

const server = createServerBundler(false);
const client = createClientBundler(false);

server.watch((err, buildEvent) => onBuild(true, err, buildEvent));
client.watch((err, buildEvent) => onBuild(false, err, buildEvent));

let serverCallbacks: typeof import('../src/server') | null = null;
let serverPath: string | null = null;
let clientBundles: ClientBundle[] | null = null;

const onBuild = (isServer: boolean, err: Error | undefined, buildEvent: BuildEvent | undefined) => {
    if (err) {
        console.error(err);
        process.exit(1);
    } else if (buildEvent?.type === 'buildFailure') {
        console.error(buildEvent.error);
        process.exit(1);
    } else if (!buildEvent) {
        console.error('No error found, but there was no build event :(');
        process.exit(1);
    }

    const event = buildEvent as BuildSuccessEvent;
    if (isServer) {
        console.log('Server built, restarting server...');
        // stop the server if it's running
        if (serverCallbacks) serverCallbacks.stop();
        // invalidate the server cache
        if (serverPath) delete require.cache[serverPath];
        // grab the server path, import it
        const bundle = event.bundleGraph.getBundles()[0];
        serverPath = bundle.filePath ?? thro("Server bundle specified no file path");
        serverCallbacks = require(serverPath);
        // if we have a built client, start the server
        if (clientBundles) serverCallbacks!.start({ port: 8080, clientBundles });
    } else {
        console.log('Client built, restarting server...');
        // replace the bundle list
        clientBundles = event.bundleGraph.getBundles()
            .map(({ filePath, type }) => ({ filePath: filePath!, type }));
        if (serverCallbacks) {
            // stop the server if it's running
            serverCallbacks.stop();
            // start the server with the new client build
            serverCallbacks.start({ port: 8080, clientBundles });
        }
    }
}

const thro = (msg: string) => { throw new Error(msg) }
