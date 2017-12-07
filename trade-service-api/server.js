require('./config/config');
const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  Trade = require('./api/models/tradeListModel'),  
  bodyParser = require('body-parser'),
  request = require('superagent');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/tradeListRoutes'); 
routes(app);

app.listen(process.env.PORT, () =>{  
  console.log('trade list RESTful API server started on: ' + process.env.PORT); 
  const announce = () => {
    request.put(`${process.env.SERVICE_REGISTRY_ENDPOINT}/tradeService/${process.env.PORT}`, (err, response) =>{
      if(err){
        console.log(err);
        console.log(`Error connecting to registry ${process.env.SERVICE_REGISTRY_ENDPOINT}`);
        return;
      }
      console.log(response);
    });
  }

  announce();
  setInterval(announce, 15*1000);
});

