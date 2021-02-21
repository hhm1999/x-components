import Vue from 'vue'
import app from '../examples/app.vue'
// import xComponents from '@hhm1999/x-components';
import xComponents from '../components/index.js';
import router from '../examples/router.config.js'
import vueMarkdownLoaderDemoContainer from '../examples/page/vueMarkdownLoaderDemoContainer/container.vue'
Vue.component('vueMarkdownLoaderDemoContainer', vueMarkdownLoaderDemoContainer)
Vue.config.productionTip = false
Vue.use(xComponents)
new Vue({
  router,
  render: h => h(app),
}).$mount('#app')
