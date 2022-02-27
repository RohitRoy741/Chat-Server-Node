const express = require("express");
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);

module.exports = app;
