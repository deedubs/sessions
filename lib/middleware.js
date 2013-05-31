var User = require('models').User;

module.exports = function (req, res, next) {
  if (req.session && req.session.uid) {
    User.findById(req.session.uid, function (err, user) {
      req._user = user;
      res.locals._user = user;
      next();
    });
  } else {
    res.locals._user = false;
    next();
  }
}
