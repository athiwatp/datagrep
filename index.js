var math = require('mathjs');

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

exports.linearRegression = function(options) {
    return new Promise(function(resolve, reject) {
        try {
            validate(options);
            var x = math.matrix(options.x),
                y = math.matrix(options.y),
                // m = x.size()[1],
                dimx = x.size(),
                featureCount = dimx[1],
                trainingCount = dimx[0],
                alpha = options.alpha,
                iterations = options.iterations,
                theta = math.zeros(featureCount, 1),
                k = (alpha / trainingCount);

            console.log('x: ', x);
            console.log('y: ', y);
            // console.log('m: ', m);
            console.log('dimx: ', dimx);
            console.log('featureCount: ', featureCount);
            console.log('trainingCount: ', trainingCount);
            console.log('alpha: ', alpha);
            console.log('iterations: ', iterations);
            console.log('theta: ', theta);
            console.log('k: ', k);

            for (var i = 0; i < iterations; i++) {
                var temp = theta.clone();
                console.log('temp: ', temp);

                for (var j = 0; j < featureCount; j++) {
                    var hypothesis = math.multiply(x, theta);
                    console.log('hypothesis: ', hypothesis);
                    console.log('hypothesis size: ', hypothesis.size());
                    console.log('y size: ', y.size());
                    console.log('theta size: ', theta.size());
                    var error = math.subtract(hypothesis, y);
                    console.log('error: ', error);
                    console.log('math.index([0, trainingCount], j): ', math.index([0, trainingCount], j));
                    var xi = math.subset(x, math.index([0, trainingCount], j));
                    console.log('xi: ', xi);
                    var sum = math.multiply(error.transpose(), xi);
                    console.log('sum: ', sum);
                    var newTheta = theta.subset(math.index(j)) - k * sum;
                    console.log('newTheta: ', newTheta);

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
