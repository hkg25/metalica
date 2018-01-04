'use strict'

var mongoose = require('mongoose'),
  Trade = mongoose.model('Trades'),
  Publisher = require('../../events_producer/producer')

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
    var publisher = new Publisher(JSON.stringify({obj: trade, op: 'Create', source: 'Trade Service',msg: 'A new trade has been created!'}))
    publisher.publish()
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
    var publisher = new Publisher(JSON.stringify({obj: trade, op: 'Update', source: 'Trade Service',msg: 'A trade has been updated!'}))
    publisher.publish()
    res.send(trade)
  })
}

exports.delete_a_trade = function (req, res) {
  Trade.findByIdAndRemove(req.params.tradeId, function (err, trade) {
    if (err)
      return res.status(400).send(err)
    if (!trade)
      return res.status(404).send()

    var publisher = new Publisher(JSON.stringify({obj: trade, op: 'Delete', source: 'Trade Service',msg: 'A trade has been deleted!'}))
    publisher.publish()
    res.send(trade)
  })
}
