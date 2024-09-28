import React from 'react';
import { toStatic } from '@project-arcturus/renderer';
import config from './pages';

export async function build() {
  await toStatic(config);
}
