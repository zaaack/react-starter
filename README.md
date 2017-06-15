# react-starter
My react-starter

## Features

* webpack2
  * using [webpack-blocks](https://github.com/andywer/webpack-blocks)
  * react
  * react-hot-loader
  * babel
    * preset:
      * latest
      * stage-0
    * transform:
      * decorators-legacy
      * class-properties
      * flow-strip-types
      * babel-runtime
      * [babel-root-import](https://github.com/michaelzoidl/babel-root-import) (e.g. import xx from '~/root/path/of/module')
* styled-components + polished: much better than sass, saved lots time of configuration, like extractText + sass + postcss(AutoPrefixer)
* eslint
  * standard
  * standar
  * plugin:import/errors
  * babel-root-import
  * flowtype
* flow
* ava snapshot + enzyme test


[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
