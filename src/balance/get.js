const Db = require('../../lib/Db');

const get = async (req, res) => {
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
};

module.exports = get;
