const ConstraintsTypes = {
  'HORIZONTAL': 'HORIZONTAL',
  'LENGTH': 'LENGTH',
  'VERTICAL': 'VERTICAL',
  'FIX_POINT': 'FIX_POINT',
  'COINCIDENT': 'COINCIDENT',
  'PARALLEL': 'PARALLEL',
  'PERPENDICULAR':'PERPENDICULAR',
  'POINT_ON_LINE':'POINT_ON_LINE',
  'ANGLE':'ANGLE',
  'EQUAL_LINES': 'EQUAL_LINES',
  'DISTANCE_POINT_LINE': 'DISTANCE_POINT_LINE',
  'ARC_LENGTH': 'ARC_LENGTH',
  'ARC_RADIUS': 'ARC_RADIUS',
  'ARC_ANGLE': 'ARC_ANGLE',
  'ARC_TANGENT_ToArc': 'ARC_TANGENT_ToArc',
  'ARC_TANGENT_ToLine': 'ARC_TANGENT_ToLine',
  'ARC_POINT_COINCIDENT': 'ARC_POINT_COINCIDENT',
  'ARC_POINT_FIX': 'ARC_POINT_FIX',
  'ARC_LINE_PERPENDICULAR': 'ARC_LINE_PERPENDICULAR',
  'LENGTH_TOTAL': 'LENGTH_TOTAL'
};

Object.freeze(ConstraintsTypes);

export { ConstraintsTypes };
