const http = require('http');
const url = require('url');
const GET = 'GET';
const POST = 'POST';
const utils = require('./modules/utils');

const definitions = {
    "HELLO": "A greeting.",
    "GOODBYE": "Not a greeting."
};
let requestCount = 0;

const server = http.createServer(function(req, res) {
    if (req.method === GET) {
        let response;
        const qstring = url.parse(req.url, true);
        const qdata = qstring.query;
        if (qdata.word) {
            requestCount++;
            const word = qdata.word.toUpperCase()
            if (definitions[word]) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                response = {
                    'term': word,
                    'definition': definitions[word],
                    'requests': requestCount
                };
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                response = {
                    'error-message': "That word isn't in our dictionary.",
                    'requests': requestCount
                };
            }
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            response = {
                'error-message': "Invalid API call.",
            };
        }
        res.end(JSON.stringify(response));
    }
    
    if (req.method === POST) {
        let body = "";
        let response = {};
        req.on('data', function (chunk) {
            if (chunk != null) {
                body += chunk;
            }
        });
        req.on('end', function () {
            const qstring = url.parse(body, true);
            const qdata = qstring.query;
            if (qdata.word) {
                const word = qdata.word.toUpperCase();
                if (definitions[word]) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    response = {
                        'error-message': "That word already has a definition."
                    };
                } else if (utils.checkLettersOnly(word)) {
                    requestCount++;
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    definitions[word] = qdata.definition;
                    response = {
                        'error-message': "Success!",
                        'requests': requestCount
                    };    
                } else {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    response = {
                        'error-message': "Terms may only include letters, not numbers of punctuation."
                    };
                }
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                response = {
                    'error-message': "Invalid API call.",
                };
            }
            res.end(JSON.stringify(response));
        });
    }
});

server.listen(8888);
