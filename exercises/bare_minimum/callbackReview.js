/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  fs.readFile(filePath, (err, data) => {
    if (!err) {
      var firstLine = data.toString().split('\n')[0];
      callback(err, firstLine);
    } else {
      callback(err, data);
    }
  });
};


// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (filePath, callback) {
  // TODO
  request.get(filePath, (err, res, body) => {
    if (err) {
      // console.log(res.statusCode + 'line 27');
      callback(err);
    } else {
      callback(err, res.statusCode);
      res.end();
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
