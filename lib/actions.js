'use strict';
var Fynx = require('fynx');

module.exports = Fynx.createAsyncActions([
  'loginAttempt',
  'loginComplete',
  'logout'
]);