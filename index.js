var numbers = require('numbers'),
    matrix = numbers.matrix,
    statistic = numbers.statistic,
    Decimal = require('decimal.js'),
    utils = require('./utils');

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

exports.simple_linear_regression = function(input_feature, output) {
    var N = output.length,
        sumYi = output.reduce(function(previousValue, currentValue) {
            var currentValueDecimal = new Decimal(currentValue.toFixed(3)),
                previousValueDecimal = new Decimal(previousValue.toFixed(3));
            return previousValueDecimal.plus(currentValueDecimal);
        }),
        sumXi = input_feature.reduce(function(previousValue, currentValue) {
            var currentValueDecimal = new Decimal(currentValue.toFixed(3)),
                previousValueDecimal = new Decimal(previousValue.toFixed(3));
            return previousValueDecimal.plus(currentValueDecimal);
        }),
        sumYiXi = input_feature.reduce(function(previousValue, currentValue, currentIndex) {
            var currentValueDecimal = new Decimal(currentValue.toFixed(3));
            return previousValue.plus(currentValueDecimal.times(new Decimal(output[currentIndex].toFixed(3))));
        }, new Decimal(0)),
        sumXiSqr = input_feature.reduce(function(previousValue, currentValue) {
            var currentValueDecimal = new Decimal(currentValue.toFixed(3));
            return previousValue.plus(currentValueDecimal.toPower(2));
        }, new Decimal(0)),
        slope = (sumYiXi.minus(sumYi.times(sumXi).dividedBy(N))).dividedBy(sumXiSqr.minus(sumXi.toPower(2).dividedBy(N))),
        intercept = (sumYi.dividedBy(N)).minus(slope.times(sumXi).dividedBy(N));

    return {
        intercept: intercept,
        slope: slope
    };
};

exports.get_regression_predictions = function(input_feature, intercept, slope) {
    var interceptDecimal = new Decimal(intercept.toFixed(3)),
        slopeDecimal = new Decimal(slope.toFixed(3)),
        predicted_output = input_feature.map(function(currentValue) {
            var currentValueDecimal = new Decimal(currentValue.toFixed(3));
            return interceptDecimal.plus(slopeDecimal.times(currentValueDecimal));
        });

    return predicted_output;
};

exports.get_residual_sum_of_squares = function(input_feature, output, intercept, slope) {
    var interceptDecimal = new Decimal(intercept.toFixed(3)),
        slopeDecimal = new Decimal(slope.toFixed(3)),
        RSS = output.reduce(function(previousValue, currentValue, currentIndex) {
            var currentValueDecimal = new Decimal(currentValue.toFixed(3));
            return previousValue.plus(currentValueDecimal.minus(interceptDecimal.plus(slopeDecimal.times(new Decimal(input_feature[currentIndex].toFixed(3))))).toPower(2));
        }, new Decimal(0));

    return RSS;
};

exports.get_residual_sum_of_squares_v2 = function(feature_matrix, output, weights) {
    var predictions = predict_outcome(feature_matrix, weights),
        sums = matrix.subtraction(output, predictions),
        rss = sums.reduce(function(previousValue, currentValue) {
            return previousValue + Math.pow(currentValue, 2);
        }, 0);

    return rss;
};

exports.inverse_regression_predictions = function(output, intercept, slope) {
    var interceptDecimal = new Decimal(intercept.toFixed(3)),
        slopeDecimal = new Decimal(slope.toFixed(3)),
        estimated_input = output.map(function(currentValue) {
            var currentValueDecimal = new Decimal(currentValue.toFixed(3));
            return currentValueDecimal.minus(interceptDecimal).dividedBy(slopeDecimal);
        });

    return estimated_input;
}

exports.get_features_matrix = function(data, features, output) {
    var inputIndices = [],
        features_matrix,
        output_array;

    for (var i = 0; i < data[0].length; i++) {
        if (data[0][i] === output[0]) {
            output_array = data.map(function(currentValue) {
                return [currentValue[i]];
            });
        } else {
            for (var j = 0; j < features.length; j++) {
                if (data[0][i] === features[j]) {
                    inputIndices.push(i);
                }
            }
        }
    }

    features_matrix = data.map(function(currentValue) {
        return [1].concat(inputIndices.map(function(index) {
            return currentValue[index];
        }));
    });

    return {
        features_matrix: features_matrix.slice(1).map(function(currentValue) {
            return currentValue.map(Number.parseFloat);
        }),
        output_array: output_array.slice(1).map(function(currentValue) {
            return currentValue.map(Number.parseFloat);
        })
    }
};

