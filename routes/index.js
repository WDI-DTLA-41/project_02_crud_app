var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/chatRoom';
var title = { title: 'FenixChat.com'};
// Home Page
router.get('/', function(req, resp, next) {
  resp.render('index', title);
});

router.get('/login', function(req, resp, next){
  resp.render('login', title);
})

router.get('/signup', function(req, resp, next){
  resp.render('signup', title);
})

// CREATE Data

// READ Data

// UPDATE Data

// DELETE Data

module.exports = router;
