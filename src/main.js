// @ts-check
/* eslint-disable no-console */
const express = require("express");

const app = express();

const PORT = 5000;
app.use(
  "/",
  (req, res, next) => {
    console.log("Middleware 1-1");
    next();
  },
  (req, res, next) => {
    console.log("Middleware 1-2");
    res.send("Hello Express 1");
    next();
  }
);

app.use((req, res, next) => {
  console.log("Middleware 2");
  //res.send("Hello Express 2");
});

app.listen(PORT, () => {
  console.log(`${PORT} is listening`);
});
