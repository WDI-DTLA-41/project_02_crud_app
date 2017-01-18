var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/chatRoom';

// Home Page
router.get('/', function(req, resp, next) {
  resp.render('index', {title: 'FenixChat.com'});
});

router.get('/registry', function(req, resp, next){

  if(req.query.logIn === 'login'){
    redirect('/registry/logIn');
  } else if(req.query.signUp === 'signup'){
      redirect('/registry/signUp');
    }
  resp.render('index', {title: 'FenixChat.com'});
})

router.get('/registry/login', function(req, resp, next){
  resp.render();
})

router.get('/registry/signup', function(req, resp, next){
  resp.render();
})
// CREATE Data

// READ Data

// UPDATE Data

// DELETE Data

module.exports = router;
