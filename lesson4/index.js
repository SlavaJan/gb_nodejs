const express = require('express');
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const request = require('request');
const cheerio = require('cheerio');
const exphbs = require('express-handlebars');

const app = express();
const url = 'https://www.smashingmagazine.com/articles/';

app.use(express.static('./lesson4/public'));
app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', './lesson4/views');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    let news = request(url, function(error, response, html) {
        if (error) {
            throw error;
        }
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);
            var json = {};

            $('.article--post').each(function(i, element) {
                json[i] = element;
                let data = $(this);
                json[i].title = data.find('.article--post__title a').text();
                json[i].author = data.find('.article--post__author-name a').text();
                json[i].teaser = data.find('.article--post__teaser').text();
                json[i].link = data.find('.article--post__title a').attr('href');
            });
        }

        res.render('news', {
            news: json
        });
    });


});

app.listen(8888);