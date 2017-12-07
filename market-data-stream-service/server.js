require('./config/config');
const app = require('express')();
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const request = require('superagent');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
require('./model/market-data');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/market-data-route'); 
routes(app);

app.listen(process.env.PORT, () =>{  
  console.log(`Market Data service is running on ${process.env.PORT}`);
  const announce = () => {
    request.put(`${process.env.SERVICE_REGISTRY_ENDPOINT}/marketService/${process.env.PORT}`, (err, response) =>{
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