//variables & installation
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
//turns db into json and displayed on /posts
app.get('/posts', function(req, res) {
  mongo.connect(url, function(err, db) {
    if (err) return db(err);
    db.collection('posts').find({}).toArray(function(err, docs) {
      db.close();
      res.json({posts: docs});
    });
  });
});

//redirects to /teams.html
app.get('/teams', function(req, res) {
  res.redirect('/teams.html')
})

//reads db and creates table based off of teams and rosters
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

//reads db and shows the results on html page for teams
app.get('/results', function(req, res) {
  mongo.connect(url, function(err, db) {
    if (err) return db(err);
    db.collection('posts').find({}).toArray(function(err, docs) {
      var html = '<ul>'
    // console.log(teams);
      docs.forEach(function(team) {
        html += "<li>" +team.name + ' results: ' + '(No matches played)' + "</li>";
      })
      html += "</ul>"
      db.close();
      res.send(html);
    });
  });
});

//reads db and shows the teams' calendar schedule
app.get('/schedule', function(req, res) {
  mongo.connect(url, function(err, db) {
    if (err) return db(err);
    db.collection('posts').find({}).toArray(function(err, docs) {
      var html = '<ul>'
      var teams = docs[0]
       docs.forEach(function(team) {
        html += '<li>' + team.name + " Schedules: " +'("team.schedule" not defined yet, try back later!)' + '</li>';
      })
      html += "</ul>"
      res.send(html);
    });
  });
});

//reads db and finds teams with the same name as clicked/searched and returns all data associated with
app.get('/teams/:name', function(req, res) {
  var name = req.params.name;
  var html;
  var id;

  var findDocuments = function(db, callback) {
    var collection = db.collection('posts');
    collection.find({'name': name}).toArray(function(err, docs) {
      assert.equal(err, null);
      html = docs;
      // id = docs[0]._id
      callback(docs);
    });
  }

  mongo.connect(url, function(err, db) {
    assert.equal(err, null);

    findDocuments(db, function() {
      db.close();
      res.send(html)
    })
  })
  })

// POST /posts

//post request adds input to the database using insertOne and storing the id into an object variable
app.post('/posts', function(req, res) {
  console.log(req.body);
  var post = {
    name: req.body.name,
    roster: req.body.roster
  };

  mongo.connect(url, function(err, db) {
    db.collection('posts').insertOne(post, function(err, result) {
      post.id = result.ops['0']._id;
      db.close();
      res.json( {status: 200, id: post.id} );
    });
  })
});

//post request connects to db and deletes document with matching team name
app.post('/posts/delete', function(req, res) {
  console.log(req.body);
  var query = req.body.name;
  function removeDocument (db, callback) {
  db.collection('posts').deleteOne({'name': query}, function(err, result) {
  assert.equal(err, null);
    console.log("Removed team", query);
    callback(result)
    })
  }

  mongo.connect(url, function(err, db) {
    assert.equal(err, null);
    removeDocument(db,function() {
    db.close();
    });
  })
});

//connects to db and updates document by searching for matching object id
app.post('/posts/edit', function (req, res) {
  console.log('about to edit...')
  console.log('req.body: ', req.body)
  var name = req.body.name;
  var roster = req.body.roster;
  var obj = {};
  obj.name = name;
  obj.roster = roster;
  obj.id = req.body.id;

  function updateDocument (db, callback) {
    db.collection('posts').updateOne({_id: objectId(obj.id)}, { $set: {'roster': roster, 'name': name} }, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n)
      callback(result);
    });
  }

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    updateDocument(db, function() {
      db.close();
    })
  })

})

//Run Server
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
