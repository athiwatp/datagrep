module.exports = function(app) {
    var datagrep = require('../../index');

    app.io.on('connection', function(socket) {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });

        socket.on('linear regression', function(train_data) {
            var results = datagrep.get_features_matrix(train_data, ['sqft_living'], ['price']),
                simple_features = results.features_matrix,
                output = results.output_array,
                initial_weights = [-47000, 0],
                step_size = Number.parseFloat("1"),
                tolerance = Number.parseFloat("1"),
                simple_weights = datagrep.regression_gradient_descent_v3(simple_features, output, initial_weights, step_size, tolerance);

            app.io.emit('linear regression', simple_weights);
        });
    });
};
