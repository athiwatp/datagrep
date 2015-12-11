var numbers = require('numbers'),
    Decimal = require('decimal.js');

exports.readCsvFile = function(file) {
    return new Promise(function(resolve, reject) {
        var fs = require('fs'),
            parse = require('csv-parse'),
            parser = parse({
                delimiter: ','
            }, function(err, data) {
                resolve(data);
            });

        fs.createReadStream(__dirname + file).pipe(parser);
    });
};

exports.getCol = function(data, col) {
    return numbers.matrix.getCol(data, col).slice(1).map(function(currentValue) {
        // return new Decimal(currentValue);
        return Number.parseFloat(currentValue);
    });
};

exports.mean = function(col) {
    var sum = col.reduce(function(previousValue, currentValue, currentIndex) {
        // return previousValue.plus(currentValue);
        return previousValue + currentValue;
    });

    // return sum.dividedBy(col.length);
    return sum / col.length;
}
