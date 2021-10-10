const http = require('http');
const url = require('url');
const d = require('./modules/utils');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': 'text/html'});
    const queryStr = url.parse(req.url, true);
    const qdata = queryStr.query;
    const msg = `Hi, ${qdata.name}! Server current date is ${d.getDate()}`;
    res.write(`<p style="color:blue;"><strong>${msg}</strong></p>`);
    res.end();
}).listen(8888);