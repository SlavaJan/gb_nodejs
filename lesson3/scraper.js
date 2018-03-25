const request = require('request');
const cheerio = require('cheerio');
const http = require('http');


const hostname = "localhost";
const port = 8080;

// request('http://www.rbc.ru/', function(error, response, html) {
//     if (!error && response.statusCode == 200) {
//         let $ = cheerio.load(html);
//         $('.js-indicators-content').each(function(i, element) {
//             let cols = $(this).find('.indicators__ticker');
//             console.dir(
//                 cols.eq(0).text() + " " + cols.eq(1).text() + " " + cols.eq(2).text()
//             );
//         });
//     }
// });
const server = http.createServer((req, res) => {
    request('https://www.smashingmagazine.com/articles/', function(error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);
            $('.article--post').each(function(i, element) {
                let $html = $(this).html();
                return $html;
            });
        }
    })
    res.write("<h1>HEY</h1>");
    res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});