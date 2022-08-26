const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/blank.html');
});

io.on("connection", (socket) => {
  console.info("Socket connected!", socket.id);
  socket.on("send-message", (message) => {
    socket.broadcast.emit("notify-message", message);
    console.log("Message" + message[0,10]);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('listening on PORT : ' + (process.env.PORT || 3000));
});