const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  time: {
    type: Date,
    default: new Date(),
  },
  messages: [
    {
      text: {
        type: String,
        required: true,
      },
      sender: {
        type: String,
        required: true,
      },
      receiver: {
        type: String,
        require: true,
      },
      time: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
