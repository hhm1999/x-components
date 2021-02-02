### forms 表单
用于收集、校验其它表单组件的数据。

#### 基础用法
``` html
<template>
  <div :class="$style.main">
    <x-forms ref="forms" :descriptor="descriptor" :model="formData">
      <x-forms-item horizontal explain="提示" label="姓名" prop="name">
        <x-input v-model="formData.name"></x-input>
      </x-forms-item>
      <x-forms-item horizontal label="性别" prop="gender">
        <x-radio-group v-model="formData.gender">
          <x-radio label="men">
            男
          </x-radio>
          <x-radio label="women">
            女
          </x-radio>
        </x-radio-group>
      </x-forms-item>
    </x-forms>
    <x-btn @click="submit" :class="$style.btn" type="primary">提交</x-btn>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        name: null,
        gender: null
      },
      descriptor: {
        name: [
          {
            required: true,
            message: '必须填写'
          }
        ],
        gender: [
          {
            required: true,
            message: '必须填写'
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.forms.open_validate().then(function () {
        console.log('数据校验通过')
      }).catch(function(e){
        console.log(e)
      })
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 300px;
  .btn{
    margin-left: 150px;
    margin-top: 20px;
  }
}
</style>
```
#### 不同布局形式
``` html
<template>
  <div :class="$style.main">
    <p class="c_title">水平布局</p>
    <x-forms-item horizontal label="姓名">
      <x-input></x-input>
    </x-forms-item>
    <p class="c_title">上下布局</p>
    <x-forms-item label="姓名">
      <x-input></x-input>
    </x-forms-item>
    <p class="c_title">贴两边布局</p>
    <x-forms-item bothSides horizontal label="姓名">
      <x-input></x-input>
    </x-forms-item>
  </div>
</template>
<style module lang="scss">
.main{
  width: 300px;
}
</style>
```

#### x-forms 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|  model  | 表单数据对象 | object  |   -- |    --     |
|  descriptor  | 数据校验规则，同[async-validator](https://github.com/yiminghe/async-validator)的`descriptor` | object  |   -- |    --     |

#### x-forms-item 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|  label  | 标签文本 | string  |   -- |    --     |
|  prop  | 此表单在`x-forms`组件的`model`属性中的数据的`key` | string  |   -- |    --     |
|  explain  | 表单的提示文字内容 | string  |   -- |    --     |
|  horizontal  | 是否水平布局 | boolean  |   -- |    false     |
|  bothSides  | 是否贴两边布局 | boolean  |   -- |    false     |

#### x-forms 方法
| 方法名称      | 说明    | 返回  |
|---------- |-------- |---------- |
| open_validate | 根据`descriptor`属性定义的校验规则对数据进行校验 |  Promise  |