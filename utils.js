var numbers = require('numbers'),
    Decimal = require('decimal.js');

function readCsvFile(file) {
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
}

function getCol(data, col, removeHeader) {
    return numbers.matrix.getCol(data, col).slice(removeHeader ? 1 : 0).map(function(currentValue) {
        return Number.parseFloat(currentValue);
    });
}

function getCols(data, cols, preserveHeader) {
    var indices = getColNameIndices(data, cols);
    if (!preserveHeader) data = data.slice(1);
    return data.map(function(currentValue) {
        var newValue = [];
        for (var i = 0; i < indices.length; i++) {
            newValue.push(currentValue[indices[i]]);
        }
        return newValue;
    });
}

function mean(col) {
    var sum = col.reduce(function(previousValue, currentValue, currentIndex) {
        return previousValue + currentValue;
    });

    return sum / col.length;
}

function getColNameIndices(data, cols) {
    var indices = [],
        colNames = data[0];

    for (var i = 0; i < colNames.length; i++) {
        var colName = colNames[i];
        for (var j = 0; j < cols.length; j++) {
            if (colName === cols[j]) indices.push(i);
        }
    }

    return indices;
}

function parseFloat(data, cols) {
    var indices = getColNameIndices(data, cols);
    return data.map(function(currentValue, currentIndex) {
        if (currentIndex !== 0) {
            for (var i = 0; i < indices.length; i++) {
                var index = indices[i];
                currentValue[index] = Number.parseFloat(currentValue[index]);
            }
        }
        return currentValue;
    });
}

function sort(data, cols) {
    var indices = getColNameIndices(data, cols),
        firstRow = data.splice(0, 1);

    for (var i = indices.length - 1; i > -1; i--) {
        var index = indices[i];
        data = data.sort(function(a, b) {
            if (a[index] < b[index]) {
                return -1;
            } else if (a[index] > b[index]) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    return firstRow.concat(data);
}

function decorate(dataframe) {
    var data = dataframe.data;

    dataframe.sort = function(cols) {
        return sort(data, cols);
    };

    var headers = data[0];
    for (var i = 0; i < headers.length; i++) {
        var header = headers[i];
        dataframe[header] = function() {
            return 'test';
        };
    }

    return dataframe;
}

module.exports = {
    readCsvFile: readCsvFile,
    getCol: getCol,
    getCols: getCols,
    mean: mean,
    parseFloat: parseFloat,
    sort: sort,
    decorate: decorate
};
