const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controller/refreshToken.controller");

router.get("/", refreshTokenController);

module.exports = router;
