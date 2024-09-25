import { build } from 'esbuild';

/** @type {import('esbuild').BuildOptions} */
const baseConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  charset: 'utf8',
  outfile: 'dist/bundle.js',
  format: 'cjs',
  external: ['react', 'react-dom']
};

await build(baseConfig);
