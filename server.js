const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;

//we could use REGEX in express routes ^/$|/index(.html)?
//allows / and ( /index.html or /index)
app.get("^/$|/index(.html)?", (req, res) => {
  //sending files with express
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  //sending files with express
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  //redirect route
  res.redirect(301, "/new-page.html");
});

app.get(
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
app.get("/chain(.html)?", [one, two, three]);

//No found route
app.get("/*", (req, res) => {
  res.sendFile(404, path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
