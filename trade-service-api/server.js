require('./config/config');
const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  Trade = require('./api/models/tradeListModel'),  
  bodyParser = require('body-parser'),
  request = require('superagent');


const props = process.env;
mongoose.Promise = global.Promise;
mongoose.connect(props.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/tradeListRoutes'); 
routes(app);

app.listen(props.PORT, () =>{  
  console.log('Trade service api server started on: ' + props.PORT); 
  const announce = () => {
    request.put(`${props.SERVICE_REGISTRY_ENDPOINT}/${props.INTENT}/${props.PORT}`, (err, response) =>{
      if(err)
        return console.log(`Error connecting to registry service ${props.SERVICE_REGISTRY_ENDPOINT} !`);
      console.log(JSON.stringify(response.body.result));
    });
  }
  announce();
  setInterval(announce, 25*1000);
});

