const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/script.ts',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/js')
  },    
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
};
