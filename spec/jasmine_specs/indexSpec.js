describe('index', function() {
    var linearRegression = require('../../index').linearRegression;

    describe('the linearRegression method', function() {
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
    });
});
