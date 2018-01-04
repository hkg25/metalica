'use strict'

var mongoose = require('mongoose'),
  Trade = mongoose.model('Trades')

const {startMq, publish} = require('../../rabbit-mq/amqb-callback')

startMq()

exports.list_all_trades = function (req, res) {
  Trade.find({}, function (err, trades) {
    if (err)
      return res.status(500).send(err)
    res.send({trades})
  })
}

exports.create_a_trade = function (req, res) {
  var new_trade = new Trade(req.body)
  new_trade.save(function (err, trade) {
    if (err)
      return res.status(400).send(err)
    publish('new.trades.queue', new Buffer(JSON.stringify(trade)))
    res.send(trade)
  })
}

exports.read_a_trade = function (req, res) {
  Trade.findById(req.params.tradeId, function (err, trade) {
    if (err)
      return res.status(400).send(err)
    if (!trade)
      return res.status(404).send()
    res.send(trade)
  })
}

exports.update_a_trade = function (req, res) {
  Trade.findByIdAndUpdate(req.params.tradeId, {$set: req.body}, {new: true}, function (err, trade) {
    if (err)
      return res.status(400).send(err)
    if (!trade)
      return res.status(404).send()
    publish('updated.trades.queue', new Buffer(JSON.stringify(trade)))
    res.send(trade)
  })
}

exports.delete_a_trade = function (req, res) {
  Trade.findByIdAndRemove(req.params.tradeId, function (err, trade) {
    if (err)
      return res.status(400).send(err)
    if (!trade)
      return res.status(404).send()

    publish('deleted.trades.queue', new Buffer(JSON.stringify(trade)))
    res.send(trade)
  })
}
