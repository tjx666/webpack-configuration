const Path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = {
    mode: 'production',
    entry: Path.resolve(__dirname, '../src/index.js'),
    output: {
        filename: 'bundle.js',
        path: Path.resolve(__dirname, '../dist/'),
        // 设置发布路径，到时候可以替换为 cdn服务器
        publicPath: "./",
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
                            // publicPath: ''
                        }
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
                    }
                ]
            },
            {
                // 处理scss文件
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // 关闭css modules
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
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10240,
                    name: '[name].[hash:8].[ext]',
                    // 决定图片存放位置
                    outputPath: './images/',
                    // 最终路径为publicPath + name
                    publicPath: '/dist/images'
                },
            },
            {
                // 处理字体文件
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash:5].[ext]',
                    outputPath: './font',
                    publicPath: '/dist/font'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 打包所有css文件到 style.css
            filename: "css/style.css",
            chunkFilename: "[id].css"
        })
    ],
}