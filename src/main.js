const app = require('./app');

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`The server listening at port:${PORT}`);
});
