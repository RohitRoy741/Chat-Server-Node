const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);

module.exports = app;
