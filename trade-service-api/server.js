var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,

  mongoose = require('mongoose'),
  Trade = require('./api/models/tradeListModel'), //created model loading here
  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Tradedb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/tradeListRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('trade list RESTful API server started on: ' + port);
