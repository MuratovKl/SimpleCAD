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

  removePoint(id) {
    const pointIndex = this._points.findIndex((el) => el.id === id);
    console.log(pointIndex);
    this._points.splice(pointIndex, 1);
    // TODO добавить удаление связанных ограничений
  }

  addTmpConstraint(constraint) {
    this._constrains.push(constraint);
  }

  addConstraint(constraint) {
    let result;
    // TODO добавить проверку вводимых ограничений
    this._constrains.push(constraint);

    try {
      result = this._kernel.solve(this._points, this._constrains);
      console.log(this._points);
    } catch (e) {
      console.error(e.message);
      this._constrains.pop();
    }
    return result;
  }

  removeConstraint(id) {
    const constraintIndex = this._constrains.findIndex((el) => el.id === id);
    this._constrains.splice(constraintIndex, 1);
  }

  resolve() {
    let result;
    try {
      result = this._kernel.solve(this._points, this._constrains);
    } catch (e) {
      console.error(e.message);
    }
    return result;
  }
}

export {
  DataLayer,
};
