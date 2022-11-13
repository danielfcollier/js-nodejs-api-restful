const Operation = require('../../lib/Operation');

const post = async (req, res) => {
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
};

module.exports = post;
