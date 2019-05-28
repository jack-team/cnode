'use strict';
import colors from 'colors';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';
import getCommonConfig from './webpack-common';
import * as utils from './utils';

import * as Config from './config';

const serverUrl = `http://${Config.ip}:${Config.port}`;

const webpackCommonConfig = getCommonConfig(false);

const {
    plugins
} = webpackCommonConfig;

//开发模式
webpackCommonConfig.mode = `development`;

webpackCommonConfig.devtool = `source-map`;

plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

plugins.push(
    new webpack.DefinePlugin({
        __DEV__: true
    })
)

const serverConfig = {
    stats: {
        colors: true,
        cached: false,
        exclude: [/node_modules[\\\/]/]
    },
    hot: true,
    inline: true,
    compress: true,
    open:true,
    contentBase: utils.resolve(`src`)
}

webpackCommonConfig.output.publicPath = '/'

webpackCommonConfig.plugins = plugins;

const builder = webpack(webpackCommonConfig);

const server = new webpackDevServer(builder, serverConfig);

server.listen(Config.port, Config.ip, () => {
    console.log(colors.green(`Starting server on ${serverUrl}...`));
});
