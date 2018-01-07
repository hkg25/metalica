'use strict'
module.exports = function (app) {
  var tradeList = require('../controllers/tradeListController')

  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.all("*",function(req,res,next){
    //console.log(req);
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("trade service token is : " + token);
      // decode token
      if (token) {
        next();
      } else {
        return res.status(403).send({ 
            success: false, 
            message: 'Authorization failed !!! Token is missing in headers' 
        });
    
      }
  });
  
  // tradeList Routes
  app.route('/trades').get(tradeList.list_all_trades).post(tradeList.create_a_trade)

  app.route('/trades/:tradeId').get(tradeList.read_a_trade).put(tradeList.update_a_trade).delete(tradeList.delete_a_trade)
}
