var webpack = require('webpack');
module.exports = {
  entry: {
    datagrep: './src/index.js'
  },
  externals: [
    'csv-parse',
    'decimal.js',
    'graceful-fs',
    'numbers'
  ],
  output: {
    filename: '[name].js',
    library: 'datagrep',
    libraryTarget:'umd',
    path: './dist'
  },
  target: 'node'
}