var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';
var assert = require('assert');
var app = express();
var morgan = require('morgan');
var handlebars = require('handlebars');
var objectId = require('mongodb').ObjectID;

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(morgan('dev'));

// Routes

// GET '/posts'
app.get('/posts', function(req, res) {
  mongo.connect(url, function(err, db) {
    if (err) return db(err);
    db.collection('posts').find({}).toArray(function(err, docs) {
      db.close();
      res.json({posts: docs});
    });
  });
});

app.get('/teams', function(req, res) {
  res.redirect('/teams.html')
})

app.get('/roster', function(req, res) {
  mongo.connect(url, function(err, db) {
    if (err) return db(err);
    db.collection('posts').find({}).toArray(function(err, docs) {
      var html = '<ul>'
    // console.log(teams);
      docs.forEach(function(team) {
        html += "<li>" +team.message + ' roster: ' + team.roster + "</li>";
    })
      html += "</ul>"
      db.close();
      res.send(html);
    });
  });
});

app.get('/results', function(req, res) {
  mongo.connect(url, function(err, db) {
    if (err) return db(err);
    db.collection('posts').find({}).toArray(function(err, docs) {
      var html = '<ul>'
    // console.log(teams);
      docs.forEach(function(team) {
        html += "<li>" +team.message + ' results: ' + team.results + "</li>";
      })
      html += "</ul>"
      db.close();
      res.send(html);
    });
  });
});

app.get('/schedule', function(req, res) {
  mongo.connect(url, function(err, db) {
    if (err) return db(err);
    db.collection('posts').find({}).toArray(function(err, docs) {
      var html = '<ul>'
      var teams = docs[0]
      console.log(docs[0].schedule)
       docs.forEach(function(team) {
        html += '<li>' + team.message + " Schedules: " + team.schedule + '</li>';
      })
      html += "</ul>"
      res.send(html);
    });
  });
});

app.get('/teams/:name', function(req, res) {
  var name = req.params.name;
  var html;
  var id;

  var findDocuments = function(db, callback) {
    var collection = db.collection('posts');
    collection.find({'name': name}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("found the following, ", docs)
      html = docs;
      // id = docs[0]._id
      callback(docs);
    });
  }

  mongo.connect(url, function(err, db) {
    assert.equal(err, null);

    findDocuments(db, function() {
      db.close();
      console.log(id)
      res.send(html)
    })
  })
  })

// POST /posts

// app.post('/posts/id', function(req, res) {
//   mongo.connect(url, function(err, db) {

//   })
// })

app.post('/posts', function(req, res) {
  console.log(req.body);
  var post = {
    name: req.body.name,
    roster: req.body.roster
  };

  mongo.connect(url, function(err, db) {
    db.collection('posts').insertOne(post, function(err, result) {
      post.id = result.ops['0']._id;
      console.log(post)
      db.close();
      res.json( {status: 200, id: post.id} );
    });
  })
});

app.post('/posts/delete', function(req, res) {
  console.log(req.body);
  var query = req.body.name;
  function removeDocument (db, callback) {
  db.collection('posts').deleteOne({'name': query}, function(err, result) {
  assert.equal(err, null);
    // assert.equal(1, result.result.n)
    console.log("Removed team", query);
    callback(result)
    })
  }

  mongo.connect(url, function(err, db) {
    assert.equal(err, null);
    console.log("Success, trying post delete request");
    removeDocument(db,function() {
      //res.render('index', {data: teams})
    db.close();
    });
  })
});

app.post('/posts/edit', function (req, res) {
  console.log('about to edit...')
  console.log('req.body: ', req.body)
  var name = req.body.name;
  var roster = req.body.roster;
  var obj = {};
  obj.name = name;
  obj.roster = roster;

    var findDocuments = function(db, callback) {
    var collection = db.collection('posts');
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("found the following, ", docs)
      html = docs;
      // id = docs[0]._id
      callback(docs);
    });
  }

  function updateDocument (db, callback) {
    db.collection('posts').updateOne({'name': name}, { $set: {'roster': roster} }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n)
      callback(result);
    });
  }

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Server open, now editing...');
    findDocuments(db, function() {
      db.close();
    })
    updateDocument(db, function() {
      console.log('all done closing server!')
      db.close();
    })
  })

})

//Run Server

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
