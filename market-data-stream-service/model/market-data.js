var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var marketDataSchema = new Schema({
    price : {
      type : Number,
      required : true
    },
    commodity : {
      type : String,
      required : true,
      minlength : 2,
      trim : true
    }

  });

 module.exports = mongoose.model("MarketData",marketDataSchema);