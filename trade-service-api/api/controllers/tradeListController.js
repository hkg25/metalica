'use strict';

var mongoose = require('mongoose'),
  Trade = mongoose.model('Trades');

const {startMq, publish} = require('../../rabbit-mq/amqb-callback');  

startMq();

exports.list_all_trades = function(req, res) {
  Trade.find({}, function(err, trades) {
    if (err)
      res.send(err);
    res.send({trades});
  });
};

exports.create_a_trade = function(req, res) {
  var new_trade = new Trade(req.body);
  new_trade.save(function(err, trade) {
    if (err)
      res.send(err);
    publish('new.trades.queue', new Buffer(JSON.stringify(trade)));      
    res.send(trade);
  });
};

exports.read_a_trade = function(req, res) {
  Trade.findById(req.params.tradeId, function(err, trade) {
    if (err)
      res.send(err);
    res.send(trade);
  });
};

exports.update_a_trade = function(req, res) {
  Trade.findOneAndUpdate({id: req.params.tradeId}, req.body, {new: true}, function(err, trade) {
    if (err)
      res.send(err);
    publish('updated.trades.queue', new Buffer(JSON.stringify(trade)));
    res.send(trade);
  });
};

exports.delete_a_trade = function(req, res) {
  Trade.remove({
    id: req.params.tradeId
  }, function(err, trade) {
    if (err)
      res.send(err);

    publish('deleted.trades.queue', new Buffer(JSON.stringify(trade)));   
    res.send({ message: 'Trade successfully deleted' });
  });
};