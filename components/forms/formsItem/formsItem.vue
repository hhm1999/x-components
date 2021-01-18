<template>
  <div :class="classMain">
    <div v-if="label" :class="classLabel">
      {{ label }}：
      <x-explain v-if="explain" placement="right"><span v-html="explain"></span></x-explain>
    </div>
    <div :style="slotStyle" :class="$style.slot">
      <slot></slot>
    </div>
    <div v-if="validateState === 'error'" :class="$style.tip">{{ validateMessage }}</div>
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
import AsyncValidator from 'async-validator'
export default {
  name: 'x-forms-item',
  props: {
    prop: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    explain: {
      type: String,
      default: null
    },
    horizontal: { // 横向布局
      type: Boolean,
      default: false
    },
    bothSides: { // label和表单左右浮动布局
      type: Boolean,
      default: false
    },
    model: {
      type: String,
      default: 'complete'
    },
    widthForm: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      validateState: '',
      forms: utils.getParentByComponentName(this.$parent, 'x-forms')
    }
  },
  created () {
  },
  mounted () {
    if (this.model === 'complete') {
      this.forms && this.forms.open_setFormsItem(this)
    }
  },
  watch: {
    value: {
      handler (val, oldVal) {
        if (val === null && oldVal === null) {
          return
        }
        this.validate()
      },
      deep: true
    }
  },
  computed: {
    // childForm () {
    //   function recursive (childrens) {
    //     var grandchildren = []
    //     for (var i = 0; i < childrens.length; i++) {
    //       if (childrens[i].$options.formsMark) {
    //         return {
    //           component: childrens[i],
    //           info: childrens[i].$options.formsMark
    //         }
    //       } else if (childrens.$children) {
    //         grandchildren = grandchildren.concat(childrens.$children)
    //       }
    //     }
    //     if (grandchildren.length > 0) {
    //       return recursive(grandchildren)
    //     }
    //     return null
    //   }
    //   return recursive(this.$children)
    // },
    classLabel () {
      return {
        [this.$style.label]: true,
        [this.$style.required]: this.isRequired
      }
    },
    slotStyle () {
      const style = {}
      if (this.widthForm) {
        style.width = this.widthForm
      }
      return style
    },
    isRequired () {
      if (this.descriptor) {
        if (Array.isArray(this.descriptor)) {
          for (const descriptor of this.descriptor) {
            if (descriptor.required) {
              return true
            }
          }
        } else {
          if (this.descriptor.required) {
            return true
          }
        }
      }
      return false
    },
    descriptor () {
      if (this.forms && this.forms.descriptor[this.prop]) {
        return this.forms.descriptor[this.prop]
      }
      return []
    },
    value () {
      if (this.forms && this.forms.model && !utils.isNullOrUndefined(this.forms.model[this.prop])) {
        return this.forms.model[this.prop]
      }
      return null
    },
    classMain () {
      return {
        [this.$style.main]: true,
        [this.$style.horizontal]: this.horizontal && !this.bothSides,
        [this.$style.vertical]: !this.horizontal && !this.bothSides,
        [this.$style['both-sides']]: this.bothSides,
        [this.$style['has-label']]: !!this.label
      }
    }
  },
  methods: {
    // childFormBindEvent () {
    //   var that = this
    //   if (this.childForm) {
    //     var component = this.childForm.component
    //     if (this.childForm.info && this.childForm.info.events) {
    //       var events = this.childForm.info.events
    //       for (let i = 0; i < events.length; i++) {
    //         component.$on(events[i], function () {
    //           that.childFormEventCallback(events[i])
    //         })
    //       }
    //     }
    //   }
    // },
    // childFormEventCallback () { // eventName
    //   if (eventName === 'focus') {
    //     this.validateState = ''
    //   }
    // },
    // open_getValidateResults () {
    //   return this.validateState === 'success'
    // },
    open_validate () {
      let that = this
      return new Promise(function(resolve, reject) {
        if (!that.descriptor) {
          that.validateState = 'success'
          resolve()
        } else {
          var descriptor = {}
          descriptor[that.prop] = that.descriptor
          var validator = new AsyncValidator(descriptor)
          var model = {}
          if (utils.array.isArray(that.value)) {
            model[that.prop] = that.value.toString()
          } else {
            model[that.prop] = that.value
          }
          validator.validate(model, { firstFields: true }).then(() => {
            that.validateState = 'success'
            resolve()
          }).catch(({ errors }) => {
            that.validateState = 'error'
            that.validateMessage = errors[0].message
            reject(errors[0])
          })
        }
      })
    },
    validate () {
      this.open_validate().then(function () {
      }).catch(function(){
      })
    }
  },
  beforeDestroy () {
    this.forms && this.forms.open_removeFormsItem(this)
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  font-size: 14px;
}
.label{
  &.required{
    &:before {
      content: "*";
      color: $color-danger;
      margin-right: 2px;
    }
  }
}
.vertical{
  &.has-label{
    // position: relative;
    // padding-top: 30px;
    .label{
      width: 100%;
      // height: 30px;
      line-height: 20px;
      margin-bottom: 5px;
      // position: absolute;
      // top: 0px;
      // left: 0px;
      text-align: left;
      word-break:break-all;
      color: $color-text-regular;
    }
  }
  .tip{
    left: 0;
  }
}
.horizontal{
  box-sizing: border-box;
  &.has-label{
    position: relative;
    padding-left: 150px;
    line-height: 38px;
    .label{
      width: 140px;
      height: 40px;
      line-height: 40px;
      position: absolute;
      top: 0px;
      left: 0px;
      text-align: right;
      word-break:break-all;
      color: $color-text-regular;
    }
  }
  .tip{
    left: 150px;
  }
}
.both-sides{
  line-height: 40px;
  .label{
    display: inline-block;
    word-break:break-all;
    color: $color-text-regular;
  }
  .slot{
    display: block;
    float: right;
    // line-height: initial;
  }
  .tip{
    right: 0;
  }
}
.tip{
  font-size: 12px;
  line-height: 1;
  padding-top: 2px;
  box-sizing: border-box;
  position: absolute;
  top: 100%;
  color: $color-danger;
}
</style>
