const http = require('http');
const url = require('url');
const GET = 'GET';
const POST = 'POST';
const utils = require('./modules/utils');

const definitions = {};
let requestCount = 0;

const server = http.createServer(function(req, res) {
    if (req.method === GET) {
        let response;
        const qstring = url.parse(req.url, true);
        const qdata = qstring.query;
        if (qdata.word) {
            // If request query includes "word" parameter.
            const word = qdata.word.toUpperCase()
            
            if (definitions[word]) {
                // If requested word is in the list of definitions. 
                res.writeHead(200, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });
                requestCount++;
                response = {
                    'term': word,
                    'definition': definitions[word],
                    'requests': requestCount
                };
            } else {
                // If requested word is NOT in the list of definitions.
                res.writeHead(400, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*'
                });
                requestCount++;
                response = {
                    'message': "That word isn't in our dictionary.",
                    'requests': requestCount
                };
            }
        } else {
            // If request does NOT include "word" parameter.
            res.writeHead(400, {
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin': '*'
            });
            response = {
                'message': "Invalid API call.",
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
            const data = JSON.parse(body)
            if (data.word && data.definition) {
                // If "word" and "definition" paramters are included.
                const word = data.word.toUpperCase();

                if (definitions[word]) {
                    // If provided word is already in the list of definitions.
                    res.writeHead(400, {
                        'Content-Type': 'text/html',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*'
                    });
                    requestCount++;
                    response = {
                        'message': "That word already has a definition.",
                        'requests': requestCount
                    };
                    res.end(JSON.stringify(response));
                } else if (utils.checkLettersOnly(word)) {
                    // If provided word is not already in the list AND only includes letters.
                    requestCount++;
                    res.writeHead(200, {
                        'Content-Type': 'text/html',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*'
                    });
                    definitions[word] = data.definition;
                    response = {
                        'message': "Success!",
                        'requests': requestCount
                    };
                    res.end(JSON.stringify(response));   
                } else {
                    // If provided word includes numbers or punctuation.
                    res.writeHead(400, {
                        'Content-Type': 'text/html',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*'
                    });
                    requestCount++;
                    response = {
                        'message': "Terms may only include letters, not numbers of punctuation.",
                        'requests': requestCount
                    };
                    res.end(JSON.stringify(response));
                }
            } else {
                // If word/definition parameters are NOT included.
                res.writeHead(400, {
                    'Content-Type': 'text/html',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': '*'
                });
                response = {
                    'message': "Invalid POST call.",
                };
                res.end(JSON.stringify(response));
            }
        });
    }
});

server.listen(8888);
