const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    library: 'commentPlugin',
    path: path.resolve(__dirname, 'dist'),
  },
};
