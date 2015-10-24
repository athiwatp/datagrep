var numbers = require('numbers'),
    matrix = numbers.matrix;

function validate(options) {
    if (!options) {
        throw 'options is required';
    }
    if (!options.x) {
        throw 'x is required';
    }
    if (options.x instanceof Array === false) {
        throw 'x must be an Array';
    }
    if (!options.y) {
        throw 'y is required';
    }
    if (options.y instanceof Array === false) {
        throw 'y must be an Array';
    }
    if (!options.alpha) {
        throw 'alpha is required';
    }
    if (Number.isNaN(Number.parseFloat(options.alpha))) {
        throw 'alpha must be a number';
    }
    if (!options.iterations) {
        throw 'iterations is required';
    }
    if (!Number.isInteger(options.iterations)) {
        throw 'iterations must be an integer';
    }
}

function gradientDescent(x, y, iterations, alpha) {
    var trainingCount = x.length,
        featureCount = x[0].length,
        theta = matrix.zeros(featureCount, 1),
        factor = alpha / trainingCount;

    for (var i = 0; i < iterations; i++) {
        var thetaCopy = matrix.deepCopy(theta);

        for (var j = 0; j < featureCount; j++) {
            var hypothesis = matrix.multiply(x, theta),
                error = matrix.subtraction(hypothesis, y),
                x_j = matrix.getCol(x, j),
                sum = matrix.dotproduct(error, x_j);

            thetaCopy[j][0] = theta[j][0] - factor * sum;
        }

        theta = thetaCopy;
    }

    return theta;
}

exports.linearRegression = function(options) {
    return new Promise(function(resolve, reject) {
        try {
            validate(options);
            var x = options.x,
                y = options.y,
                alpha = options.alpha,
                iterations = options.iterations;

            theta = gradientDescent(x, y, iterations, alpha);

            if (theta) {
                console.log('theta: ', theta);
                resolve(theta);
            } else {
                reject('theta is bad');
            }
        } catch (exception) {
            reject(exception);
        }
    });
};
