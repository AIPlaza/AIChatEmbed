import resolve from '@rollup/plugin-node-resolve';
import { terser } from '@wwa/rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import commonjs from '@rollup/plugin-commonjs';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const isDev = process.env.NODE_ENV === 'development';
const extensions = ['.ts', '.tsx'];

const indexConfig = {
  context: 'this',
  plugins: [
    resolve({ extensions, browser: true }),
    commonjs(),
    json(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['solid', '@babel/preset-typescript'],
      extensions,
    }),
    postcss({
      plugins: [autoprefixer(), tailwindcss()],
      extract: false,
      modules: false,
      autoModules: false,
      minimize: true,
      inject: false,
    }),
    typescript(),
    typescriptPaths({ preserveExtensions: true }),
    terser({ output: { comments: false } }),
    ...(isDev
      ? [
          serve({
            open: true,
            verbose: true,
            contentBase: ['dist', 'public'],
            host: 'localhost',
            port: 5678,
          }),
          livereload({ watch: 'dist' }),
        ]
      : []),
  ],
};

const configs = [
  {
    ...indexConfig,
    input: './src/web.ts',
    output: {
      file: 'dist/web.js',
      format: 'es',
    },
  },
  {
    ...indexConfig,
    input: './src/web.ts',
    output: {
      file: 'dist/web.umd.js',
      format: 'umd',
      name: 'AIPlazaEmbed',
    },
  },
];

export default configs;
