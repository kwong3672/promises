/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(readFilePath, (err, data) => {
      if (!err) {
        var userName = data.toString().split('\n')[0];
        resolve(userName);
      } else {
        reject(err);
      }
    });
  }).then( function(user) {
    return new Promise(function(resolve, reject) {
      var options = {
        url: 'https://api.github.com/users/' + user,
        headers: { 'User-Agent': 'request' },
        json: true  // will JSON.parse(body) for us
      };

      request.get(options, function(err, res, body) {
        if (err) {
          reject(err);
        } else if (body.message) {
          reject(new Error('Failed to get GitHub profile: ' + body.message), null);
        } else {
          resolve(body);
        }
      });
    });
  }).then(function(profile) {
    return new Promise(function(resolve, reject) {
      var saveThis = JSON.stringify(profile);
      fs.writeFile(writeFilePath, saveThis, function (err) {
        if (err) {
          console.log('line 54 error');
        } else {
          resolve();
        }
      });
      
    });

  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
