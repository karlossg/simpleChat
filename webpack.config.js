const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');



module.exports = env => {
  var plugins = [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      new UglifyJsPlugin(),
      new OptimizeJsPlugin({
        sourceMap: false
      })
    );
  }

  
  return {
    (env !== 'production' ? [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
  ] : []).concat(['./client/index.js']),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: './bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    plugins: plugins
  };
};
