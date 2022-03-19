const express = require("express");
const userController = require("./../controllers/userController");
const authenticate = require("../utilities/authenticate");
const router = express.Router();

router.get("/:username", authenticate.authenticate, userController.getUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
module.exports = router;
