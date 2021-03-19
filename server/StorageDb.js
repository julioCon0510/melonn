class Storage {
  constructor() {
    this.db = {
      product: [],
    };
  }

  set(key, value) {
    this.db[key] = [...this.db[key], value];
  }

  get(key) {
    return this.db[key];
  }
  getAll() {
    return this.db;
  }
}

module.exports = new Storage();
