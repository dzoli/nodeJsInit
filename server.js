var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var Task = require('./api/models/todoListModel'); // created model loading here
var bodyParser = require('body-parser');

// mongoose instnace connection url
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); //importing rout
routes(app);

// exptess middleware is like interceptor it is useful for authentication or validation rules
// int this case  helps to redirect and respond whenever a wrong route is entered on the site.
// Passed callback function is middleware function *(interceptor) in this case it handle all 404 status requests.
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);