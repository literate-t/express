// @ts-check
/* eslint-disalbe no-console */

const express = require('express');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const PORT = 5000;

// app.get(/abc/, (req, res) => {
//   res.send('Root - get');
// });
// app.post('/', (req, res) => {
//   res.send('Root - post');
// });

const userRouter = express.Router();

const USERS = {
  15: {
    nickname: 'foo',
  },
};

userRouter.get('/', (req, res) => {
  res.send('User list');
});

userRouter.param('id', (req, res, next, value) => {
  console.log(value);
  // @ts-ignore
  req.user = USERS[value];
  next();
});

userRouter.get('/:id', (req, res, next) => {
  console.log('userRouter get id');
  // @ts-ignore
  res.send(req.user);
});

userRouter.post('/', (req, res) => {
  res.send('Register user');
});

userRouter.post('/:id/nickname', (req, res) => {
  // req.body: {"nickname" : "bar"}
  // @ts-ignore
  const { user } = req;
  const { nickname } = req.body;

  user.nickname = nickname;

  res.send(`User nickname updated: ${nickname}`);
});

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`The server listening at port:${PORT}`);
});
