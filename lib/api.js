'use strict';
var reqwest = require('reqwest');

const API_HOST = 'http://localhost:5000';

// API call to validate a login attempt (username and password)
exports.login = validateLogin;
function validateLogin(username, password) {
  return reqwest({
    url: API_HOST + '/login',
    type: 'json',
    method: 'post',
    contentType: 'application/json',
    data: JSON.stringify({username: username, password: password})
  });
}

// API call to validate localStorage values (username and token)
exports.token = validateToken;
function validateToken(apiToken) {
  return reqwest({
    url: API_HOST + '/token',
    type: 'json',
    method: 'post',
    contentType: 'application/json',
    data: JSON.stringify({token: apiToken})
  });
}
