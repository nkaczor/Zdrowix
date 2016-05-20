var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');

var config = require('../../config/database');
var WorkingTime = require('../models/WorkingTime.js');
var User = require('../models/user.js');

var workingTimeRouter = express.Router();
workingTimeRouter.use(bodyParser.urlencoded({
    extended: true
}));
workingTimeRouter.use(bodyParser.json());


workingTimeRouter.post('/', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {

                var newWorkingTime = new WorkingTime({
                    doctor: user._id,
                    workingHours: req.body
                });
                // save the user
                newWorkingTime.save(function(err) {
                    if (err) {
                        WorkingTime.findOneAndUpdate({
                                doctor: user._id
                            }, {
                                $set: {
                                    doctor: user._id,
                                    workingHours: req.body
                                }
                            }, {
                                overwrite: true,
                                new: true
                            },
                            function(err, updatedItem) {
                                if (err) throw err;
                                res.json({
                                    success: true,
                                    msg: 'Successful updated working time.'
                                });
                            });
                    } else {
                        res.json({
                            success: true,
                            msg: 'Successful created new working time.'
                        });
                    }
                });

            }
        })
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});



workingTimeRouter.get('/:id', passport.authenticate('jwt', {
    session: false
}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
                return res.status(403).send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
                });
            } else {
                WorkingTime.findOne({
                    doctor: req.params.id
                }, function(err, workingTime) {
                    if (err) throw err;
                    if (!workingTime) {
                        return res.status(403).send({
                            success: false,
                            msg: 'Working Time not found.'
                        });
                    } else {
                        res.json({
                            success: true,
                            workingTime: workingTime
                        });
                    };
                });
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});


getToken = function(headers) {
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


module.exports = workingTimeRouter;