<template>
  <x-select
    :class="$style.main"
    cascader
    @search-key-change="handlerSearchKeyChange"
    :disabled="disabled"
    :search="search"
    :multiple="multiple"
    :dropDownWidth="selectDropDownWidth"
    :dropDownHeight="220"
    :we-chat-members-departments-model="weChatMembersDepartmentsModel"
    :is-we-chat-members-departments="isWeChatMembersDepartments"
    ref="select"
    :placeholder="placeholder"
    v-model="valuesXSelect"
    :label-init="labelInit"
    @empty="handlerEmpty"
    @multipleItemDel="handlerMultipleItemDel"
    @drop-down-visibility-change="handlerDropDownVisibilityChange"
  >
    <x-hide-scroll-bar
      y
      :class="classLayer"
      :style="styleHierarchyOptionsLayer(index)"
      :key="hierarchyOptionsOne.key + index"
      v-for="(hierarchyOptionsOne, index) in hierarchyOptions"
    >
      <div v-if="utils.isMobile() && index > 0" :class="$style.close">
        <x-icon @click.native.stop="handlerCloseHierarchyOptionsLayer(index)" :class="$style.close_icon" type="pop-close"></x-icon>
      </div>
      <div :class="$style.search_empty_tip" v-if="hierarchyOptionsOne.key === 'search' && (!hierarchyOptionsOne.children || hierarchyOptionsOne.children.length <= 0)">没有符合的选项</div>
      <div :class="$style.loading" v-if="!hierarchyOptionsOne.children || hierarchyOptionsOne.children.length <= 0">
        <x-spin :size="20"></x-spin>
      </div>
      <x-tooltip
        :interaction="failureTipVisibility(item)"
        :visibility="failureTipVisibility(item)"
        placement="bottom-center"
        v-for="item in hierarchyOptionsOne.children"
        :key="item.value + index"
      >
        <span :class="$style.failure_tip" slot="content">
          <x-icon :class="$style.exclamation_point" type="exclamation-point"></x-icon>数据加载失败，请重试
        </span>
        <x-select-option
          :class="classItem(item, index)"
          @select="!isDisabled(item) && handlerSelect(item, index)"
          :stopSelect="true"
          :value="item.value"
          :label="item.label"
          :option-data="item"
        >
          <x-checkbox
            v-if="isHasCheckbox(item)"
            :disabled="isDisabled(item)"
            @click.native="!isDisabled(item) && handlerClickCheckbox(item)"
            noChange
            :checked="checkboxIsChecked(item)"
          >
          </x-checkbox>
          <template v-if="!isWeChatMembersDepartments">{{ item.label }}</template>
          <template v-else>
            <x-ww-open-data :type="item.type === 'department' ? 'departmentName' : 'userName'" :openid="item.label"></x-ww-open-data>
          </template>
          <x-icon v-if="hasChildren(item) && !itemIsLoading(item)" :class="$style.arrow_right" type="cascader-arrow-right"></x-icon>
          <x-spin v-if="itemIsLoading(item)" :class="$style.spin" :size="20"></x-spin>
          <div v-if="hasChildren(item) && selectNumber(item, index)" :class="$style.select_number">{{ selectNumber(item, index) }}</div>
        </x-select-option>
      </x-tooltip>
    </x-hide-scroll-bar>
  </x-select>
