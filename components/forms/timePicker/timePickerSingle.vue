<template>
  <div :class="classMain" v-x-clickoutside="handlerClickoutside">
    <template v-if="!rangeModel && !dateTimeModel">
      <x-input
        :placeholder="placeholder"
        @click.native="handlerFoldClick"
        ref="input"
        readonly
        :disabled="disabled"
        :inputStyle="inputStyle"
        v-model="valueInput"
      >
      </x-input>
      <div @click="handlerFoldClick" :class="classArrowIcon"><x-icon type="select-arrow"></x-icon></div>
      <div v-if="value!==null && !disabled" @click="handlerEmptyIconClick" :class="$style.empty_icon"><x-icon type="select-empty"></x-icon></div>
    </template>
    <component
      :is="panelContainer"
      :height="212"
      :show="dropDownShow || rangeModel"
      ref="dropDown"
      @hide="dropDownShow=false"
    >
      <template v-if="dropDownShow || dropDownIsInit || rangeModel || dateTimeModel">
        <panel
          :class="$style.panel"
          :style="stylePanel"
          ref="panels"
          :key="panel.type"
          @select="handlerSelect(index)"
          v-model="panel.value"
          :step="panel.step"
          :title="panel.title"
          :type="panel.type"
          :disabledHour="disabledHour"
          :disabledMinute="disabledMinute"
          :disabledSecond="disabledSecond"
          :selectableRange="selectableRangePanels[index]"
          :height="panelHeight"
          :format="format"
          :completeValue="value"
          v-for="(panel, index) in panels"
        >
        </panel>
      </template>
    </component>
  </div>
