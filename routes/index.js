var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
// var http = require('http').Server(router);
var assert = require('assert');
// var io = require('socket.io')(http);


var url = process.env.MONGODB_URI|| 'mongodb://localhost:27017/chatRoom';
var title = { title: 'FenixChat.com'};
var chatTitle = ['politics', 'religion', 'sports', 'technology', 'consoleGaming', 'trollnWarRoom', 'dailyQuery'];

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

router.get('/login', function(req, resp, next){
  resp.render('login', title);
});

// READ Data

// io.on('connection', function(client){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

router.get('/politics',function(req, resp, next){
    var result = [];
    var resForum = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
      var forum = db.collection('pubChatForums').find({'Public': []});
      forum.forEach(function(com, err){
          resForum.push(com);
          //console.log(resforum);
      }, function(){
        console.log('Hello I am: ' + resForum[0]);
      });
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/politics', {memberUse: result, Forum: resForum,title: 'FenixChat.com'});
              }
          );
    });
});

router.get('/religion',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/religion', {memberUse: result, title: 'FenixChat.com'});
              }
          );
    });
});

router.get('/sports',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/sports', {memberUse: result, title: 'FenixChat.com'});
              }
          );
    });
});

router.get('/technology',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/technology', {memberUse: result, title: 'FenixChat.com'});
              }
          );
    });
});

router.get('/consoleGaming',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/consoleGaming', {memberUse: result, title: 'FenixChat.com'});
              }
          );
    });
});

router.get('/trollnWarRoom',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/trollnWarRoom', {memberUse: result, title: 'FenixChat.com'});
              }
          );
    });
});

router.get('/dailyQuery',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      var dbOutPut = db.collection('members').find({_id: objectId(req.query.userId)});
          dbOutPut.forEach(function(ind, err){
            assert.equal(null, err);
            result.push(ind);
            },function(){
                db.close();
                resp.render('chatRooms/dailyQuery', {memberUse: result, title: 'FenixChat.com'});
              }
          );
    });
});

router.get('/randomChat',function(req, resp, next){
    var result = [];
    var num = Math.floor(Math.random() * 7);
    console.log(chatTitle[num]);
    console.log(req.query);
    resp.redirect('/' + chatTitle[num] + '?userId=' + req.query.userId);
});

// UPDATE Data
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

router.post('/politics/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      // db.collection('pubChatForums').update({chatNum:0}, {$push: {Public: req.body.instMess}});
      db.close();
      resp.redirect('/politics?' + req.params.userId);
    });
});

router.post('/religion/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      // db.collection('pubChatForums').update({chatNum:1}, {$push: {Public: req.body.instMess}});
      db.close();
      resp.redirect('/religion?' + req.params.userId);
    });
});

router.post('/sports/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      // db.collection('pubChatForums').update({chatNum:2}, {$push: {Public: req.body.instMess}});
      db.close();
      resp.redirect('/sports?' + req.params.userId);
    });
});

router.post('/technology/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      // db.collection('pubChatForums').update({chatNum:3}, {$push: {Public: req.body.instMess}});
      db.close();
      resp.redirect('/technology?' + req.params.userId);
    });
});

router.post('/consoleGaming/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      // db.collection('pubChatForums').update({chatNum:4}, {$push: {Public: req.body.instMess}});
      db.close();
      resp.redirect('/consoleGaming?' + req.params.userId);
    });
});

router.post('/trollnWarRoom/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      // db.collection('pubChatForums').update({chatNum:5}, {$push: {Public: req.body.instMess}});
      db.close();
      resp.redirect('/trollnWarRoom?' + req.params.userId);
    });
});

router.post('/dailyQuery/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      // db.collection('pubChatForums').update({chatNum:6}, {$push: {Public: req.body.instMess}});
      db.close();
      resp.redirect('/politics?' + req.params.userId);
    });
});

// DELETE Data

module.exports = router;
