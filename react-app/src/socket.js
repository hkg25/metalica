import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3005');

socket.on("connect", () => {
  console.log("Matallica connected with notification service");
  //tradesEvent();
  marketDataEvents();
});

function tradesEvent(cb) {
  socket.on("updated.trades.queue", (msg) => {
    const strngMessage = Buffer.from(msg).toString("utf8");
    if (cb) {
      cb(null, 'Updated', strngMessage);
    }
  });

  socket.on("new.trades.queue", (msg) => {
    const strngMessage = Buffer.from(msg).toString("utf8");
    if (cb) {
      cb(null, 'Created', strngMessage);
    }
  });

  socket.on("deleted.trades.queue", (msg) => {
    const strngMessage = Buffer.from(msg).toString("utf8");
    if (cb) {
      cb(null, 'Deleted', strngMessage);
    }
  });
}

function marketDataEvents(cb) {
  socket.on("market.data", (msg) => {
    const strngMessage = Buffer.from(msg).toString("utf8");
    if (cb) {
      cb(null, strngMessage);
    }
  });
}


export { tradesEvent, marketDataEvents };
