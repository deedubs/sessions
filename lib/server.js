var express = require('express');
var sessions = module.exports = express();
var User = require('models').User;

sessions.set('view engine', 'jade');
sessions.set('views', __dirname + '/../views');

sessions.get('/new', function (req, res) {
  res.render('new');
});

sessions.post('/new', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.signin(email, password, function (err, user) {
    if (err) return next(err);

    req.session.uid = user._id;

    res.redirect('/');
  });
});

sessions.get('/logout', function (req, res) {
  req.session = null;

  res.redirect('/');
});
