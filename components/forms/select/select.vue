<template>
  <div :class="classMain" v-x-clickoutside="handlerClickoutside">
    <x-input-imitation
      v-if="multiple || isWeChatMembersDepartments"
      :placeholder="inputImitationPlaceholder"
      @click.native="handlerFoldClick"
      ref="input"
      :disabled="disabled"
      :focus="dropDownShow"
      :inputStyle="inputStyle"
    >
    </x-input-imitation>
    <x-input
      v-else
      :placeholder="placeholderInternal"
      @click.native="handlerFoldClick"
      ref="input"
      :readonly="readonly"
      :disabled="disabled"
      :inputStyle="inputStyle"
      v-model="valueInput"
      @blur="handlerRadioBlur"
      @focus="handlerRadioFocus"
    >
    </x-input>
    <div
      @click="handlerFoldClick"
      :class="$style.multiple_item_wrap"
      ref="multipleItemWrap"
      v-if="multiple || isWeChatMembersDepartments"
    >
      <template v-if="multiple">
        <multipleItem
          :disabled="disabled"
          :style="styleMultipleItem"
          @del="handlerMultipleItemDel(index)"
          :key="getMultipleItemKey(item)"
          v-for="(item, index) in valueInternal"
        >
          <template v-if="isWeChatMembersDepartments">
            <wxOpenDataShow :type="weChatMembersDepartmentsModel" :value="item"></wxOpenDataShow>
          </template>
          <template v-else>
            {{ item }}
          </template>
        </multipleItem>
      </template>
      <template v-else-if="isWeChatMembersDepartments">
        <wxOpenDataShow :class="wxOpenDataShowClass" :type="weChatMembersDepartmentsModel" :value="valueInternal"></wxOpenDataShow>
      </template>
      <div v-if="search && !disabled" :style="styleMultipleSearchInputWrap" :class="$style.search_input_wrap">
        <input
          @keydown.delete="multipleDeletePrevTag"
          v-model="multipleSearchValue"
          ref="searchInput"
          :class="$style.search_input"
          type="text"
        />
      </div>
    </div>
    <div @click="handlerFoldClick" :class="classArrowIcon"><x-icon type="select-arrow"></x-icon></div>
    <div
      v-if="value!==null && !disabled"
      @click="handlerEmptyIconClick"
      :class="$style.empty_icon"
    >
      <x-icon type="select-empty"></x-icon>
    </div>
    <x-drop-down
      :height="dropDownHeight"
      :width="dropDownWidth"
      :show="dropDownShow"
      ref="dropDown"
      @hide="dropDownShow=false"
    >
      <slot></slot>
      <x-select-option-tip v-if="allOptionsHide">没有符合的选项</x-select-option-tip>
    </x-drop-down>
  </div>
