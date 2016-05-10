var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Specialty = require('../models/specialty.js');

var specialtyRouter = express.Router();
specialtyRouter.use(bodyParser.json());

specialtyRouter.route('/')
.get(function (req, res, next) {
    Specialty.find({}, function (err, specialties) {
        if (err) throw err;
        res.json(specialties);
    });
});

module.exports = specialtyRouter;