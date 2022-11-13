const server = require('./server');

const getBalance = require('./src/balance/get');
const postReset = require('./src/reset/post');
const postReset = require('./src/reset/post');

const port = 3000;

server.get('/balance', getBalance);
server.post('/event', postEvent);
server.post('/reset', postReset);

server.listen(port, () => {
  console.log(`Example server listening on port ${port}`);
});
