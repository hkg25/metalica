require('./config/config');
const app = require('express')();
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/market-data-route'); 
routes(app);

app.listen(process.env.PORT, () =>{  
  console.log(`Market Data service is running on ${process.env.PORT}`);
});