describe('index', function() {
    var linearRegression = require('../../index').linearRegression;

    xdescribe('the linearRegression method', function() {
        it('is defined', function() {
            expect(linearRegression).toBeDefined();
        });

        it('returns a Promise', function() {
            expect(linearRegression()).toBeInstanceOf(Promise);
        });

        it('returns an error if options is not provided', function(done) {
            linearRegression().catch(function(message) {
                expect(message).toBe("options is required");
                done();
            });
        });

        it('returns an error if options.x is not provided', function(done) {
            linearRegression({}).catch(function(message) {
                expect(message).toBe("x is required");
                done();
            });
        });

        it('returns an error if options.x is not an Array', function(done) {
            linearRegression({
                x: 'not an Array'
            }).catch(function(message) {
                expect(message).toBe("x must be an Array");
                done();
            });
        });

        it('returns an error if options.y is not provided', function(done) {
            linearRegression({
                x: []
            }).catch(function(message) {
                expect(message).toBe("y is required");
                done();
            });
        });

        it('returns an error if options.y is not an Array', function(done) {
            linearRegression({
                x: [],
                y: 'not an Array'
            }).catch(function(message) {
                expect(message).toBe("y must be an Array");
                done();
            });
        });

        it('returns an error if options.alpha is not provided', function(done) {
            linearRegression({
                x: [],
                y: []
            }).catch(function(message) {
                expect(message).toBe("alpha is required");
                done();
            });
        });

        it('returns an error if options.alpha is not a number', function(done) {
            linearRegression({
                x: [],
                y: [],
                alpha: 'alpha is not a number'
            }).catch(function(message) {
                expect(message).toBe("alpha must be a number");
                done();
            });
        });

        it('returns an error if options.iterations is required', function(done) {
            linearRegression({
                x: [],
                y: [],
                alpha: 0.001
            }).catch(function(message) {
                expect(message).toBe("iterations is required");
                done();
            });
        });

        it('returns an error if options.iterations is not an integer', function(done) {
            linearRegression({
                x: [],
                y: [],
                alpha: 0.001,
                iterations: 0.001
            }).catch(function(message) {
                expect(message).toBe("iterations must be an integer");
                done();
            });
        });

        it('determines the right theta for the data set', function(done) {
            var data = require('./data.json'),
                theta0,
                theta1;
            linearRegression(data).then(function(theta) {
                expect(theta[0][0]).toBe(theta0);
                expect(theta[1][0]).toBe(theta1);
                done();
            });
        });

    });

    describe('something new', function() {
        it('does something fancy', function(done) {
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
                    done();
                });

            fs.createReadStream(__dirname + '/kc_house_train_data.csv').pipe(parser);
        });
    });
});
