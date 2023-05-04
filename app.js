const express = require("express");
const { readdirSync } = require("fs");
const app = express();

// .env file
require("dotenv").config();

// middlewares
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//autoload routes
readdirSync("./routes", {}).map((r) => app.use(require(`./routes/${r}`)));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Marks API" });
});

// Listen for a connection.
let port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", function () {
  console.log("Server is listening on port " + port);
});
