/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-require */

const supertest = require('supertest');
const app = require('./app');

const request = supertest(app);

// test('our first test', () => {
//   expect(1 + 2).toBe(4);
// });

// test('our test', () => {
//   request.get('/users/15').accept('application/json')
// });

test('get your user json', async () => {
  const result = await request.get('/users/15').accept('application/json');

  // result.body nickname 프로퍼티와 String 값을 가지는 객체임을 기대
  expect(result.body).toMatchObject({
    nickname: expect.any(String),
  });
});

test('get your user page', async () => {
  const result = await request.get('/users/15').accept('text/html');

  expect(result.text).toMatch(/^<html>.*<\/html>$/);

  // expect(result.body).toMatchObject({
  //   nickname: expect.any(String),
  // });
});

test('update nickname', async () => {
  const newNick = 'newNick';
  const result = await request
    .post('/users/15/nickname')
    .send({ nickname: newNick });
  expect(result.statusCode).toBe(200);

  const userResult = await request.get('/users/15').accept('application/json');
  expect(userResult.statusCode).toBe(200);
  expect(userResult.body).toMatchObject({
    nickname: newNick,
  });
});
