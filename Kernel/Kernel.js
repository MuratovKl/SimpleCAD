import { PointUsedInConstraints } from './PointUsedInConstraints.js'

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
        this._fillAxissGlobalArray(axis_Global, pointsUsedInConstraints, constraints);

        const arraySize = axis_Global.length; // size for Jacobian(n x n) and F (n).
        
        // creating Jacobian and F with zeros
        const Jacobian = new Array(arraySize);
        const F = new Array(arraySize);
        for (let i = 0; i < arraySize; i++) {
            F[i] = 0;
            Jacobian[i] = new Array(arraySize);
            for (let j = 0; j < arraySize; j++) {
                Jacobian[i][j] = 0;
            }
        }

    }

    /**
     * Initialization of Axis array. e.g. ['lambda_1', 'lambda_2', 'dx_1', 'dy_1', 'dx_2', 'dy_2']
     * 
     * @param {Array<String>} axisGlobal 
     * @param {Array<{String, bool, bool}>} pointsUsedInConstraints 
     * @param {Array<Constraint>} constraints 
     */
    _fillAxissGlobalArray(axisGlobal, pointsUsedInConstraints, constraints) {
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
