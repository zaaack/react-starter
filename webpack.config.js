const {
  createConfig, defineConstants, env, addPlugins,
  entryPoint, setOutput, sourceMaps, webpack,
} = require('@webpack-blocks/webpack2')
const babel = require('@webpack-blocks/babel6')
const devServer = require('@webpack-blocks/dev-server2')
const Clean = require('clean-webpack-plugin')
const cssModules = require('./tools/webpack-blocks/css-loader')

const IS_DEV = process.env.NODE_ENV === 'development'

const DIST = `${__dirname}/static/dist`

module.exports = createConfig([
  entryPoint({
    bundle: [
      IS_DEV && 'babel-polyfill',
      IS_DEV && 'react-hot-loader/patch',
      './src/main.js',
    ].filter(f => !!f),
  }),
  setOutput({
    filename: '[name].js',
    path: DIST,
    publicPath: '/static/dist',
  }),
  cssModules(),
  babel({
    babelrc: false, // ignore .babelrc
    'presets': [
      ['latest', {'es2015': { 'modules': false }}],
      'stage-0',
      'react',
    ],
    'plugins': [
      IS_DEV && 'react-hot-loader/babel',
      'transform-flow-strip-types',
      'transform-decorators-legacy',
      'transform-class-properties',
      !IS_DEV && 'transform-runtime',
      // transform-runtime cannot work with react-hot-loader v3
      // even with { polyfill: false }
      ['babel-root-import', {
        'rootPathPrefix': '~',
      }],
    ].filter(f => !!f),
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
  }),
  addPlugins([
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(`${DIST}/vendor-manifest.json`),
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     minChunks: function (module) {
    //        // this assumes your vendor imports exist in the node_modules directory
    //        return module.context && (
    //          module.context.indexOf('node_modules') !== -1 ||
    //          module.context.indexOf('src/vendor.js') !== -1)
    //     },
    // }),
    // //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'manifest', //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    // }),
  ]),
  env('development', [
    devServer({
      hot: true,
    }),
    devServer.proxy({
      '/api': { target: 'http://localhost:3000' },
    }),
    addPlugins([
      // enable HMR globally
      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates
    ]),
    sourceMaps(),
  ]),
  env('production', [
    addPlugins([
      new Clean(['dist'], {exclude: ['vendor.dll.js', 'vendor-manifest.json']}),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
          comments: false,
        },
      }),
    ]),
    sourceMaps(),
  ]),
])
