const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require ('path');


const deps = require("./package.json").dependencies;
module.exports = {
  mode: 'development',
  output: {
    publicPath: "http://localhost:8081/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
    historyApiFallback: true,
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
        remote: `remote@http://localhost:3000/remoteEntry.js`,
        remote_two: `remote_two@http://localhost:3001/remoteEntry.js`
        // remote: `remote@http://${process.env.REMOTE_ONE}:3000/remoteEntry.js`,
        // remote_two: `remote_two@http://${process.env.REMOTE_TWO}:3001/remoteEntry.js`
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
