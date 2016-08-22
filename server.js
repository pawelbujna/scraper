var express = require('express');
var fs = require('fs');
var stringify = require('csv-stringify');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var app = express();

var companiesNames = [];
var companiesInfo = [];
var companies = [];

//test

var createCompanyConstructor = function(companyName, companyInformation) {
  this.companyName = companyName;
  this.companyInformation = companyInformation;
};

var saveFile = function() {
  stringify(companies, function(err, output){
    fs.writeFile('companiesList.csv', output, function (err) {
      if (!err) { console.log('File Saved') };
    });
  });
};

var createCompanyObject =  function() {
  for (var i = 0; i < companiesNames.length; i++) {
    if (i < companiesNames.length - 1) {
      var company = new createCompanyConstructor(companiesNames[i], companiesInfo[i]);
      companies.push(company);
    } else {
      console.log("File is saving...");
      saveFile();
    }
  }
}

var downloadData = function() {

  var pagesQuantity = 1725;

  for (var a = 0; a < pagesQuantity; a++) {
    if (a < pagesQuantity) {

      url = 'http://www.orf.pl/index.php?go=woj&woj=%9Cl%B9skie&a='+[a];

      request({uri: url, encoding: null}, function(error, response, html) {

        if (error) {return;};

        html = iconv.decode(html, 'Windows-1250');

        var $ = cheerio.load(html);

        $('td.tresc > u:first-child').filter(function() {
          var companyName = $(this).text();
          companiesNames.push(companyName);
        });

        $('p.tresc').filter(function() {
          var companyInfo = $(this).text();
          companiesInfo.push(companyInfo);
        });

      });
    } else {
      // Wait until all data will load to array.
      setTimeout(createCompanyObject, 180000);
    };
  };
};

downloadData()

exports = module.export = app;
