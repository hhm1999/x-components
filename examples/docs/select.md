### select 选择器
支持多选、搜索等功能的选择器。

#### 基础用法
```vue
<template>
  <div :class="$style.main">
    <p class="c_title">基础</p>
    <x-select placeholder="请选择" v-model="valueBasis">
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
    </x-select>
    <p class="c_title">多选</p>
    <x-select multiple v-model="valueMultiple">
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
    </x-select>
    <p class="c_title">可搜索</p>
    <x-select search v-model="valueSearch">
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
    </x-select>
  </div>
</template>
<script>
export default {
   data () {
    return {
      valueMultiple: [ 1, 3 ],
      valueBasis: 2,
      valueSearch: 3,
      options: [
        {
          label: '选项1',
          value: 1
        },
        {
          label: '选项2',
          value: 2
        },
        {
          label: '选项3',
          value: 3
        },
        {
          label: '选项4',
          value: 4
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

#### 惰性加载选项数据
```vue
<template>
  <div :class="$style.main">
    <x-select :label-init="labelInit" @drop-down-visibility-change="handlerDropDownVisibilityChange" v-model="valueBasis">
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
      <div v-if="isLoading" :class="$style.loading_tip"><x-spin :size="30" :class="$style.spin"></x-spin></div>
    </x-select>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueBasis: 4,
      labelInit: '惰性加载选项4',
      options: [],
      isFirstShow: true,
      isLoading: true
    }
  },
  methods: {
    handlerDropDownVisibilityChange (visibility) {
      if (this.isFirstShow) {
        this.isFirstShow = false
        setTimeout(() => {
          for (let i = 0; i < 12; i++) {
            this.options.push({
              label: '惰性加载选项' + i,
              value: i,
            })
          }
          this.isLoading = false
        }, 1000)
      }
    }
  }
}
</script>
<style module lang="scss">
.loading_tip{
  height: 140px;
  text-align: center;
  .spin{
    margin-top: 50px;
  }
}
.main{
  width: 300px;
}
</style>
```
#### 远程搜索数据
```vue
<template>
  <div :class="$style.main">
    <x-select
      :label-init="labelInit"
      @search-key-change="handlerSearchKeyChange"
      search
      v-model="valueBasis"
    >
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in options"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
      <div v-show="isShowTipText || isLoading" :class="$style.tip">
        <div v-show="isShowTipText" :class="$style.text">{{ tipText }}</div>
        <x-spin v-show="isLoading" :size="30" :class="$style.spin"></x-spin>
      </div>
    </x-select>
  </div>
</template>
<script>
export default {
  data () {
    return {
      valueBasis: 4,
      labelInit: '惰性加载选项4',
      options: [],
      isShowTipText: true,
      isLoading: false,
      tipText: '请输入关键字搜索'
    }
  },
  methods: {
    handlerSearchKeyChange (key) {
      this.options.splice(0, this.options.length)
      this.isLoading = true
      this.isShowTipText = false
      setTimeout(() => {
        for (let i = 0; i < 12; i++) {
          this.options.push({
            label: key + '@惰性加载选项' + i,
            value: i + key,
          })
        }
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>
<style module lang="scss">
.tip{
  height: 140px;
  text-align: center;
  .text{
    height: 135px;
    line-height: 140px;
    color: #909399;
    font-size: 14px;
  }
  .spin{
    margin-top: 50px;
  }
}
.main{
  width: 300px;
}
</style>
```

#### x-select 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中项绑定值   |  --  |  --  |  --  |
| search     | 是否支持搜索 |  boolean  |  --  |  false  |
| multiple     | 是否支持多选 |  boolean  |  --  |  false  |
| disabled     | 是否禁用 |  boolean  |  --  |  false  |
| drop-down-width   | 选项下拉框宽度 |  number | string  |  --  |  `matchReferenceDom`和输入框同宽  |
| label-init     | 惰性加载状态或远程搜索因为没有初始选项数据所以无法自动获取标签值，所以需要这个参数 |  --  |  --  |  --  |
| placeholder  | 输入框提示文字   | string  |   --  |    请选择     |

#### x-select 事件
| 事件名称      | 说明    | 回调参数  |
|---------- |-------- |---------- |
| drop-down-visibility-change | 下拉框可见状态发生改变时触发 | `visibility`下拉框是否可见  |
| search-key-change | 远程搜索状态下输入框输入的关键字变化时回调 | `key`用户输入的关键字  |

#### x-select-option 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 选中项的值   |  --  |  --  |  --  |
| disabled     | 是否禁用 |  boolean  |  --  |  false  |

