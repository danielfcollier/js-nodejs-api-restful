const Db = require('./Db');

const eventType = {
  deposit: 'deposit',
  transfer: 'transfer',
  withdraw: 'withdraw',
};

class Operation {
  static handler(data) {
    switch (data.type) {
      case eventType.deposit:
        return this.#deposit(data);
      case eventType.transfer:
        return this.#transfer(data);
      case eventType.withdraw:
        return this.#withdraw(data);
      default:
        throw new Error();
    }
  }

  static #deposit(data) {
    const id = data.destination;
    if (!id) {
      throw new Error();
    }

    const account = Db.read(id);
    if (!account) {
      const newAccount = {
        id,
        balance: data.amount,
      };
      Db.create(newAccount);

      return { destination: newAccount };
    }

    const updatedAccount = Db.increment(account, data.amount);
    return { destination: updatedAccount };
  }

  static #transfer(data) {
    const idOrigin = data.origin;
    const idDestination = data.destination;

    if (!idOrigin || !idDestination) {
      throw new Error();
    }

    const origin = this.#withdraw(data);
    const destination = this.#deposit(data);

    return { origin: origin.origin, destination: destination.destination };
  }

  static #withdraw(data) {
    const id = data.origin;
    if (!id) {
      throw new Error();
    }

    const account = Db.read(id);
    if (!account) {
      throw new Error();
    }

    const updatedAccount = Db.decrement(account, data.amount);
    return { origin: updatedAccount };
  }
}

module.exports = Operation;
