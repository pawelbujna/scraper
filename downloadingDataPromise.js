var exports = module.exports = {};

exports.downloadData = function(url) {
  return new Promise(function(resolve, reject){
    var test = new Object();

    test.onload = function() {
      resolve(null, test);
    }

    test.onerror = function() {
      var message = "Sorry, couldnt download data from" + url;
      reject(new Error(message));
    }
      test.url = url;
  });
}

module.exports;
