var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var marketDataSchema = new Schema({
    maxPrice : {
      type : Number,
      required : true
    },
    minPrice : {
      type : Number,
      required : true
    },
    avgPrice : {
      type : Number,
      required : true
    },
    commodity : {
      type : String,
      required : true,
      minlength : 2,
      trim : true,
      uppercase : true
    },

  });

  const MarketData = mongoose.model("MarketData",marketDataSchema);
  
  module.exports = {MarketData};