const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === "production";

const plugins = [
  new HTMLWebpackPlugin({
    title: 'async-race',
    filename: isProduction ? 'index.[contenthash].html' : 'index.html',
    hash: true,
    cache: true,
  }),
  new EslingPlugin({ extensions: 'ts' }),
];

if (isProduction) {
  plugins.push(
    new MiniCSSExtractPlugin(
      {
        filename: isProduction ? 'style.[contenthash].css' : 'style.css',
      }
    )
  );
}

module.exports = {
  entry: './src/index.ts',
  plugins,

  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCSSExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  output: {
    filename : isProduction ? 'index.[contenthash].js' : 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }
};
