const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  devServer: {
    port: 8000
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.resolve.alias.set('@', resolve('src'))

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

    // config.module.rules.delete("svg");
    // config.module
    //   .rule("svg-sprite-loader")
    //   .test(/\.svg$/)
    //   .include.add(resolve("src/icons"))
    //   .end()
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loader")
    //   .options({
    //     symbolId: "icon-[name]",
    //   })
    //   .end();
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
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
  }
}
