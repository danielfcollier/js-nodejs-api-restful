const Db = require('../../lib/Db');

const post = async (_, res) => {
  try {
    Db.reset();
    res.status(200).send('OK');
  } catch {
    res.status(400).send('0');
  }
};

module.exports = post;
