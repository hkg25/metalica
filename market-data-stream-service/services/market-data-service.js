const mongoose = require('mongoose'),
MarketData = require("../model/market-data");


var list_all_market_data = (req,res) =>{
    MarketData.find({}, function(err, marketData) {
        if (err)
          res.send(err);
        res.json({marketData});
      });
};

var read_commodity_market_data = (req,res) =>{
    MarketData.find(req.params.commodity, function(err, marketData) {
        if (err)
          res.send(err);
        res.json(marketData);
      });
};

var save_market_data = (req,res) =>{
    var marketData = new MarketData(req.body);
    marketData.save(function(err, marketDataObj) {
      if (err)
        res.send(err);
      res.json(marketDataObj);
    });
};

var delete_market_data = () =>{
    MarketData.remove({
        commodity: req.params.commodity
      }, function(err, marketData) {
        if (err)
          res.send(err);
        res.json({ message: `Market Data for commodity ${req.params.commodity} successfully deleted`});
      });
}

var update_market_data = () =>{
    MarketData.findOneAndUpdate({commodity: req.params.commodity}, req.body, {new: true}, function(err, marketData) {
        if (err)
          res.send(err);
        res.json(marketData);
      });
}


module.exports = {
    list_all_market_data,
    read_commodity_market_data,
    save_market_data,
    delete_market_data,
    update_market_data
};