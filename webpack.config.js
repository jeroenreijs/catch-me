const path = require('path');
const webpack_rules = [];
const webpackOption = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: webpack_rules,
  },
};
let cssLoader = {
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    'style-loader',
    // Translates CSS into CommonJS
    'css-loader',
    // Compiles Sass to CSS
    {
      loader: 'sass-loader',
      options: { sassOptions: { includePaths: ['./src/scss'] } },
    },
  ],
};
let fileLoader = {
  test: /\.(png|svg|jpg|gif)$/,
  use: ['file-loader'],
};
let babelLoader = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  },
};
webpack_rules.push(cssLoader);
webpack_rules.push(fileLoader);
webpack_rules.push(babelLoader);
module.exports = webpackOption;
