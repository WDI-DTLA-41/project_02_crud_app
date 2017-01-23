var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = process.env.MONGODB_URI|| 'mongodb://localhost:27017/chatRoom';

mongo.connect(url, function(err, db){
  assert.equal(null, err);
  db.collection('pubChatForums').remove({}, function(err, results){
    assert.equal(null, err);
    console.log("Creating forums");
    db.collection('pubChatForums').insert({'Politics': [''], chatNum: 0}, function(err, result){});
    db.collection('pubChatForums').insert({'Religion': [''], chatNum: 1}, function(err, result){});
    db.collection('pubChatForums').insert({'Sports': [''], chatNum: 2}, function(err, result){});
    db.collection('pubChatForums').insert({'Technology': [''], chatNum: 3}, function(err, result){});
    db.collection('pubChatForums').insert({'ConsoleGaming': [''], chatNum: 4}, function(err, result){});
    db.collection('pubChatForums').insert({'TrollnWarRoom': [''], chatNum: 5}, function(err, result){});
    db.collection('pubChatForums').insert({'DailyQuery': [''], chatNum: 6}, function(err, result){});
    db.close();
  })
});
