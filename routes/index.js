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
});

router.get('/signup', function(req, resp, next){
  resp.render('signup', title);
});

router.post('/createProfile', function(req, resp, next){

  var memberInfo = {
    firstName: req.body.firstName
    // 'M.I.': req.body.midInit,
    // lastName: req.body.lastName,
    // userName: req.body.userName,
    // password: req.body.password,
    // email: req.body.emailAddress
  }

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('member').insertOne(memberInfo, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted ' + result);
      db.close();
    });
  });
  resp.render('login', title);
});

// CREATE Data

// READ Data

// UPDATE Data

// DELETE Data

module.exports = router;
