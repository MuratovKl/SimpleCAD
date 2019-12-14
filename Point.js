class Point {
  static curId = 0;

  constructor(x, y) {
    this._x = x;
    this._y = y;
    this._id = Point.curId++;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }

  get id() {
    return this._id;
  }

  set x(val) {
    this._x = val;
  }

  set y(val) {
    this._y = val;
  }
};