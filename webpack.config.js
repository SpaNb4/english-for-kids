const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const environment = require('./configuration/environment');

const templateFiles = fs.readdirSync(path.resolve(__dirname, environment.paths.source, 'templates'));
const htmlPluginEntries = templateFiles.map(
    (template) =>
        new HTMLWebpackPlugin({
            inject: true,
            hash: false,
            filename: template,
            template: path.resolve(environment.paths.source, 'templates', template),
        })
);

module.exports = {
    entry: {
        app: path.resolve(environment.paths.source, 'js', 'index.js'),
    },
    output: {
        filename: 'js/[name].js',
        path: environment.paths.output,
    },
    module: {
        rules: [
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img/[name].[ext]',
                            publicPath: '../',
                        },
                    },
                ],
            },
            {
                test: /\.(mp3)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/sounds/[name].[ext]',
                            publicPath: '../',
                        },
                    },
                ],
            },
            // {
            //     test: /\.(eot|svg|ttf|woff|woff2)$/,
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 name: 'fonts/[name].[hash:6].[ext]',
            //                 publicPath: '../',
            //             },
            //         },
            //     ],
            // },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        // new ImageMinimizerPlugin({
        //     test: /\.(jpe?g|png|gif|svg)$/i,
        //     minimizerOptions: {
        //         // Lossless optimization with custom option
        //         // Feel free to experiment with options for better result for you
        //         plugins: [
        //             ['gifsicle', { interlaced: true }],
        //             ['jpegtran', { progressive: true }],
        //             ['optipng', { optimizationLevel: 5 }],
        //             [
        //                 'svgo',
        //                 {
        //                     plugins: [
        //                         {
        //                             removeViewBox: false,
        //                         },
        //                     ],
        //                 },
        //             ],
        //         ],
        //     },
        // }),
        new CleanWebpackPlugin({
            verbose: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(environment.paths.source, 'assets/img', ''),
                    to: path.resolve(environment.paths.output, 'assets/img', ''),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
                {
                    from: path.resolve(environment.paths.source, 'assets/sounds', ''),
                    to: path.resolve(environment.paths.output, 'assets/sounds', ''),
                    toType: 'dir',
                    globOptions: {
                        ignore: ['*.DS_Store', 'Thumbs.db'],
                    },
                },
            ],
        }),
    ].concat(htmlPluginEntries),
    target: 'web',
};
