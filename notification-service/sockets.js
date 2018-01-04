const socketIO = require("socket.io");

function connect(server) {
  var io = socketIO(server);

  io.on("connection", (socket) => {
    socket.on("disconnect", () => {
      console.log("Listener Disconnected");
    });

    socket.on("updated.trades.queue", (msg, callback) => {
        io.emit("updated.trades.queue", msg);
    });

    socket.on("new.trades.queue", (msg, callback) => {
        io.emit("new.trades.queue", msg);
    });

    socket.on("deleted.trades.queue", (msg, callback) => {
        io.emit("deleted.trades.queue", msg);
    });

    socket.on("market.data", (msg, callback) => {
        io.emit("market.data", msg);
    });
  })
}

module.exports = connect;
