const path = require('path')

/** @type {import('@cypress/webpack-preprocessor').PreprocessorOptions} */
module.exports = {
  webpackOptions: {
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['next/babel'],
            },
          },
        },
      ],
    },
  },
} 