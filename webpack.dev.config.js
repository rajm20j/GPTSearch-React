/*eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
require("dotenv").config({ path: "./.env" });

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devServer: {
    static: "./dist",
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(t|j)s(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(s?)css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      { test: /\.(png|PNG|svg|jpe?g|gif|webp)$/i, loader: "file-loader" },
      { enforce: "pre", test: /\.js$/, use: "source-map-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "index.html" }),
    new webpack.DefinePlugin({ "process.env": JSON.stringify(process.env) })
  ]
};
/*eslint-disable */
