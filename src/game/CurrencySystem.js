export default class CurrencySystem {

  constructor() {
    this.key = "pipe_rescue_currency";
    this.data = this.load();
  }

  defaultData() {
    return {
      coins: 0,
      gems: 0,
      tickets: 0
    };
  }

  load() {
    try {
      const raw = localStorage.getItem(this.key);
      return raw ? JSON.parse(raw) : this.defaultData();
    } catch {
      return this.defaultData();
    }
  }

  save() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  coins() {
    return this.data.coins;
  }

  gems() {
    return this.data.gems;
  }

  tickets() {
    return this.data.tickets;
  }

  addCoins(value) {
    this.data.coins += value;
    this.save();
  }

  addGems(value) {
    this.data.gems += value;
    this.save();
  }

  addTickets(value) {
    this.data.tickets += value;
    this.save();
  }

  spendCoins(value) {
    if (this.data.coins < value) return false;
    this.data.coins -= value;
    this.save();
    return true;
  }

  spendGems(value) {
    if (this.data.gems < value) return false;
    this.data.gems -= value;
    this.save();
    return true;
  }

  reward(level, stars) {
    const coins = 25 + stars * 20 + level * 3;
    const gems = stars === 3 ? 1 : 0;

    this.addCoins(coins);

    if (gems > 0) {
      this.addGems(gems);
    }

    return {
      coins,
      gems
    };
  }

  reset() {
    this.data = this.defaultData();
    this.save();
  }
}
