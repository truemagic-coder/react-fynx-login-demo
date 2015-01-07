'use strict';

var express = require('express'),
  jwt = require('jsonwebtoken'),
  app = express(),
  bodyParser = require('body-parser');

// parse json
app.use(bodyParser.json());

// setup cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// set port for express
app.set('port', (process.env.PORT || 5000));

// set secret key
var SECRET_KEY = 'shhhhh';

// login API endpoint
app.post('/login', function (req, res) {
  var username = req.body.username,
    password = req.body.password;
  if (username === 'test' && password === 'test') {
    // sign jwt (json web token) with default (HMAC SHA256)
    var token = jwt.sign({username: username}, SECRET_KEY, {audience: 'client', expiresInMinutes: '15'});
    res.json({token: token});
  } else {
    res.json({msg: 'Please enter a valid username and password'}, 401);
  }
});

// token verification API endpoint
app.post('/token', function (req, res) {
   var token = req.body.token;
   jwt.verify(token, SECRET_KEY, function(err) {
    if (err) {
      console.error(err);
      res.json({msg: 'Invalid or expired token'}, 401);
    } else {
      res.json({msg: 'Token is valid'});
    }
  });
});

app.listen(app.get('port'));
