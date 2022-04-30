const path = require('path');
const glob = require("glob");

module.exports = {
  entry: "./interpreter/main.mjs",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: "interpreter"
  },
  target: 'node',
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};