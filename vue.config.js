let Webpack = require('webpack');

module.exports = {
  publicPath: '/x-components/',
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
      .loader('@hhm1999/vue-markdown-loader')
      .options({
        demoContainerComponentName: 'vueMarkdownLoaderDemoContainer'
      })
      .end()
    // config.module.rule('scss').oneOf('vue-modules').use('css-loader').tap(options => {
    //   // 修改它的选项...
    //   return {
    //     sourceMap: false,
    //     importLoaders: 2,
    //     modules: {
    //       localIdentName: '[name]_[local]_[hash:base64:5]',
    //       auto: () => true,
    //       compileType: 'icss'
    //     }
    //   }
    // })
  },
  devServer: {
    port: 1991
  },
  css: {
    extract: false,
    loaderOptions: {
      css: {
        modules: {
          mode: (resourcePath) => {
            if (/variableJs.scss$/i.test(resourcePath)) {
              return 'icss'
            }
            if (/github-markdown.scss$/i.test(resourcePath) || /global.scss$/i.test(resourcePath) || /atom-one-light.css$/i.test(resourcePath)) {
              return 'global';
            }
            return 'local'
          },
        }
      },
      sass: {
        additionalData: `
          @import "@/../components/assets/css/variable.scss";
          @import "@/../components/assets/css/commonClass.scss";
        `
      }
    }
  },
  productionSourceMap: false,
}
