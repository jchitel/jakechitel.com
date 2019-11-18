import fs from 'fs';
import path from 'path';
const { start } = require('../dist/server') as typeof import('../src/server');

// read all files in the dist client directory, filter out source maps
const files = fs.readdirSync(path.resolve('./dist/client'))
    .map(_ => path.resolve('./dist/client', _))
    .filter(_ => !_.endsWith('.map'))
    .map(_ => ({ filePath: _, type: path.extname(_).substring(1) }));
console.log(files);

start({
    port: 80,
    clientBundles: files
});
