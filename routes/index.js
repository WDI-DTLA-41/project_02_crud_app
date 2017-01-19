var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/Project';

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Stuff and more Stuff'});
});

router.get('/about', function(req, res, next) {
  res.render('about', {title: 'What this Stuff is About'})
});

router.get('/posts', function(req, res, next) {
  res.render('posts', {title: 'What We Whisper About'})
});


// Creates
router.post('/insert', function(req, res, next) {
  var post = {
    name: req.body.name,
    comment: req.body.comment
  };
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('data').insertOne(post, function(err, db) {
      assert.equal(null, err);
      console.log('Comment Added');
    });
      db.close();
  });
    res.redirect('/');
});

router.get('/stff', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('data').find().toArray(function(err, results){
      assert.equal(null, err);
      res.render('posts', {posts: results});
    })
  })
})

router.post('/posts/:delete/delete', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    var id = req.body.delete;
    assert.equal(null, err);
    db.collection('data').deleteOne({'_id': ObjectId(id)}, function(err, res) {
      assert.equal(null, err);
      // db.close();
    });
  db.close();
  res.redirect('/stff');
});
})

router.post('/posts/:change/change', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    // var newPost = {
    //   name: req.body.name,
    //   comment: req.body.comment,
    // }
    var name = req.body.name;
    var comment = req.body.comment;
    var id = req.body.change;
    assert.equal(null, err);
    db.collection('data').update({'_id': ObjectId(id)},
     {'name': name, 'comment': comment}), function(req, res) {
      assert.equal(null, err);
    }
    db.close();
    res.redirect('/stff')
  })
})

// router.get('/input', function(req, res, next) {
//    var post = {
//     name: req.body.name,
//     comment: req.body.comment
//   };
//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     db.collection('data').insertOne(post, function(err, db) {
//       assert.equal(null, err);
//       console.log('Comment Added');
//     });
//     var newData = db.collection('data').find().toArray(function(err, results){
//       assert.equal(null, err);
//         res.render('index', {posts: results});
//     })
//         db.close();
//   });
// })

// });

// router.post('/posts/:delete/delete', function(req, res, next) {
//   mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     db.collection('data').deleteOne({'name': null}, function(err, res) {
//       assert.equal(null, err);
//   })
//     db.close();
//   })
//   res.redirect('/posts');
// })

module.exports = router
