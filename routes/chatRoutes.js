const express = require("express");
const chatController = require("./../controllers/chatController");
const authenticate = require("./../utilities/authenticate");

const router = express.Router();

router.use(authenticate.authenticate);

router.get("/", chatController.getChats);
router.post("/add", chatController.addContact);
router.post("/message", chatController.saveMessage);

module.exports = router;
