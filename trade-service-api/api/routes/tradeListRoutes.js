'use strict';
module.exports = function(app) {
  var tradeList = require('../controllers/tradeListController');

  // tradeList Routes
  app.route('/api/trades').get(tradeList.list_all_trades).post(tradeList.create_a_trade);


  app.route('/api/trades/:tradeId').get(tradeList.read_a_trade).put(tradeList.update_a_trade).delete(tradeList.delete_a_trade);
};
