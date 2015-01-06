'use strict';
var actions = require('./actions'),
  api = require('./api'),
  helpers = require('./helpers');

exports.register = register;
function register() {
  // handle a login attempt
  actions.loginAttempt.listen( (credentials) => 
    api.login(credentials.username, credentials.password)
      .then((userData) => actions.loginComplete(userData))
  );

  // handle a logout
  actions.logout.listen( () => helpers.logout());

  // handle a successful login
  actions.loginComplete.listen((userData) => helpers.saveInStorage(userData));
}
