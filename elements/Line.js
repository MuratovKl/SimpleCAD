import { ElementTypes } from './ElementTypes.js';

class Line {
  static curId = 0;

  constructor(p1, p2) {
    this._p1 = p1;
    this._p2 = p2;
    this._id = Line.curId++;
  }

  get type() {
    return ElementTypes.LINE;
  }
  get p1() {
    return this._p1;
  }
  get p2() {
    return this._p2;
  }

  get id() {
    return this._id;
  }

  set p1(val) {
    this._p1 = val;
  }
  set p2(val) {
    this._p2 = val;
  }
};

export { Line };