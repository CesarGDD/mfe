const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('app-root-path');

const filePath = path;

const deps = require("./package.json").dependencies;
module.exports = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        // path: path.resolve(__dirname, './dist'),
        publicPath: `/`
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "react_host",
      filename: "remoteEntry.js",
      remotes: {
        remote: `remote@${filePath}/files/remote-one/remoteEntry.js`,
        remote_two: `remote_two@${filePath}/files/remote-two/remoteEntry.js`
      },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};