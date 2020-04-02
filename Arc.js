class Arc {
  static curId = 0;

  constructor(center, R, fi1, fi2, angleMode = 'RAD') {
    this._center = center;
    this._R = R;
    this._fi1 = fi1;
    this._fi2 = fi2;
    this._angleMode = angleMode; // DEG | RAD
    this._id = Arc.curId++;
  }

  get type() {
    return "ARC";
  }
  get center() {
    return this._center;
  }
  get R() {
    return this._R;
  }
  get fi1() {
    return this._fi1;
  }
  get fi2() {
    return this._fi2;
  }

  get id() {
    return this._id;
  }

  set center(val) {
    this._center = val;
  }
  set R(val) {
    this._R = val;
  }
  set fi1(val) {
    this._fi1 = val;
  }
  set fi2(val) {
    this._fi2 = val;
  }

  set angleMode(val) {
    this._angleMode = val;
  }
  get angleMode() {
    return this._angleMode;
  }
};

export {Arc};