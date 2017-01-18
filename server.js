var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';
var assert = require('assert');
var app = express();
var morgan = require('morgan');

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
  mongo.connect(url, function(err, db) {
    if (err) return db(err);
    db.collection('posts').find({}).toArray(function(err, docs) {
      // var teams = docs[0].message;
      var html = '<ul>'
      // console.log(teams);
      docs.forEach(function(team) {
        html += "<a href='" + "/teams/" + team.message + "'>" + "<li>" + team.message + "</li>" + "</a>";
      })
      html += "</ul>"
      db.close();
      res.send(html);
    });
  });
});

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

app.get('/teams/:teamName', function(req, res) {

  res.send(req.params.teamName)

  // mongo.connect(url, function(err, db) {
  //   var name = req.params.teamName;
  //   var html;

  //   var findDocuments = function(db, callback) {
  //     var collection = db.collection('posts');
  //     collection.find({teams: teamName}).toArray(function(err, docs) {
  //       assert.equal(err, null);
  //       console.log(name)
  //       console.log("found the following, ", docs)
  //       html = docs[0].message;
  //       callback(docs);
  //     });
  //   }
  //   findDocuments(db, function() {
  //     db.close();
  //     res.send(html + " <a href='/schedule'>Schedule</a>");
  //   })
  // })
  })

// POST /posts
app.post('/posts', function(req, res) {
  var post = {
    teams: req.body.teams
  };

  mongo.connect(url, function(err, db) {
    db.collection('posts').insertOne(post, function(err, result) {
      db.close();
      res.send(result);
    });
  })
});

// //FIND AND UPDATE WIP
// app.post('/posts', function(req, res) {
//   var post = {
//     message: req.body.message
//   };
//   mongo.connect(url, function(err, db) {
//     db.collection('posts').insertOne(post, function(err, result) {
//       db.close();
//       res.json(result);
//     });
//   })
// });

//Run Server

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
