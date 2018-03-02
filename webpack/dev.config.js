/**
 * Created by jiangtao on 2017/5/17.
 */
const webpack = require('webpack');
const util = require('./util'),
      path = require('path');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');//帮助打开浏览器

//首先设置环境为测试环境
const baseConfig = require("./base.config");

const devServer = {
    //服务的根目录
    contentBase: path.join( __dirname , 'src' ),
    //热更新
    hot: true,
    // 服务器地址
    host: util.getIPAddress(),
    //inline模式下我们访问的URL不用发生变化
    inline: true,
    // 端口号
    port:util.port,
    // historyApiFallback: true,
    stats: {
        colors: true,
        cached: false,
        exclude: [/node_modules[\\\/]/]
    }
};

const publicPath = 'http://' + devServer.host + ':' + devServer.port + '/';

baseConfig.output.publicPath = publicPath;

baseConfig.devtool = "#inline-source-map";

baseConfig.plugins = baseConfig.plugins.concat([
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
        debug: true
    }),
    new webpack.DefinePlugin({
        __DEV__: true
    }),
    new OpenBrowserPlugin({
        url: publicPath + 'app.html'
    })
]);

baseConfig.devServer = devServer;

module.exports = baseConfig;
