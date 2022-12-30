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
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/subdir", require("./routes/subdir"));
app.use("/employees", require("./routes/api/employees"));

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
