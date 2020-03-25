# SimpleCAD

### Constraints:
```javascript
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
```
