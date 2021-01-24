import formsItem from './formsItem/index.js'
import forms from './forms/index.js'
import input from './input/index.js'
import inputImitation from './inputImitation/index.js'
import textarea from './textarea/index.js'
import xswitch from './switch/index.js'
import number from './number/index.js'
import select from './select/index.js'
import cascader from './cascader/index.js'
import checkbox from './checkbox/index.js'
import timePicker from './timePicker/index.js'
import datePicker from './datePicker/index.js'
import dropDown from './dropDown/index.js'
import radio from './radio/index.js'

var components = [
  input,
  inputImitation,
  textarea,
  xswitch,
  number,
  select,
  cascader,
  formsItem,
  forms,
  checkbox,
  timePicker,
  datePicker,
  dropDown,
  radio
]
const install = Vue => {
  for (var i = 0; i < components.length; i++) {
    Vue.use(components[i])
  }
}
export default {
  install
}
