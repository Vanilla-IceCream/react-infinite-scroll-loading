import { join } from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';

export default [
  {
    input: join(__dirname, 'src/index.js'),
    output: [
      { file: pkg.main, format: 'cjs', sourcemap: true },
      { file: pkg.module, format: 'esm', sourcemap: true },
    ],
    plugins: [
      babel({
        exclude: ['node_modules/@babel/**'],
        runtimeHelpers: true,
      }),
      resolve(),
      commonjs(),
    ],
    external: [
      ...Object.keys(pkg.peerDependencies),
      ...Object.keys(pkg.dependencies),
    ],
  },
];
