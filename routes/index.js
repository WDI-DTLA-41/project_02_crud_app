var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/Project';

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Stuff and more Stuff'});
});

// Creates
router.post('/chat', function(req, res, next) {
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
    var log = [];
    var newData = db.collection('data').find()
    newData.forEach(function(doc) {
      log.push(doc);
    }, function() {
        res.render('index', {posts: log})
        db.close();
    })
  });
});

router.post('/')


module.exports = router;
