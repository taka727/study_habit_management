const express = require("express");
const {
  registerUser,
  loginUser,
  getSecurityQuestion,
  logoutUser,
} = require("../controller/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/security-question", getSecurityQuestion);
router.post("/logout", logoutUser);

module.exports = router;
