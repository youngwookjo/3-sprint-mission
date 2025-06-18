import { Product } from './Product.js';

export class ElectronicProduct extends Product {
  constructor({ name, description, price, tags, images, favoriteCount = 0, manufacturer = '' } = {}) {
    super({ name, description, price, tags, images, favoriteCount });
    this.manufacturer = manufacturer;
  };
  get manufacturer() {
    return this._manufacturer;
  };

  set manufacturer(manufacturer) {
    if (typeof manufacturer === 'string' && manufacturer.length > 0) {
      this._manufacturer = manufacturer;
    } else {
      this._manufacturer = '제조사 정보가 없습니다';
    }
  }
}
