var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jwt-simple');

var config = require('../../config/database');
var Visit = require('../models/visit.js');
var User = require('../models/user.js');

var visitRouter = express.Router();
visitRouter.use(bodyParser.urlencoded({
    extended: true
}));
visitRouter.use(bodyParser.json());


visitRouter.post('/', passport.authenticate('jwt', {
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
                var newVisit = new Visit({
                    doctor: req.body.doctorId,
                    patient: user._id,
                    date: req.body.date,
                    hour: req.body.hour
                });
                // save the user
                newVisit.save(function(err) {
                    if (err) {
                        throw err;
                    } else {
                        res.json({
                            success: true,
                            msg: 'Successful created new visit.'
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

visitRouter.get('/doctor', passport.authenticate('jwt', {
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
                Visit.find({
                  doctor: user._id
                }, function(err, visits) {
                    if (err) throw err;
                    if (!visits) {
                      res.json({
                          success: false,
                          visits: {}
                      });
                    } else {
                        res.json({
                            success: true,
                            visits: visits
                        });
                    };
                }).sort([['date', 'ascending']]).populate('patient');
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});

visitRouter.get('/patient', passport.authenticate('jwt', {
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
                Visit.find({
                  patient: user._id
                }, function(err, visits) {
                    if (err) throw err;
                    if (!visits) {
                      res.json({
                          success: false,
                          visits: {}
                      });
                    } else {
                        res.json({
                            success: true,
                            visits: visits
                        });
                    };
                }).sort([['date', 'ascending']]).populate('doctor');
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            msg: 'No token provided.'
        });
    }
});


visitRouter.get('/:doctorId/:from/:to', passport.authenticate('jwt', {
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
                Visit.find({
                  date: { $gte: req.params.from, $lte: req.params.to },
                  doctor: req.params.doctorId
                }, function(err, visits) {
                    if (err) throw err;
                    if (!visits) {
                      res.json({
                          success: false,
                          visits: {}
                      });
                    } else {
                        res.json({
                            success: true,
                            visits: visits
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


module.exports = visitRouter;