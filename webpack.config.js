var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app:['./src/main.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/',
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.js$/,
                // loader: 'babel-loader',
                use:['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(["css-loader"])
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use:[
                    'file-loader'
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                    //         limit: 10000
                    //     }
                    // }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '~': path.resolve(__dirname, 'src'),
            'components': path.resolve(__dirname, 'src/components'),
            'services':path.resolve(__dirname, 'src/services')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    // devtool: '#eval-source-map',
    devtool:'source-map',
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'myVue-index',
            filename:'index.html',  
            template:'./index.html',
            inject: true,
            chunks: ['app']//过滤页面限定特定引用的块
        })
    ]
}
// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map'
//     // http://vue-loader.vuejs.org/en/workflow/production.html
//     module.exports.plugins = (module.exports.plugins || []).concat([
//         new webpack.DefinePlugin({
//             'process.env': {
//                 NODE_ENV: '"production"'
//             }
//         }),
//         new webpack.optimize.UglifyJsPlugin({
//             sourceMap: true,
//             compress: {
//                 warnings: false
//             }
//         }),
//         new webpack.LoaderOptionsPlugin({
//             minimize: true
//         })
//     ])
// }
