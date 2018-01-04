var configurationForTrades = {
  exchangeName : 'tradesExchange',
  queueNames : [
    'deleted.trades.queue',
    'new.trades.queue',
    'updated.trades.queue'
  ]
}

var configurationForMarketData = {
  exchangeName : 'marketDataExchange',
  queueNames : [
    'market.data'
  ]
}

var configurations = [configurationForTrades, configurationForMarketData];
module.exports = configurations;
