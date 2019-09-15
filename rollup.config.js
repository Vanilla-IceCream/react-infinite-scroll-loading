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
      { file: pkg.module, format: 'es', sourcemap: true },
    ],
    plugins: [
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: '> 0.25%, not dead',
            },
          ],
          '@babel/preset-react',
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              useESModules: true,
            },
          ],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
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
