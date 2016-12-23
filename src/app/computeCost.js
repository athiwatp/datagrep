import { errors } from '../utils/common';
import { multiply, numRows, subtract, square } from '../utils/linearAlgebra';

export default (X, y, theta) => {
    let m = numRows(X),
        _errors = errors(X, theta, y),
        cost = 1/(2*m) * square(_errors);

    return cost;
}
