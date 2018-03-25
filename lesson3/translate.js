const http = require('http');
const request = require('request');
const fs = require('fs');
const path = require('path');
const url = require('url');

const hostname = "localhost";
const port = 8080;
const apiKey = "trnsl.1.1.20180321T184845Z.792971a107b0e1fd.ee3341f80850b2de3b6ecee04d36cd7426ab3b6f";

const server = http.createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    console.log(query);

    const fileUrl = '/translate.html';

    const filePath = path.resolve(`./lesson3/public/${fileUrl}`);

    fs.exists(filePath, (exists) => {
        if (!exists) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404! File ' + fileUrl + ' not found</h1></body></html>');

            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');

        fs.createReadStream(filePath).pipe(res);

    });

    request(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&lang=en-ru&text=${query.text}`, function(error, response, html) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(response.body).text);
            return JSON.parse(response.body);
        }
    });

});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});