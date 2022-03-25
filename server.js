const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

dotenv.config({ path: "./config.env" });
app.set("key", process.env.KEY);
const uri = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
const port = process.env.PORT || 3001;
mongoose.connect(uri).then(() => console.log("Database connected"));

let online = new Map();
io.on("connection", (socket) => {
  socket.emit("hello", "hi");
  console.log(`user with socket id ${socket.id} connected`);
  socket.on("authentication", (username) => {
    online.set(username, socket.id);
    console.log(online);
  });
  socket.on("join-chat", (chatId) => {
    socket.join(chatId);
  });
  socket.on("add-contact", (chatId, username, senderId, senderUsername) => {
    const receiver = online.get(username);
    socket
      .to(receiver)
      .emit("added-to-contact", chatId, senderId, senderUsername);
  });
  socket.on("receive", (id) => {
    console.log("What?????");
  });
  socket.on("client-outgoing-message", (chatId, message, username) => {
    console.log(chatId, message);
    socket
      .to(chatId)
      .emit("client-incoming-message", chatId, message, username);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
