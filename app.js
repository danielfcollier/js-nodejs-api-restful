const server = require('./server');

const port = process.env.PORT || '3000';

const start = () => {
  try {
    server.listen(port, () => {
      console.log(`API running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

module.exports = start;
