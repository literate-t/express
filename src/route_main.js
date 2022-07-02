// @ts-check
/* eslint-disalbe no-console */

const express = require('express');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug');
app.set('views', 'src/views');

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
    nickname: 'Vik',
  },
  16: {
    nickname: 'Nic',
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
  const resMimeType = req.accepts(['json', 'html']);
  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user);
  } else if (resMimeType === 'html') {
    res.render('user_profile', {
      // @ts-ignore
      nickname: req.user.nickname,
    });
  }
  console.log('userRouter get id');
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

// app.get('/', (reg, res) => {
//   res.render('index', {
//     message: 'Hello buddy buddy',
//   });
// });

app.listen(PORT, () => {
  console.log(`The server listening at port:${PORT}`);
});
