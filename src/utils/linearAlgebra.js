import nj from 'numjs';

export { length, getNullMatrix, numCols, numRows, parseVariableMatrices };

function getNullMatrix(numRows, numCols) {
    return nj.zeros([numRows, numCols]);
}

function numCols(matrix) {
    return matrix.shape[1];
}

function numRows(matrix) {
    return matrix.shape[0];
}

function parseVariableMatrices(data) {
    let dataAsMatrix = nj.array(data),
        [numRows, numCols] = dataAsMatrix.shape,
        X = nj.concatenate(nj.ones([numRows, 1]), dataAsMatrix.slice(0, [numCols - 1])),
        y = dataAsMatrix.slice(0, -1);

    return { X, y };
}