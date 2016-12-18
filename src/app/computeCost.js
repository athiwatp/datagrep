import { numRows } from '../utils/linearAlgebra';

export default (X, y, theta) => {
    let errors = X.dot(theta.T).subtract(y),
        cost = 1/(2*numRows(X)) * (errors).T.dot(errors).tolist()[0][0];

    return cost;
}
