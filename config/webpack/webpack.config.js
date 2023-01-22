// noinspection JSUnusedGlobalSymbols
import HtmlWebpackPlugin from "html-webpack-plugin";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const filePath = fileURLToPath(import.meta.url);
const fileDirectory = dirname(filePath);

const BASE_DIR = join(fileDirectory, "..", "..");
const DISTRIBUTION_DIRECTORY = join(BASE_DIR, "dist", "demo");
const EXAMPLE_DIRECTORY = join(BASE_DIR, "example");

export default {
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
          configFile: join(fileDirectory, "..", "typescript", "tsconfig.json")
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