function predict_outcome(feature_matrix, weights) {
    var predictions = matrix.multiply(feature_matrix, weights);
    return predictions;
}
exports.predict_outcome = predict_outcome;

function feature_derivative(errors, feature) {
    var derivative = -2 * matrix.dotproduct(feature, errors);
    return derivative;
}
exports.feature_derivative = feature_derivative;

exports.regression_gradient_descent = function(feature_matrix, output, initial_weights, step_size, tolerance) {
    var converged = false,
        weights = initial_weights.map(function(currentValue) {
            return [Number.parseFloat(currentValue)];
        }),
        gradient_sum_squares,
        gradient_magnitude;

    while (!converged) {
        var predictions = predict_outcome(feature_matrix, weights),
            errors = matrix.subtraction(output, predictions);

        gradient_sum_squares = 0;

        for (var j = 0; j < weights.length; j++) {
            var feature = utils.getCol(feature_matrix, j),
                derivative = feature_derivative(errors, feature);

            gradient_sum_squares += Math.pow(derivative, 2);
            weights[j][0] = weights[j][0] - step_size * derivative;
        }

        gradient_magnitude = Math.sqrt(gradient_sum_squares);

        if (gradient_magnitude < tolerance) {
            converged = true;
        }
    }

    return weights;
}

exports.regression_gradient_descent_v2 = function(feature_matrix, output, initial_weights, step_size, tolerance) {
    var w_t = initial_weights.map(function(currentValue) {
            return [currentValue];
        }),
        D = w_t.length,
        gradient_magnitude;

    do {
        var predictions = matrix.multiply(feature_matrix, w_t),
            residuals = matrix.subtraction(output, predictions),
            sum_of_squared_partials = 0;

        for (var j = 0; j < D; j++) {
            var h_j = matrix.getCol(feature_matrix, j),
                partial_j = -2 * matrix.dotproduct(h_j, residuals);

            w_t[j][0] = w_t[j][0] - (step_size * partial_j);
            sum_of_squared_partials += Math.pow(partial_j, 2);
        }

        gradient_magnitude = Math.sqrt(sum_of_squared_partials);
    } while (gradient_magnitude > tolerance)

    return w_t;
};

exports.regression_gradient_descent_v3 = function(feature_matrix, output, initial_weights, step_size, tolerance, schedule) {
    var w_t = initial_weights.map(function(currentValue) {
            return [currentValue];
        }),
        D = w_t.length,
        gradient_magnitude,
        iteration = 1,
        maxPartialSize = 1000;

    do {
        var predictions = matrix.multiply(feature_matrix, w_t);
        var residuals = matrix.subtraction(output, predictions);
        var sum_of_squared_partials = 0;

        for (var j = 0; j < D; j++) {
            var h_j = matrix.getCol(feature_matrix, j);
            var partial_j = -2 * matrix.dotproduct(h_j, residuals);
            console.log('partial_j; j: ' + j + '; ' + partial_j);
            var delta = Math.abs(partial_j) < maxPartialSize ? (step_size * partial_j) : (maxPartialSize / iteration * (partial_j < 0 ? -1 : 1));
            if (schedule) {
                w_t[j][0] = w_t[j][0] - ((step_size / iteration) * partial_j); // or / Math.sqrt(iteration)
            } else {
                w_t[j][0] = w_t[j][0] - delta;
            }
            sum_of_squared_partials += Math.pow(partial_j, 2);
        }

        console.log("sum_of_squared_partials: " + sum_of_squared_partials + "; w_t: " + w_t);

        iteration++;
        gradient_magnitude = Math.sqrt(sum_of_squared_partials);
    } while (gradient_magnitude > tolerance)

    return w_t;
};

exports.feature_scale = function(data) {
    var featureCount = data[0].length;
    for (var i = 1; i < featureCount; i++) {
        var col = matrix.getCol(data, i),
            stdDev = statistic.standardDev(col),
            mean = statistic.mean(col);

        data = data.map(function(currentValue) {
            currentValue[i] = (currentValue[i] - mean) / stdDev;
            return currentValue;
        });
    }
    return data;
};
