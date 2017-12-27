const {startMq, publish} = require('./rabbit-mq/amqb-callback');
const refDataLoader = require('./ref-data-loader/refDataLoader');

const moment = require('moment');
const randomNumber = require('random-number');

var options = {
  min:  100,
  max:  1000,
  integer: true
}

startMq();

function startPushingMarketData() {
  refDataLoader()
  .then((commodities) => {
    commodities.commodities.forEach((commodity) => {
      setTimeout(() => {
        pushCommodityPrice(commodity.code);
      }, 5000);
    })
  })
  .catch((err) => {
    console.log("Error, could not push market data");
  });
}

function pushCommodityPrice(commodity) {
  var obj = {code:commodity, price:randomNumber(options), tradingDay: moment().format('YYYY-MM-DD'), timestamp: moment().format('HH:mm:ss')};
  console.log('Published ' + JSON.stringify(obj));
  publish('market.data', new Buffer(JSON.stringify(obj)));
}

module.exports = startPushingMarketData;
