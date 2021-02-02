### btn 按钮
各类风格的按钮。

``` html
<template>
  <div :class="$style.main">
    <x-btn :class="$style.btn">默认风格</x-btn>
    <x-btn :class="$style.btn" type="primary">主题风格</x-btn>
    <x-btn :class="$style.btn" type="success">成功风格</x-btn>
    <x-btn :class="$style.btn" type="warning">警告风格</x-btn>
    <x-btn :class="$style.btn" type="danger">危险风格</x-btn>
    <br><br>
    <x-btn :class="$style.btn" plain>淡色风格</x-btn>
    <x-btn :class="$style.btn" plain type="primary">主题风格</x-btn>
    <x-btn :class="$style.btn" plain type="success">成功风格</x-btn>
    <x-btn :class="$style.btn" plain type="warning">警告风格</x-btn>
    <x-btn :class="$style.btn" plain type="danger">危险风格</x-btn>
    <br><br>
    <x-btn :class="$style.btn" round>圆角风格</x-btn>
    <x-btn :class="$style.btn" round type="primary">主题风格</x-btn>
    <x-btn :class="$style.btn" round type="success">成功风格</x-btn>
    <x-btn :class="$style.btn" round type="warning">警告风格</x-btn>
    <x-btn :class="$style.btn" round type="danger">危险风格</x-btn>
    <br><br>
    <x-btn :class="$style.btn" disabled>禁用按钮</x-btn>
    <x-btn :class="$style.btn" disabled type="primary">主题风格</x-btn>
    <x-btn :class="$style.btn" disabled type="success">成功风格</x-btn>
    <x-btn :class="$style.btn" disabled type="warning">警告风格</x-btn>
    <x-btn :class="$style.btn" disabled type="danger">危险风格</x-btn>
    <br><br>
    <x-btn :class="$style.btn" size="small">迷你风格</x-btn>
    <x-btn :class="$style.btn" size="small" type="primary">主题风格</x-btn>
    <x-btn :class="$style.btn" size="small" type="success">成功风格</x-btn>
    <x-btn :class="$style.btn" size="small" type="warning">警告风格</x-btn>
    <x-btn :class="$style.btn" size="small" type="danger">危险风格</x-btn>
    <br><br>
  </div>
</template>
<style module lang="scss">
.main{
  .btn{
    margin-right: 10px;
  }
}
</style>
```
#### 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 风格类型   | string  |   default / primary / success / warning / danger |    default     |
| plain     | 是否为淡色风格   | boolean  |   --  |    false     |
| round     | 是否圆角风格   | boolean  |   --  |    false     |
| disabled     | 是否禁用   | boolean  |   --  |    false     |
| size     | 尺寸   | string  |   default / small  |    default     |