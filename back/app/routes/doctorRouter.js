var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var User = require('../models/user.js');

var doctorRouter = express.Router();
doctorRouter.use(bodyParser.json());

doctorRouter.route('/')
.get(function (req, res, next) {
    User.find({type: 'doctor'}, function (err, doctors) {
        if (err) throw err;
        res.json(doctors);
    }).populate("specialty");
});

module.exports = doctorRouter;