var express = require('express');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
var mongoose = require('mongoose');
var passport	= require('passport');
var jwt = require('jwt-simple');

var config = require('../../config/database');
var User = require('../models/user.js');
var fs = require('fs');

var host = 'http://localhost:8080';

var userRouter = express.Router();
userRouter.use(bodyParser.urlencoded({ extended: true }));
userRouter.use(bodyParser.json());
userRouter.use(busboyBodyParser());

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
      }).populate("specialty");
    }
   else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

userRouter.put('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  var newData = getNewData(req.body, req.files);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOneAndUpdate({
      email: decoded
    },{
      $set: newData
    },{
      new: true
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

userRouter.delete('/photo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  var newData = {avatar: ""};
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOneAndUpdate({
      email: decoded
    },{
      $set: newData
    },{
      new: true
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


getNewData = function(body, files){

  var newData = {};
  if(body.firstName) newData.firstName = body.firstName;
  if(body.lastName) newData.lastName = body.lastName;
  if(body.birthDate) newData.birthDate = body.birthDate;
  if(body.bio) newData.bio = body.bio;

  if(files.avatar){
    var filename =  '/images/' + Date.now() + files.avatar.name;
    var fullFileName = __dirname+ '/../../public'+ filename;
    fs.writeFile(fullFileName, files.avatar.data, function (err) {
      if (err) return console.log(err);
    });
    newData.avatar = host + filename;
  }

  return newData;
}
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