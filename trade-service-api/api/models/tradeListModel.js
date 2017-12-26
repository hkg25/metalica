'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const nextTradeIdSequence  = require('../db/tradeIdGenerator');  

var TradeSchema = new Schema({
  id: {
    type: Number,
    index: true,
    unique: true
  },
  qty: {
    type: Number,
    required: 'Please enter the quantity of the trade'
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
    required: 'Please enter the side of the trade'
  },
  commodity: {
    type: String,
    required: 'Please enter the commodity of the trade',
    trim: true,
    minlength: 2,
    uppercase: true
  },
  counterparty: {
    type: String,
    required: 'Please enter the counterparty of the trade',
    trim: true,
    minlength: 2,
    uppercase: true
  },
  location: {
    type: String,
    required: 'Please enter the location of the trade',
    trim: true,
    minlength: 2,
    uppercase: true
  },
  price: {
    type: Number,
    required: 'Please enter the price of the trade'
  }
})

var Counter = mongoose.model('Counter')

TradeSchema.pre('save', function (next) {
  var doc = this
  nextTradeIdSequence(function(nextId) {
    doc.id = nextId;
    next();
  });
})

module.exports = mongoose.model('Trades', TradeSchema)
