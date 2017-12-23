const marketDataService = require('../services/market-data-service')

module.exports = function (app) {
  app.route('/market-data')
    .get(marketDataService.list_all_market_data)

  app.route('/market-data/:commodity')
    .get(marketDataService.read_commodity_market_data)

  app.route('/market-data')
    .post(marketDataService.save_market_data)

  app.route('/market-data/:commodity')
    .delete(marketDataService.delete_market_data)

  app.route('/market-data/:commodity')
    .put(marketDataService.update_market_data)
}
