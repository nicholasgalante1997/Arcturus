import { resolve } from 'path';
import dotenv from 'dotenv';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import sharedWebpackConfig from './webpack.common.js';
import { getEntryObject } from './utils.js';

dotenv.config();

/** @type {webpack.Configuration} */
const prodWebpackConfig = {
  cache: false,
  mode: 'production',
  entry: getEntryObject(),
  output: {
    clean: false,
    path: resolve(process.cwd(), 'build'),
    filename: '[name].[contenthash].js'
  }
};

export default merge(sharedWebpackConfig, prodWebpackConfig);
