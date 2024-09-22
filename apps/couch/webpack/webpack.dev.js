import { config } from 'dotenv';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';

import sharedWebpackConfig from './webpack.common.js';

config();

/** @type {import('webpack').Configuration} */
const devWebpackConfig = {
  cache: {
    type: 'memory'
  },
  mode: 'development',
  entry: resolve(process.cwd(), 'src', 'dev-server', 'index.tsx'),
  devServer: {
    hot: true,
    port: 3000,
    https: false,
    open: true,
    historyApiFallback: true,
    static: [
      {
        directory: resolve(process.cwd(), 'src', 'styles')
      },
      {
        directory: resolve(process.cwd(), 'assets')
      },
      {
        directory: resolve(process.cwd(), 'node_modules', 'heller-2-lite', 'build', 'css')
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: 'html/dev.html', inject: 'body', minify: false })]
};

export default merge(sharedWebpackConfig, devWebpackConfig);
