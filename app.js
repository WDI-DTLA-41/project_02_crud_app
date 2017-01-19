var express = require('express');
var path = require('path');
var morgan = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var routes = require('./routes/index');

var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);


app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(favicon(__dirname + '/public/favicon3.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/public')));

// io.on('connection', function(client){
//  console.log('a user connected');
// });

app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("Up and Running! on port: " + port);
});

 module.exports = app;