</template>
<script>
import * as moment from 'moment'
import panel from './panel.vue'
import timePickerRangePanelContainer from './timePickerRangePanelContainer.vue'
import utils from '../../utils/utils.js'
export default {
  name: 'x-time-picker',
  componentName: 'x-time-picker',
  formsMark: {
    name: 'x-time-picker',
    events: [
      // 'focus',
      // 'blur'
    ]
  },
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: String,
      default: null
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rangeModel: {
      type: Boolean,
      default: false
    },
    dateTimeModel: {
      type: Boolean,
      default: false
    },
    stepHours: {
      type: Number,
      default: 1
    },
    stepMinutes: {
      type: Number,
      default: 1
    },
    stepSeconds: {
      type: Number,
      default: 1
    },
    selectableRange: {
      type: [String, Array],
      default () {
        return null
      }
    },
    panelHeight: {
      type: Number,
      default: undefined
    },
    disabledHour: {
      type: Function,
      default: undefined
    },
    disabledMinute: {
      type: Function,
      default: undefined
    },
    disabledSecond: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      panels: [],
      valueInput: null,
      dropDownShow: false,
      dropDownIsInit: false
    }
  },
  created () {
  },
  mounted() {
    this.setReferenceDom()
  },
  watch: {
    panels: {
      handler (val) {
        let valueInput = ''
        let isAllNull = true
        let hasUndefined = false
        for (let i = 0; i < val.length; i++) {
          if (val[i].value === undefined) {
            hasUndefined = true
            break
          } else if (val[i].value !== null) {
            valueInput += val[i].value
            isAllNull = false
          } else {
            valueInput += '00'
          }
          if (i < val.length - 1) {
            valueInput += ':'
          }
        }
        if (isAllNull || hasUndefined) {
          this.valueInput = null
          if (this.rangeModel) {
            this.valueInput = undefined
          }
        } else {
          this.valueInput = moment(valueInput, this.format).format(this.format)
        }
        this.$emit('input', this.valueInput)
      },
      deep: true
    },
    value: {
      handler () {
        this.panels.splice(0, this.panels.length)
        let valueMomentObject = {
          hours: null,
          minutes: null,
          seconds: null
        }
        if (this.value) {
          this.valueMoment = moment(this.value, this.format)
          valueMomentObject = this.valueMoment.toObject()
        }
        let types = utils.date.getStandardTimeFormatArray(this.format)
        for (let i = 0; i < types.length; i++) {
          let title = null
          let value = null
          let step = null
          if (types[i].toLowerCase().indexOf('h') > -1) {
            title = '时'
            value = valueMomentObject.hours
            step = this.stepHours
          } else if (types[i].toLowerCase().indexOf('m') > -1) {
            title = '分'
            value = valueMomentObject.minutes
            step = this.stepMinutes
          } else if (types[i].toLowerCase().indexOf('s') > -1) {
            title = '秒'
            value = valueMomentObject.seconds
            step = this.stepSeconds
          }
          if (value !== null && value < 10 && types[i].length === 2) {
            value = '0' + value
          }
          this.panels.push({
            type: types[i],
            title: title,
            value: value,
            step: step
          })
        }
      },
      immediate: true
    },
    dropDownShow (val) {
      if (val) {
        let that = this
        that.$nextTick(function () {
          that.panelsScrollToValue()
        })
      }
      this.$emit('dropDownShowChange', val)
      val && (this.dropDownIsInit = true)
    }
  },
  computed: {
    panelContainer () {
      // return 'timePickerRangePanelContainer'
      if (this.rangeModel || this.dateTimeModel) {
        return 'timePickerRangePanelContainer'
      } else {
        return 'x-drop-down'
      }
    },
    stylePanel () {
      return {
        width: 100 / this.panels.length + '%'
      }
    },
    selectableRangePanels () {
      let selectableRangePanels = []
      let types = utils.date.getStandardTimeFormatArray(this.format)
      for (let i = 0; i < types.length; i++) {
        selectableRangePanels.push(this.getSelectableRange(i))
      }
      return selectableRangePanels
    },
    inputStyle () {
      return {}
    },
    classMain () {
      return {
        [this.$style.main]: true,
        [this.$style.has_value]: this.value!==null && !this.disabled,
        [this.$style.disabled]: this.disabled
      }
    },
    classArrowIcon () {
      return {
        [this.$style.arrow_icon]: true,
        [this.$style.pack_up]: this.dropDownShow
      }
    },
    classInput () {
      return {
        [this.$style.input]: true,
        [this.$style.disabled]: this.disabled
      }
    }
  },
  methods: {
    setReferenceDom () {
      if (this.panelContainer === 'x-drop-down' &&
          !this.rangeModel &&
          !this.dateTimeModel &&
          this.$refs.dropDown &&
          this.$refs.input.$el &&
          this.$refs.dropDown.open_setReferenceDom
      ) {
        this.$refs.dropDown.open_setReferenceDom(this.$refs.input.$el)
      }
    },
    getSelectableRange (index) {
      if (index === 0 ) {
        return this.getSelectableRangeByIndex(0)
      } else {
        const selectableRangePanelsSuperior = this.getSelectableRangeByIndex(index - 1)
        const selectableRangePanelsSuppose = this.getSelectableRangeByIndex(index)
        let selectableRangePanels = []
        if (selectableRangePanelsSuperior) {
          for (let i = 0; i < selectableRangePanelsSuperior.length; i++) {
            let start = 0
            let end = 60
            if (selectableRangePanelsSuppose[i] && parseInt(this.panels[index - 1].value) === selectableRangePanelsSuperior[i].start) {
              start = selectableRangePanelsSuppose[i].start
            }
            if (selectableRangePanelsSuppose[i] && parseInt(this.panels[index - 1].value) === selectableRangePanelsSuperior[i].end) {
              end = selectableRangePanelsSuppose[i].end
            }
            if (start !== 0 || end !== 60) {
              const selectableRangePanel = {
                start: start,
                end: end
              }
              selectableRangePanels.push(selectableRangePanel)
            }
          }
          return selectableRangePanels
        }
        return null
      }
    },
    getSelectableRangeByIndex (index) {
      let selectableRange = null
      let selectableRangeObjs = null
      if (this.selectableRange) {
        if (!Array.isArray(this.selectableRange)) {
          selectableRange = [this.selectableRange]
        } else {
          selectableRange = this.selectableRange
        }
        selectableRangeObjs = []
        for (let i = 0; i < selectableRange.length; i++) {
          let selectableRangeArray = selectableRange[i].split('-')
          selectableRangeObjs.push({
            start: parseInt(selectableRangeArray[0].split(':')[index]),
            end: parseInt(selectableRangeArray[1].split(':')[index])
          })
        }
        return selectableRangeObjs
      }
      return null
    },
    open_setDropDownShow (val) {
      this.dropDownShow = val
    },
    handlerSelect (index) {
      let that = this
      this.$nextTick(function () {
        that.$nextTick(function () {
          that.panelsScrollToValue(index)
        })
      })
    },
    panelsScrollToValue (ignoreIndex) {
      if (!this.$refs.panels) {
        return
      }
      for (let i = 0; i < this.$refs.panels.length; i++) {
        if (ignoreIndex !== i) {
          this.$refs.panels[i].open_scrollToValue()
        }
      }
    },
    open_scrollToValue () {
      this.panelsScrollToValue(null)
    },
    handlerFoldClick () {
      !this.disabled && (this.dropDownShow = !this.dropDownShow)
    },
    handlerEmptyIconClick () {
      this.$emit('input', null)
    },
    handlerClickoutside () {
      this.dropDownShow = false
    }
  },
  beforeDestroy () {
    this.dropDownShow = false
  },
  deactivated () {
    this.dropDownShow = false
  },
  activated () {
    let that = this
    this.$nextTick(function () {
      that.setReferenceDom()
    })
  },
  components: {
    panel,
    timePickerRangePanelContainer
  }
}
</script>
<style module lang="scss">
.main{
  width: 100%;
  position: relative;
  &.disabled{
    .arrow_icon{
      color: $color-text-placeholder;
      cursor: not-allowed;
    }
    .multiple_item_wrap{
      cursor: not-allowed;
    }
  }
  &.has_value{
    &:hover{
      .empty_icon{
        display: block;
      }
      .arrow_icon{
        display: none;
      }
    }
  }
  .empty_icon,
  .arrow_icon{
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 50%;
    margin-top: -20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 12px;
    color: $color-text-placeholder;
    z-index: 2;
    &.pack_up{
      transform: rotate(180deg);
    }
  }
  .empty_icon{
    display: none;
    font-size: 14px;
    &:hover{
      color: $color-danger;
    }
  }
}
</style>
