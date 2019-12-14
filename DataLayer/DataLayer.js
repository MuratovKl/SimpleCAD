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
      kernel.solve(this._points, this._constraints);
    } catch(e) {
      console.error(e.message);
      this._constrains.pop();
    }
  }




}