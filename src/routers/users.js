// @ts-check
/* eslint-disalbe no-console */

const express = require('express');
const app = express();
const router = express.Router();

const USERS = {
  15: {
    nickname: 'Vik',
  },
  16: {
    nickname: 'Nic',
  },
};

router.get('/', (req, res) => {
  res.send('User list');
});

// async로 처리하려면 try catch로 감싸주어야 promise rejection 오류를 처리할 수 있다
router.param('id', async (req, res, next, value) => {
  try {
    const user = USERS[value];
    if (!user) {
      const err = new Error('User not found');
      // @ts-ignore
      err.statusCode = 404;
      throw err;
    }

    // @ts-ignore
    req.user = USERS[value];
    next();
  } catch (err) {
    next(err); // 넣어줘야 함
  }
});

router.get('/:id', (req, res, next) => {
  const resMimeType = req.accepts(['json', 'html']);
  if (resMimeType === 'json') {
    // @ts-ignore
    res.send(req.user);
  } else if (resMimeType === 'html') {
    res.render('user-profile', {
      // @ts-ignore
      nickname: req.user.nickname,
    });
  }
  console.log('router get id');
});

router.post('/', (req, res) => {
  res.send('Register user');
});

router.post('/:id/nickname', (req, res) => {
  // req.body: {"nickname" : "bar"}
  // @ts-ignore
  const { user } = req;
  const { nickname } = req.body;

  user.nickname = nickname;

  res.send(`User nickname updated: ${nickname}`);
});

module.exports = router;

// Test codes
// app.get(/abc/, (req, res) => {
//   res.send('Root - get');
// });
// app.post('/', (req, res) => {
//   res.send('Root - post');
// });

// app.use('/users', router);

// app.get('/', (reg, res) => {
//   res.render('index', {
//     message: 'Hello buddy buddy',
//   });
// });

// app.listen(PORT, () => {
//   console.log(`The server listening at port:${PORT}`);
// });
