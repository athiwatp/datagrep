const path = require('path')

module.exports = {
  entry: {
    datagrep: './src/index.js'
  },
  externals: [
    'csv-parse',
    'mathjs',
    'numericjs',
    'vectorious'
  ],
  output: {
    filename: '[name].js',
    library: 'datagrep',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env']
            ]
          }
        }
      }
    ]
  },
  target: 'node'
}
