var {startMq} = require('./amqb-callback');
var startWorker = require('./amqb-worker');
var configurations = require('./configuration');


function whenConnected(conn) {
  configurations.forEach((configuration) => {
    startWorker(configuration, conn);
  });
}

module.exports= {
  startMq : startMq,
  whenConnected : whenConnected
}
