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
