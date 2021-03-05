import Vue from 'vue'
import Router from 'vue-router'
import navConfig from './nav.config.json';

Vue.use(Router)
const componentsChildren = [
  { path: '/', redirect: 'start' },
  {
    path: 'test-page/get-location-relative-window',
    component: () => import('./page/test-page/getLocationRelativeWindow.vue')
  },
  {
    path: 'test-page/free',
    component: () => import('./page/test-page/free.vue')
  }
]
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
