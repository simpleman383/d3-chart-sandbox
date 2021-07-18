const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const __rootDir = path.resolve(".");

const paths = {
  srcDir: path.resolve(__rootDir, "client", "src"),
  staticDir: path.resolve(__rootDir, "client", "static"),
  distDir: path.resolve(__rootDir, "dist", "public")
};

const webpackClientConfiguration = {
  mode: isProduction ? "production" : "development",
  target: isProduction ? ["web", "es5"] : "web", // to do: add browserlist support for production mode 
  
  entry: path.resolve(paths.srcDir, "index.js"),
  
  output: {
    path: path.resolve(paths.distDir),
    filename: isProduction ? "js/[id].[contenthash:8].bundle.js" : "[name].bundle.js",
    chunkFilename: isProduction ? "js/[id].[contenthash:8].chunk.js" : "[id].chunk.js",
    clean: true
  },

  resolve: {
    alias: {
      state: path.resolve(paths.srcDir, "state"),
      views: path.resolve(paths.srcDir, "views"),
      utils: path.resolve(paths.srcDir, "utils"),

      fonts: path.resolve(paths.staticDir, "fonts"),
    }
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [ "@babel/preset-env", "@babel/preset-react" ],
            plugins: [ "@babel/transform-runtime" ]
          }
        }
      },

      {
        test: /\.module.(s[ac]ss|css)$/,
        use: [
          { loader: isProduction ? MiniCssExtractPlugin.loader : "style-loader" },
          { 
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                exportGlobals: true,
                localIdentName: isProduction ? "[local]-[hash:base64:5]" : "[path][name]__[local]--[hash:base64:5]",
              },
            } 
          },
          { 
            loader: "postcss-loader", 
            options: {
              postcssOptions: {
                plugins: [ "autoprefixer" ]
              }
            } 
          },
          { loader: "sass-loader" }
        ]
      },

      {
        test: /\.(s[ac]ss|css)$/,
        exclude: /\.module.(s[ac]ss|css)$/,
        use: [
          { loader: isProduction ? MiniCssExtractPlugin.loader : "style-loader" },
          { 
            loader: "css-loader",
            options: {
              importLoaders: 2,
            }
          },
          { 
            loader: "postcss-loader", 
            options: {
              postcssOptions: {
                plugins: [ "autoprefixer" ]
              }
            } 
          },
          { loader: "sass-loader" }
        ]
      }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(paths.staticDir, "index.html"),
      filename: path.resolve(paths.distDir, "index.html"),
      title: "d3.js app"
    }),
    isProduction ? new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[id].[contenthash:8].chunk.css"
    }) : null
  ].filter(Boolean),

  devtool: isProduction ? false : "eval-source-map",

  devServer: {
    contentBase: path.resolve(paths.distDir),
    host: "localhost",
    port: 3000,
    compress: true,
    hot: true,
    liveReload: true,
    open: true
  },

};


module.exports = webpackClientConfiguration;