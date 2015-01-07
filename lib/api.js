'use strict';
var request = require('browser-request');

const API_ENDPOINT = 'http://localhost:5000';

// API call to validate a login attempt (username and password)
exports.login = validateLogin;
function validateLogin(username, password) {
  return new Promise( (resolve, reject) => {
    var url = API_ENDPOINT + '/login',
      body = {username: username, password: password};
    request({method:'POST', url: url, body: body, json:true}, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        if (res.statusCode === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      }
    });
  });
}

// API call to validate localStorage values (username and token)
exports.token = validateToken;
function validateToken(apiToken) {
  return new Promise( (resolve, reject) => {
    var url = API_ENDPOINT + '/token',
      body = {token: apiToken};
    request({method:'POST', url: url, body: body, json:true}, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        if (res.statusCode === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      }
    });
  });
}