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

  addConstraint(constraint) {
    // TODO добавить проверку вводимых ограничений
    this._constrains.push(constraint);

    try {
      this._kernel.solve(this._points, this._constrains);
      console.log(this._points);
    } catch (e) {
      console.error(e.message);
      this._constrains.pop();
    }
  }
}

export {
  DataLayer,
};
