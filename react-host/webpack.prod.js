const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const domainOne = 'https://cdn.jsdelivr.net/gh/CesarGDD/mfe@latest/remote/'
const domainTwo = 'https://cdn.jsdelivr.net/gh/CesarGDD/mfe@latest/remote-two/'

const deps = require("./package.json").dependencies;
module.exports = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        // publicPath: `https://cdn.jsdelivr.net/gh/CesarGDD/mfe@latest/rect-host/dist/`
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
        remote: `remote@${domainOne}dist/remoteEntry.js`,
        remote_two: `remote_two@${domainTwo}dist/remoteEntry.js`
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