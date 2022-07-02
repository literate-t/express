// @ts-check
/* eslint-disalbe no-console */

const express = require('express');

const app = express();
const userRouter = require('./routers/users');
const PORT = 5000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use('/users', userRouter);
app.use('/public', express.static('src/public'));

// error handling middleware
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(`The server listening at port:${PORT}`);
});
