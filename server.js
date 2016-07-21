var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var companiesNames = [];
var companiesInfo = [];
var companies = [];

function createCompany(companyName, companyInformation) {
    this.companyName = companyName;
    this.companyInformation = companyInformation;
}

app.get('/scrape', function (req, res) {
    for (var a = 0; a < 1024; a++) {
        url = 'http://www.orf.pl/index.php?go=woj&woj=%9Cl%B9skie&a='+[a];    

        request(url, function(error, response, html) {

            if (!error) {
                var $ = cheerio.load(html);

                //Try change filter with each .each(function())
                $('td.tresc > u:first-child').filter(function() {
                    // Selected element with company Name
                    var companyName = $(this).text();
                    companiesNames.push(companyName);
                });

                $('p.tresc').filter(function() {
                    // Selected element with company decription
                    var companyInfo = $(this).text();
                    companiesInfo.push(companyInfo);
                });

                for (var i = 0; i < companiesNames.length; i++) {
                    var company = new createCompany(companiesNames[i], companiesInfo[i]);
                    companies.push(company);
                }

                console.log(companies);
            };            
        });
    };

    fs.writeFile('companiesList.csv', companies, 'utf8', function (err) {
        if (err) {
            console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
            console.log('It\'s saved!');
        };
    });

    res.send('OK');
});


app.listen('3000');

console.log("Magic on port 3000");

exports = module.export = app;