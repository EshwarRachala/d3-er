var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: './client/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: path.join(__dirname, 'client'),
            loader: 'babel-loader'
        }]
    }
}