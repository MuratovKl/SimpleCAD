import { PointUsedInConstraints } from './PointUsedInConstraints.js';
import { 
        getDerivativeFunction_Horizontal,
        getDerivativeFunction_Length,
        getDerivativeFunction_FixPoint, 
        getDerivativeFunction_Vertical,
        getDerivativeFunction_Coincident
    } from './constraintFunctions.js';
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
    solve(points, constraints) {
        const pointsUsedInConstraints = [];
        this._pointsUsedInConstraints(pointsUsedInConstraints, constraints);
        const axisGlobal = [];
        this._fillAxisGlobalArray(axisGlobal, pointsUsedInConstraints, constraints);

        let deltas
        try {
            deltas = this._NewtonMethod(axisGlobal, constraints, 10, 1e-3);
        } catch (e) {
            throw e;
        }

        this._assignDeltasToPoints(deltas, points, axisGlobal);

    }

    _assignDeltasToPoints(deltas, points, axisGlobal) {
        let name;
        let idStr;
        for (let i = 0; i < axisGlobal.length; i++) {
            [name, idStr] = axisGlobal[i].split('_'); // dx_1 etc.
            if (!isNaN(idStr) && name) {
                let idx;
                switch (name) {
                    case 'dx':
                        idx = points.findIndex(point => {
                                let id = Number.parseInt(idStr);
                                return point.id === id;
                            });
                        if (idx != -1) {
                            points[idx].x += deltas[i];
                        }
                        break;
                    case 'dy':
                        idx = points.findIndex(point => {
                                let id = Number.parseInt(idStr);
                                return point.id === id;
                            });
                        if (idx != -1) {
                            points[idx].y += deltas[i];
                        }
                        break;

                    default:
                        break;
                }
            }
        }
    }

    _NewtonMethod(axisGlobal, constraints, maxK, epsilon) {
        let k = 0;
        let S = epsilon + 1;
        
        const arraySize = axisGlobal.length; // size for Jacobian(n x n) and F (n).
        
        // creating Jacobian and F with zeros
        const Jacobian = new Array(arraySize);
        for (let i = 0; i < arraySize; i++) {
            Jacobian[i] = new Array(arraySize);
        }
        const F = new Array(arraySize);
        const X = new Array(arraySize);
        let deltaX = new Array(arraySize);
        this._fillVectorWithNumber(X, arraySize, 0);
        this._fillVectorWithNumber(deltaX, arraySize, 0);
        
        while (k < maxK && S > epsilon) {
            this._fill2dArrayWithNumber(Jacobian, arraySize, arraySize, 0);
            this._fillVectorWithNumber(F, arraySize, 0);

            this._fillJacobianAndFbyConstraints(Jacobian, F, axisGlobal, constraints, X);

            // F = -F   (J*dX = -F)
            for (let i = 0; i < F.length; i++) {
                F[i] = F[i] * -1;
            }

            // solving equation system
            try {
                deltaX = this._solveSystemOfEquation(Jacobian, F);
            } catch (e) {
                throw e;
            }

            // X = X_prev + deltaX
            for (let i = 0; i < X.length; i++) {
                X[i] += deltaX[i];
            }

            S = this._calcNorm(deltaX)
            k++;
        }
        
        // check. Why loop has been finished
        if (S > epsilon) {
            throw Error('NewtonMethod: Can\'t solve.' + 
                '\nS > epsilon: epsilon=' + epsilon + ' S='+S + '\nIterations: ' + maxK);
        }

        return X;
    }

    _calcNorm(vector) {
        return this._supremumNorm(vector);
    }

    _supremumNorm(vector) {
        let max = 0;
        for (let i = 0; i < vector.length; i++) {
            const abs = Math.abs(vector[i]);
            if (abs > max) {
                max = abs;
            }
        }
        
        return max;
    }

    _solveSystemOfEquation(A, B) {
        return this._solveSystemByGauss(A, B);
    }

    
    _solveSystemByGauss(A, B) {
        if (A.length !== B.length || A[0].length !== B.length) {
            throw new Error("Gauss solver: A and B should be same size");
        }
        
        const dim = A.length;

        // Direct step
        for(let i = 0; i < dim; i++) {

            // main element choising and swapping
            let maxAbsIndex = i;
            for (let k = i+1; k < dim; k++) {
                if (Math.abs(A[k][i]) > Math.abs(A[maxAbsIndex][i])) {
                    maxAbsIndex = k;
                }
            }
            if (maxAbsIndex !== i) {
                let tmp = A[i];
                A[i] = A[maxAbsIndex];
                A[maxAbsIndex] = tmp;

                tmp = B[i];
                B[i] = B[maxAbsIndex];
                B[maxAbsIndex] = tmp;
            }
            // end main element choising and swapping

            if (A[i][i] == 0) {
                // throw new Error('Gauss: A[' + i + '][' + i + '] = 0');
                A[i][i] = 1e-12; // TODO something.
            }
            
            for (let j = i+1; j < dim; j++) {
                const coeffA = A[j][i] / A[i][i];
                for (let k = i; k < dim; k++) {
                    A[j][k] = A[j][k] - coeffA * A[i][k];
                }
                B[j] = B[j] - coeffA * B[i];
            }
        }

        // Reverse step
        const X = new Array(dim);

        X[dim-1] = B[dim-1] / A[dim-1][dim-1];
        for (let n = dim - 2; n >= 0; n--) {
            let subSum = 0;
            for (let k = n + 1; k < dim; k++) {
                subSum += A[n][k] * X[k];
            }
            X[n] = (B[n] - subSum) / A[n][n];
        }

        return X;
    }

    _fillJacobianAndFbyConstraints(Jacobian, F, globalAxis, constraints, unknowns) {
        for (let constraint of constraints) {
            let constraintFunction;
            switch (constraint.type) {
                case 'HORIZONTAL':
                    constraintFunction = getDerivativeFunction_Horizontal(constraint, unknowns, globalAxis);
                    break;
                case 'VERTICAL':
                    constraintFunction = getDerivativeFunction_Vertical(constraint, unknowns, globalAxis);
                    break;
                case 'LENGTH':
                    constraintFunction = getDerivativeFunction_Length(constraint, unknowns, globalAxis);
                    break;
                case 'FIX_POINT':
                    constraintFunction = getDerivativeFunction_FixPoint(constraint, unknowns, globalAxis);
                    break;
                case 'COINCIDENT':
                    constraintFunction = getDerivativeFunction_Coincident(constraint, unknowns, globalAxis);
                    break;

                default:
                    break;
            }
            
            if (constraintFunction) {
                this._fillGlobalByLocal(Jacobian, F, constraintFunction);
            }
        }

        const startDXorDY = globalAxis.findIndex(el => { return (el[0] === 'd') })

        // add +1 for diagonal elements in Jacobian (without lambda)
        for (let k = startDXorDY; k < globalAxis.length; k++) {
            Jacobian[k][k] += 1;
        }
        // add +dx_i and +dy_i in F[i]
        for (let k = startDXorDY; k < globalAxis.length; k++) {
            F[k] += unknowns[k];
        }
    }

    // Ансамблирование общей и локальной матиц
    _fillGlobalByLocal(globalJacobian, globalF, constraintFunction) {
        // Получение соответвия локальных и глобальных индексов
        const localToGlobal = constraintFunction.localToGlobal;

        // Jacobian
        for (let i = 0; i < constraintFunction.dim; i++) {
            for (let j = 0; j < constraintFunction.dim; j++) {
                globalJacobian[localToGlobal[i]][localToGlobal[j]] += constraintFunction.JacobianLocal[i][j];
            }
        }

        // vector F
        for (let i = 0; i < constraintFunction.dim; i++) {
            globalF[localToGlobal[i]] += constraintFunction.F_Local[i];
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
            switch (constraint.type) {
                case 'FIX_POINT':
                    axisGlobal.push('lambda_' + constraint.id + '_1');
                    axisGlobal.push('lambda_' + constraint.id + '_2');
                    break;
                case 'COINCIDENT':
                    axisGlobal.push('lambda_' + constraint.id + '_1');
                    axisGlobal.push('lambda_' + constraint.id + '_2');
                    break;
                default:
                    axisGlobal.push('lambda_' + constraint.id);
                    break;
            }
        }
        for (let point of pointsUsedInConstraints) {
            if (point.dx) {
                axisGlobal.push('dx_' + point.id);
            }
            if (point.dy) {
                axisGlobal.push('dy_' + point.id);
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
                    case 'HORIZONTAL':
                        pointUsedInConstraints.dy = true;
                        break;
                    case 'VERTICAL':
                        pointUsedInConstraints.dx = true;
                        break;
                    case 'LENGTH':
                        pointUsedInConstraints.dx = true;
                        pointUsedInConstraints.dy = true;
                        break;
                    case 'FIX_POINT':
                        pointUsedInConstraints.dx = true;
                        pointUsedInConstraints.dy = true;
                        break;
                    case 'COINCIDENT':
                        pointUsedInConstraints.dx = true;
                        pointUsedInConstraints.dy = true;
                        break;
                }
            }
        }
    }
}

export {Kernel};
