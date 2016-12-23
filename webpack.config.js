module.exports = {
  entry: {
    datagrep: './src/index.js'
  },
  externals: [
    'babel-runtime',
    'csv-parse',
    'numjs'
  ],
  output: {
    filename: '[name].js',
    library: 'datagrep',
    libraryTarget: 'umd',
    path: './dist'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.txt$/, exclude: /node_modules/, use: 'raw-loader' }
    ]
  },
  target: 'node'
}
