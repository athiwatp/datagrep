import { dot, subtract } from './linearAlgebra';

export {
    errors
};

function errors(X, theta, y) {
    return subtract(dot(X, theta), y);
}