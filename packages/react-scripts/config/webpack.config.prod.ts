import * as webpack from "webpack";
import * as path from "path";

type Config = webpack.Configuration & {
  optimization: {
    minimize: boolean;
  };
};

const base: Config = {
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript"]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: false
  }
};

const clientConfig: Config = {
  ...base,
  entry: {
    client: path.resolve(__dirname, "src/client/index.ts")
  },
  output: {
    path: path.resolve(__dirname, "dist/client")
  }
};

const serverConfig: Config = {
  ...base,
  target: "node",
  entry: {
    server: path.resolve(__dirname, "src/server/index.ts")
  }
};

export default [clientConfig, serverConfig];
