var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/Project';

router.get('/', function(req, res, next) {
  res.render('index', {title: 'The Wall Listens'});
});

router.get('/about', function(req, res, next) {
  res.render('about', {title: 'The Wall'})
});

router.get('/posts', function(req, res, next) {
  res.render('posts', {title: 'What Written On The Wall'})
});


// Creates
router.post('/insert', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
      db.collection('data').insertOne({'name':req.body.name, 'comment':req.body.comment, 'date':new Date()}, function(err, db) {
      assert.equal(null, err);
      console.log('Comment Added');
    });
      db.close();
  });
    res.redirect('/wall');
});

// Reads
router.get('/wall', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('data').find().toArray(function(err, results){
      assert.equal(null, err);
      res.render('posts', {posts: results});
    });
  });
});

// delete
router.post('/posts/:delete/delete', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    var id = req.body.delete;
    assert.equal(null, err);
    db.collection('data').deleteOne({'_id': ObjectId(id)}, function(err, res) {
      assert.equal(null, err);
    });
    db.close();
    res.redirect('/wall');
  });
});

// Update
router.post('/posts/:change/change', function(req, res, next) {
  mongo.connect(url, function(err, db) {
    var id = req.body.change;
    assert.equal(null, err);
    db.collection('data').update({'_id': ObjectId(id)},
     {'name': req.body.name, 'comment': req.body.comment, 'date': new Date()}), function(req, res) {
      assert.equal(null, err);
    }
    db.close();
    res.redirect('/wall');
  });
});

module.exports = router
