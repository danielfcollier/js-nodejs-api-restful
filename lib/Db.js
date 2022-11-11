const fs = require('fs');
const path = require('path');

class Db {
  static DB_FILE = 'data.json';
  static filepath = path.join('.', 'db', this.DB_FILE);

  static #readAll() {
    const content = fs.readFileSync(this.filepath);
    try {
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  static reset() {
    fs.writeFileSync(this.filepath, '');
  }

  static create(account) {
    const data = this.#readAll();
    if (data) {
      data.push[account];
    }

    const result = data ? data : [account];

    fs.writeFileSync(this.filepath, JSON.stringify(result));
  }

  static read(id) {
    const data = this.#readAll();
    const getElement = () => {
      const filteredData = data.filter((element) => element.id === id);
      return filteredData.length === 1 ? filteredData[0] : null;
    };

    const result = data ? getElement() : null;
    return result;
  }

  static increment(account, amount) {
    return this.#update(account, amount);
  }

  static decrement(account, amount) {
    return this.#update(account, -amount);
  }

  static #update(account, amount) {
    const data = this.#readAll();

    if (!data) {
      throw new Error();
    }

    const updatedAccount = { ...account, balance: account.balance + amount };
    const updatedData = [...data.filter((element) => element.id !== account.id), updatedAccount];

    fs.writeFileSync(this.filepath, JSON.stringify(updatedData));

    return updatedAccount;
  }
}

module.exports = Db;
