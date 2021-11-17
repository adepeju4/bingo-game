const express = require("express");
const http = require("http");

const socketio = require("socket.io");

const next = require("next");

const app = express();

const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 1234;

const dev = process.env.NODE_ENV === "development";

const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler();

io.on("connection", (socket) => {
  let message = "Hi, there. Welcome to my socket page";
  console.log("new game user add to roomm");
  socket.emit("message", message);
});

nextApp.prepare().then(() => {
  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });
});

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is ready on port" + PORT);
});
