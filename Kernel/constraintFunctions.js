/**
 * Function for Horizontal constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_Horizontal(constraint, unknowns, axisGlobal) {
    const dim = 3;

    const axisLocal = [];
    axisLocal.push('lambda_' + constraint.id);
    for (let i = 0; i < constraint.points.length; i++) {
        axisLocal.push('dy_' + constraint.points[i].id);
    }
    const localToGlobal = new Array(dim);
    for (let i = 0; i < dim; i++) {
        localToGlobal[i] = axisGlobal.indexOf(axisLocal[i]);
    }

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

    const y1 = constraint.points[0].y;
    const y2 = constraint.points[1].y;
    const lambda = unknowns[localToGlobal[0]];
    const dy1 = unknowns[localToGlobal[1]];
    const dy2 = unknowns[localToGlobal[2]];
    F_Local[0] = y2 + dy2 - y1 - dy1;
    F_Local[1] = -lambda; // -l
    F_Local[2] = lambda; // +l

    return({axisLocal, JacobianLocal, F_Local, dim, localToGlobal});
}

/**
 * Function for Length constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_Length(constraint, unknowns, axisGlobal) {
    const dim = 5;

    const axisLocal = [];
    axisLocal.push('lambda_' + constraint.id);
    for (let i = 0; i < constraint.points.length; i++) {
        axisLocal.push('dx_' + constraint.points[i].id);
        axisLocal.push('dy_' + constraint.points[i].id);
    }
    const localToGlobal = new Array(dim);
    for (let i = 0; i < dim; i++) {
        localToGlobal[i] = axisGlobal.indexOf(axisLocal[i]);
    }

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

    const lambda = unknowns[localToGlobal[0]];
    const dx1 = unknowns[localToGlobal[1]];
    const dy1 = unknowns[localToGlobal[2]];
    const dx2 = unknowns[localToGlobal[3]];
    const dy2 = unknowns[localToGlobal[4]];

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

    return({axisLocal, JacobianLocal, F_Local, dim, localToGlobal});
}

/**
 * Function for FixPoint constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_FixPoint(constraint, unknowns, axisGlobal) {
    const dim = 4;

    if(constraint.points.length !== 1) {
        throw new Error("getDerivativeFunction_FixPoint: not 1 point in constraint")
    }
    
    const axisLocal = [];
    axisLocal.push('lambda_' + constraint.id + '_1');
    axisLocal.push('lambda_' + constraint.id + '_2');
    axisLocal.push('dx_' + constraint.points[0].id);
    axisLocal.push('dy_' + constraint.points[0].id);
    const localToGlobal = new Array(dim);
    for (let i = 0; i < dim; i++) {
        localToGlobal[i] = axisGlobal.indexOf(axisLocal[i]);
    }

    const JacobianLocal = new Array(dim);
    const F_Local = new Array(dim);
    for (let i = 0; i < dim; i++) {
        F_Local[i] = 0;
        JacobianLocal[i] = new Array(dim);
        for (let j = 0; j < dim; j++) {
            JacobianLocal[i][j] = 0;
        }
    }

    JacobianLocal[0][2] = 1;
    JacobianLocal[1][3] = 1;
    JacobianLocal[2][0] = 1;
    JacobianLocal[3][1] = 1;

    // const x = constraint.points[0].x;
    // const y = constraint.points[0].y;
    const lambda1 = unknowns[localToGlobal[0]];
    const lambda2 = unknowns[localToGlobal[1]];
    const dx = unknowns[localToGlobal[2]];
    const dy = unknowns[localToGlobal[3]];
    F_Local[0] = dx;
    F_Local[1] = dy; // -l
    F_Local[2] = lambda1; // +l
    F_Local[3] = lambda2; // +l

    return({axisLocal, JacobianLocal, F_Local, dim, localToGlobal});
}

/**
 * Function for Vertical constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_Vertical(constraint, unknowns, axisGlobal) {
    const dim = 3;

    const axisLocal = [];
    axisLocal.push('lambda_' + constraint.id);
    for (let i = 0; i < constraint.points.length; i++) {
        axisLocal.push('dx_' + constraint.points[i].id);
    }
    const localToGlobal = new Array(dim);
    for (let i = 0; i < dim; i++) {
        localToGlobal[i] = axisGlobal.indexOf(axisLocal[i]);
    }

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

    const x1 = constraint.points[0].x;
    const x2 = constraint.points[1].x;
    const lambda = unknowns[localToGlobal[0]];
    const dx1 = unknowns[localToGlobal[1]];
    const dx2 = unknowns[localToGlobal[2]];
    F_Local[0] = x2 + dx2 - x1 - dx1;
    F_Local[1] = -lambda; // -l
    F_Local[2] = lambda; // +l

    return({axisLocal, JacobianLocal, F_Local, dim, localToGlobal});
}

/**
 * Function for Coincident constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_Coincident(constraint, unknowns, axisGlobal) {
    const dim = 6;

    if(constraint.points.length !== 2) {
        throw new Error("getDerivativeFunction_Coincident: not 2 points in constraint")
    }
    
    const axisLocal = [];
    axisLocal.push('lambda_' + constraint.id + '_1');
    axisLocal.push('lambda_' + constraint.id + '_2');
    for (let i = 0; i < constraint.points.length; i++) {
        axisLocal.push('dx_' + constraint.points[i].id);
        axisLocal.push('dy_' + constraint.points[i].id);
    }
    const localToGlobal = new Array(dim);
    for (let i = 0; i < dim; i++) {
        localToGlobal[i] = axisGlobal.indexOf(axisLocal[i]);
    }

    const JacobianLocal = new Array(dim);
    const F_Local = new Array(dim);
    for (let i = 0; i < dim; i++) {
        F_Local[i] = 0;
        JacobianLocal[i] = new Array(dim);
        for (let j = 0; j < dim; j++) {
            JacobianLocal[i][j] = 0;
        }
    }

    JacobianLocal[0][2] = -1;
    JacobianLocal[0][4] = 1;
    JacobianLocal[1][3] = -1;
    JacobianLocal[1][5] = 1;
    JacobianLocal[2][0] = -1;
    JacobianLocal[3][1] = -1;
    JacobianLocal[4][0] = 1;
    JacobianLocal[5][1] = 1;

    const x1 = constraint.points[0].x;
    const y1 = constraint.points[0].y;
    const x2 = constraint.points[1].x;
    const y2 = constraint.points[1].y;
    const lambda1 = unknowns[localToGlobal[0]];
    const lambda2 = unknowns[localToGlobal[1]];
    const dx1 = unknowns[localToGlobal[2]];
    const dy1 = unknowns[localToGlobal[3]];
    const dx2 = unknowns[localToGlobal[4]];
    const dy2 = unknowns[localToGlobal[5]];
    F_Local[0] = x2 + dx2 - x1 - dx1;
    F_Local[1] = y2 + dy2 - y1 - dy1;
    F_Local[2] = -lambda1; // -l
    F_Local[3] = -lambda2; // -l
    F_Local[4] = lambda1; // +l
    F_Local[5] = lambda2; // +l

    return({axisLocal, JacobianLocal, F_Local, dim, localToGlobal});
}

/**
 * Function for Parallel constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_Parallel(constraint, unknowns, axisGlobal) {
    const dim = 9;

    const axisLocal = [];
    axisLocal.push('lambda_' + constraint.id);
    for (let i = 0; i < 2; i++) {
        axisLocal.push('dx_' + constraint.lines[i][0].id);
        axisLocal.push('dy_' + constraint.lines[i][0].id);
        axisLocal.push('dx_' + constraint.lines[i][1].id);
        axisLocal.push('dy_' + constraint.lines[i][1].id);
    }
    const localToGlobal = new Array(dim);
    for (let i = 0; i < dim; i++) {
        localToGlobal[i] = axisGlobal.indexOf(axisLocal[i]);
    }

    const JacobianLocal = new Array(dim);
    const F_Local = new Array(dim);
    for (let i = 0; i < dim; i++) {
        F_Local[i] = 0;
        JacobianLocal[i] = new Array(dim);
        for (let j = 0; j < dim; j++) {
            JacobianLocal[i][j] = 0;
        }
    }

    const line1 = constraint.lines[0];
    const line2 = constraint.lines[1];
    
    const x1_s = line1[0].x;
    const y1_s = line1[0].y;
    const x1_f = line1[1].x;
    const y1_f = line1[1].y
    const x2_s = line2[0].x;
    const y2_s = line2[0].y;
    const x2_f = line2[1].x;
    const y2_f = line2[1].y;

    const lambda = unknowns[localToGlobal[0]];
    const dx1_s = unknowns[localToGlobal[1]];
    const dy1_s = unknowns[localToGlobal[2]];
    const dx1_f = unknowns[localToGlobal[3]];
    const dy1_f = unknowns[localToGlobal[4]];
    const dx2_s = unknowns[localToGlobal[5]];
    const dy2_s = unknowns[localToGlobal[6]];
    const dx2_f = unknowns[localToGlobal[7]];
    const dy2_f = unknowns[localToGlobal[8]];
    
    const a_ = y2_s + dy2_s - y2_f - dy2_f;
    const b_ = -x2_s - dx2_s + x2_f + dx2_f;
    const c_ = -y2_s - dy2_s + y2_f + dy2_f;
    const d_ = x2_s + dx2_s - x2_f - dx2_f;
    const e_ = -y1_s - dy1_s + y1_f + dy1_f;
    const f_ = x1_s + dx1_s - x1_f - dx1_f;
    const g_ = y1_s + dy1_s - y1_f - dy1_f;
    const h_ = -x1_s - dx1_s + x1_f + dx1_f;

    // X1 * Y2 - X2 * Y1
    // F_Local[0] = (x1_s + dx1_s - x1_f - dx1_f)*(y2_s + dy2_s - y2_f - dy2_f) - (x2_s + dx2_s - x2_f - dx2_f)*(y1_s + dy1_s - y1_f - dy1_f);
    F_Local[0] = (y1_s + dy1_s - y1_f - dy1_f)*(x2_f + dx2_f - x2_s - dx2_s) - (y2_s + dy2_s - y2_f - dy2_f)*(x1_f + dx1_f - x1_s - dx1_s);
    F_Local[1] = lambda * a_;
    F_Local[2] = lambda * b_;
    F_Local[3] = lambda * c_;
    F_Local[4] = lambda * d_;
    F_Local[5] = lambda * e_;
    F_Local[6] = lambda * f_;
    F_Local[7] = lambda * g_;
    F_Local[8] = lambda * h_;

    JacobianLocal[0][1] = a_;
    JacobianLocal[0][2] = b_;
    JacobianLocal[0][3] = c_;
    JacobianLocal[0][4] = d_;
    JacobianLocal[0][5] = e_;
    JacobianLocal[0][6] = f_;
    JacobianLocal[0][7] = g_
    JacobianLocal[0][8] = h_;

    JacobianLocal[1][0] = a_;
    JacobianLocal[1][6] = lambda;
    JacobianLocal[1][8] = -lambda;
    
    JacobianLocal[2][0] = b_;
    JacobianLocal[2][5] = -lambda;
    JacobianLocal[2][7] = lambda;

    JacobianLocal[3][0] = c_;
    JacobianLocal[3][6] = -lambda;
    JacobianLocal[3][8] = lambda;
    
    JacobianLocal[4][0] = d_;
    JacobianLocal[4][5] = lambda;
    JacobianLocal[4][7] = -lambda;
    
    JacobianLocal[5][0] = e_;
    JacobianLocal[5][2] = -lambda;
    JacobianLocal[5][4] = lambda;
    
    JacobianLocal[6][0] = f_;
    JacobianLocal[6][1] = lambda;
    JacobianLocal[6][3] = -lambda;

    JacobianLocal[7][0] = g_;
    JacobianLocal[7][2] = lambda;
    JacobianLocal[7][4] = -lambda;

    JacobianLocal[8][0] = h_;
    JacobianLocal[8][1] = -lambda;
    JacobianLocal[8][3] = lambda;

    return({axisLocal, JacobianLocal, F_Local, dim, localToGlobal});
}

/**
 * Function for Parallel constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_Perpendicular(constraint, unknowns, axisGlobal) {
    const dim = 9;

    const axisLocal = [];
    axisLocal.push('lambda_' + constraint.id);
    for (let i = 0; i < 2; i++) {
        axisLocal.push('dx_' + constraint.lines[i][0].id);
        axisLocal.push('dy_' + constraint.lines[i][0].id);
        axisLocal.push('dx_' + constraint.lines[i][1].id);
        axisLocal.push('dy_' + constraint.lines[i][1].id);
    }
    const localToGlobal = new Array(dim);
    for (let i = 0; i < dim; i++) {
        localToGlobal[i] = axisGlobal.indexOf(axisLocal[i]);
    }

    const JacobianLocal = new Array(dim);
    const F_Local = new Array(dim);
    for (let i = 0; i < dim; i++) {
        F_Local[i] = 0;
        JacobianLocal[i] = new Array(dim);
        for (let j = 0; j < dim; j++) {
            JacobianLocal[i][j] = 0;
        }
    }

    const line1 = constraint.lines[0];
    const line2 = constraint.lines[1];
    
    const x1_s = line1[0].x;
    const y1_s = line1[0].y;
    const x1_f = line1[1].x;
    const y1_f = line1[1].y
    const x2_s = line2[0].x;
    const y2_s = line2[0].y;
    const x2_f = line2[1].x;
    const y2_f = line2[1].y;

    const lambda = unknowns[localToGlobal[0]];
    const dx1_s = unknowns[localToGlobal[1]];
    const dy1_s = unknowns[localToGlobal[2]];
    const dx1_f = unknowns[localToGlobal[3]];
    const dy1_f = unknowns[localToGlobal[4]];
    const dx2_s = unknowns[localToGlobal[5]];
    const dy2_s = unknowns[localToGlobal[6]];
    const dx2_f = unknowns[localToGlobal[7]];
    const dy2_f = unknowns[localToGlobal[8]];
    
    const a_ = x2_s + dx2_s - x2_f - dx2_f;
    const b_ = y2_s + dy2_s - y2_f - dy2_f;
    const c_ = -x2_s - dx2_s + x2_f + dx2_f;
    const d_ = -y2_s - dy2_s + y2_f + dy2_f;
    const e_ = x1_s + dx1_s - x1_f - dx1_f;
    const f_ = y1_s + dy1_s - y1_f - dy1_f;
    const g_ = -x1_s - dx1_s + x1_f + dx1_f;
    const h_ = -y1_s - dy1_s + y1_f + dy1_f;

    // X1 * Y2 - X2 * Y1
    F_Local[0] = (x1_f + dx1_f - x1_s - dx1_s)*(x2_f + dx2_f - x2_s - dx2_s) + (y1_f + dy1_f - y1_s - dy1_s)*(y2_f + dy2_f - y2_s - dy2_s)
    F_Local[1] = lambda * a_;
    F_Local[2] = lambda * b_;
    F_Local[3] = lambda * c_;
    F_Local[4] = lambda * d_;
    F_Local[5] = lambda * e_;
    F_Local[6] = lambda * f_;
    F_Local[7] = lambda * g_;
    F_Local[8] = lambda * h_;

    JacobianLocal[0][1] = a_;
    JacobianLocal[0][2] = b_;
    JacobianLocal[0][3] = c_;
    JacobianLocal[0][4] = d_;
    JacobianLocal[0][5] = e_;
    JacobianLocal[0][6] = f_;
    JacobianLocal[0][7] = g_
    JacobianLocal[0][8] = h_;

    JacobianLocal[1][0] = a_;
    JacobianLocal[1][5] = lambda;
    JacobianLocal[1][7] = -lambda;
    
    JacobianLocal[2][0] = b_;
    JacobianLocal[2][6] = lambda;
    JacobianLocal[2][8] = -lambda;

    JacobianLocal[3][0] = c_;
    JacobianLocal[3][5] = -lambda;
    JacobianLocal[3][7] = lambda;
    
    JacobianLocal[4][0] = d_;
    JacobianLocal[4][6] = -lambda;
    JacobianLocal[4][8] = lambda;
    
    JacobianLocal[5][0] = e_;
    JacobianLocal[5][1] = lambda;
    JacobianLocal[5][3] = -lambda;
    
    JacobianLocal[6][0] = f_;
    JacobianLocal[6][2] = lambda;
    JacobianLocal[6][4] = -lambda;

    JacobianLocal[7][0] = g_;
    JacobianLocal[7][1] = -lambda;
    JacobianLocal[7][3] = lambda;

    JacobianLocal[8][0] = h_;
    JacobianLocal[8][2] = -lambda;
    JacobianLocal[8][4] = lambda;

    return({axisLocal, JacobianLocal, F_Local, dim, localToGlobal});
}

export {
    getDerivativeFunction_Horizontal,
    getDerivativeFunction_Length,
    getDerivativeFunction_FixPoint,
    getDerivativeFunction_Vertical,
    getDerivativeFunction_Coincident,
    getDerivativeFunction_Parallel,
    getDerivativeFunction_Perpendicular,
};
