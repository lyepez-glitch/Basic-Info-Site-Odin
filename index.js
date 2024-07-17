const http = require('http');
const fs = require('node:fs');

http.createServer(function(req, res) {
    let htmlData;
    console.log('req url', req.url, req.url === '/about')

    // const reqUrl = new URL(req.url);
    // const { pathname } = reqUrl;

    // console.log('req url', req.url, 'path ', pathname);
    let reqUrl = req.url;
    if (req.url === '/') {
        reqUrl = '/index';
    }
    fs.readFile(`.${reqUrl}.html`, 'utf8', (err, data) => {
        if (err) {
            fs.readFile('./404.html', 'utf8', (err, data) => {
                res.end(data);
            })
            return;
        }
        console.log('data', data);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });

}).listen(8080);