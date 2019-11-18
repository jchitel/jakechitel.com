/// <reference types="../types/@parcel/core" />

import { createServerBundler, createClientBundler } from './common';

const server = createServerBundler(true);
const client = createClientBundler(true);

(async () => {
    try {
        await Promise.all([
            server.run(),
            client.run()
        ])
    } catch (err) {
        console.error(err);
        process.exit(1);
    } 
})();
