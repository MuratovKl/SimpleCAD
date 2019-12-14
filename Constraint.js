class Constraint {
  static curId = 0;

  constructor(type, points, id) {
    this._type = type;
    this._points = points;
    this._id = curId++;
  }

  get type() {
    return this._type;
  }

  get points() {
    return this._points;
  }

  get id() {
    return this._id;
  }
}