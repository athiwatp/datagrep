module.exports = {
  entry: {
    datagrep: './src/index.js'
  },
  externals: [
    'babel-runtime',
    'csv-parse',
    'mathjs',
    'numericjs',
    'vectorious'
  ],
  output: {
    filename: '[name].js',
    library: 'datagrep',
    libraryTarget: 'umd',
    path: './dist'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  target: 'node'
}
