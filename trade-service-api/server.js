require('./config/config');
var express = require('express'),
  app = express(),

  mongoose = require('mongoose'),
  Trade = require('./api/models/tradeListModel'),  
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/tradeListRoutes'); 
routes(app);

app.listen(process.env.PORT, () =>{  
  console.log('trade list RESTful API server started on: ' + process.env.PORT);
});

