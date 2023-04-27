const express = require("express");
const { readdirSync } = require("fs");
const app = express();

// .env file
require("dotenv").config();

// middlewares
app.use(express.json());

// autoload routes
// readdirSync("./routes", {}).map((r) => app.use(require(`./routes/${r}`)));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Marks API" });
});

// Listen for a connection.
let port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", function () {
  console.log("Server is listening on port " + port);
});
