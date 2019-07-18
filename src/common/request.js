const http = require('https');
const Response = require('./response');

const API_URL = 'api.cryptoapis.io';
const API_PORT = 443;
const API_VERSION = 'v1';

const Request = (log, apiKey, path, opt = {}, postData = null) => {
    const options = {
        hostname: API_URL,
        port: API_PORT,
        path: '/' + API_VERSION + path,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
        },
        ...opt
    };

    return new Promise((resolve, reject) => {
        const req = http.request(options, res => Response(log, res, resolve, reject));

        req.on('error', e => {
            if (log) {
                console.error(e);
            }
            reject(e);
        });

        if (postData) {
            req.write(postData);
        }

        req.end();
    })
        .then(res => {
            if (log) {
                console.log('\x1b[32m', 'OK', '\x1b[0m', options.method + ' ' + options.path);
            }
            return res;
        })
        .catch(err => {
            if (log) {
                console.log('\x1b[31m', 'ERR', '\x1b[0m', options.method + ' ' + options.path);
                console.error(err);
            }
            return err;
        });
};

module.exports = Request;
