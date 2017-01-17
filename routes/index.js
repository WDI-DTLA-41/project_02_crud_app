var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/chatRoom';


router.get('/', function(req, res, next) {
  res.render('index', {title: 'Project 2 - The Beginning'});
});

// CREATE Data

// READ Data

// UPDATE Data

// DELETE Data

module.exports = router;
