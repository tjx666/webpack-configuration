const Path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: Path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: Path.resolve(__dirname, '../dist/')
    },
    optimization: {
        minimizer: [
            // webpack5内置了压缩css功能，但是webpack4并没有
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    // 默认情况下webpack只是提供了js的多种导入和输出功能。不提供es6转es5和polyfillt以及css等资源文件类型的导入
    module: {
        rules: [
            {
                // 处理css文件，生产环境下分离css文件
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: 'css'
                        }
                    },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    }
                ]
            },
            {
                // 处理scss文件
                test: /\.(scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'css'
                        }
                    },
                    { loader: 'css-loader ' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                }),
                            ],
                        },
                    },
                    { loader: 'sass-loader' }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name]-[hash:5].css",
            chunkFilename: "[id]-[hash:5].css"
        })
    ],
}