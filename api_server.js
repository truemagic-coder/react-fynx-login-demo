'use strict';

var express = require('express'),
  pw = require('credential'),
  loki = require('lokijs'),
  jwt = require('jsonwebtoken'),
  app = express(),
  bodyParser = require('body-parser');

// parse json
app.use(bodyParser.json());

// set port for express
app.set('port', (process.env.PORT || 5000));

// set secret key
var SECRET_KEY = 'shhhhh';

// setup user and in-memory store
var username = 'test',
  password = 'test',
  db = new loki('db.json'),
  users = db.addCollection('users');

// hash password and save user in in-memory store
pw.hash(password, function (err, hash) {
  if (err) { throw err; }
  users.insert({username: username, password: hash});
});

// login API endpoint
app.post('/login', function (req, res) {
  var username = req.params.username,
    password = req.params.password,
    storedPassword = users.find({username: username});
  res.send(req.body);
  // pw.verify(storedPassword, password, function (err, isValid) {
  //   if (err) { throw err; }
  //   if (isValid) {
  //     // sign jwt (json web token) with default (HMAC SHA256)
  //     var token = jwt.sign({username: username}, SECRET_KEY, {audience: 'client', expiresInMinutes: '15'});
  //     res.json({token: token});
  //   } else {
  //     res.send(401);
  //   }
  // });
});

// token verification API endpoint
app.post('/token', function (req, res) {
   var token = req.params.token;
   jwt.verify(token, SECRET_KEY, function(err) {
    if (err) {
      res.send(401);
    } else {
      res.send(200);
    }
  });
});

app.listen(app.get('port'));
