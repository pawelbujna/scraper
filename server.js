var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function (req, res) {


    url = 'http://www.orf.pl/index.php?go=woj&woj=%9Cl%B9skie&a=0';

    var companies = [];
    var companiesInfo = [];
    request(url, function(error, response, html) {

        if (!error) {
            var $ = cheerio.load(html);

            var companyName;
            var json = {companyName: ""};

            $('td.tresc > u').filter(function(){
                // Selected element with company Name
                var companyName = $(this).text();
                companies.push(companyName);
            });

            $('p.tresc').filter(function(){
                // Selected element with company Name
                var companyInfo = $(this).text();
                companiesInfo.push(companyInfo);
            });
        }

        // fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
        //     console.log('Hope we have saved the file!');
        // });

    res.send(companies);
});

});

app.listen('3000');

console.log("Magic on port 3000");

exports = module.export = app;