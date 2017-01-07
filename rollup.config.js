import node from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import eslint from 'rollup-plugin-eslint'
import buble from 'rollup-plugin-buble'

export default {
    entry: 'index.js',
    format: 'umd',
    moduleId: 'd3',
    moduleName: 'd3',
    plugins: [json(),
        eslint({
            throwError: true,
            include: 'src/**'
        }),
        buble({
            include: 'src/**'
        }),
        node({
            jsnext: true
        })
    ],
    dest: 'build/d3-er.js'
}