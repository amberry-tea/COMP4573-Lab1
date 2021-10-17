const http = require('http');
const url = require('url');
const GET = 'GET';
const POST = 'POST';

const definitions = {
    "Hello": "A greeting.",
    "Goodbye": "Not a greeting."
};
let requestCount = 0;

const server = http.createServer(function(req, res) {
    let response;
    if (req.method == GET) {
        const qstring = url.parse(req.url, true);
        const qdata = qstring.query;
        if (qdata.word) {
            if (definitions[qdata.word]) {
                res.writeHead(200, {'Content-Type': 'application/json'});
                requestCount++;
                response = {
                    term: qdata.word,
                    definition: definitions[qdata.word],
                    requests: requestCount
                };
            } else {
                res.writeHead(400, {'Content-Type': 'application/json'});
                requestCount++;
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
    }
    res.end(JSON.stringify(response));
});

server.listen(8888);
