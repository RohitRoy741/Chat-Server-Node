const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    const { id } = await jwt.verify(token, process.env.KEY);
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Authentication Failed");
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Failed",
      message: error.toString(),
    });
  }
};
