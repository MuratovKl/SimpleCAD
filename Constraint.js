class Constraint {
  static curId = 0;

  constructor(type, points) {
    this._type = type;
    this._points = points; // TODO maybe only IDs?
    this._id = Constraint.curId++;
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

export { Constraint };