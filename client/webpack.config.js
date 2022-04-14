const path = require('path');

module.exports = {
    entry: "./src/App.js",
    mode: "development",
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '/bundle.js',
    },
    devServer: {
            port: 3001,
            static: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            }
        ]
    }
};