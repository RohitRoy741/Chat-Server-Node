const express = require("express");
const chatController = require("./../controllers/chatController");
const authenticate = require("./../utilities/authenticate");

const router = express.Router();

router.use(authenticate.authenticate);

router
  .route("/")
  .get(chatController.getChats)
  .post(chatController.addContact)
  .patch(chatController.saveMessage);

module.exports = router;
