const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3001;

//middleware

//custom logger
app.use(logger);
//apply cors
const whitelist = ["https://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
//form data -> 'content-type': 'application/form-urlencoded'
app.use(express.urlencoded({ extended: false }));
//for json
app.use(express.json());
//static files -> CSS
app.use(express.static(path.join(__dirname, "/public")));

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
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

//handler errors
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
