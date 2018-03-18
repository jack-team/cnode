/**
 * Created by jiangtao on 16/7/5.
 */

const path = require('path');
const webpack = require('webpack');

const AssetsPlugin = require('assets-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseConfig = require('./base.config');

const prodConfig = {
    plugins:[
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        //js压缩参数
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            beautify:false,
            comments:false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            __DEV__: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new AssetsPlugin({
            filename:"asset.json",
            processOutput:function ( assets ) {
                const { common , app } = assets;
                let css=[common.css],
                    js =[common.js];
                if(!!app.css) {
                    css.push(app.css)
                }
                if(!!app.js) {
                    js.push(app.js);
                }
                const assetsMap = { css:css, js:js };
                return JSON.stringify(assetsMap);
            }
        }),
        new CleanWebpackPlugin(['dist'],　 //匹配删除的文件
            {
                root: path.resolve(__dirname,'../'),//根目录
                verbose: true,//开启在控制台输出信息
                dry: false//启用删除文件
            }
        )
    ]
};

baseConfig.output.publicPath = "/static/";

baseConfig.plugins = prodConfig.plugins.concat( baseConfig.plugins );

module.exports = baseConfig;