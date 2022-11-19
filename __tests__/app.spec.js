const request = require('supertest');
const server = require('../server');

describe('Specification to work with a local database file', () => {
  test('/reset - Reset state before starting tests', async () => {
    const endpoint = '/reset';
    const expected = {
      status: 200,
      content: 'OK',
    };
    const response = request(server).post(endpoint);

    await response.expect(expected.status).expect(expected.content);
  });

  test('/balance - Get balance for non-existing account', async () => {
    const endpoint = '/balance?account_id=1234';
    const expect = {
      status: 404,
      content: '0',
    };
    const response = request(server).get(endpoint);

    await response.expect(expect.status).expect(expect.content);
  });

  test('/event - Create account with initial balance', async () => {
    const endpoint = '/event';
    const req = {
      body: { type: 'deposit', destination: '100', amount: 10 },
    };
    const expect = {
      status: 201,
      content: { destination: { id: '100', balance: 10 } },
    };
    const response = request(server).post(endpoint).send(req.body);

    await response.expect(expect.status).expect(expect.content);
  });

  test('/event - Deposit into existing account', async () => {
    const endpoint = '/event';
    const req = {
      body: { type: 'deposit', destination: '100', amount: 10 },
    };
    const expect = {
      status: 201,
      content: { destination: { id: '100', balance: 20 } },
    };
    const response = request(server).post(endpoint).send(req.body);

    await response.expect(expect.status).expect(expect.content);
  });

  test('/balance - Get balance for existing account', async () => {
    const endpoint = '/balance?account_id=100';
    const expect = {
      status: 200,
      content: '20',
    };
    const response = request(server).get(endpoint);

    await response.expect(expect.status).expect(expect.content);
  });

  test('/event - Withdraw from non-existing account', async () => {
    const endpoint = '/event';
    const req = {
      body: { type: 'withdraw', origin: '200', amount: 10 },
    };
    const expect = {
      status: 404,
      content: '0',
    };
    const response = request(server).post(endpoint).send(req.body);

    await response.expect(expect.status).expect(expect.content);
  });

  test('/event - Withdraw from existing account', async () => {
    const endpoint = '/event';
    const req = {
      body: { type: 'withdraw', origin: '100', amount: 5 },
    };
    const expect = {
      status: 201,
      content: { origin: { id: '100', balance: 15 } },
    };
    const response = request(server).post(endpoint).send(req.body);

    await response.expect(expect.status).expect(expect.content);
  });

  test('/event - Transfer from existing account', async () => {
    const endpoint = '/event';
    const req = {
      body: { type: 'transfer', origin: '100', amount: 15, destination: '300' },
    };
    const expect = {
      status: 201,
      content: {
        origin: { id: '100', balance: 0 },
        destination: { id: '300', balance: 15 },
      },
    };
    const response = request(server).post(endpoint).send(req.body);

    await response.expect(expect.status).expect(expect.content);
  });

  test('/event - Transfer from non-existing account', async () => {
    const endpoint = '/event';
    const req = {
      body: { type: 'transfer', origin: '200', amount: 15, destination: '300' },
    };
    const expect = {
      status: 404,
      content: '0',
    };
    const response = request(server).post(endpoint).send(req.body);

    await response.expect(expect.status).expect(expect.content);
  });
});
