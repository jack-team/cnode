import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import chunks from './chunks.json';

import {
    resolve
} from './utils';

export default hash => ({
    //入口文件
    entry: {
        app: resolve('src/index.ts'),
        commons:resolve('src/components/index.ts')
    },
    //输出
    output: {
        path: resolve(`dist`),
        filename: `js/[name]${!!hash ? `-[chunkhash]` : ``}.js`
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
                exclude: path => !!path.match(/node_modules/)
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.js?$/,
                use: 'babel-loader',
                exclude: path => !!path.match(/node_modules/)
            },
            {
                test: /\.(sa|sc|c|le)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr:!hash,
                            reloadAll: true
                        }
                    },
                    `css-loader`,
                    `postcss-loader`,
                    `sass-loader`
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 20480,
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 20480,
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: `runtime`
        },
        splitChunks: {
            chunks: `all`,
            cacheGroups: {
                libs: {
                    name: `libs`,
                    test: /node_modules/
                },
                commons: {
                    name: `commons`,
                    minChunks: 2,
                    test: /src/
                }
            }
        }
    },
    resolve: {
        extensions: [
            `.ts`,
            `.js`,
            `.vue`,
            `.json`,
            `.scss`,
            '.png',
            '.jpg'
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `css/[name]${!!hash ? `-[contenthash:8]` : ``}.css`
        }),
        new HtmlWebpackPlugin({
            inject:false,
            title:"CNode: Node.js 专业技术社区",
            chunks: chunks,
            filename: `index.html`,
            template: resolve('tpl/index.html')
        })
    ]
})