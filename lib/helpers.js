'use strict';
var userStore = require('./stores/user');

// clear the userStore and delete the keys from localStorage
exports.logout = logout;
function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  userStore({});
}

// save both the username and token to localStorage and the userStore
exports.saveInStorage = saveInStorage; 
function saveInStorage(userData) {
  localStorage.setItem('username', userData.username);
  localStorage.setItem('token', userData.token);
  userStore(userData);
}