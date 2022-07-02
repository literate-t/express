// @ts-check
/* eslint-disable no-console */
const express = require('express');
const fs = require('fs');

const app = express();

const PORT = 5000;
app.use(
  '/',
  (req, res, next) => {
    console.log('Middleware 1-1');

    const fileContent = fs.promises.readFile('.gitignore');
    // @ts-ignore
    req.fileContent = fileContent;
    const reqTime = new Date();
    // @ts-ignore
    req.reqTime = reqTime;
    next();
  },
  (req, res, next) => {
    console.log('Middleware 1-2');
    // res.send('Hello Express 1');
    next();
  }
);

app.use((req, res) => {
  console.log('Middleware 2');
  // @ts-ignore
  res.send(`Hello Express 2 ${req.reqTime}, ${req.fileContent}`);
});

app.listen(PORT, () => {
  console.log(`${PORT} is listening`);
});
