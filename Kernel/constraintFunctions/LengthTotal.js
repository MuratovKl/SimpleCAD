import { ElementTypes } from "../../elements/ElementTypes.js";

/**
 * Function for LengthTotal constraint. 
 * This function fill local matrix J and vector F.
 * 
 * @param {Constraint} constraint 
 * @returns {Object} Object with axis names, local Jacobian and local vector F
 */
function getDerivativeFunction_LengthTotal(constraint, unknowns, axisGlobal) {
    // TODO optimize with one for `element loop

    for (let i = 0; i < constraint.elements.length; i++) {
        for (let j = i + 1; j < constraint.elements.length; j++) {
            if (constraint.elements[i] === constraint.elements[j]) {
                throw new Error("Constraint has same elements in elements array.\n" 
                + "Constraint id is " + constraint.id + "\nElement 1 is " + JSON.stringify(constraint.elements[i])
                + "\nElement 2 is " + JSON.stringify(constraint.elements[j]));
            }
        }
    }

    const axisLocal = [];
    axisLocal.push('lambda_' + constraint.id);
    for (const element of constraint.elements) {
        if (element.type === ElementTypes.ARC) {
            axisLocal.push('dR_' + element.id + '_' + element.type);
            axisLocal.push('dFi1_' + element.id + '_' + element.type);
            axisLocal.push('dFi2_' + element.id + '_' + element.type);
        } else if (element.type === ElementTypes.LINE) {
            const dx1Str = 'dx_' + element.p1.id;
            const dy1Str = 'dy_' + element.p1.id;
            const dx2Str = 'dx_' + element.p2.id;
            const dy2Str = 'dy_' + element.p2.id;

            const dx1StrInArray = axisLocal.find(
                strInArray => (strInArray === dx1Str));
            const dx2StrInArray = axisLocal.find(
                strInArray => (strInArray === dx2Str));
            if (!dx1StrInArray) {
                axisLocal.push(dx1Str);
                axisLocal.push(dy1Str);
            }
            if (!dx2StrInArray) {
                axisLocal.push(dx2Str);
                axisLocal.push(dy2Str);
            }
        }
    }
    const dim = axisLocal.length;

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

    const LT = constraint.value; // total length

    const lambda = unknowns[localToGlobal[0]];
    let f = 0;
    for (const element of constraint.elements) {
        if (element.type === ElementTypes.LINE) {
            const x1 = element.p1.x; 
            const y1 = element.p1.y; 
            const x2 = element.p2.x; 
            const y2 = element.p2.y; 
            const dx1 = unknowns[localToGlobal[axisLocal.indexOf('dx_' + element.p1.id)]];
            const dy1 = unknowns[localToGlobal[axisLocal.indexOf('dy_' + element.p1.id)]];
            const dx2 = unknowns[localToGlobal[axisLocal.indexOf('dx_' + element.p2.id)]];
            const dy2 = unknowns[localToGlobal[axisLocal.indexOf('dy_' + element.p2.id)]];
            
            f += Math.sqrt((x2 + dx2 - x1 - dx1)**2 + (y2 + dy2 - y1 - dy1)**2);
        } else if (element.type === ElementTypes.ARC) {
            const R = element.R;
            let fi1 = element.fi1;
            let fi2 = element.fi2;
            if (element.angleMode && element.angleMode == 'DEG') {
                fi1 *= Math.PI / 180;
                fi2 *= Math.PI / 180;
            }
                    
            const dR = unknowns[localToGlobal[axisLocal.indexOf('dR_' + element.id + '_' + element.type)]];
            const dFi1 = unknowns[localToGlobal[axisLocal.indexOf('dFi1_' + element.id + '_' + element.type)]];
            const dFi2 = unknowns[localToGlobal[axisLocal.indexOf('dFi2_' + element.id + '_' + element.type)]];

            f += (R + dR) * Math.abs(fi2 + dFi2 - fi1 - dFi1);
        }
    }
    f -= LT; // f = Σ(legth of elements) - L(total) = 0

    F_Local[0] = f;
    let curIdx = 0;
    for (const element of constraint.elements) {
        if (element.type === ElementTypes.LINE) {
            const x1 = element.p1.x; 
            const y1 = element.p1.y; 
            const x2 = element.p2.x; 
            const y2 = element.p2.y; 
            const dx1 = unknowns[localToGlobal[axisLocal.indexOf('dx_' + element.p1.id)]];
            const dy1 = unknowns[localToGlobal[axisLocal.indexOf('dy_' + element.p1.id)]];
            const dx2 = unknowns[localToGlobal[axisLocal.indexOf('dx_' + element.p2.id)]];
            const dy2 = unknowns[localToGlobal[axisLocal.indexOf('dy_' + element.p2.id)]];

            const tmpDX = (x2 + dx2 - x1 - dx1);
            const tmpDY = (y2 + dy2 - y1 - dy1);
            const tmpL = Math.sqrt(tmpDX**2 + tmpDY**2);

            F_Local[curIdx + 1] = -lambda * tmpDX / tmpL;
            F_Local[curIdx + 2] = -lambda * tmpDY / tmpL;
            F_Local[curIdx + 3] = lambda * tmpDX / tmpL;
            F_Local[curIdx + 4] = lambda * tmpDY / tmpL;

            curIdx += 4;
        } else if (element.type === ElementTypes.ARC) {
            const R = element.R;
            let fi1 = element.fi1;
            let fi2 = element.fi2;
            if (element.angleMode && element.angleMode == 'DEG') {
                fi1 *= Math.PI / 180;
                fi2 *= Math.PI / 180;
            }
                    
            const dR = unknowns[localToGlobal[axisLocal.indexOf('dR_' + element.id + '_' + element.type)]];
            const dFi1 = unknowns[localToGlobal[axisLocal.indexOf('dFi1_' + element.id + '_' + element.type)]];
            const dFi2 = unknowns[localToGlobal[axisLocal.indexOf('dFi2_' + element.id + '_' + element.type)]];

            const signum = Math.sign(fi2 + dFi2 - fi1 - dFi1);

            F_Local[curIdx + 1] = lambda * Math.abs(fi2 + dFi2 - fi1 - dFi1);
            F_Local[curIdx + 2] = -lambda * (R + dR) * signum;
            F_Local[curIdx + 3] = lambda * (R + dR) * signum;

            curIdx += 3;
        }
    }

    for (const element of constraint.elements) {
        const tmpAxis = [];
        tmpAxis.push('lambda_' + constraint.id);
        if (element.type === ElementTypes.LINE) {
            tmpAxis.push('dx_' + element.p1.id);
            tmpAxis.push('dy_' + element.p1.id);
            tmpAxis.push('dx_' + element.p2.id);
            tmpAxis.push('dy_' + element.p2.id);

            const tmpToLocal = new Array(tmpAxis.length);
            for (let i = 0; i < tmpAxis.length; i++) {
                tmpToLocal[i] = axisLocal.indexOf(tmpAxis[i]);
            }

            const x1 = element.p1.x; 
            const y1 = element.p1.y; 
            const x2 = element.p2.x; 
            const y2 = element.p2.y; 
            const dx1 = unknowns[localToGlobal[axisLocal.indexOf('dx_' + element.p1.id)]];
            const dy1 = unknowns[localToGlobal[axisLocal.indexOf('dy_' + element.p1.id)]];
            const dx2 = unknowns[localToGlobal[axisLocal.indexOf('dx_' + element.p2.id)]];
            const dy2 = unknowns[localToGlobal[axisLocal.indexOf('dy_' + element.p2.id)]];

            const tmpDX = (x2 + dx2 - x1 - dx1);
            const tmpDY = (y2 + dy2 - y1 - dy1);
            const tmpL = Math.sqrt(tmpDX**2 + tmpDY**2);
            const tmpL_3 = Math.pow(tmpL, 3);
            
            JacobianLocal[tmpToLocal[0]][tmpToLocal[1]] += -tmpDX / tmpL;
            JacobianLocal[tmpToLocal[0]][tmpToLocal[2]] += -tmpDY / tmpL;
            JacobianLocal[tmpToLocal[0]][tmpToLocal[3]] += tmpDX / tmpL;
            JacobianLocal[tmpToLocal[0]][tmpToLocal[4]] += tmpDY / tmpL;

            JacobianLocal[tmpToLocal[1]][tmpToLocal[0]] += -tmpDX / tmpL;
            JacobianLocal[tmpToLocal[1]][tmpToLocal[1]] += -lambda * (tmpDX * tmpDX / tmpL_3 - 1/tmpL);
            JacobianLocal[tmpToLocal[1]][tmpToLocal[2]] += -lambda * (tmpDY * tmpDX / tmpL_3);
            JacobianLocal[tmpToLocal[1]][tmpToLocal[3]] += -lambda * (-tmpDX * tmpDX / tmpL_3 + 1/tmpL);
            JacobianLocal[tmpToLocal[1]][tmpToLocal[4]] += -lambda * (-tmpDY * tmpDX / tmpL_3);
            
            JacobianLocal[tmpToLocal[2]][tmpToLocal[0]] += -tmpDY / tmpL;
            JacobianLocal[tmpToLocal[2]][tmpToLocal[1]] += -lambda * (tmpDX * tmpDY / tmpL_3);
            JacobianLocal[tmpToLocal[2]][tmpToLocal[2]] += -lambda * (tmpDY * tmpDY / tmpL_3 - 1/tmpL);
            JacobianLocal[tmpToLocal[2]][tmpToLocal[3]] += -lambda * (-tmpDX * tmpDY / tmpL_3);
            JacobianLocal[tmpToLocal[2]][tmpToLocal[4]] += -lambda * (-tmpDY * tmpDY / tmpL_3 + 1/tmpL);

            JacobianLocal[tmpToLocal[3]][tmpToLocal[0]] += tmpDX / tmpL;
            JacobianLocal[tmpToLocal[3]][tmpToLocal[1]] += lambda * (tmpDX * tmpDX / tmpL_3 - 1/tmpL);
            JacobianLocal[tmpToLocal[3]][tmpToLocal[2]] += lambda * (tmpDY * tmpDX / tmpL_3);
            JacobianLocal[tmpToLocal[3]][tmpToLocal[3]] += lambda * (-tmpDX * tmpDX / tmpL_3 + 1/tmpL);
            JacobianLocal[tmpToLocal[3]][tmpToLocal[4]] += lambda * (-tmpDY * tmpDX / tmpL_3);
            
            JacobianLocal[tmpToLocal[4]][tmpToLocal[0]] += tmpDY / tmpL;
            JacobianLocal[tmpToLocal[4]][tmpToLocal[1]] += lambda * (tmpDX * tmpDY / tmpL_3);
            JacobianLocal[tmpToLocal[4]][tmpToLocal[2]] += lambda * (tmpDY * tmpDY / tmpL_3 - 1/tmpL);
            JacobianLocal[tmpToLocal[4]][tmpToLocal[3]] += lambda * (-tmpDX * tmpDY / tmpL_3);
            JacobianLocal[tmpToLocal[4]][tmpToLocal[4]] += lambda * (-tmpDY * tmpDY / tmpL_3 + 1/tmpL);

        } else if (element.type === ElementTypes.ARC) {
            tmpAxis.push('dR_' + element.id + '_' + element.type);
            tmpAxis.push('dFi1_' + element.id + '_' + element.type);
            tmpAxis.push('dFi2_' + element.id + '_' + element.type);
            
            const tmpToLocal = new Array(tmpAxis.length);
            for (let i = 0; i < tmpAxis.length; i++) {
                tmpToLocal[i] = axisLocal.indexOf(tmpAxis[i]);
            }

            const R = element.R;
            let fi1 = element.fi1;
            let fi2 = element.fi2;
            if (element.angleMode && element.angleMode == 'DEG') {
                fi1 *= Math.PI / 180;
                fi2 *= Math.PI / 180;
            }
                    
            const dR = unknowns[localToGlobal[axisLocal.indexOf('dR_' + element.id + '_' + element.type)]];
            const dFi1 = unknowns[localToGlobal[axisLocal.indexOf('dFi1_' + element.id + '_' + element.type)]];
            const dFi2 = unknowns[localToGlobal[axisLocal.indexOf('dFi2_' + element.id + '_' + element.type)]];

            const deltaFi = fi2 + dFi2 - fi1 - dFi1;
            const signum = Math.sign(deltaFi);
            
            JacobianLocal[tmpToLocal[0]][tmpToLocal[1]] += Math.abs(deltaFi);
            JacobianLocal[tmpToLocal[0]][tmpToLocal[2]] += -(R + dR) * signum;
            JacobianLocal[tmpToLocal[0]][tmpToLocal[3]] += (R + dR) * signum;

            JacobianLocal[tmpToLocal[1]][tmpToLocal[0]] += Math.abs(deltaFi);
            JacobianLocal[tmpToLocal[1]][tmpToLocal[2]] += -lambda * signum;
            JacobianLocal[tmpToLocal[1]][tmpToLocal[3]] += lambda * signum;

            JacobianLocal[tmpToLocal[2]][tmpToLocal[0]] += -(R + dR) * signum;
            JacobianLocal[tmpToLocal[2]][tmpToLocal[1]] += -lambda * signum;
            
            JacobianLocal[tmpToLocal[3]][tmpToLocal[0]] += (R + dR) * signum;
            JacobianLocal[tmpToLocal[3]][tmpToLocal[1]] += lambda * signum;

        }
    }

    return({axisLocal, JacobianLocal, F_Local, dim, localToGlobal});
}

export { getDerivativeFunction_LengthTotal };
