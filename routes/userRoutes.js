const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();

router.get("/:username", userController.getUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
module.exports = router;
