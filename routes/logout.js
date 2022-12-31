const express = require("express");
const router = express.Router();
const LogoutTokenController = require("../controller/logout.controller");

router.get("/", LogoutTokenController);

module.exports = router;