</template>
<script>
import utils from '../../utils/utils.js'
export default {
  name: 'x-cascader',
  componentName: 'x-cascader',
  formsMark: {
    name: 'x-cascader',
    events: [
      // 'focus',
      // 'blur'
    ]
  },
  props: {
    value: {
      type: Array,
      default () {
        return null
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    labelInit: {
      type: [String, Number, Array],
      default () {
        return null
      }
    },
    search: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default () {
        return null
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    freeSelect: {
      type: Boolean,
      default: false
    },
    dropDownWidth: {
      type: Number,
      default: 199
    },
    isWeChatMembersDepartments: {
      type: Boolean,
      default: false
    },
    weChatMembersDepartmentsModel: {
      type: String,
      default: undefined
    },
    allowSelect: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      utils: utils,
      disposableNoHideDropDown: false,
      disposableNoTriggerSearch: false, // 任意层级可选的情况下选中和打开下一级同时发生，且选中后会立即显示在输入框内，为了防止搜索方法的触发
      lazyLoadFailureValue: null,
      lazyLoadIngValue: null, // 惰性加载子级数据中的选项的值
      lazyLoadIngItem: null, // 惰性加载子级数据中的选项的值
      lazyLoadIngLayerIndex: null,
      hierarchyOptions: [],
      valuesXSelect: null,
      valuesXSelectState: [],
      completeValues: [] // 初始化及选项有变时会整理的数据，用于存储单个值的完整值数组（即由上层选项组成的数组值）
    }
  },
  created () {
    this.sortOutCompleteValue()
    this.hierarchyOptions = [{
      key: 'first',
      children: this.options
    }]
  },
  mounted() {
    this.setSelectLabelValueCache()
  },
  watch: {
    value: {
      handler (val) {
        if (!Array.isArray(val) || val.length === 0) {
          this.valuesXSelect = null
        } else if (Array.isArray(this.valuesXSelect)) {
          this.valuesXSelect.splice(0, this.valuesXSelect.length, ...val)
        } else {
          this.valuesXSelect = val
        }
      },
      immediate: true
    },
    valuesXSelect (val) {
      if (!Array.isArray(val) || this.hierarchyOptions[0].key === 'search') {
        this.valuesXSelectState.splice(0, this.valuesXSelectState.length)
      } else {
        this.valuesXSelectState.splice(0, this.valuesXSelectState.length, ...val)
      }
    },
    options () {
      this.sortOutCompleteValue()
    }
  },
  computed: {
    classLayer () {
      return {
        [this.$style.layer_pc]: !utils.isMobile(),
        [this.$style.layer_mobile]: utils.isMobile()
      }
    },
    selectDropDownWidth () {
      if (utils.isMobile()) {
        return 'matchReferenceDom'
      } else {
        return this.hierarchyOptions.length * this.dropDownWidth + 2
      }
    }
  },
  methods: {
    isDisabled (item) {
      if (item.disabled) {
        return true
      } else if (this.allowSelect) {
        return !this.allowSelect(item)
      }
      return false
    },
    handlerEmpty () {
      this.$emit('input', null)
    },
    handlerMultipleItemDel (index) {
      let newValue = utils.clone(this.valuesXSelect)
      newValue.splice(index, 1)
      if (newValue.length === 0) {
        newValue = null
      }
      this.$emit('input', newValue)
    },
    handlerSearchKeyChange (key) {
      if (this.disposableNoTriggerSearch) {
        this.disposableNoTriggerSearch = false
        return
      }
      if (key && key.length > 0) {
        const searchResults = []
        for (let i = 0; i < this.options.length; i++) {
          this.searchByKey(this.options[i], key, searchResults)
        }
        this.hierarchyOptions.splice(0, this.hierarchyOptions.length)
        this.hierarchyOptions.push({
          key: 'search',
          children: searchResults
        })
      } else {
        if (this.hierarchyOptions[0].key === 'search') {
          this.hierarchyOptions.splice(0, this.hierarchyOptions.length, {
            key: 'first',
            children: this.options
          })
        }
      }
    },
    searchByKey (option, key, searchResults) {
      if (option.label.indexOf(key) !== -1) {
        searchResults.push(option)
      }
      if (option.children && option.children.length > 0) {
        for (let i = 0; i < option.children.length; i++) {
          this.searchByKey(option.children[i], key, searchResults)
        }
      }
    },
    handlerCloseHierarchyOptionsLayer (index) {
      this.hierarchyOptions.splice(index, this.hierarchyOptions.length)
    },
    styleHierarchyOptionsLayer (index) {
      if (utils.isMobile()) {
        return {
          paddingRight: index * 50 + 'px',
          left: index * 50 + 'px'
        }
      } else {
        return {
          width: this.dropDownWidth + 'px'
        }
      }
    },
    failureTipVisibility (item) {
      return this.lazyLoadFailureValue === item.value
    },
    itemIsLoading (item) {
      return this.lazyLoadIngValue === item.value
    },
    handlerDropDownVisibilityChange (visibility) {
      this.$emit('drop-down-visibility-change', visibility)
    },
    selectNumber (item, layerIndex) {
      if (this.valuesXSelect && this.multiple && this.valuesXSelect) {
        let number = 0
        for (let i = 0; i < this.valuesXSelect.length; i++) {
          if (this.valuesXSelect[i].length > layerIndex && this.valuesXSelect[i][layerIndex] === item.value) {
            number++
            if (this.valuesXSelect[i].length === this.completeValues[item.value].length) {
              let same = true
              for (let j = 0; j < this.valuesXSelect[i].length; j++) {
                if (this.valuesXSelect[i][j] !== this.completeValues[item.value][j]) {
                  same = false
                  break
                }
              }
              if (same) {
                number--
              }
            }
          }
        }
        return number
      }
      return null
    },
    isOn (item) {
      let isOn = false
      if (this.valuesXSelectState) {
        if (this.multiple) {
          if (this.hierarchyOptions) {
            for (let i = 0; i < this.hierarchyOptions.length; i++) {
              if (this.hierarchyOptions[i].key === item.value) {
                isOn = true
                break
              }
            }
          }
        } else {
          for (let i = 0; i < this.valuesXSelectState.length; i++) {
            if (this.valuesXSelectState[i] === item.value && item.hasChildren) {
              isOn = true
              break
            }
          }
        }
      }
      return isOn
    },
    classItem (item, index) {
      return {
        [this.$style.select_option]: true,
        [this.$style.on]: this.isOn(item),
        // [this.$style.disabled]: item.disabled || !this.isAllowSelect(item),
        [this.$style.has_number]: this.hasChildren(item) && this.selectNumber(item, index)
      }
    },
    checkboxIsChecked (item) {
      if (this.multiple) {
        if (this.completeValues[item.value] && this.valuesXSelect) {
          for (let i = 0; i < this.valuesXSelect.length; i++) {
            if (this.completeValues[item.value].toString() === this.valuesXSelect[i].toString()) {
              return true
            }
          }
        }
      } else {
        if (this.completeValues[item.value] && this.valuesXSelect) {
          if (this.completeValues[item.value].toString() === this.valuesXSelect.toString()) {
            return true
          }
        }
      }
      return false
    },
    hasChildren (item) {
      if (item.children && item.children.length > 0) {
        return true
      } else if (item.hasChildren) {
        return true
      }
      return false
    },
    hasSameValue (valueOne, valueTwo) {
      if (valueOne && valueTwo) {
        for (let i = 0; i < valueOne.length; i++) {
          if (valueOne[i].length === valueTwo.length) {
            let has = true
            for (let j = 0; j < valueTwo.length; j++) {
              if (valueTwo[j] !== valueOne[i][j]) {
                has = false
                break
              }
            }
            if (has) {
              return i
            }
          }
        }
      }
      return false
    },
    isHasCheckbox (item) {
      if (this.freeSelect || !this.hasChildren(item)) {
        return true
      }
      return false
    },
    isAllowSelect (item) {
      if (this.freeSelect || !this.hasChildren(item)) {
        if (this.allowSelect) {
          return this.allowSelect(item)
        }
        return true
      }
      return false
    },
    multipleSelect (item) {
      let sameIndex = this.hasSameValue(this.valuesXSelect, this.completeValues[item.value])
      let val = utils.clone(this.valuesXSelect)
      if (!Array.isArray(this.valuesXSelect)) {
        val = []
      } else {
        val = utils.clone(this.valuesXSelect)
      }
      if (sameIndex === false) {
        val.push(this.completeValues[item.value])
      } else {
        val.splice(sameIndex, 1)
      }
      this.$emit('input', val)
    },
    handlerClickCheckbox(item) {
      if (this.multiple && this.freeSelect) {
        this.multipleSelect(item)
      }
    },
    handlerSelect (item, layerIndex) {
      if (this.search && this.multiple) {
        this.$refs.select.open_setDisposableNoHideDropDown(true)
      }
      if (!item.disabled) {
        if (this.multiple) {
          if (!this.freeSelect && this.isAllowSelect(item)) {
            this.multipleSelect(item)
          }
        } else {
          this.valuesXSelectState.splice(layerIndex, this.valuesXSelectState.length)
          this.$set(this.valuesXSelectState, layerIndex, item.value)
          if (this.isAllowSelect(item)) {
            if (this.freeSelect) {
              this.disposableNoTriggerSearch = true
            }
            this.$emit('input', utils.clone(this.completeValues[item.value]))
          }
        }
      }
      if (this.hasChildren(item)) { // 展开下一层选项
        if (item.children && item.children.length > 0) {
          this.hierarchyOptions.splice(layerIndex + 1, this.hierarchyOptions.length)
          this.hierarchyOptions.push({
            key: item.value,
            children: item.children
          })
        } else { // hasChildren为true但是children却没有值，说明需要外部惰性加载
          this.lazyLoadIngItem = item
          this.lazyLoadIngValue = item.value
          this.lazyLoadIngLayerIndex = layerIndex
          this.lazyLoadFailureValue = null
          this.$emit('lazy-load', item, this.callback_lazyLoadSuccess, this.callback_lazyLoadFailure)
        }
      } else if (!this.multiple) {
        this.hierarchyOptions.splice(layerIndex + 1, this.hierarchyOptions.length)
        if (this.isAllowSelect(item)) {
          this.disposableNoTriggerSearch = false
          this.$refs.select.open_setDropDownVisibility(false)
        }
      }
    },
    open_setDropDownVisibility (val) {
      this.$refs.select.open_setDropDownVisibility(val)
    },
    callback_lazyLoadFailure () {
      this.lazyLoadFailureValue = this.lazyLoadIngValue
      this.lazyLoadIngValue = null
    },
    callback_lazyLoadSuccess (children) {
      if (children && children.length > 0) {
        this.hierarchyOptions.splice(this.lazyLoadIngLayerIndex + 1, this.hierarchyOptions.length)
        this.hierarchyOptions.push({
          key: this.lazyLoadIngValue,
          children: children
        })
        this.lazyLoadIngItem.children = children
        this.lazyLoadIngValue = null
        this.sortOutCompleteValue()
      } else {
        this.lazyLoadIngItem.hasChildren = false
        this.lazyLoadIngValue = null
      }
    },
    setSelectLabelValueCache () {
      for (let i = 0; i < this.options.length; i++) {
        this.setSelectLabelValueCacheRecursive(this.options[i])
      }
    },
    setSelectLabelValueCacheRecursive (option) {
      this.$refs.select.open_setLabelValueCache(option.value, option.label)
      if (option.children) {
        for (let j = 0; j < option.children.length; j++) {
          this.setSelectLabelValueCacheRecursive(option.children[j])
        }
      }
    },
    sortOutCompleteValue () {
      for (let i = 0; i < this.options.length; i++) {
        this.sortOutCompleteValueRecursive(this.options[i])
      }
    },
    sortOutCompleteValueRecursive (option, parentValue) {
      let completeValues = []
      if (this.completeValues[option.value] || this.completeValues[option.value] === 0) {
        completeValues = this.completeValues[option.value]
      } else {
        if (parentValue) {
          completeValues = utils.clone(parentValue)
        }
        completeValues.push(option.value)
        this.completeValues[option.value] = completeValues
      }
      if (option.children) {
        for (let j = 0; j < option.children.length; j++) {
          let completeValuesChildren = utils.clone(completeValues)
          completeValuesChildren.push(option.children[j].value)
          this.completeValues[option.children[j].value] = completeValuesChildren
          this.sortOutCompleteValueRecursive(option.children[j], completeValuesChildren)
        }
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.select_option{
  position: relative;
  padding-right: 30px;
  padding-left: 10px;
  box-sizing: border-box;
  &.has_number{
    padding-right: 45px;
  }
  &.on{
    background-color: $color-primary-extra-light;
    .arrow_right{
      color: $color-primary;
    }
  }
  &.disabled{
    .arrow_right{
      color: $color-text-placeholder;
    }
  }
  .arrow_right{
    top: 12px;
    right: 10px;
    font-size: 12px;
    color: $color-text-regular;
    position: absolute;
  }
  .spin{
    top: 7.5px;
    right: 7px;
    position: absolute;
  }
  .select_number{
    position: absolute;
    top: 10.5px;
    right: 27px;
    background-color: $color-primary-light;
    width: 14px;
    height: 14px;
    border-radius: 8px;
    text-align: center;
    line-height: 14px;
    font-size: 12px;
    color: $color-white;
    font-weight: normal;
  }
  .lazyload_failure{
    height: 35px;
    line-height: 35px;
    font-size: 12px;
    width: 60px;
    text-align: center;
    position: absolute;
    top: 0px;
    right: 0px;
    .lazyload_cancel{
      color: $color-text-regular;
    }
    .lazyload_retry{
      color: $color-primary;
    }
  }
}
.ww_open_data{
  color: $color-text-placeholder;
}
.failure_tip{
  font-size: 12px;
  .exclamation_point{
    color: $color-danger;
    margin-right: 7px;
  }
}
.layer_pc{
  position: relative;
  width: 199px;
  height: 218px;
  overflow-y: hidden;
  overflow-x: hidden;
  float: left;
  border-right: 1px solid $border-color-light;
  box-sizing: border-box;
  &:hover{
    overflow-y: auto;
  }
  &:last-child{
    border: none;
  }
}
.layer_mobile{
  position: absolute;
  width: 100%;
  height: 218px;
  overflow-y: auto;
  top: 0px;
  left: 0px;
  background-color: $color-white;
  border-left: 1px solid $border-color-light;
  box-shadow: $boxShadowTiny;
  box-sizing: border-box;
  &:first-child{
    border: none;
    box-shadow: none;
  }
  .close{
    width: 100%;
    height: 35px;
    line-height: 35px;
    left: -35px;
    top: 0px;
    background-color: $background-color-base;
    box-sizing: border-box;
    border-bottom: 1px solid $border-color-lighter;
    .close_icon{
      margin-left: 12px;
      font-size: 12px;
      cursor: pointer;
    }
  }
}
.loading{
  width: 100%;
  height: 218px;
  line-height: 200px;
  color: $color-text-placeholder;
  font-size: 14px;
  text-align: center;
}
.search_empty_tip{
  width: 100%;
  height: 200px;
  line-height: 200px;
  color: $color-text-placeholder;
  font-size: 14px;
  text-align: center;
}
</style>
