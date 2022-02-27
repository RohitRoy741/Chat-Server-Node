const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      throw new Error("Bad Request");
    }
    let password = await bcrypt.hash(req.body.password, 8);
    const user = await User.create({
      username: req.body.username,
      password,
      email: req.body.email,
    });
    const token = await jwt.sign({ id: user._id }, process.env.KEY);
    res.status(201).json({
      status: "Success",
      data: {
        userId: user._id,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(402).json({
      status: "Failed",
      message: error.toString(),
    });
  }
};

exports.login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error("Bad Request!");
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throw Error("Invalid Credentials!");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw Error("Invalid Credentials!");
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY);
    res.status(200).json({
      status: "Success",
      data: {
        token,
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
