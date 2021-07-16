const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";


const __rootDir = path.resolve(".");

const paths = {
  srcDir: path.resolve(__rootDir, "server", "src"),
  distDir: path.resolve(__rootDir, "dist")
};


const webpackServerConfiguraion = {
  mode: isProduction ? "production" : "development",
  target: "node",
  
  entry: path.resolve(paths.srcDir, "index.js"),

  output: {
    path: path.resolve(paths.distDir),
    filename: "server.js",
    clean: true
  },

  resolve: {
    alias: {
      api: path.resolve(paths.srcDir, "api"),
      service: path.resolve(paths.srcDir, "service"),
    }
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "@babel/preset-env" ],
            plugins: [ "@babel/transform-runtime" ]
          }
        }
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      WEBAPP_PUBLIC_PATH: JSON.stringify(path.resolve(paths.distDir, "public")),
      DATASET_FILENAME: JSON.stringify(path.resolve(paths.distDir, "sample-data.csv")),
    }),
    new CopyPlugin({
      patterns: [
        { from : path.resolve(__rootDir, "server", "sample-data.csv"), to: path.resolve(paths.distDir) }
      ]
    })
  ]
};

module.exports = webpackServerConfiguraion;
