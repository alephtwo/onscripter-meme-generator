const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const paths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  html: path.resolve(__dirname, 'src', 'index.html'),
  static: path.resolve(__dirname, 'static'),
  target: path.resolve(__dirname, 'public'),
};

const rules = {
  css: {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          url: false,
        },
      },
    ],
  },
  typescript: {
    test: /\.tsx?$/,
    loader: 'ts-loader',
  },
};

const plugins = {
  clean: new CleanWebpackPlugin(),
  copy: new CopyPlugin({
    patterns: [{ from: paths.static, to: paths.target }],
  }),
  extractCss: new MiniCssExtractPlugin(),
  html: new HtmlWebpackPlugin({
    template: paths.html,
  }),
};

module.exports = {
  entry: paths.entry,
  output: {
    filename: 'app.js',
    path: paths.target,
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [rules.css, rules.typescript],
  },
  plugins: [plugins.clean, plugins.copy, plugins.extractCss, plugins.html],
};
