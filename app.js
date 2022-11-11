const app = require('./server');

const Db = require('./lib/Db');
const Operation = require('./lib/Operation');

const port = 3000;

app.post('/reset', (_, res) => {
  try {
    Db.reset();
    res.status(200).send('OK');
  } catch {
    res.status(400).send('0');
  }
});

app.get('/balance', (req, res) => {
  try {
    const { account_id } = req.query;
    const data = Db.read(account_id);

    if (data) {
      res.status(200).json(data.balance);
    } else {
      throw new Error();
    }
  } catch {
    res.status(404).send('0');
  }
});

app.post('/event', (req, res) => {
  try {
    const { body } = req;
    const result = Operation.handler(body);

    if (result) {
      res.status(201).json(result);
    } else {
      throw new Error();
    }
  } catch {
    res.status(404).send('0');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
