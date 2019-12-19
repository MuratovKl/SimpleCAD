class Constraint {
  static curId = 0;

  constructor(type, points) {
    this._type = type;
    this._points = points;
    this._id = Constraint.curId++;
  }

  set value(val) {
    this._value = val;
  }

  get value() {
    return this._value;
  }

  get type() {
    return this._type;
  }

  get points() {
    return this._points;
  }

  set points(val) {
    this._points = val;
  }

  get id() {
    return this._id;
  }
}

export { Constraint };