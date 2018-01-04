
var amqp = require('amqplib/callback_api');
var url = process.env.BROKER_URL || 'amqp://guest:guest@localhost';

var isConnecting = false;

function start(whenConnected) {

  if (isConnecting) {
    return;
  }

  isConnecting=true;
  amqp.connect(url + '?heartbeat=60' , function(err, conn) {

    if (err) {
      isConnecting = false;
      console.error("[AMQP] error", err.message);
      return setTimeout(start, 2000);
    }
    conn.on("error", function(err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    conn.on("close", function() {
      isConnecting = false;
      console.error("[AMQP] reconnecting");
      return setTimeout(start, 2000);
    });

    console.log("[AMQP] connected");
    whenConnected(conn);
  });
}



module.exports= {
  startMq : start,
}
