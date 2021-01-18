import Vue from 'vue'
import app from '../examples/app.vue'
// import xComponent from 'x-component'
import xComponent from '../components/index.js'
import router from '../examples/router.config.js'
import vueMarkdownLoaderDemoContainer from '../examples/page/vueMarkdownLoaderDemoContainer/container.vue'
Vue.component('vueMarkdownLoaderDemoContainer', vueMarkdownLoaderDemoContainer)
Vue.config.productionTip = false
Vue.use(xComponent)
new Vue({
  router,
  render: h => h(app),
}).$mount('#app')
