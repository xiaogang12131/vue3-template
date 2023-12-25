const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 8000
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('store', resolve('src/store'))
      .set('hooks', resolve('src/hooks'))
      .set('utils', resolve('src/utils'))
      .set('views', resolve('src/views'))
      .end()

    // config.plugin('define').tap((args) => {
    //   const { mode, country } = process.env
    //   args[0]['process.env'] = JSON.stringify({
    //     mode,
    //     country,
    //     ...args[0]['process.env'],
    //     ...apiConfig[country][mode]
    //   })
    //   return args
    // })

    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // 将所有以 my- 开头的标签作为自定义元素处理
          isCustomElement: tag => tag.startsWith('my-')
        }
      }))
  },
  configureWebpack: () => {
    // if (isDev) {
    //   //
    // } else {
    //   return {
    //     plugins: [
    //       new CompressionWebpackPlugin({
    //         test: /\.(js|css|svg|woff|ttf|json|html)$/
    //       })
    //     ],
    //     externals: {
    //       vue: 'Vue',
    //       'vue-router': 'VueRouter',
    //       vuex: 'Vuex',
    //       axios: 'axios'
    //     }
    //   }
    // }
    return {
      module: {
        rules: [
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
          }
        ]
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/variables.scss";`
      },
      less: {
        lessOptions: {
          javascriptEnabled: true,
          math: 'always'
        }
      }
    }
  }
}
