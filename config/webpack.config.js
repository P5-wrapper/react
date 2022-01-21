const { join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const BASE_DIR = join(__dirname, "..");
const DISTRIBUTION_DIRECTORY = join(BASE_DIR, "dist", "demo");
const EXAMPLE_DIRECTORY = join(BASE_DIR, "example");

module.exports = (env, options) => {
  return {
    entry: join(EXAMPLE_DIRECTORY, "app.jsx"),
    output: {
      path: DISTRIBUTION_DIRECTORY,
      filename: "[name].[contenthash].js"
    },
    devServer: {
      compress: true,
      port: 3001
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          options: {
            configFile: join(__dirname, "tsconfig.json")
          }
        },
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                "@babel/preset-typescript",
                "@babel/preset-env"
              ]
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: join(EXAMPLE_DIRECTORY, "index.html")
      })
    ],
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
  };
};
