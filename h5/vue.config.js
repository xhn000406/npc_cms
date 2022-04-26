const {
  defineConfig
} = require('@vue/cli-service')

const ENV_PRODUCTION = 'production'
const USE_MOCK = JSON.parse(process.env.USE_MOCK)
const NODE_ENV = process.env.NODE_ENV
const BASEURL = process.env.BASEURL

const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    const svg = config.module.rule("svg")
    svg.exclude.add(path.resolve("src/icons")).end()
    config
    .module
    .rule("svg-sprite")
    .test(/\.svg$/)
    .include.add(path.resolve("src/icons/svg"))
    .end()
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({
      symbolId: "icon-[name]"
    })
  },
  configureWebpack: {
    devServer: {
      // 使用mock构造假数据，在生产环境下 自动移除
      onBeforeSetupMiddleware: ({ app }) => {
        if (USE_MOCK) {
          // 当前为生产环境的话就不启动了
          (NODE_ENV !== ENV_PRODUCTION) && require('./src/mock')(app)
        }
      }
    }
  },
  publicPath: './',
  devServer: {
    open: true,
    host: 'localhost',
    proxy: {
      '/api': {
        target: BASEURL,
        changeOrigin: true
      }
    }
  }
})