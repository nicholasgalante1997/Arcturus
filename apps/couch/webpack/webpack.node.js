import path from 'path';

import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';
import dotenv from 'dotenv';

const { EnvironmentPlugin } = webpack;

dotenv.config();

/** @type {webpack.Configuration} */
export default {
  mode: 'production',
  cache: false,
  entry: {
    sleepy: path.resolve(process.cwd(), 'src', 'sleepy.tsx')
  },
  output: {
    clean: true,
    path: path.resolve(process.cwd(), '.sleepy'),
    filename: '[name].cjs'
  },
  target: 'node',
  externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  node: {
    global: false
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(process.cwd(), 'src')
    }
  },
  plugins: [new EnvironmentPlugin({ ...process.env })]
};
