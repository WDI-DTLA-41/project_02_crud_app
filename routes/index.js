var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var http = require('http').Server(express);
var io = require('socket.io')(http);
var assert = require('assert');

var url = process.env.MONGODB_URI|| 'mongodb://localhost:27017/chatRoom';
var title = { title: 'FenixChat.com'};
var chatTitle = ['Politics', 'Religion', 'Sports', 'Technology', 'Console Gaming', 'trollnWarRoom', 'Daily Query'];

// Home Page
router.get('/', function(req, resp, next) {
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('index', {memberUse: result, title: 'FenixChat.com'});
              }
          );

    });
});

// CREATE Data
router.get('/signup', function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('signup', {memberUse: result, title: 'FenixChat.com'});              }
          );

    });
});

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

router.get('/login', function(req, resp, next){
  resp.render('login', title);
});

// READ Data
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

io.on('connection', function(socket){
  console.log('a user connected');
});

router.get('/chatRooms/politics',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/politics', {memberUse: result, title: 'FenixChat.com', cTitle: chatTitle[0]});
              }
          );
    });
});

router.get('/chatRooms/religion',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/religion', {memberUse: result, title: 'FenixChat.com', cTitle: chatTitle[1]});
              }
          );
    });
});

router.get('/chatRooms/sports',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/sports', {memberUse: result, title: 'FenixChat.com', cTitle: chatTitle[2]});
              }
          );
    });
});

router.get('/chatRooms/technology',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/technology', {memberUse: result, title: 'FenixChat.com', cTitle: chatTitle[3]});
              }
          );
    });
});

router.get('/chatRooms/consoleGaming',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/consoleGaming', {memberUse: result, title: 'FenixChat.com', cTitle: chatTitle[4]});
              }
          );
    });
});

router.get('/chatRooms/trollnWarRoom',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/trollnWarRoom', {memberUse: result, title: 'FenixChat.com', cTitle: chatTitle[5]});
              }
          );
    });
});

router.get('/chatRooms/dailyQuery',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/dailyQuery', {memberUse: result, title: 'FenixChat.com', cTitle: chatTitle[6]});
              }
          );
    });
});

router.get('/chatRooms/randomChat',function(req, resp, next){
    var result = [];
    var num = Math.floor(Math.random() * 7);
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/randomChat', {memberUse: result, title: 'FenixChat.com', cTitle: chatTitle[num]});
              }
          );
    });
});
// UPDATE Data

// DELETE Data

module.exports = router;
