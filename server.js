var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/sandbox';
var assert = require('assert');
var app = express();

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Routes

// GET '/posts'
app.get('/posts', function(req, res) {
  mongo.connect(url, function(err, db) {
    db.collection('posts').find({}).toArray(function(err, docs) {
      db.close();
      res.json({posts: docs});
    });
  });
});

app.get('/teams', function(req, res) {
  mongo.connect(url, function(err, db) {
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
    db.collection('posts').find({}).toArray(function(err, docs) {
      var html = '<ul>'
      var teams = docs[0]
      console.log(docs[0].schedule)
       docs.forEach(function(team) {
        html += '<li>' + team.message + " Schedules: " + team.schedule + '</li>';
      })
      html += "</ul>"
      res.send(html);
    })
  })
})

app.get('/teams/:name', function(req, res) {
  mongo.connect(url, function(err, db) {
    var name = req.params.name;
    var html;

    var findDocuments = function(db, callback) {
      var collection = db.collection('posts');
      collection.find({message: name}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log(name)
        console.log("found the following, ", docs)
        html = docs[0].message;
        callback(docs);
      });
    }
    findDocuments(db, function() {
      db.close();
      res.send(html + " <a href='/schedule'>Schedule</a>");
    })
    })
  })



// app.get('/schedule', function(req, res) {
//   mongo.connect(url, function(err, db) {
//     db.collection('schedule').find({}).toArray(function(err, docs) {
//       db.close();
//       res.json({schedule: docs})
//     })
//   })
// })

// POST /posts
app.post('/posts', function(req, res) {
  var post = {
    message: req.body.message
  };
  mongo.connect(url, function(err, db) {
    db.collection('posts').insertOne(post, function(err, result) {
      db.close();
      res.json(result);
    });
  })
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
