var amqp = require('amqplib/callback_api');
var url = process.env.CLOUDAMQP_URL || 'amqp://guest:guest@localhost';

var amqpConn = null;
function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}
var isConnecting = false;
function start() {
  if (isConnecting) {
    return;
  }
  isConnecting=true;
  amqp.connect(url + '?heartbeat=60' , function(err, conn) {
    if (err) {
      isConnecting = false;
      console.error("[AMQP]", err.message);
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
    amqpConn = conn;
    whenConnected();
  });
}

function whenConnected() {
  startPublisher();
}

var pubChannel = null;
var offlinePubQueue = [];
var ex = 'marketDataExchange';
function startPublisher() {
  amqpConn.createConfirmChannel(function(err, ch) {
    if (closeOnErr(err)) return;
    ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });
    ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });

    pubChannel = ch;

    pubChannel.assertExchange(ex, 'topic', {durable: true});

    while (true) {
      var m = offlinePubQueue.shift();
      if (!m) break;
      publish(m[0], m[1]);
    }
  });
}

// method to publish a message, will queue messages internally if the connection is down and resend later
function publish(routingKey, content) {
  try {
    pubChannel.publish(ex, routingKey, content, { persistent: true },
                       function(err, ok) {
                         if (err) {
                           console.error("[AMQP] publish", err);
                           offlinePubQueue.push([routingKey, content]);
                           pubChannel.connection.close();
                         }
                       });
  } catch (e) {
    console.error("[AMQP] publish", e.message);
    offlinePubQueue.push([routingKey, content]);
  }
}
module.exports= {
  startMq : start,
  publish: publish
}
