import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as postcssPresetEnv from 'postcss-preset-env'
import * as postcssImport from 'postcss-import'

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.min.js'
    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components'),
            utils: path.resolve(__dirname, 'src/utils'),
            public: path.resolve(__dirname, 'public/')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /node_modules/,
                use: 'file-loader'
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                include: path.join(__dirname, 'src/index.pug'),
                use: 'pug-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv(postcssImport)
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.pug'),
            minify: true,
            hash: true
        })
    ]
}