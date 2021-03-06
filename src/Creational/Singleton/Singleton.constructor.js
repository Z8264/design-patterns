class Singleton {
  constructor(name) {
    if (typeof Singleton.instance === 'object') {
      return Singleton.instance;
    }
    Singleton.instance = this;

    this.name = name;
  }
}

export default Singleton;
