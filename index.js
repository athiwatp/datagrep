var math = require('mathjs');

function validate(options) {
    if (!options) {
        throw 'options is required';
    }
    if (!options.x) {
        throw 'x is required';
    }
    if (!options.y) {
        throw 'y is required';
    }
}

exports.linearRegression = function(options) {
    return new Promise(function(resolve, reject) {
        try {
            validate(options);
            var x = math.matrix(options.x),
                y = math.matrix(options.y),
                m = x.size()[1],
                dimx = x.size(),
                featureCount = dimx[1],
                trainingCount = dimx[0],
                alpha = options.alpha,
                iterations = options.iterations,
                theta = math.zeros(featureCount),
                k = (alpha / trainingCount);

            for (var i = 0; i < iterations; i++) {
                var temp = theta.clone();

                for (var j = 0; j < featureCount; j++) {
                    var hypothesis = math.multiply(x, theta),
                        error = math.subtract(hypothesis, y),
                        xi = math.subset(x, math.index([0, trainingCount], j)),
                        sum = math.multiply(error.transpose(), xi),
                        newTheta = theta.subset(math.index(j)) - k * sum;

                    if (newTheta === Number.POSITIVE_INFINITY || newTheta === Number.NEGATIVE_INFINITY) {
                        reject('theta has diverged! - try another alpha');
                    }

                    temp.subset(math.index(j), newTheta);
                }

                theta = temp;
            }

            if (theta && theta._data) {
                resolve(theta._data);
            } else {
                reject('theta is bad');
            }
        } catch (exception) {
            reject(exception);
        }
    });
};
