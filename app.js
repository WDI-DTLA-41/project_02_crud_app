var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var handleBars = require('express-handlebars');
var favicon = require('serve-favicon');

var routes = require('./routes/index');
var app = express();

app.engine('hbs', handleBars({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'hbs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('You are listening to ' + port);
});
