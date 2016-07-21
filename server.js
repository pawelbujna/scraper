var express = require('express');
var fs = require('fs');
var stringify = require('csv-stringify');
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

var saveFile = function() { 
    stringify(companies, function(err, output){
        fs.writeFile('companiesList.csv', output, 'utf8', function (err) {
            if (!err) { console.log('OK') };
        });
    });
};

var downloadData = function() {

    for (var a = 0; a < 2; a++) {

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
                saveFile();
            };            
        });
    };

};

downloadData();


// fs.writeFile('companiesList.csv', companies, 'utf8', function (err) {
//     if (!err)
//         console.log('It\'s saved!');
//     };
// });

exports = module.export = app;