import clickoutside from './clickoutside.js'
const install = Vue => {
  Vue.directive('x-clickoutside', clickoutside)
}
export default {
  install
}
