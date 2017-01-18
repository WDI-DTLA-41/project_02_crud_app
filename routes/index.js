var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/Project';

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Stuff and more Stuff'});
});

router.post('/', function(req, res, next) {
  var logPost = {
    critter: request.body.critter,
    header: request.body.header,
    content: request.body.content
  };
  mongo.connect(url, function(err, db) {
    asser.equal(null, err);
    db.collection('blog').insert(item, function(err, db) {
      assert.equal(null, err);
      consoe.log('Posted');
      db.close();
    });
  });
  res.redirect('/');
})

module.exports = router;
