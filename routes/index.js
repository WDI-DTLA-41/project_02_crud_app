var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
// var http = require('http').Server(router);
var assert = require('assert');
// var io = require('socket.io')(http);


var url = process.env.MONGODB_URI|| 'mongodb://localhost:27017/chatRoom';
var title = { title: 'FenixChat.com'};
var chatTitle = ['Politics', 'Religion', 'Sports', 'Technology', 'ConsoleGaming', 'TrollnWarRoom', 'DailyQuery'];


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
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        console.log(results);
        db.collection('pubChatForums').find({chatNum: 0}).toArray(function(err, forums){
          db.close();
          console.log(forums);
          var forum = forums[0].Politics.map(function(comment) {
            return {comment: comment}
          })
          resp.render('chatRooms/politics', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.get('/religion',function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        console.log(member);
        db.collection('pubChatForums').find({chatNum: 1}).toArray(function(err, forums){
          db.close();
          console.log(forums);
          var forum = forums[0].Religion.map(function(comment) {
            return {comment: comment}
          })
          resp.render('chatRooms/religion', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.get('/sports',function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        console.log(member);
        db.collection('pubChatForums').find({chatNum: 2}).toArray(function(err, forums){
          db.close();
          console.log(forums);
          var forum = forums[0].Sports.map(function(comment) {
            return {comment: comment}
          })
          resp.render('chatRooms/sports', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.get('/technology',function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        console.log(member);
        db.collection('pubChatForums').find({chatNum: 3}).toArray(function(err, forums){
          db.close();
          console.log(forums);
          var forum = forums[0].Technology.map(function(comment) {
            return {comment: comment}
          })
          resp.render('chatRooms/technology', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.get('/consoleGaming',function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        console.log(member);
        db.collection('pubChatForums').find({chatNum: 4}).toArray(function(err, forums){
          db.close();
          console.log(forums);
          var forum = forums[0].ConsoleGaming.map(function(comment) {
            return {comment: comment}
          })
          resp.render('chatRooms/consoleGaming', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.get('/trollnWarRoom',function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        console.log(member);
        db.collection('pubChatForums').find({chatNum: 5}).toArray(function(err, forums){
          db.close();
          console.log(forums);
          var forum = forums[0].TrollnWarRoom.map(function(comment) {
            return {comment: comment}
          })
          resp.render('chatRooms/trollnWarRoom', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.get('/dailyQuery',function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        console.log(member);
        db.collection('pubChatForums').find({chatNum: 6}).toArray(function(err, forums){
          db.close();
          console.log(forums);
          var forum = forums[0].DailyQuery.map(function(comment) {
            return {comment: comment}
          })
          resp.render('chatRooms/dailyQuery', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.get('/randomChat',function(req, resp, next){
    var num = Math.floor(Math.random() * 7);
    console.log(chatTitle[num]);
    console.log(req.query);
    resp.redirect('/' + chatTitle[num] + '?userId=' + req.query.userId);
});

router.get('/accountEdit', function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        console.log(results);
        db.collection('pubChatForums').find({chatNum: 0}).toArray(function(err, forums){
          db.close();
          console.log(forums);
          var forum = forums[0].Politics.map(function(comment) {
            return {comment: comment}
          })
          resp.render('account', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.post('/accountEdit/:userId', function(req, resp, next){
  console.log(req.query);
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        //console.log(member);
        db.collection('pubChatForums').find({chatNum: 0}).toArray(function(err, forums){
          db.close();
          //console.log(forums);
          var forum = forums[0].Politics.map(function(comment) {
            return {comment: comment}
          });
          resp.redirect('/accountEdit?' + req.params.userId);
        });
      });
    });
});

router.get('/editFirstName', function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        //console.log(results);
        db.collection('pubChatForums').find({chatNum: 0}).toArray(function(err, forums){
          db.close();
          //console.log(forums);
          var forum = forums[0].Politics.map(function(comment) {
            return {comment: comment}
          })
          resp.render('editPages/editFirstName', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.post('/editFirstName', function(req, resp, next){
    console.log( 'User Id is: ' + req.params.userId);
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').update({_id:req.params.userId}, {$set: {firstName: req.body.attrEdit}});
      db.close();
      resp.redirect('/accountEdit?' + req.params.userId);
    });
});



router.get('/editMidInit', function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        //console.log(results);
        db.collection('pubChatForums').find({chatNum: 0}).toArray(function(err, forums){
          db.close();
          //console.log(forums);
          var forum = forums[0].Politics.map(function(comment) {
            return {comment: comment}
          })
          resp.render('editPages/editMidInit', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.post('/editMidInit', function(req, resp, next){
    console.log( 'User Id is: ' + req.params.userId);
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').update({_id:req.params.userId}, {$set: {firstName: req.body.attrEdit}});
      db.close();
      resp.redirect('/accountEdit?' + req.params.userId);
    });
});

router.get('/editLastName', function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        //console.log(results);
        db.collection('pubChatForums').find({chatNum: 0}).toArray(function(err, forums){
          db.close();
          //console.log(forums);
          var forum = forums[0].Politics.map(function(comment) {
            return {comment: comment}
          })
          resp.render('editPages/editLastName', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.post('/editLastName', function(req, resp, next){
    console.log( 'User Id is: ' + req.params.userId);
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').update({_id:req.params.userId}, {$set: {firstName: req.body.attrEdit}});
      db.close();
      resp.redirect('/accountEdit?' + req.params.userId);
    });
});

router.get('/editUserName', function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        //console.log(results);
        db.collection('pubChatForums').find({chatNum: 0}).toArray(function(err, forums){
          db.close();
          //console.log(forums);
          var forum = forums[0].Politics.map(function(comment) {
            return {comment: comment}
          })
          resp.render('editPages/editUserName', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.post('/editUserName', function(req, resp, next){
    console.log( 'User Id is: ' + req.params.userId);
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').update({_id:req.params.userId}, {$set: {firstName: req.body.attrEdit}});
      db.close();
      resp.redirect('/accountEdit?' + req.params.userId);
    });
});

router.get('/editPassword', function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        //console.log(results);
        db.collection('pubChatForums').find({chatNum: 0}).toArray(function(err, forums){
          db.close();
          //console.log(forums);
          var forum = forums[0].Politics.map(function(comment) {
            return {comment: comment}
          })
          resp.render('editPages/editPassword', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.post('/editPassword', function(req, resp, next){
    console.log( 'User Id is: ' + req.params.userId);
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').update({_id:req.params.userId}, {$set: {firstName: req.body.attrEdit}});
      db.close();
      resp.redirect('/accountEdit?' + req.params.userId);
    });
});

router.get('/editEmail', function(req, resp, next){
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').find({_id: objectId(req.query.userId)}).toArray(function(err, results){
        var member = results[0];
        //console.log(results);
        db.collection('pubChatForums').find({chatNum: 0}).toArray(function(err, forums){
          db.close();
          //console.log(forums);
          var forum = forums[0].Politics.map(function(comment) {
            return {comment: comment}
          })
          resp.render('editPages/editEmail', {memberUse: member, Forum: forum, title: 'FenixChat.com'});
        });
      });
    });
});

router.post('/editEmail', function(req, resp, next){
    console.log( 'User Id is: ' + req.params.userId);
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('members').update({_id:req.params.userId}, {$set: {firstName: req.body.attrEdit}});
      db.close();
      resp.redirect('/accountEdit?' + req.params.userId);
    });
});

router.get('/signOut', function(req, resp, next){
  resp.render('login', {title: 'FenixChat.com', notifier: 'You have successfully logged out!'})
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
            console.log(result[0]);
            },function(){
                db.close();
                if(result[0] !== undefined){
                  if(result[0].userName === req.body.userNameEntry && result[0].password === req.body.passWordEntry){
                    resp.render('memLogin', {memberUse: result[0], title: 'FenixChat.com'});
                  } else {
                      resp.render('login', {notifier: 'Username or password was incorrect. Please try again!', title: 'FenixChat.com'});
                    }
                } else {
                    //alert('Username and Password, not found!');
                    resp.render('login', {notifier: 'Username or password was incorrect. Please try again!', title: 'FenixChat.com'});
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
      db.collection('pubChatForums').update({chatNum:0}, {$push: {Politics: req.body.instMess}});
      db.close();
      resp.redirect('/politics?' + req.params.userId);
    });
});

router.post('/religion/:userId',function(req, resp, next){
    var result = [];
    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('pubChatForums').update({chatNum:1}, {$push: {Religion: req.body.instMess}});
      db.close();
      resp.redirect('/religion?' + req.params.userId);
    });
});

router.post('/sports/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('pubChatForums').update({chatNum:2}, {$push: {Sports: req.body.instMess}});
      db.close();
      resp.redirect('/sports?' + req.params.userId);
    });
});

router.post('/technology/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('pubChatForums').update({chatNum:3}, {$push: {Technology: req.body.instMess}});
      db.close();
      resp.redirect('/technology?' + req.params.userId);
    });
});

router.post('/consoleGaming/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('pubChatForums').update({chatNum:4}, {$push: {ConsoleGaming: req.body.instMess}});
      db.close();
      resp.redirect('/consoleGaming?' + req.params.userId);
    });
});

router.post('/trollnWarRoom/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('pubChatForums').update({chatNum:5}, {$push: {TrollnWarRoom: req.body.instMess}});
      db.close();
      resp.redirect('/trollnWarRoom?' + req.params.userId);
    });
});

router.post('/dailyQuery/:userId',function(req, resp, next){
    var result = [];

    mongo.connect(url, function(err, db){
      assert.equal(null, err);
      db.collection('pubChatForums').update({chatNum:6}, {$push: {DailyQuery: req.body.instMess}});
      db.close();
      resp.redirect('/dailyQuery?' + req.params.userId);
    });
});

// DELETE Data
router.post('/delProfile', function(req, resp, next){
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    db.collection('members').remove({userName: req.body.deleteBtn});
    db.close();
  resp.render('login', {notifier: 'Account deleted', title: 'FenixChat.com'});
  });
});
module.exports = router;
