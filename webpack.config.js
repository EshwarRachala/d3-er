module.exports = {
    entry: './client/index.js',
    output: {
        /*eslint-disable */
        path: __dirname,
        /*eslint-enable */
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }]
    }
}