/**
 * Created by jiangtao on 2017/5/17.
 */

const webpack = require('webpack'),
      path = require('path');

const process = require('process');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const __DEV__ = process.env.NODE_ENV === 'dev';

const Hash8 = !__DEV__ ? '-[hash:8]':'';

//基本配置
const baseConfig =  {
    // 入口
    entry: {
        common: [
            'vue',
            'vue-router',
            'vuex',
            'babel-polyfill',
             path.resolve(__dirname,'../src/common/common.js')
        ],
        app:path.resolve(__dirname,'../src/app.js')
    },
    // 输出
    output: {
        path:path.resolve(__dirname,'../dist'),
        publicPath:"",
        filename:"js/[name]" + Hash8 + ".js"
    },
    // 加载器
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
                exclude:path=>!!path.match(/node_modules/)
            },
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude:path=>!!path.match(/node_modules/)
            },
            {
                test: /\.(css|scss|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: "url-loader?limit=20480&name=images/[name]" + Hash8 + ".[ext]"
            },
            {
                test: /\.jpeg?$/,
                use: "file-loader?limit=20480&name=images/[name]" + Hash8 + ".[ext]"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name]" + Hash8 + ".[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader?name=fonts/[name]" + Hash8 + ".[ext]"
            }
        ],

    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    plugins: [

        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            filename: "js/common" + Hash8 + ".js"
        }),

        //提取css,将它放在css文件夹下
        new ExtractTextPlugin({
            allChunks: true,
            filename: "css/[name]" + Hash8 + ".css"
        }),

        //模板
        new HtmlWebpackPlugin({
            title:"",
            filename: "app.html" ,
            template:  "server.template.html",
            chunks: [ "common", "app" ],
            inject:false,
        })
    ]
};

module.exports =baseConfig;