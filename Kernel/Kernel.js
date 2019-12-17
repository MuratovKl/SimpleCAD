import { PointUsedInConstraints } from './PointUsedInConstraints.js'
import { getDerivativeFunction_Horizontal, getDerivativeFunction_Length } from './constraintFunctions.js'

/**
 * Kernel of CAD system
 */
class Kernel {
    
    /**
     * main method of Kernel for solving
     * 
     * @throws {Error} Will throw if System cannot be solved
     * @param {Array<Point>} points points which should be modified by constraints 
     * @param {Array<Constraint>} constraints constraints
     */
    slove(points, constraints) {
        
        const pointsUsedInConstraints = [];
        this._pointsUsedInConstraints(pointsUsedInConstraints, constraints)
        const axis_Global = [];
        this._fillAxisGlobalArray(axis_Global, pointsUsedInConstraints, constraints);

        const arraySize = axis_Global.length; // size for Jacobian(n x n) and F (n).
        
        // creating Jacobian and F with zeros
        const Jacobian = new Array(arraySize);
        for (let i = 0; i < arraySize; i++) {
            Jacobian[i] = new Array(arraySize);;
        }
        this._fill2dArrayWithNumber(Jacobian, arraySize, arraySize, 0);
        const F = new Array(arraySize);
        this._fillVectorWithNumber(F, arraySize, 0);

        this._fillJacobianAndFbyConstraints(Jacobian, F, axis_Global, constraints);

        console.log(axis_Global);
        console.log({Jacobian});
        console.log({F});
    }

    _fillJacobianAndFbyConstraints(Jacobian, F, globalAxis, constraints) {
        for (let constraint of constraints) {
            let constraintFunction;
            switch (constraint.type) {
                case 'horizontal':
                    constraintFunction = getDerivativeFunction_Horizontal(constraint);
                    break;
                case 'length':
                    constraintFunction = getDerivativeFunction_Length(constraint);
                    break;

                default:
                    break;
            }
            
            if (constraintFunction) {
                this._fillGlobalByLocal(Jacobian, F, globalAxis, constraintFunction);
            }
        }

        // add +1 for diagonal elements in Jacobian (without lambda)
        for (let k = constraints.length; k < globalAxis.length; k++) {
            Jacobian[k][k] += 1;
        }
        // TODO add +dx_i and +dy_i in F[i]
        // for (let k = constraints.length; k < globalAxis.length; k++) {
            
        // }
    }

    // Ансамблирование общей и локальной матиц
    _fillGlobalByLocal(globalJacobian, globalF, globalAxis, constraintFunction) {
        // Получение соответвия локальных и глобальных индексов
        const localToGlobal = new Array(constraintFunction.dim);
        for (let i = 0; i < constraintFunction.dim; i++) {
            localToGlobal[i] = globalAxis.indexOf(constraintFunction.axisLocal[i]);
        }

        // Jacobian
        for (let i = 0; i < constraintFunction.dim; i++) {
            for (let j = 0; j < constraintFunction.dim; j++) {
                globalJacobian[localToGlobal[i]][localToGlobal[j]] = constraintFunction.JacobianLocal[i][j];
            }
        }

        // vector F
        for (let i = 0; i < constraintFunction.dim; i++) {
            globalF[localToGlobal[i]] = constraintFunction.F_Local[i];
        }
    }

    _fill2dArrayWithNumber(array, dim1, dim2, number) {
        for (let i = 0; i < dim1; i++) {
            for (let j = 0; j < dim2; j++) {
                array[i][j] = number;
            }
        }
    }

    _fillVectorWithNumber(vector, dim, number) {
        for (let i = 0; i < dim; i++) {
            vector[i] = number;
        }
    }

    /**
     * Initialization of Axis array. e.g. ['lambda_1', 'lambda_2', 'dx_1', 'dy_1', 'dx_2', 'dy_2']
     * 
     * @param {Array<String>} axisGlobal 
     * @param {Array<{String, bool, bool}>} pointsUsedInConstraints 
     * @param {Array<Constraint>} constraints 
     */
    _fillAxisGlobalArray(axisGlobal, pointsUsedInConstraints, constraints) {
        for (let constraint of constraints) {
            axisGlobal.push("lambda_" + constraint.id);
        }
        for (let point of pointsUsedInConstraints) {
            if (point.dx) {
                axisGlobal.push("dx_" + point.id);
            }
            if (point.dy) {
                axisGlobal.push("dy_" + point.id);
            }
        }
    }

    /**
     * defining points that are in constraints
     * 
     * @param {Array<{String, bool, bool}>} pointsUsedInConstraints
     * @param {Array<Constraint>} constraints 
     */
    _pointsUsedInConstraints(pointsUsedInConstraints, constraints) {
        for (let constraint of constraints) {
            const pointsInConstraint = constraint.points;
            for (let point of pointsInConstraint) {
                let pointUsedInConstraints = pointsUsedInConstraints.find(elem => elem.id == point.id);
                if (!pointUsedInConstraints) {
                    pointUsedInConstraints = new PointUsedInConstraints(point.id);
                    pointsUsedInConstraints.push(pointUsedInConstraints);
                }
                switch (constraint.type) {
                    case 'horizontal':
                        pointUsedInConstraints.dy = true;
                        break;
                    case 'length':
                        pointUsedInConstraints.dx = true;
                        pointUsedInConstraints.dy = true;
                        break;
                }
            }
        }
    }
}

export {Kernel};
