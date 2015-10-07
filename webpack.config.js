var path = require('path');
    module.exports = {
        entry: './index.js',
        output: {
            path: path.join(__dirname),
            filename: 'build/bundle.js'
        },
        module: {
            loaders: [
                { test: path.join(__dirname),
                  exclude: 'node_modules/',
                  loader: 'babel' }
            ]
        }
    };