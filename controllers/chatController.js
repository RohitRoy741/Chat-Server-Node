const Chat = require("./../models/chatModel");
const User = require("./../models/userModel");

exports.addContact = async (req, res) => {
  try {
    const chat = await Chat.create({
      users: [req.user._id, req.body.id],
      messages: [
        {
          text: "Added to Chat",
          sender: "Server",
          receiver: "Server",
        },
      ],
    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        chats: chat,
      },
    });
    await User.findByIdAndUpdate(req.body.id, {
      $push: {
        chats: chat,
      },
    });
    res.status(201).json({
      status: "Success",
      data: {
        chat,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      status: "Failed",
      message: error.toString(),
    });
  }
};

exports.getChats = async (req, res) => {
  try {
    const user = await req.user.populate("chats");
    const chats = user.chats.sort((a, b) => b.time - a.time);
    console.log(chats);
    const usernames = [];
    for (let chat of chats) {
      let users = [];
      for (let user of chat.users) {
        const temp = await User.findById(user);
        users.push(temp.username);
      }
      usernames.push(users);
    }
    res.status(200).json({
      status: "Success",
      data: {
        chats,
        usernames,
      },
    });
  } catch (error) {
    console.log(error.toString());
    res.status(404).json({
      status: "Failed",
      message: error.toString(),
    });
  }
};

exports.saveMessage = async (req, res) => {
  try {
    await Chat.findByIdAndUpdate(req.body.chatId, {
      $set: { time: new Date() },
      $push: {
        messages: {
          sender: req.user._id,
          receiver: req.body.receiverId,
          text: req.body.text,
        },
      },
    });
    res.status(201).json({
      status: "Success",
      data: null,
    });
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({
      status: "Failed",
      message: error.toString(),
    });
  }
};
