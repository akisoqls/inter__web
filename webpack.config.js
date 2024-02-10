const glob = require("glob");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
  ],
  performance: {
    maxEntrypointSize: 2048000, // 1MB、エントリポイントの最大サイズ
    maxAssetSize: 2048000, // 1MB、生成される各アセットの最大サイズ
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