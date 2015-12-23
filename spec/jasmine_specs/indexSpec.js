describe('index', function() {
    var datagrep = require('../../index'),
        numbers = require('numbers'),
        matrix = numbers.matrix,
        statistic = numbers.statistic,
        Decimal = require('decimal.js'),
        utils = require('../../utils');

    var sales,
        train_data,
        test_data,
        input_feature,
        output,
        squarefeet_slope,
        squarefeet_intercept,
        bedroom_slope,
        bedroom_intercept,
        removeHeader = true;

    describe('setup', function() {
        it('sets sales data', function(done) {
            utils.readCsvFile('/spec/jasmine_specs/Philadelphia_Crime_Rate_noNA.csv')
                .then(function(data) {
                    expect(data[0].join(' ')).toBe([
                        'HousePrice',
                        'HsPrc ($10,000)',
                        'CrimeRate',
                        'MilesPhila',
                        'PopChg',
                        'Name',
                        'County'
                    ].join(' '));
                    sales = data;
                    done();
                });
        });

        it('sets train_data', function(done) {
            utils.readCsvFile('/spec/jasmine_specs/kc_house_train_data.csv')
                .then(function(data) {
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
        });

        it('sets test_data', function(done) {
            utils.readCsvFile('/spec/jasmine_specs/kc_house_test_data.csv')
                .then(function(data) {
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
        });
    });

    describe('simple_linear_regression', function() {
        it('estimates the slope and intercept for crimerate', function() {
            input_feature = utils.getCol(sales, 2, removeHeader);
            output = utils.getCol(sales, 0, removeHeader);

            var response = datagrep.simple_linear_regression(input_feature, output);
            expect(response.slope.toFixed(2)).toBe('-576.91');
            expect(response.intercept.toFixed(2)).toBe('176629.41');
        });

        it('estimates the slope and intercept for squarefeet', function() {
            input_feature = utils.getCol(train_data, 5, removeHeader);
            output = utils.getCol(train_data, 2, removeHeader);

            var response = datagrep.simple_linear_regression(input_feature, output);
            squarefeet_slope = response.slope;
            squarefeet_intercept = response.intercept;
            expect(squarefeet_slope.toFixed(2)).toBe('281.96');
            expect(squarefeet_intercept.toFixed(2)).toBe('-47116.08');
        });

        it('estimates the slope and intercept for bedrooms', function() {
            input_feature = utils.getCol(train_data, 3, removeHeader);

            var response = datagrep.simple_linear_regression(input_feature, output);
            bedroom_slope = response.slope;
            bedroom_intercept = response.intercept;
            expect(bedroom_slope.toFixed(2)).toBe('127588.95');
            expect(bedroom_intercept.toFixed(2)).toBe('109473.18');
        });
    });

    describe('get_regression_predictions', function() {
        it('predicts the price for a house with 2650 sqft', function() {
            var predicted_output = datagrep.get_regression_predictions([2650], squarefeet_intercept, squarefeet_slope);
            expect(predicted_output[0].toFixed(2)).toBe('700075.27');
        });

        it('predicts the price for a house with 2640 sqft provided slope and intercept', function() {
            var predicted_output = datagrep.get_regression_predictions([2640], -44850, 280.76);
            expect(predicted_output[0].toFixed(2)).toBe('696356.40');
        });
    });

    describe('get_residual_sum_of_squares', function() {
        it('it determines the RSS for the simple linear regression for squarefeet on TRAINING data', function() {
            input_feature = utils.getCol(train_data, 5, removeHeader);
            output = utils.getCol(train_data, 2, removeHeader);

            var response = datagrep.simple_linear_regression(input_feature, output);
            squarefeet_slope = response.slope;
            squarefeet_intercept = response.intercept;

            var RSS = datagrep.get_residual_sum_of_squares(input_feature, output, squarefeet_intercept, squarefeet_slope);
            expect(RSS.toFixed(2)).toBe('1201918354179598.00');
        });

        it('it determines the RSS for the simple linear regression for squarefeet on TEST data', function() {
            input_feature = utils.getCol(test_data, 5, removeHeader);
            output = utils.getCol(test_data, 2, removeHeader);

            var response = datagrep.simple_linear_regression(input_feature, output),
                RSS = datagrep.get_residual_sum_of_squares(input_feature, output, response.intercept, response.slope);
            expect(RSS.toFixed(2)).toBe('275168573902787.31');
        });

        it('it determines the RSS for the simple linear regression for bedrooms on TEST data', function() {
            input_feature = utils.getCol(test_data, 3, removeHeader);
            output = utils.getCol(test_data, 2, removeHeader);

            var response = datagrep.simple_linear_regression(input_feature, output),
                RSS = datagrep.get_residual_sum_of_squares(input_feature, output, response.intercept, response.slope);
            expect(RSS.toFixed(2)).toBe('490597142829587.48');
        });
    });

    describe('inverse_regression_predictions', function() {
        it('it estimates square-feet for a house costing $800,000', function() {
            var estimated_input = datagrep.inverse_regression_predictions([800000], squarefeet_intercept, squarefeet_slope);
            expect(estimated_input[0].toFixed(2)).toBe('3004.39');
        });

        it('it estimates square-feet for a house costing $859,000 provided the slope and intercept', function() {
            var estimated_input = datagrep.inverse_regression_predictions([859000], -44850, 280.76);
            expect(estimated_input[0].toFixed(2)).toBe('3219.30');
        });
    });

    describe('multiple regression', function() {
        it("has a bedrooms_squared feature", function() {
            var train_data_last_row = train_data.length - 1,
                test_data_last_row = test_data.length - 1,
                callback = function(row, index) {
                    if (index === 0) {
                        row.push('bedrooms_squared');
                    } else {
                        var bedrooms = Number.parseFloat(row[3]);
                        row.push(Math.pow(bedrooms, 2));
                    }
                };

            train_data.forEach(callback);
            test_data.forEach(callback);

            expect(train_data[0][21]).toBe('bedrooms_squared');
            expect(Number.parseFloat(train_data[train_data_last_row][3])).toBe(2);
            expect(Number.parseFloat(train_data[train_data_last_row][21])).toBe(4);
            expect(test_data[0][21]).toBe('bedrooms_squared');
            expect(Number.parseFloat(test_data[test_data_last_row][3])).toBe(2);
            expect(Number.parseFloat(test_data[test_data_last_row][21])).toBe(4);
        });

        it("has a bed_bath_rooms feature", function() {
            var train_data_last_row = train_data.length - 1,
                test_data_last_row = test_data.length - 1,
                callback = function(row, index) {
                    if (index === 0) {
                        row.push('bed_bath_rooms');
                    } else {
                        var bedrooms = Number.parseFloat(row[3]),
                            bathrooms = Number.parseFloat(row[4]);
                        row.push(bedrooms * bathrooms);
                    }
                };

            train_data.forEach(callback);
            test_data.forEach(callback);

            expect(train_data[0][22]).toBe('bed_bath_rooms');
            expect(Number.parseFloat(train_data[train_data_last_row][3])).toBe(2);
            expect(Number.parseFloat(train_data[train_data_last_row][4])).toBe(0.75);
            expect(Number.parseFloat(train_data[train_data_last_row][22])).toBe(1.5);
            expect(test_data[0][22]).toBe('bed_bath_rooms');
            expect(Number.parseFloat(test_data[test_data_last_row][3])).toBe(2);
            expect(Number.parseFloat(test_data[test_data_last_row][4])).toBe(0.75);
            expect(Number.parseFloat(test_data[test_data_last_row][22])).toBe(1.5);
        });

        it("has a log_sqft_living feature", function() {
            var train_data_last_row = train_data.length - 1,
                test_data_last_row = test_data.length - 1,
                callback = function(row, index) {
                    if (index === 0) {
                        row.push('log_sqft_living');
                    } else {
                        var sqft_living = Number.parseFloat(row[5]);
                        row.push(Math.log(sqft_living));
                    }
                };

            train_data.forEach(callback);
            test_data.forEach(callback);

            expect(train_data[0][23]).toBe('log_sqft_living');
            expect(Number.parseFloat(train_data[train_data_last_row][5])).toBe(1020);
            expect(Number.parseFloat(train_data[train_data_last_row][23])).toBe(6.927557906278317);
            expect(test_data[0][23]).toBe('log_sqft_living');
            expect(Number.parseFloat(test_data[test_data_last_row][5])).toBe(1020);
            expect(Number.parseFloat(test_data[test_data_last_row][23])).toBe(6.927557906278317);
        });

        it("has a lat_plus_long feature", function() {
            var train_data_last_row = train_data.length - 1,
                test_data_last_row = test_data.length - 1,
                callback = function(row, index) {
                    if (index === 0) {
                        row.push('lat_plus_long');
                    } else {
                        var lat = Number.parseFloat(row[17]),
                            long = Number.parseFloat(row[18]);
                        row.push(lat + long);
                    }
                };

            train_data.forEach(callback);
            test_data.forEach(callback);

            expect(train_data[0][24]).toBe('lat_plus_long');
            expect(Number.parseFloat(train_data[train_data_last_row][17])).toBe(47.5941);
            expect(Number.parseFloat(train_data[train_data_last_row][18])).toBe(-122.299);
            expect(Number.parseFloat(train_data[train_data_last_row][24])).toBe(-74.70490000000001);
            expect(test_data[0][24]).toBe('lat_plus_long');
            expect(Number.parseFloat(test_data[test_data_last_row][17])).toBe(47.5944);
            expect(Number.parseFloat(test_data[test_data_last_row][18])).toBe(-122.299);
            expect(Number.parseFloat(test_data[test_data_last_row][24])).toBe(-74.7046);
        });

        it("provides the mean for the bedrooms_squared feature on test_data", function() {
            var bedrooms_squared_col = utils.getCol(test_data, 21, removeHeader);
            expect(Number.parseFloat(utils.mean(bedrooms_squared_col).toFixed(3))).toBe(12.447);
        });

        it("provides the mean for the bed_bath_rooms feature on test_data", function() {
            var bed_bath_rooms_col = utils.getCol(test_data, 22, removeHeader);
            expect(Number.parseFloat(utils.mean(bed_bath_rooms_col).toFixed(3))).toBe(7.504);
        });

        it("provides the mean for the log_sqft_living feature on test_data", function() {
            var log_sqft_living_col = utils.getCol(test_data, 23, removeHeader);
            expect(Number.parseFloat(utils.mean(log_sqft_living_col).toFixed(3))).toBe(7.550);
        });

        it("provides the mean for the lat_plus_long feature on test_data", function() {
            var lat_plus_long_col = utils.getCol(test_data, 24, removeHeader);
            expect(Number.parseFloat(utils.mean(lat_plus_long_col).toFixed(3))).toBe(-74.653);
        });

        it("returns the weights from regression_gradient_descent for train_data", function() {
            var results = datagrep.get_features_matrix(train_data, ['sqft_living'], ['price']),
                features_matrix = results.features_matrix,
                output = results.output_array,
                initial_weights = [-47000, 1],
                step_size = Number.parseFloat("7e-12"),
                tolerance = Number.parseFloat("2.5e7"),
                weights = datagrep.regression_gradient_descent(features_matrix, output, initial_weights, step_size, tolerance);

            expect(Number.parseFloat(weights[1][0].toFixed(1))).toBe(281.9);
        });

        it("returns the weights from regression_gradient_descent_v2 for train_data", function() {
            var results = datagrep.get_features_matrix(train_data, ['sqft_living'], ['price']),
                simple_features = results.features_matrix,
                output = results.output_array,
                initial_weights = [-47000, 1],
                step_size = Number.parseFloat("7e-12"),
                tolerance = Number.parseFloat("2.5e7"),
                simple_weights = datagrep.regression_gradient_descent_v2(simple_features, output, initial_weights, step_size, tolerance);

            expect(Number.parseFloat(simple_weights[1][0].toFixed(1))).toBe(281.9);
        });

        it("predicts the price for the 1st house in test_data from sqft_living", function() {
            var train_results = datagrep.get_features_matrix(train_data, ['sqft_living'], ['price']),
                simple_features = train_results.features_matrix,
                output = train_results.output_array,
                initial_weights = [-47000, 1],
                step_size = Number.parseFloat("7e-12"),
                tolerance = Number.parseFloat("2.5e7"),
                simple_weights = datagrep.regression_gradient_descent_v2(simple_features, output, initial_weights, step_size, tolerance),
                test_results = datagrep.get_features_matrix(test_data, ['sqft_living'], ['price']),
                test_simple_feature_matrix = test_results.features_matrix,
                test_output = test_results.output_array;

            expect(Number.parseFloat(datagrep.predict_outcome(test_simple_feature_matrix, simple_weights)[0][0].toFixed(0))).toBe(356134);
        });

        it("predicts the price for the 1st house in test_data from sqft_living and sqft_living15", function() {
            var results = datagrep.get_features_matrix(train_data, ['sqft_living', 'sqft_living15'], ['price']),
                features_matrix = results.features_matrix,
                output = results.output_array,
                initial_weights = [-100000, 1, 1],
                step_size = Number.parseFloat("4e-12"),
                tolerance = Number.parseFloat("1e9"),
                weights = datagrep.regression_gradient_descent_v2(features_matrix, output, initial_weights, step_size, tolerance),
                test_results = datagrep.get_features_matrix(test_data, ['sqft_living', 'sqft_living15'], ['price']),
                test_features_matrix = test_results.features_matrix,
                test_output = test_results.output_array;

            expect(Number.parseFloat(datagrep.predict_outcome(test_features_matrix, weights)[0][0].toFixed(0))).toBe(366651);
        });

        it("returns the weights from regression_gradient_descent_v3 for train_data", function() {
            var results = datagrep.get_features_matrix(train_data, ['sqft_living'], ['price']),
                simple_features = results.features_matrix,
                output = results.output_array,
                initial_weights = [-47000, 0],
                step_size = Number.parseFloat("1"),
                tolerance = Number.parseFloat("1"),
                simple_weights = datagrep.regression_gradient_descent_v3(simple_features, output, initial_weights, step_size, tolerance);

            expect(Number.parseFloat(simple_weights[0][0].toFixed(1))).toBe(-46999.9);
            expect(Number.parseFloat(simple_weights[1][0].toFixed(1))).toBe(281.9);
        });

        it("returns the weights from regression_gradient_descent_v3 for train_data using feature scaling", function() {
            var results = datagrep.get_features_matrix(train_data, ['sqft_living'], ['price']),
                simple_features_info = datagrep.feature_scale(results.features_matrix),
                simple_features = simple_features_info.data,
                options = simple_features_info.options,
                output = results.output_array,
                initial_weights = [0, 0],
                step_size = Number.parseFloat("1"),
                tolerance = Number.parseFloat("1"),
                simple_weights = datagrep.regression_gradient_descent_v3(simple_features, output, initial_weights, step_size, tolerance);

            console.log('options: ', options);
            console.log('simple_weights[1][0] adjusted: ', (simple_weights[1][0] - options[0].mean) / options[0].stdDev);
            expect(simple_weights).toBe(281.9);
            // expect(Number.parseFloat(simple_weights[1][0].toFixed(1))).toBe(281.9);
        });

    });

});
