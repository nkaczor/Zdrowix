var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Voivodeship = require('../models/voivodeship.js');

var voivodeshipRouter = express.Router();
voivodeshipRouter.use(bodyParser.json());

voivodeshipRouter.route('/')
.get(function (req, res, next) {
    Voivodeship.find({}, function (err, voivodeships) {
        if (err) throw err;
        res.json(voivodeships);
    });
});

module.exports = voivodeshipRouter;