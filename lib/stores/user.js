'use strict';
var Fynx = require('fynx'),
  immutable = require('immutable');

module.exports = Fynx.createSimpleStore(immutable.Map());
