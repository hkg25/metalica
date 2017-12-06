var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var marketDataSchema = new Schema({
    
  });

  const MarketData = mongoose.model("MarketData",marketDataSchema);
  
  module.exports = {MarketData};