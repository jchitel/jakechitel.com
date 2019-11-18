import http from 'http';
import fs from 'fs';


let server: http.Server | null = null;

export interface ClientBundle {
    filePath: string;
    type: string;
}

export const start = (opts: {
    port: number,
    clientBundles: ClientBundle[]
}) => {
    const jsBundle = opts.clientBundles.find(_ => _.type === 'js');
    server = http.createServer((req, res) => {
        if (req.url === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(`
                <html>
                <head>
                    <title>Hello World!</title>
                </head>
                <body>
                    <div id="root"></div>
                    <script src="/index.js"></script>
                </body>
                </html>
            `);
        } else if (req.url === '/index.js') {
            res.writeHead(200, {
                'Content-Type': 'text/javascript'
            });
            res.end(fs.readFileSync(jsBundle!.filePath!));
        } else if (req.url === '/health-check') {
            res.writeHead(200);
            res.end('I am OK');
        } else {
            res.writeHead(404);
            res.end();
        }
    });
    server.on('error', err => console.error(err));
    server.listen(opts.port, () => console.log(`Listening on port ${opts.port}!`));
}

export const stop = () => {
    console.log('Stopping server...');
    if (server) {
        server.close();
        server = null;
    }
}
