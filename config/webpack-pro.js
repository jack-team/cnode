import colors from 'colors';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import ugJsPlugin from 'uglifyjs-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as utils from './utils';
import chunks from './chunks.json';

import getCommonConfig from './webpack-common';


const webpackCommonConfig = getCommonConfig(true);

const {
    plugins,
    optimization
} = webpackCommonConfig;

webpackCommonConfig.mode = `production`;
webpackCommonConfig.optimization.chunkIds = `named`;
webpackCommonConfig.optimization.moduleIds = `hashed`;
webpackCommonConfig.output.publicPath = `/static/`;

plugins.push(
    new webpack.DefinePlugin({
        __DEV__: false
    })
)

plugins.push(
    new webpack.HashedModuleIdsPlugin()
)

plugins.push(
    new CleanWebpackPlugin({
        verbose: true,
        dry: false
    })
)

plugins.push(
    new webpack.ProgressPlugin({
        profile: true
    })
)

optimization.minimizer = [
    new ugJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
    }),
    new OptimizeCssAssetsPlugin()
]

plugins.push(
    new AssetsPlugin({
        filename: `asset.json`,
        processOutput:assets => {
            const links = {
                js:[],
                css:[]
            };
            chunks.forEach(chunk => {
                const {
                    js = ``,
                    css = ``
                } = assets[chunk] || {}
                if(!!js) {
                    links.js.push(js);
                }
                if(!!css) {
                    links.css.push(css);
                }
            })
            return JSON.stringify(links);
        }
    })
)

webpackCommonConfig.plugins = plugins;
webpackCommonConfig.optimization = optimization;

console.log(colors.green(`building...`));

webpack(webpackCommonConfig, utils.outputLog);