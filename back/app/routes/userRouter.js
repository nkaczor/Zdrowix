var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport	= require('passport');
var jwt = require('jwt-simple');

var config = require('../../config/database');
var User = require('../models/user.js');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, user: user})
        }
      });
    }
   else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};


module.exports = userRouter;