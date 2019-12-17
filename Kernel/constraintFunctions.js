import { Constraint } from "../Constraint.js";


/**
 * Function for Horizontal constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_Horizontal(constraint) {
    const axisLocal = [];
    axisLocal.push("lambda_" + constraint.id);
    for (let point of constraint.points) {
        axisLocal.push("dy_" + point.id);
    }

    const dim = 3;
    const JacobianLocal = new Array(dim);
    const F_Local = new Array(dim);
    for (let i = 0; i < dim; i++) {
        F_Local[i] = 0;
        JacobianLocal[i] = new Array(dim);
        for (let j = 0; j < dim; j++) {
            JacobianLocal[i][j] = 0;
        }
    }

    JacobianLocal[0][1] = -1;
    JacobianLocal[0][2] = 1;
    JacobianLocal[1][0] = -1;
    JacobianLocal[2][0] = 1;

    // TODO current values for `lambda` and `dy_i`
    const y1 = constraint.points[0].y;
    const y2 = constraint.points[1].y;
    const dy1 = 0;
    const dy2 = 0;
    const lambda = 0;
    F_Local[0] = y2 + dy2 - y1 - dy1;
    F_Local[1] = -lambda; // -l
    F_Local[2] = lambda; // +l

    return({axisLocal, JacobianLocal, F_Local, dim});
}

/**
 * Function for Length constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_Length(constraint) {
    const axisLocal = [];
    axisLocal.push("lambda_" + constraint.id);
    for (let point of constraint.points) {
        axisLocal.push("dx_" + point.id);
        axisLocal.push("dy_" + point.id);
    }

    const dim = 5;
    const JacobianLocal = new Array(dim);
    const F_Local = new Array(dim);
    for (let i = 0; i < dim; i++) {
        F_Local[i] = 0;
        JacobianLocal[i] = new Array(dim);
        for (let j = 0; j < dim; j++) {
            JacobianLocal[i][j] = 0;
        }
    }

    const x1 = constraint.points[0].x;
    const y1 = constraint.points[0].y;
    const x2 = constraint.points[1].x;
    const y2 = constraint.points[1].y;

    // TODO Set val for dx_i, dy_i, lambda
    const dx1 = 0;
    const dy1 = 0;
    const dx2 = 0;
    const dy2 = 0;
    const lambda = 0;
    const length = constraint.value;

    JacobianLocal[0][0] = 0; // 0
    JacobianLocal[0][1] = -2 * (x2 + dx2 - x1 - dx1); // -2(x2+dx2-x1-dx1)
    JacobianLocal[0][2] = -2 * (y2 + dy2 - y1 - dy1); // -2(y2+dy2-y1-dy1)
    JacobianLocal[0][3] = 2 * (x2 + dx2 - x1 - dx1); // 2(x2+dx2-x1-dx1)
    JacobianLocal[0][4] = 2 * (y2 + dy2 - y1 - dy1); // 2(y2+dy2-y1-dy1)

    JacobianLocal[1][0] = -2 * (x2 + dx2 - x1 - dx1); // -2(x2+dx2-x1-dx1)
    JacobianLocal[1][1] = 2 * lambda; // +2 l
    JacobianLocal[1][2] = 0; // 0
    JacobianLocal[1][3] = -2 * lambda; // -2 l
    JacobianLocal[1][4] = 0; // 0

    JacobianLocal[2][0] = -2 * (y2 + dy2 - y1 - dy1); // -2(y2+dy2-y1-dy1)
    JacobianLocal[2][1] = 0; // 0
    JacobianLocal[2][2] = 2 * lambda; // +2 l
    JacobianLocal[2][3] = 0; //0
    JacobianLocal[2][4] = -2 * lambda; // -2 l

    JacobianLocal[3][0] = 2 * (x2 + dx2 - x1 - dx1); // 2(x2+dx2-x1-dx1)
    JacobianLocal[3][1] = -2 * lambda; // -2 l
    JacobianLocal[3][2] = 0; // 0
    JacobianLocal[3][3] = 2 * lambda; // +2 l
    JacobianLocal[3][4] = 0; // 0

    JacobianLocal[4][0] = 2 * (y2 + dy2 - y1 - dy1); // 2(y2+dy2-y1-dy1)
    JacobianLocal[4][1] = 0; // 0
    JacobianLocal[4][2] = -2 * lambda; // -2 l
    JacobianLocal[4][3] = 0; // 0
    JacobianLocal[4][4] = 2 * lambda;// +2 l

    F_Local[0] = Math.pow((x2+dx2 - x1-dx1), 2) + Math.pow((y2+dy2 - y1-dy1), 2) - length * length; 
    F_Local[1] = -2 * lambda * (x2+dx2 - x1-dx1);
    F_Local[2] = -2 * lambda * (y2+dy2 - y1-dy1);
    F_Local[3] = 2 * lambda * (x2+dx2 - x1-dx1);
    F_Local[4] = 2 * lambda * (y2+dy2 - y1-dy1);

    return({axisLocal, JacobianLocal, F_Local, dim});
}

export { getDerivativeFunction_Horizontal, getDerivativeFunction_Length };