var path = require('path');
module.exports = {
  entry: './src/outlets.module.js',
  output: {
    path: __dirname,
    filename: 'dist/outlets.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader', 'ng-annotate']
      }
    ]
  }
};
