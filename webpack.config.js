const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: glob.sync("./src/**/*.ts").map(g => `./${g}`),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets/gltf', to: 'assets/gltf' },
      ]
    })
  ],
  performance: {
    maxEntrypointSize: 4096000,
    maxAssetSize: 4096000,
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  },
  resolve: {
    extensions: [
      '.ts', '.js',
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
      watch: true,
    },
    port: 8081,
  }
};