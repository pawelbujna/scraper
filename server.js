var express = require('express');
var fs = require('fs');
var stringify = require('csv-stringify');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var app = express();
var downloadDataPromise = require('./downloadingDataPromise.js')

var companiesNames = [];
var companiesInfo = [];
var companies = [];
//
// var createCompanyConstructor = function(companyName, companyInformation) {
//   this.companyName = companyName;
//   this.companyInformation = companyInformation;
// };
//
// var saveFile = function() {
//   stringify(companies, function(err, output){
//     fs.writeFile('companiesList.csv', output, function (err) {
//       if (!err) { console.log('File Saved') };
//     });
//   });
// };
//
// var createCompanyObject =  function() {
//   for (var i = 0; i < companiesNames.length; i++) {
//     if (i < companiesNames.length - 1) {
//       var company = new createCompanyConstructor(companiesNames[i], companiesInfo[i]);
//       companies.push(company);
//     } else {
//       console.log("File is saving...");
//       saveFile();
//     }
//   }
// }


// test
test

var loopThroughAllPages = function() {
  var pagesQuantity = 17;

  console.log(downloadDataPromise.downloadData('test'));

  for (var a = 0; a < pagesQuantity; a++) {

    url = 'http://www.orf.pl/index.php?go=woj&woj=%9Cl%B9skie&a='+[a];

  };
};

var downloadCompaniesData = function(html) {
  request({uri: url, encoding: null}, function(error, response, html) {
    if (error) { return; }

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
};

loopThroughAllPages()

exports = module.export = app;
