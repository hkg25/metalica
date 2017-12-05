'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TradeSchema = new Schema({
  qty: {
    type: Number,
    required: 'Kindly enter the qty of the trade'
  },
  trade_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['Open', 'Nominated']
    }],
    default: ['Open']
  },
  side: {
    type: [{
      type: String,
      enum: ['BUY', 'SELL']
    }],
    required:true
  },
});

module.exports = mongoose.model('Trades', TradeSchema);
