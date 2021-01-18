let Webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new Webpack.IgnorePlugin(/\.\/locale/, /moment/), // 忽略moment的语言包打包
    ]
  },
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('@hhm1999/vue-markdown-doc-loader')
      .options({
        demoContainerComponentName: 'vueMarkdownLoaderDemoContainer'
      })
      .end()
  },
  devServer: {
    port: 1999
  },
  css: {
    extract: false,
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/../components/assets/css/variable.scss";
          @import "@/../components/assets/css/commonClass.scss";
        `
      }
    }
  },
}
