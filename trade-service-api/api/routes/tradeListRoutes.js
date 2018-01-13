'use strict'
var jwtCheck = require('../auth/jwtCheck')

module.exports = function (app) {
  var tradeList = require('../controllers/tradeListController')
  var jwtCheck = require('../auth/jwtCheck')
  if(process.env !== "test"){
    app.all('*', jwtCheck)  
  }
  
  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization,authorization')
    next();
  })

  // tradeList Routes
  app.route('/trades').get(tradeList.list_all_trades).post(tradeList.create_a_trade)

  app.route('/trades/:tradeId').get(tradeList.read_a_trade).put(tradeList.update_a_trade).delete(tradeList.delete_a_trade)
}
