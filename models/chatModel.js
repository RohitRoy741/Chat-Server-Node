const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  timestamp: {
    type: Date(),
    default: new Date(),
  },
  messages: [
    {
      text: {
        type: String,
        required: true,
      },
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      timestamp: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
