const express = require("express");
const chatController = require("./../controllers/chatController");
const authenticate = require("./../utilities/authenticate");

const router = express.Router();

router.use(authenticate.authenticate);

router.get("/", chatController.getChats);
module.exports = router;
