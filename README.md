# SimpleCAD

### Constraints
| Constraint | Описание |
|----------  |--------|
|HORIZONTAL  | Горизонтальность
|VERTICAL    | Вертикальность
|LENGTH      | Длина прямой
|FIX_POINT   |Фиксация точки
|COINCIDENT  |Совпадение точек
|PARALLEL    | Параллельность прямых
|PERPENDICULAR   | Перпендикулярность прямых
|POINT_ON_LINE   | Принадлежность точки прямой
|ANGLE   | Угол между прямыми
|EQUAL_LINES | Равная длина прямых
|ARC_LENGTH  | Длина дуги
|ARC_RADIUS  | Радиус дуги
|ARC_ANGLE   | Угол дуги

Example:
```javascript
    //  Points and lines
    Constraint({type: ConstraintsTypes.HORIZONTAL, points: [point1, point2]});
    Constraint({type: ConstraintsTypes.VERTICAL, points: [point1, point2]});
    Constraint({type: ConstraintsTypes.LENGTH, points: [point1, point2], value: 32});
    Constraint({type: ConstraintsTypes.FIX_POINT, points: [point2]});
    Constraint({type: ConstraintsTypes.COINCIDENT, points: [point0, point2]});
    Constraint({type: ConstraintsTypes.PARALLEL, lines: [[point2, point1], [point3, point4]]});
    Constraint({type: ConstraintsTypes.PERPENDICULAR, lines: [[point2, point1], [point3, point4]]});
    Constraint({type: ConstraintsTypes.POINT_ON_LINE, lines: [[point1, point2]], points: [point3]});
    Constraint({type: ConstraintsTypes.ANGLE,
                lines: [[point3, point1], [point2, point4]],
                value: {val: 60, mode: 'DEG'}}); //  {val: 1.0471975511965976, mode: 'RAD'}
    Constraint({type: ConstraintsTypes.EQUAL_LINES, lines: [[point0, point1], [point1, point2]]})
    
    //  Arcs
    Constraint({type: ConstraintsTypes.ARC_LENGTH, elements: [arc1], value: 20});
    Constraint({type: ConstraintsTypes.ARC_RADIUS, elements: [arc1], value: 5});
    Constraint({type: ConstraintsTypes.ARC_ANGLE, elements: [arc1], value: 45});
```


Using the `KERNEL`:
```javascript
// call `solve` method for solving system
kernel.solve(points, elements, constraints);
```
```typescript
Kernel.solve(points: Array<Point>, elements: Array<Arc>, constraints: Array<Constraint>) {...}
```
