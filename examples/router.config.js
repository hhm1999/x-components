import Vue from 'vue'
import Router from 'vue-router'
import navConfig from './nav.config.json';

Vue.use(Router)
const componentsChildren = []
const loadDoc = function (navOne) {
  if (navOne.path) {
    componentsChildren.push({
      path: navOne.path,
      component: () => import('./docs/' + navOne.path + '.md'),
    })
  }
  if (navOne.children) {
    for (const childrenOne of navOne.children) {
      loadDoc(childrenOne)
    }
  }
}
for (const navOne of navConfig) {
  loadDoc(navOne)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'components',
      component: () => import('./page/index.vue'),
      children: componentsChildren
    }
  ]
})
