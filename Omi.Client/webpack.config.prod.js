const path = require('path');
const keys = require('lodash/keys');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyESPlugin = require('uglify-es-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const pkg = require('./package.json');

module.exports = {
    entry: {
        script: path.join(__dirname, 'src/scripts/index.prod.ts'),
        vendor: keys(pkg.dependencies)
            // font-awesome doesn't have a Javascript component, there's no package to find
            .filter(name => (name != 'font-awesome'))
            .filter(name => (name != 'bootstrap'))
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, '../Omi.Host/Omi', 'wwwroot'),
        filename: 'app.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': false,
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new BundleAnalyzerPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new UglifyESPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.js',
        }),
        new ExtractTextPlugin('style.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.s?css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ],
    module: {
        rules: [{
                test: /\.tsx?$/,
                loaders: ['ts-loader', 'ts-nameof-loader']
            },
            {
                test: /\.scss?$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader?name=fonts/[name].[ext]'
                }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader?name=images/[name].[ext]'
                }]
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, '/src'),
            'node_modules'
        ],
        extensions: ['.js', '.ts', '.tsx'],
    }
};