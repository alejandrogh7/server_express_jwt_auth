const express = require("express");
const router = express.Router();
const path = require("path");

//we could use REGEX in express routes ^/$|/index(.html)?
//allows / and ( /index.html or /index)
router.get("^/$|/index(.html)?", (req, res) => {
  //sending files with express
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/new-page(.html)?", (req, res) => {
  //sending files with express
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

router.get("/old-page(.html)?", (req, res) => {
  //redirect route
  res.redirect(301, "/new-page.html");
});

router.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("trying get HELLO");
    next();
  },
  (req, res) => {
    res.send("Hello");
  }
);

const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res, next) => {
  console.log("three");
  res.send("Done");
};
//Provide function handlers in an array of functions
router.get("/chain(.html)?", [one, two, three]);

module.exports = router;
