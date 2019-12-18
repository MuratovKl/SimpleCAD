class DataLayer {
  constructor(kernel) {
    this._points = [];
    this._constrains = [];
    this._kernel = kernel;
  }

  get points() {
    return this._points;
  }

  addPoint(point) {
    this._points.push(point);
  }

  addConstraint(constraint) {
    // TODO добавить проверку вводимых ограничений
    this._constraints.push(constraint);

    try {
      this._kernel.solve(this._points, this._constraints);
    } catch (e) {
      // eslint-disable-next-line
      console.error(e.message);
      this._constrains.pop();
    }
  }
}

export {
  DataLayer,
};
