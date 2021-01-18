import clickoutside from './clickoutside/index.js'
const directives = [
  clickoutside
]
const install = Vue => {
  for (let i = 0; i < directives.length; i++) {
    Vue.use(directives[i])
  }
}
export default {
  install
}
