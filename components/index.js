import icon from './icon/index.js'
import pop from './pop/index.js'
import btn from './btn/index.js'
import spin from './spin/index.js'
import loading from './loading/index.js'
import tooltip from './tooltip/index.js'
import tooltipConfirm from './tooltipConfirm/index.js'
import hideScrollBar from './hideScrollBar/index.js'
import tabs from './tabs/index.js'
import drag from './drag/index.js'
import message from './message/index.js'
import explain from './explain/index.js'
import image from './image/index.js'
import paging from './paging/index.js'
import table from './table/index.js'
import directives from './directives/index.js'
import forms from './forms/index.js'
import './assets/js/iconfont.js'
var components = [
  icon,
  pop,
  btn,
  spin,
  loading,
  tooltip,
  tooltipConfirm,
  hideScrollBar,
  tabs,
  drag,
  message,
  explain,
  image,
  paging,
  table,
  forms,
  directives
]
const install = Vue => {
  for (var i = 0; i < components.length; i++) {
    Vue.use(components[i])
  }
}
export default {
  install
}
