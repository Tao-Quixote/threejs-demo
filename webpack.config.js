const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

console.log(process.env.NODE_ENV)

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /(j|t)s$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          }
        ]
      },
      {
        test: /(\.css$)|(\.less)/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  },
  output: {
    filename: '[name].[hash:8].js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3001,
    after () {
      console.log('devserver.after')
    }
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
    new htmlWebpackPlugin({
      title: 'development',
      template: path.resolve(__dirname, './public/index.html')
    }),
    new WebpackManifestPlugin(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
