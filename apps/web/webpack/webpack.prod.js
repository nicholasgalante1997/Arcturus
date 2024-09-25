import path from 'path';
import dotenv from 'dotenv';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';

const { EnvironmentPlugin } = webpack;
import sharedWebpackConfig from './webpack.common.js';

dotenv.config();

/** @type {webpack.Configuration} */
const prodWebpackConfig = {
  cache: false,
  mode: 'production',
  entry: {
    article: path.resolve(process.cwd(), 'src', 'pages', 'Article', 'Article.browser.ts')
  },
  output: {
    clean: false,
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].[contenthash].js',
    module: true,
    chunkFormat: 'module'
  },
  experiments: {
    outputModule: true
  }
};

/** @type {Array<webpack.Configuration} */
export default [
  { name: 'browser', ...merge(sharedWebpackConfig, prodWebpackConfig) },
  {
    mode: 'production',
    cache: false,
    entry: path.resolve(process.cwd(), 'src', 'server', 'index.ts'),
    output: {
      clean: true,
      path: path.resolve(process.cwd(), 'dist', 'server'),
      filename: '[name].cjs'
    },
    target: ['node', 'es2022'],
    externalsPresets: { node: true },
    externals: [nodeExternals()],
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
  }
];
