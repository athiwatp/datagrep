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

/*
Write a generic function that accepts a column of data (e.g, an SArray) ‘input_feature’
and another column ‘output’ and returns the Simple Linear Regression parameters ‘intercept’ and ‘slope’.
Use the closed form solution from lecture to calculate the slope and intercept.
*/
exports.simple_linear_regression = function(input_feature, output) {
    var sumYi = output.reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
        }),
        sumXi = input_feature.reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
        }),
        sumYiXi = input_feature.reduce(function(previousValue, currentValue, currentIndex) {
            return previousValue + (currentValue * output[currentIndex]);
        }, 0),
        sumXiSqr = input_feature.reduce(function(previousValue, currentValue) {
            return previousValue + Math.pow(currentValue, 2);
        }, 0),
        N = output.length;

    console.log('sumYi: ', sumYi);
    console.log('sumXi: ', sumXi);
    console.log('sumYiXi: ', sumYiXi);
    console.log('sumXiSqr: ', sumXiSqr);

    var slope = (sumYiXi - (sumYi * sumXi / N)) / (sumXiSqr - (Math.pow(sumXi, 2) / N)),
        intercept = (sumYi / N) - (slope * sumXi / N);

    return {
        intercept: intercept,
        slope: slope
    };
};

/*
Write a function that accepts a column of data ‘input_feature’, the ‘slope’, and the ‘intercept’ you learned,
and returns a column of predictions ‘predicted_output’ for each entry in the input column.
*/
exports.get_regression_predictions = function(input_feature, intercept, slope) {

    return predicted_output;
};

/*
Write a function that accepts column of data: ‘input_feature’, and ‘output’ 
and the regression parameters ‘slope’ and ‘intercept’ and outputs the Residual Sum of Squares (RSS).
*/
exports.get_residual_sum_of_squares = function(input_feature, output, intercept, slope) {

    return RSS;
};

/*
Write a function that accepts a column of data:‘output’ and the regression parameters
‘slope’ and ‘intercept’ and outputs the column of data: ‘estimated_input’.
Do this by solving the linear function output = intercept + slope*input for the ‘input’ variable
(i.e. ‘input’ should be on one side of the equals sign by itself).
*/
exports.inverse_regression_predictions = function(output, intercept, slope) {

    return estimated_input;
}
