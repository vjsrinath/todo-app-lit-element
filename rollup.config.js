// const gulp = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('@rollup/plugin-typescript');
// const babel = require('@rollup/plugin-babel');
const resolve = require('@rollup/plugin-node-resolve');
module.exports = {
    input: 'src/main.ts',
    plugins: [
        rollupTypescript(),
        // babel(),
        resolve.nodeResolve()
    ],
    output: {
        dir: 'public/dist/',
        format: 'iife',
        // name: 'agilepoin-icon-component',
        sourcemap: true
    }
};



