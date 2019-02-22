const Path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Webpack = require('webpack');
const devServer = require('./webpackDevServer.config');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer,
    entry: Path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: Path.resolve(__dirname, '../dist/js/'),
        // 设置发布路径，到时候可以替换为 cdn服务器
        publicPath: '/'
    },
    // 默认情况下webpack只是提供了js的多种导入和输出功能。不提供es6转es5和polyfillt以及css等资源文件类型的导入
    module: {
        rules: [
            {
                // lint js 文件
                // To be safe, you can use enforce: "pre" section to check source files, not modified by other loaders (like babel-loader)
                enforce: 'pre',
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules|dist/,
                use: [
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },
            {
                // 添加es6语法支持和polyfill
                test: /\.(js|jsx|mjs)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                // 处理css文件，生产环境下分离css文件
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: false,
                            localIdentName: '[name]-[local]'
                        }
                    },
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
                ]
            },
            {
                // 处理scss文件
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: false,
                            localIdentName: '[name]-[local]'
                        }
                    },
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
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                // 处理图片
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10240,
                            name: '[name].[hash:8].[ext]',
                            // 决定图片存放位置
                            outputPath: './images/',
                            // 最终路径为publicPath + name
                            publicPath: '/images'
                        }
                    }
                ]
            },
            {
                // 处理字体文件
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            outputPath: './font',
                            publicPath: '/font'
                        }
                    }
                ]
            },
            {
                // 处理 csv/tsv
                test: /\.(csv|tsv)$/,
                use: [
                    {
                        loader: 'csv-loader',
                        options: {
                            dynamicTyping: true,
                            header: true,
                            skipEmptyLines: true
                        }
                    }
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    {
                        loader: 'xml-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack-configuration-example',
            filename: 'index.html',
            template: Path.resolve(__dirname, '../src/xiangjianhuan.html'),
            inject: 'head',
            favicon: Path.resolve(__dirname, '../favicon.ico'),
            minify: false
        }),
        new CleanWebpackPlugin(
            [
                'dist/*' // removes 'dist' folder
                // 'build/*.*',    // removes all files in 'build' folder
                // 'web/*.js'      // removes all JavaScript files in 'web' folder
            ],
            {
                root: Path.resolve(__dirname, '../'),
                verbose: true,
                exclude: []
            }
        ),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin()
    ]
};
