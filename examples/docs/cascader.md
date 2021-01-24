### cascader 多级选择器
支持数据惰性加载的多级选择器。

#### 基础用法
```vue
<template>
  <div :class="$style.main">
    <p class="c_title">基础</p>
    <x-cascader placeholder="请选择" v-model="valueBasis" :options="options"></x-cascader>
    <p class="c_title">可搜索</p>
    <x-cascader v-model="valueSearch" search :options="options"></x-cascader>
    <p class="c_title">多选</p>
    <x-cascader v-model="valueMultiple" multiple :options="options"></x-cascader>
    <p class="c_title">允许选中任何一个层级的选项</p>
    <x-cascader v-model="valueFreeSelect" free-select :options="options"></x-cascader>
    <p class="c_title">自定义下拉框宽度</p>
    <x-cascader v-model="valueWidth" :option-container-width="298" :options="options"></x-cascader>
    <p class="c_title">禁用</p>
    <x-cascader v-model="valueDisabled" disabled :options="options"></x-cascader>
  </div>
</template>
<script>
export default {
   data () {
    return {
      valueBasis: [ '选项2' ],
      valueSearch: [ '选项1', '选项b' ],
      valueMultiple: [ [ '选项2' ], [ '选项1', '选项b' ] ],
      valueDisabled: [ '选项1', '选项a' ],
      valueFreeSelect: [ '选项1' ],
      valueWidth: [ '选项2' ],
      options: [
        {
          label: '选项1',
          value: '选项1',
          children: [
            {
              label: '选项a',
              value: '选项a'
            },
            {
              label: '选项b',
              value: '选项b'
            }
          ]
        },
        {
          label: '选项2',
          value: '选项2'
        }
      ]
    }
  },
}
</script>
<style module lang="scss">
.main{
  width: 300px;
}
</style>
```

#### 选项禁用
```vue
<template>
  <div :class="$style.main">
    <p class="c_title">通过回调函数自定义选项是否可选</p>
    <x-cascader :allow-select="allowSelect" v-model="value" :options="options"></x-cascader>
  </div>
</template>
<script>
export default {
   data () {
    return {
      value: [ '选项1', '选项a' ],
      options: [
        {
          label: '选项1',
          value: '选项1',
          children: [
            {
              label: '选项a',
              value: '选项a'
            },
            {
              label: '选项b',
              value: '选项b'
            }
          ]
        },
        {
          label: '选项2',
          value: '选项2',
          disabled: true, // 通过disabled控制选项是否可选
        }
      ]
    }
  },
  methods: {
    allowSelect (val) {
      if (val.value === '选项b') { // value为'选项b'的选项不可选
        return false
      }
      return true
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 300px;
}
</style>
```

#### 惰性加载数据
```vue
<template>
  <div :class="$style.main">
    <p class="c_title">惰性加载数据</p>
    <x-cascader
      @drop-down-visibility-change="handlerDropDownVisibilityChange"
      @lazy-load="handlerLazyLoad"
      v-model="value"
      :label-init="labelInit"
      :options="options"
    >
    </x-cascader>
  </div>
</template>
<script>
export default {
   data () {
    return {
      value: ['0', '02'],
      labelInit: ['一级选项0', '二级选项02'],
      options: [],
      isFirstShow: true
    }
  },
  methods: {
    handlerDropDownVisibilityChange (visibility) { // 通过dropDownVisibilityChange事件监听下拉框的显示状态，第一次显示时加载数据
      if (!this.isFirstShow) {
        return
      }
      this.isFirstShow = false
      setTimeout(() => {
        let options = []
        for (let i = 0; i < 10; i++) {
          this.options.push({
            label: '一级选项' + i,
            value: i + '',
            hasChildren: true
          })
        }
      }, 1000)
    },
    handlerLazyLoad (optionData, callbackSuccess, callbackFailure) {
      setTimeout(() => {
        let datas = []
        for (let i = 0; i < 5; i++) {
          datas.push({
            label: '二级选项' + optionData.value + i,
            value: optionData.value + '' + i,
          })
        }
        callbackSuccess(datas)
      }, 1000)
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 300px;
}
</style>
```

#### 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中项绑定值   |  --  |  --  |  --  |
| options     | 选项数据   |  Array  |  --  |  --  |
| options[i].label     | 选项数据标签值   |  --  |  --  |  --  |
| options[i].value     | 选项数据值   |  --  |  --  |  --  |
| options[i].disabled     | 选项是否不可用   |  boolean  |  --  |  false  |
| options[i].children     | 子级数据，格式同父级   |  Array  |  --  |  --  |
| options[i].hasChildren     | 选项是否有子级，仅在惰性加载状态下使用   |  boolean  |  --  |  false  |
| search     | 是否支持搜索 |  boolean  |  --  |  false  |
| multiple     | 是否支持多选 |  boolean  |  --  |  false  |
| free-select     | 是否允许选中任何一个层级的选项 |  boolean  |  --  |  false  |
| drop-down-width   | 选项下拉框宽度 |  number  |  --  |  199  |
| disabled     | 是否禁用 |  boolean  |  --  |  false  |
| label-init     | 惰性加载状态下因为没有初始选项数据所以无法自动获取标签值，所以需要这个参数 |  --  |  --  |  --  |
| placeholder  | 输入框提示文字   | string  |   --  |    请选择     |

#### 函数属性
| 参数      | 说明    | 类型     | 回调参数  | 返回要求  |
|---------- |-------- |---------- |-------- | -------- | 
| allow-select     | 逐个回调确认选项是否可选 |  function(itemData) |  `itemData`单个选项的数据  | 可选返回`true`，不可选返回`false` | 


#### 事件
| 事件名称      | 说明    | 回调参数  |
|---------- |-------- |---------- |
| drop-down-visibility-change | 下拉框可见状态发生改变时触发 | `visibility`下拉框是否可见  |
| lazy-load | 惰性加载模式下，需加载下级数据时触发 | `optionData`用户点击的选项数据</br>`callbackSuccess(data)`获取选项数据后执行该函数并将选项数据传递进去</br>`callbackFailure`数据获取失败时需执行该函数  |