</template>
<script>
import utils from '../../utils/utils.js'
import multipleItem from '../inputImitation/multipleItem.vue'
import wxOpenDataShow from './wxOpenDataShow.vue'
export default {
  name: 'x-select',
  componentName: 'x-select',
  formsMark: {
    name: 'x-select',
    events: [
      // 'focus',
      // 'blur'
    ]
  },
  props: {
    search: {
      type: Boolean,
      default: false
    },
    cascader: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: [String, Number, Array],
      default () {
        return null
      }
    },
    labelInit: {
      type: [String, Number, Array],
      default () {
        return null
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dropDownWidth: {
      type: [String, Number],
      default: 'matchReferenceDom'
    },
    dropDownHeight: {
      type: Number,
      default: null
    },
    isWeChatMembersDepartments: {
      type: Boolean,
      default: false
    },
    weChatMembersDepartmentsModel: {
      type: String,
      default: 'member'
    }
  },
  data () {
    return {
      labelValueCache: {},
      label: null,
      multipleSearchValue: '',
      multipleSearchInputWidth: 20,
      allOptionsHide: false,
      disposableNoHideDropDown: false, // 在多选且可搜索状态下，选中一个选项后鼠标会聚焦到搜索框，这时候再点击表单主体不隐藏下拉框（用户可能是想聚焦搜索框而不是想隐藏）
      disposableNoTriggerSearch: false, // 在搜索框失去焦点变为原先值的时候不因为值的改变而触发搜索方法
      placeholderInternal: '',
      valueInput: null,
      dropDownShow: false,
      options: [],
      inputHeight: 40,
      multipleItemMarginBottom: 0,
      selectState: null
    }
  },
  created () {
    this.placeholderInternal = this.placeholder
    if (this.isWeChatMembersDepartments) {
      this.label = this.labelInit
    } else if ((this.$listeners['search-key-change'] && !this.cascader)) { // 远程搜索
      if (this.value !== null) {
        if (this.labelInit !== null) {
          !this.multiple && (this.disposableNoTriggerSearch = true)
          this.label = this.labelInit
          this.labelValueCacheInit(this.value, this.labelInit)
        } else {
          console.error('由于使用了远程搜索，选项的label无法自动获取，请传递labelInit属性用于初始化显示')
        }
      } else {
        this.label = null
      }
    } else {
      if (this.labelInit !== null) {
        this.labelValueCacheInit(this.value, this.labelInit)
        this.label = this.getLabelsByValue(this.value)
      }
    }
  },
  mounted() {
    this.setReferenceDom()
    this.setInputStyle()
  },
  watch: {
    multipleSearchValue (val) {
      let width = 20
      if (val) {
        width = utils.dom.getTextPlaceholderSize(val)
      }
      width < 20 && (width = 20)
      this.multipleSearchInputWidth = width
      this.setInputStyle()
      this.search && this.searchFun(val)
    },
    dropDownShow (val) {
      this.$emit('drop-down-visibility-change', val)
      if (val) {
        this.$refs.input.open_focus()
      } else {
        this.$refs.input.open_blur()
        this.disposableNoHideDropDown = false
      }
      for (let i = 0; i < this.options.length; i++) {
        this.options[i].optionComponent.open_setParentVisibility(val)
        this.options[i].optionComponent.open_setVisibility(true)
      }
      if (!this.search) {
        return
      }
      (!val && !this.multiple) && this.$refs.input.open_blur()
      if (this.multiple) {
        if (val) {
          this.$refs.searchInput && this.$refs.searchInput.focus()
        } else {
          this.multipleSearchValue = null
          this.$refs.searchInput && this.$refs.searchInput.blur()
        }
      }
      if (!val) {
        !this.multiple && (this.disposableNoTriggerSearch = true)
        this.setValueInput()
        this.placeholderInternal = this.placeholder
      }
    },
    options () {
      if (this.selectState) {
        this.setSelectState(this.selectState)
      } else {
        this.setSelectState(this.value)
      }
    },
    value () {
      this.setSelectState(this.value)
      this.setInputStyle()
      this.label = null
    },
    valueInternal () {
      this.setValueInput()
    },
    valueInput (val) {
      this.$refs.input.open_isFocus() && this.search && this.searchFun(val)
    }
  },
  computed: {
    wxOpenDataShowClass () {
      return {
        [this.$style.wx_open_data_show_disabled]: this.disabled
      }
    },
    inputImitationPlaceholder () {
      if (this.valueInternal && this.valueInternal.length > 0) {
        return null
      } else if (this.multipleSearchValue && this.multipleSearchValue.length > 0) {
        return null
      } else {
        return this.placeholderInternal
      }
    },
    readonly () {
      if (this.search) {
        return false
      } else {
        return true
      }
    },
    styleMultipleSearchInputWrap () {
      return {
        width: this.multipleSearchInputWidth + 'px',
        marginBottom: this.multipleItemMarginBottom + 'px'
      }
    },
    styleMultipleItem () {
      return {
        marginBottom: this.multipleItemMarginBottom + 'px'
      }
    },
    inputStyle () {
      return {
        cursor: this.disabled ? 'not-allowed' : 'pointer',
        height: this.inputHeight + 'px',
        paddingRight: '40px'
      }
    },
    classMain () {
      return {
        [this.$style.main]: true,
        [this.$style.has_value]: this.value!==null && !this.disabled,
        [this.$style.disabled]: this.disabled,
        [this.$style.mobile]: utils.isMobile(),
        [this.$style.pc]: !utils.isMobile()
      }
    },
    valueInternal () {
      if (this.label) {
        // 远程搜索的模式下初始第一次直接返回外部插入的lable
        // this.label在初始化的时候会等于this.labelInit
        // 而后当value第一次变化时这个this.label将会别变为null
        return this.label
      }
      return this.getLabelsByValue(this.value)
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
    getMultipleItemKey (item) {
      if (item.length) {
        return JSON.stringify(item)
      } else {
        return item
      }
    },
    setReferenceDom () {
      this.$refs.dropDown.open_setReferenceDom(this.$refs.input.$el)
    },
    open_setLabelValueCache (value, label) { // 用于联级搜索的时候可以准确识别出value 对应的label
      this.labelValueCache[value] = label
    },
    labelValueCacheInit (value, label) { // 在远程数据模式下，缓存初始label和Value对应关系
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          this.labelValueCache[value[i]] = label[i]
        }
      } else {
        this.labelValueCache[value] = label
      }
    },
    multipleDeletePrevTag () {
      if (this.multipleSearchValue.length <= 0 && this.value.length > 0) {
        const newValue = utils.clone(this.value)
        newValue.pop()
        this.$emit('input', newValue)
      }
    },
    searchFun (val) {
      if (this.disposableNoTriggerSearch) {
        this.disposableNoTriggerSearch = false
        return
      }
      if (this.$listeners['search-key-change']) { // 远程搜索触发searchKeyChange，搜索的逻辑交于外部
        this.$emit('search-key-change', val)
      } else { // 固定选项时的搜索逻辑
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].label.indexOf(val) !== -1) {
            this.options[i].optionComponent.open_setVisibility(true)
          }
        }
        if (val) {
          let hideNumber = 0
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].label.indexOf(val) === -1) {
              hideNumber++
              this.options[i].optionComponent.open_setVisibility(false)
            }
          }
          if (hideNumber === this.options.length) {
            this.allOptionsHide = true
          } else {
            this.allOptionsHide = false
          }
        }
        // else {
        //   console.log('@@@@!!!!!');
        //   this.allOptionsHide = false
        //   for (let i = 0; i < this.options.length; i++) {
        //     this.options[i].optionComponent.open_setVisibility(true)
        //   }
        // }
      }
    },
    getLabelsByValue (val) {
      if (this.isWeChatMembersDepartments) {
        return val
      } else if (this.multiple) {
        if (val) {
          let labels = []
          for (let i = 0; i < val.length; i++) {
            const label = this.getLabelForValue(val[i])
            !utils.isNullOrUndefined(label) && labels.push(label)
          }
          if (labels.length === 0) {
            return null
          }
          return labels
        }
        return null
      } else {
        return this.getLabelForValue(val)
      }
    },
    getLabelForValue (val) {
      if (Array.isArray(val)) {
        let label = this.isWeChatMembersDepartments ? [] : ''
        for (let i = 0; i < val.length; i++) {
          const labelSingle = this.getLabelForValueSingle(val[i])
          if (!utils.isNullOrUndefined(labelSingle)) {
            if (this.isWeChatMembersDepartments) {
              label.push(labelSingle)
            } else {
              label += labelSingle
              if (i < val.length - 1) {
                label += ' / '
              }
            }
          }
        }
        if (label.length === 0) {
          return null
        }
        return label
      } else {
        return this.getLabelForValueSingle(val)
      }
    },
    getLabelForValueSingle (val) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].value === val) {
          let label = ''
          // if (this.isWeChatMembersDepartments) {
          //   label = {
          //     label: this.options[i].label,
          //     type: this.options[i].data.type
          //   }
          // } else {
          label = this.options[i].label
          // }
          this.labelValueCache[val] = label
          return label
        }
      }
      if (this.labelValueCache[val]) {
        return this.labelValueCache[val]
      }
      return null
    },
    handlerRadioBlur () { // 单选可搜索状态下搜索框失去焦点
      if (!this.search) {
        return
      }
      // if (this.cascader) {
      //   this.disposableNoHideDropDown = true
      // }
      // if (!this.cascader) {
      //   this.disposableNoTriggerSearch = true
      //   this.setValueInput()
      // }
      this.disposableNoTriggerSearch = true
      // this.setValueInput()
      // this.placeholderInternal = this.placeholder
    },
    handlerRadioFocus () { // 单选选可搜索状态下搜索框获得焦点
      if (!this.search) {
        return
      }
      if (!this.multiple && !this.dropDownShow) {
        this.valueInput = ''
        this.placeholderInternal = this.valueInternal
      }
      // this.valueInput = ''
      // this.placeholderInternal = this.valueInternal
    },
    handlerMultipleItemDel (index) {
      if (this.cascader) {
        this.$emit('multipleItemDel', index)
      } else {
        const newValue = utils.clone(this.value)
        newValue.splice(index, 1)
        this.$emit('input', newValue)
      }
    },
    setValueInput () {
      if (!this.multiple) {
        this.valueInput = this.valueInternal
      }
    },
    setInputStyle () {
      this.$nextTick(() => {
        if (this.$refs.multipleItemWrap && this.$refs.multipleItemWrap.offsetHeight > 40) {
          this.multipleItemMarginBottom = 10
          this.$nextTick(function () {
            this.inputHeight = this.$refs.multipleItemWrap.offsetHeight
            this.$nextTick(function () {
              this.$refs.dropDown.open_reset(this.$refs.input.$el)
            })
          })
        } else {
          this.inputHeight = 40
          this.multipleItemMarginBottom = 0
        }
      })
    },
    open_setSelectState (selectState) {
      this.selectState = selectState
      if (selectState) {
        this.setSelectState(selectState)
      }
    },
    setSelectState (selectedData) {
      for (let i = 0; i < this.options.length; i++) {
        this.options[i].optionComponent.open_setSelectState(false)
      }
      if ((this.multiple && !this.cascader) || (!this.multiple && this.cascader)) {
        if (selectedData) {
          for (let i = 0; i < this.options.length; i++) {
            if (selectedData.indexOf(this.options[i].value) > -1) {
              this.options[i].optionComponent.open_setSelectState(true)
            }
          }
        }
      } else if (this.multiple && this.cascader) {
        if (selectedData) {
          for (let i = 0; i < this.options.length; i++) {
            for (let j = 0; j < selectedData.length; j++) {
              if (selectedData[j].indexOf(this.options[i].value) > -1) {
                this.options[i].optionComponent.open_setSelectState(true)
              }
            }
          }
        }
      } else {
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].value === selectedData) {
            this.options[i].optionComponent.open_setSelectState(true)
            break
          }
        }
      }
    },
    open_setDisposableNoHideDropDown (val) {
      this.disposableNoHideDropDown = val
    },
    // optionIsSelected (optionValue) {
    //
    // },
    handlerFoldClick () {
      if (this.disposableNoHideDropDown) {
        this.$refs.searchInput && this.$refs.searchInput.focus()
        this.disposableNoHideDropDown = false
      } else {
        !this.disabled && (this.dropDownShow = !this.dropDownShow)
      }
    },
    handlerEmptyIconClick () {
      if (this.cascader) {
        this.$emit('empty')
      } else {
        this.$emit('input', null)
      }
    },
    handlerClickoutside () {
      this.dropDownShow = false
      this.disposableNoHideDropDown = false
    },
    open_setDropDownVisibility (visibility) {
      this.dropDownShow = visibility
    },
    open_select (value) {
      if (this.multiple) {
        let newValue = null
        if (this.value) {
          newValue = utils.clone(this.value)
          const index = newValue.indexOf(value)
          if (index > -1) {
            newValue.splice(index, 1)
          } else {
            newValue.push(value)
          }
        } else {
          newValue = [value]
        }
        if (this.search) {
          this.disposableNoHideDropDown = true
        }
        this.$refs.searchInput && this.$refs.searchInput.focus()
        this.$emit('input', newValue)
      } else {
        this.dropDownShow = false
        this.$emit('input', value)
      }
    },
    open_addOption (value, label, data, optionComponent) {
      this.options.push({
        value: value,
        label: label,
        data: data,
        optionComponent: optionComponent
      })
    },
    open_destroyOption (optionComponent) {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].optionComponent === optionComponent) {
          this.options.splice(i, 1)
          break
        }
      }
    }
  },
  beforeDestroy () {
    this.dropDownShow = false
  },
  deactivated () {
    this.dropDownShow = false
  },
  activated () {
    this.setInputStyle()
    this.$nextTick(() => {
      this.setReferenceDom()
    })
  },
  components: {
    multipleItem,
    wxOpenDataShow
  }
}
</script>
<style module lang="scss">
.main{
  @include inputAndTextarea;
  width: 100%;
  position: relative;
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
    &.pc{
      &:hover{
        .empty_icon{
          display: block;
        }
        .arrow_icon{
          display: none;
        }
      }
    }
    &.mobile{
      .empty_icon{
        display: block;
      }
      .arrow_icon{
        display: none;
      }
    }
  }
  .wx_open_data_show_disabled{
    color: $color-text-secondary;
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
  &.pc{
    .empty_icon{
      &:hover{
        color: $color-danger;
      }
    }
  }
  .empty_icon{
    display: none;
    font-size: 14px;
  }
  .multiple_item_wrap{
    position: absolute;
    top: 0px;
    left: 0px;
    max-width: 100%;
    cursor: pointer;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 40px 0px 10px;
    box-sizing: border-box;
  }
  .search_input_wrap{
    height: 21px;
    line-height: 21px;
    flex-grow: 1;
    margin-right: 5px;
    width: 20px;
    display: inline-block;
    .search_input{
      border: none;
      outline: none;
      -webkit-appearance: none;
      width: 100%;
      height: 100%;
      font-size: 14px;
      background-color: transparent;
    }
  }
}
</style>
