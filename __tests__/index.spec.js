const getBalance = require('../src/balance/get');
const postEvent = require('../src/event/post');
const postReset = require('../src/reset/post');

describe('Specification to work with a local database file', () => {
  test('/reset - Reset state before starting testsK', async () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const req = {};
    const res = mockResponse();

    await postReset(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('OK');
  });

  test('/balance - Get balance for non-existing account', async () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const req = { query: { account_id: '1234' } };
    const res = mockResponse();

    await getBalance(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('0');
  });

  test('/event - Create account with initial balance', async () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const req = {
      body: { type: 'deposit', destination: '100', amount: 10 },
    };
    const res = mockResponse();

    await postEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ destination: { id: '100', balance: 10 } });
  });

  test('/event - Deposit into existing account', async () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const req = {
      body: { type: 'deposit', destination: '100', amount: 10 },
    };
    const res = mockResponse();

    await postEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ destination: { id: '100', balance: 20 } });
  });

  test('/balance - Get balance for existing account', async () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const req = { query: { account_id: '100' } };
    const res = mockResponse();

    await getBalance(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('0');
  });

  test('/event - Withdraw from non-existing account', async () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const req = {
      body: { type: 'withdraw', origin: '200', amount: 10 },
    };
    const res = mockResponse();

    await postEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('0');
  });

  test('/event - Withdraw from existing account', async () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const req = {
      body: { type: 'withdraw', origin: '100', amount: 5 },
    };
    const res = mockResponse();

    await postEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ origin: { id: '100', balance: 15 } });
  });

  test('/event - Transfer from existing account', async () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const req = {
      body: { type: 'transfer', origin: '100', amount: 15, destination: '300' },
    };
    const res = mockResponse();

    await postEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      origin: { id: '100', balance: 0 },
      destination: { id: '300', balance: 15 },
    });
  });

  test('/event - Transfer from non-existing account', async () => {
    const mockResponse = () => {
      const res = {};
      res.status = jest.fn().mockReturnValue(res);
      res.json = jest.fn().mockReturnValue(res);
      res.send = jest.fn().mockReturnValue(res);
      return res;
    };
    const req = {
      body: { type: 'transfer', origin: '200', amount: 15, destination: '300' },
    };
    const res = mockResponse();

    await postEvent(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('0');
  });
});
