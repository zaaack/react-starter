const {
  createConfig, defineConstants, env, addPlugins,
  entryPoint, setOutput, sourceMaps, webpack,
} = require('@webpack-blocks/webpack2')
const babel = require('@webpack-blocks/babel6')
const path = require('path')
const devServer = require('@webpack-blocks/dev-server2')
const cssModules = require('./tools/webpack-blocks/css-loader')

const DIST = `${__dirname}/static/dist`

module.exports = createConfig([
  entryPoint({
    vendor: [
      'react', 'react-dom', 'redux', 'react-redux',
      'redux-promise-middleware', 'redux-thunk',
      'react-router', 'react-router-redux', 'react-router-dom',
      'styled-components', 'polished',
      './src/vendor.js'],
  }),
  setOutput({
    filename: '[name].dll.js',
    path: DIST,
    publicPath: '/static/dist',
    library: '[name]', // needed for dll plugin
  }),
  cssModules(),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
  }),
  addPlugins([
    new webpack.DllPlugin({
      path: `${DIST}/[name]-manifest.json`,
      name: '[name]',
      context: __dirname,
    }),
    // cannot live with `-p` in command line
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      output: {
        comments: false,
      },
    }),
  ]),
  sourceMaps(),
])
