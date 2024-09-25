import dotenv from 'dotenv';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

dotenv.config();

/** @type {import('webpack').Configuration} */
const devWebpackConfig = {
  cache: {
    type: 'memory'
  },
  mode: 'development',
  entry: path.resolve(process.cwd(), 'src', 'dev', 'index.tsx'),
  devServer: {
    hot: true,
    port: 3000,
    open: true,
    static: [
      {
        directory: path.resolve(process.cwd(), 'public')
      },
      {
        directory: path.resolve(
          process.cwd(),
          'node_modules',
          '@project-arcturus',
          'design-tokens',
          'build',
          'css'
        ),
        publicPath: '/css'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: 'html/dev.template.html' })]
};

export default merge(common, devWebpackConfig);
