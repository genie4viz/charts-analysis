const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopywebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        // Needed to compile multiline strings in Cesium
        sourcePrefix: ''
    },
    amd: {
        // Enable webpack-friendly use of require in Cesium
        toUrlUndefined: true
    },
    node: {
        // Resolve node module use of fs
        fs: 'empty'
    },    
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', {
                loader: 'css-loader'                
            }]
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|gltf|glb)$/,
            use: [ 'url-loader' ]
        },{
            type: 'javascript/auto',
            test: /\.json$/,
            exclude: /(node_modules|bower_componnets)/,
            use: [{
                loader: 'file-loader',
                options: {name: '[name].[ext]'}
            }],
        }        
        ]},
    plugins: [        
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),        
        new CopywebpackPlugin([ { from: 'src/static', to: 'static' } ]),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist")
    }
};