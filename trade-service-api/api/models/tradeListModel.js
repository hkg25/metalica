'use strict'
const mongoose = require('mongoose'),
  Schema = mongoose.Schema

var TradeSchema = new Schema({
  _id: {
    type: Number,
    index: true,
    unique: true
  },
  quantity: {
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
  commodity_code: {
    type: String,
    required: 'Please enter the commodity_code of the trade',
    trim: true,
    minlength: 2,
    uppercase: true
  },
  counterparty_code: {
    type: String,
    required: 'Please enter the counterparty_code of the trade',
    trim: true,
    minlength: 2,
    uppercase: true
  },
  location_code: {
    type: String,
    required: 'Please enter the location_code of the trade',
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
  Counter.findByIdAndUpdate({_id: 'tradeSeqId'}, {$inc: {seq: 1}}, {new: true}, (error, updatedCounter) => {
    if (error) return next(error)
    doc._id = updatedCounter.seq
    next()
  })
})

module.exports = mongoose.model('Trades', TradeSchema)
