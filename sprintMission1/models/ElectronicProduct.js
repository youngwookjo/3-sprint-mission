import { Product } from './Product.js';

export class ElectronicProduct extends Product {
  constructor({ name, description, price, tags, images, favoriteCount = 0, manufacturer = '' } = {}) {
    super(name, description, price, tags, images, favoriteCount);
    this.manufacturer = manufacturer;
  };
  get manufacturer() {
    return this._manufacturer;
  };
  //한라인에서 한명령어만 선언해라 if else문 추천 짧은거일떄만 삼항연산자 팀원들과 상의의
  set manufacturer(manufacturer) {
    typeof manufacturer === 'string' && manufacturer.length > 0 ? this._manufacturer = manufacturer : this._manufacturer = '제조사 정보가 없습니다';
  };
};