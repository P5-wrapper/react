const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./example/src/index.html"),
    filename: "./index.html"
});

module.exports = {

  entry: path.join(__dirname, "./example/src/app.jsx"),
  output: {
      path: path.join(__dirname, "example/dist"),
      filename: "bundle.js"
  },
  module: {
    rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
    ]
},
  plugins: [htmlWebpackPlugin],
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
},
  devServer: {
      port: 3001
  },
};