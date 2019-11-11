import http from 'http';


const server = http.createServer((req, res) => {
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
                <h1>Hello World!</h1>
            </body>
            </html>
        `);
    } else if (req.url === '/health-check') {
        res.writeHead(200);
        res.end('I am OK');
    } else {
        res.writeHead(404);
        res.end();
    }
});
server.on('error', err => console.error(err));
server.listen(80, () => console.log('Listening on port 80!'));
