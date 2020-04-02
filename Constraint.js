class Constraint {
  static curId = 0;

  constructor({type, points, lines, value, elements}) {
    this._type = type;
    this._points = points;
    this._lines = lines;
    this._elements = elements;
    this._value = value;
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
  
  get lines() {
    return this._lines;
  }

  set lines(val) {
    this._lines = val;
  }

  get elements() {
    return this._elements;
  }

  set elements(val) {
    this._elements = val;
  }

  get id() {
    return this._id;
  }
}

export { Constraint };