'use strict';
var hq = require('hyperquest'),
  co = require('co');

const API_ENDPOINT = 'http://localhost:5000';

// API call to validate a login attempt (username and password)
exports.login = validateLogin;
function validateLogin(username, password) {
  return new Promise( (resolve, reject) => {
    var url = API_ENDPOINT + '/login',
      body = {username: username, password: password};
    co(function* () {
      return yield postJSON(url, body);
    })
    .then( (token) => {
      console.log(token);
      resolve(token);
    })
    .then(null, () => {
      console.log('error');
      reject('Please enter a valid username and password');
    });
  });
}

// API call to validate localStorage values (username and token)
exports.token = validateToken;
function validateToken(apiToken) {
  return new Promise( (resolve, reject) => {
    var url = API_ENDPOINT + '/token',
      body = {token: apiToken};
    co(function* () {
      return yield postJSON(url, body);
    })
    .then( (token) => {
      resolve(token);
    })
    .then(null, () => {
      reject('Invalid or expired token');
    });
  });
}

// extracted and modified from https://github.com/tphummel/post-json
// POST JSON helper for hyperquest
exports.postJSON = postJSON;
function postJSON(url, data) {
  var body = JSON.stringify(data),
    opts = {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length
      }
    },
    ws = hq.post(url, opts),
    buffer = '';
      
  ws.end(body);
  ws.on('data', function(chunk) {
    return buffer += chunk;
  });

  ws.on('error', function(err) {
    return new Promise( (resolve, reject) => {
      reject(err);
    });
  });

  return ws.on('end', function() {
    var res = ws.response;
    return new Promise( (resolve, reject) => {
      if (res.statusCode === 200) {
        resolve(res.body);
      }
      else {
        reject(res.statusCode);
      }
    });
  });
}