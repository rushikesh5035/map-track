const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("New client connected: ", socket.id);

  socket.on("send-location", (data) => {
    console.log("Location received: ", data);
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: ", socket.id);
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

server.listen(3000, () => {
  console.log("Server Started on Port 3000");
});
