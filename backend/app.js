const express = require("express");
const bodyParser = require("body-parser");

const locationRouter = require("./routes/location");

const app = express();

// app.set("view engine", "ejs");
// app.set("views", "views");

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(locationRouter);

// app.use((req, res, next) => {
//   res.setHeader("Content-Type", "text/html");
//   next();
// });

// app.use((req, res, next) => {
//   let userName = req.body.username || "passenger who are you?";
//   res.render("index", {
//     user: userName,
//   });
// });

app.listen(process.env.PORT || 3000);
