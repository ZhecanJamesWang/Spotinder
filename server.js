
var mongoose = require('mongoose'); 
var express = require('express');

var routes = require('./routes/routes');
var app = express();

var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var mongoURI = process.env.PROD_MONGODB || "mongodb://localhost/test";
console.log(mongoURI)
mongoose.connect(mongoURI);


// configuration
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//routes 
app.get('/', function(req, res){
    res.sendfile('public/views/index.html');
});

// app.get('/api/home', routes.home);
// app.get('/api/header/:title', routes.loadPageGET);
// app.post('/api/header/:title', routes.updateWikiPOST);
// app.post('/api/createNew', routes.saveNewWikiPOST);





var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());


app.get('/login', routes.login);

app.get('/callback', routes.callback);

app.get('/refresh_token', routes.refresh_token);

// AngularJS requests
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

// app.get('*', routes.catchAnything);

var PORT = process.env.PORT || 8888;
    app.listen(PORT, function() {
      console.log("Application running on port: ", PORT);
});