const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: `https://cdn.jsdelivr.net/gh/CesarGDD/mfe@latest/remote-two/dist/`
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
      name: "remote_two",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./CounterTwo": "./src/CounterTwo.jsx",
        "./counterTwoWrapper": "./src/counterTwoWrapper.jsx",
      },
      shared: {
        ...deps,
        "solid-js": {
          singleton: true,
          requiredVersion: deps["solid-js"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
