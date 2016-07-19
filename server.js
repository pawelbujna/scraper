var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {

    // Godzila movie
    url = 'http://www.imdb.com/title/tt0371746/';

    request(url, function(error, response, html) {

        if (!error) {
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = {title: "", release: "", rating: ""};

            $('div.title_wrapper').filter(function(){
                var data = $(this);
                title = data.children().first().text();
                json.title = title;
            });

            $('span#titleYear').filter(function(){
                var data = $(this);
                release = data.children().first().text();
                json.release = release;
            });

            $('.ratingValue').filter(function() {
                var data = $(this);
                rating = data.children().first().children().text();
                json.rating = rating;
            });
        }

        fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
            console.log('Hope we have saved the file!');
        });
    });

    res.send('File saved. Check console!');
});

app.listen('3000');

console.log("Magic on port 8081");

exports = module.export = app;