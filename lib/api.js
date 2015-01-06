'use strict';

// fake API call to validate a login attempt (username and password)
exports.login = validateLogin;
function validateLogin(username, password) {
  return new Promise( (resolve, reject) => {
    if (username === 'test' && password === 'test') {
      resolve({username: username, token: '123'});
    } else {
      reject('Please enter a valid username and password');
    }
  });
}

// fake API call to validate localStorage values (username and token)
exports.token = validateToken;
function validateToken(username, apiToken) {
  return new Promise( (resolve, reject) => {
    if (username === 'test' && apiToken === '123') {
      resolve({username: username, token: apiToken});
    } else {
      reject('Invalid or expired token');
    }
  });
}