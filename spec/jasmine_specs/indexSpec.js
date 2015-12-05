describe('index', function() {
    var datagrep = require('../../index'),
        numbers = require('numbers');

    // describe('the linearRegression method', function() {
    //     it('is defined', function() {
    //         expect(linearRegression).toBeDefined();
    //     });

    //     it('returns a Promise', function() {
    //         expect(linearRegression()).toBeInstanceOf(Promise);
    //     });

    //     it('returns an error if options is not provided', function(done) {
    //         linearRegression().catch(function(message) {
    //             expect(message).toBe("options is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.x is not provided', function(done) {
    //         linearRegression({}).catch(function(message) {
    //             expect(message).toBe("x is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.x is not an Array', function(done) {
    //         linearRegression({
    //             x: 'not an Array'
    //         }).catch(function(message) {
    //             expect(message).toBe("x must be an Array");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.y is not provided', function(done) {
    //         linearRegression({
    //             x: []
    //         }).catch(function(message) {
    //             expect(message).toBe("y is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.y is not an Array', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: 'not an Array'
    //         }).catch(function(message) {
    //             expect(message).toBe("y must be an Array");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.alpha is not provided', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: []
    //         }).catch(function(message) {
    //             expect(message).toBe("alpha is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.alpha is not a number', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: [],
    //             alpha: 'alpha is not a number'
    //         }).catch(function(message) {
    //             expect(message).toBe("alpha must be a number");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.iterations is required', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: [],
    //             alpha: 0.001
    //         }).catch(function(message) {
    //             expect(message).toBe("iterations is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.iterations is not an integer', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: [],
    //             alpha: 0.001,
    //             iterations: 0.001
    //         }).catch(function(message) {
    //             expect(message).toBe("iterations must be an integer");
    //             done();
    //         });
    //     });

    //     it('determines the right theta for the data set', function(done) {
    //         var data = require('./data.json'),
    //             theta0,
    //             theta1;
    //         linearRegression(data).then(function(theta) {
    //             expect(theta[0][0]).toBe(theta0);
    //             expect(theta[1][0]).toBe(theta1);
    //             done();
    //         });
    //     });

    // });

    // describe('something new', function() {
    //     it('does something fancy', function(done) {
    //         var fs = require('fs'),
    //             parse = require('csv-parse'),
    //             parser = parse({
    //                 delimiter: ','
    //             }, function(err, data) {
    //                 expect(data[0].join(' ')).toBe([
    //                     'id',
    //                     'date',
    //                     'price',
    //                     'bedrooms',
    //                     'bathrooms',
    //                     'sqft_living',
    //                     'sqft_lot',
    //                     'floors',
    //                     'waterfront',
    //                     'view',
    //                     'condition',
    //                     'grade',
    //                     'sqft_above',
    //                     'sqft_basement',
    //                     'yr_built',
    //                     'yr_renovated',
    //                     'zipcode',
    //                     'lat',
    //                     'long',
    //                     'sqft_living15',
    //                     'sqft_lot15'
    //                 ].join(' '));
    //                 done();
    //             });

    //         fs.createReadStream(__dirname + '/kc_house_train_data.csv').pipe(parser);
    //     });
    // });


    var train_data,
        test_data,
        input_feature,
        output,
        squarefeet_slope,
        squarefeet_intercept,
        bedroom_slope,
        bedroom_intercept;

    describe('setup', function() {
        it('sets train_data', function(done) {
            var fs = require('fs'),
                parse = require('csv-parse'),
                parser = parse({
                    delimiter: ','
                }, function(err, data) {
                    expect(data[0].join(' ')).toBe([
                        'id',
                        'date',
                        'price',
                        'bedrooms',
                        'bathrooms',
                        'sqft_living',
                        'sqft_lot',
                        'floors',
                        'waterfront',
                        'view',
                        'condition',
                        'grade',
                        'sqft_above',
                        'sqft_basement',
                        'yr_built',
                        'yr_renovated',
                        'zipcode',
                        'lat',
                        'long',
                        'sqft_living15',
                        'sqft_lot15'
                    ].join(' '));
                    test_data = data;
                    done();
                });

            fs.createReadStream(__dirname + '/kc_house_train_data.csv').pipe(parser);
        });

        it('sets test_data', function(done) {
            var fs = require('fs'),
                parse = require('csv-parse'),
                parser = parse({
                    delimiter: ','
                }, function(err, data) {
                    expect(data[0].join(' ')).toBe([
                        'id',
                        'date',
                        'price',
                        'bedrooms',
                        'bathrooms',
                        'sqft_living',
                        'sqft_lot',
                        'floors',
                        'waterfront',
                        'view',
                        'condition',
                        'grade',
                        'sqft_above',
                        'sqft_basement',
                        'yr_built',
                        'yr_renovated',
                        'zipcode',
                        'lat',
                        'long',
                        'sqft_living15',
                        'sqft_lot15'
                    ].join(' '));
                    train_data = data;
                    done();
                });

            fs.createReadStream(__dirname + '/kc_house_test_data.csv').pipe(parser);
        });
    });

    /*
    Use your function to calculate the estimated slope and intercept on the training data
    to predict ‘price’ given ‘sqft_living’. Save the value of the slope and intercept for later.
    */
    describe('simple_linear_regression', function() {
        it('estimates the slope and intercept for squarefeet', function() {
            input_feature = numbers.matrix.getCol(train_data, 5).slice(1).map(function(currentValue) {
                return Number.parseInt(currentValue, 10);
            });
            output = numbers.matrix.getCol(train_data, 2).slice(1).map(function(currentValue) {
                return Number.parseInt(currentValue, 10);
            });

            var response = datagrep.simple_linear_regression(input_feature, output);
            squarefeet_slope = response.slope;
            squarefeet_intercept = response.intercept;
            expect(squarefeet_slope).toBe('blah');
            expect(squarefeet_intercept).toBe('blah');
        });

        it('estimates the slope and intercept for bedrooms', function() {
            input_feature = numbers.matrix.getCol(train_data, 3).slice(1).map(function(currentValue) {
                return Number.parseInt(currentValue, 10);
            });

            var response = datagrep.simple_linear_regression(input_feature, output);
            bedroom_slope = response.slope;
            bedroom_intercept = response.intercept;
            expect(bedroom_slope).toBe('blah');
            expect(bedroom_intercept).toBe('blah');
        });
    });

    describe('get_regression_predictions', function() {
        it('predicts the price for a house with 2650 sqft', function() {
            input_feature = numbers.matrix.getCol(train_data, 5).slice(1).map(function(currentValue) {
                return Number.parseInt(currentValue, 10);
            });

            var predicted_output = datagrep.get_regression_predictions(input_feature, squarefeet_intercept, squarefeet_slope);
            expect(predicted_output).toBe('something');
        });
    });

    describe('get_residual_sum_of_squares', function() {
        it('it determines the RSS for the simple linear regression for squarefeet on TRAINING data', function() {
            // use squarefeet_slope and squarefeet_intercept to predict prices on TRAINING data
        });

        it('it determines the RSS for the simple linear regression for squarefeet on TEST data', function() {
            // use squarefeet_slope and squarefeet_intercept to predict prices on TEST data
        });

        it('it determines the RSS for the simple linear regression for bedrooms on TEST data', function() {
            // use bedroom_slope and bedroom_intercept to predict prices on TEST data
        });
    });

    describe('inverse_regression_predictions', function() {
        it('it estimates square-feet for a house costing $800,000', function() {
            // use the regression slope and intercept from (3)
        });
    });

});
