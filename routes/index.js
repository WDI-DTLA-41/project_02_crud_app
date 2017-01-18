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

router.get('/signup', function(req, resp, next){
  resp.render('signup', title);
});

router.get('/login', function(req, resp, next){
  resp.render('login', title);
});

router.post('/memLogin', function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({userName: req.body.userNameEntry});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                if(result[0] !== undefined){
                  if(result[0].userName === req.body.userNameEntry && result[0].password === req.body.passWordEntry){
                    resp.render('memLogin',{memberUse: result, title: 'FenixChat.com'});
                  } else {
                      resp.redirect('login');
                    }
                } else {
                    //alert('Username and Password, not found!');
                    resp.redirect('login');
                  }
              }
          );

    });
});
// CREATE Data

// READ Data

// UPDATE Data
router.post('/createProfile', function(req, resp, next){
  var fullName = req.body.firstName + ' ' + req.body.midInit + '. ' + req.body.lastName;
  var memberInfo = {
    firstName: req.body.firstName,
    midInit: req.body.midInit,
    lastName: req.body.lastName,
    fullName: fullName,
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.emailAddress
  }

  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('members').insertOne(memberInfo, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted ' + result);
      db.close();
    });
  });
  resp.render('login', title);
});
// DELETE Data

module.exports = router;
