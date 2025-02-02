const {
  defineConfig
} = require('@vue/cli-service')
const BASEURL = process.env.BASEURL
console.log(BASEURL)
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