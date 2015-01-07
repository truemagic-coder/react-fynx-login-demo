'use strict';
var userStore = require('./stores/user');

// clear the userstore and delete the token key from localStorage
exports.logout = logout;
function logout() {
  localStorage.removeItem('token');
  userStore({});
}

// save token to localStorage and the userStore
exports.saveInStorage = saveInStorage; 
function saveInStorage(userData) {
  localStorage.setItem('token', userData.token);
  userStore(userData);
}