const http = require('http');
const url = require('url');
const GET = 'GET';
const POST = 'POST';

const definitions = {
    "hello": "A greeting.",
    "goodbye": "Not a greeting."
};
let requestCount = 0;

const server = http.createServer(function(req, res) {
    if (req.method === GET) {
        let response;
        const qstring = url.parse(req.url, true);
        const qdata = qstring.query;
        if (qdata.word) {
            requestCount++;
            const word = qdata.word.toLowerCase()
            if (definitions[word]) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                response = {
                    term: word,
                    definition: definitions[word],
                    requests: requestCount
                };
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                response = {
                    message: "That word isn't in our dictionary.",
                    requests: requestCount
                };
            }
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            response = {
                userMessage: "Invalid API call.",
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
            const q = url.parse(body, true);
            const qdata = qstring.query;
            if (qdata.word) {
                requestCount++;
                const word = qdata.word.toLowerCase();
                if (definitions[word]) {
                    res.writeHead(400, {'Content-Type': 'application/json'});
                    response = {
                        userMessage: "That word already has a definition."
                    };
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    definitions[word] = qdata.definition;
                    response = {
                        userMessage: "Success!"
                    };
                }
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                response = {
                    userMessage: "Invalid API call.",
                };
            }
            res.end(JSON.stringify(response));
        });
    }
});

server.listen(8888);
