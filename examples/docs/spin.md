### spin 等待过程动效
加载中，等待中的动效。

```html
<template>
  <div :class="$style.main">
    <x-spin :class="$style.spin"></x-spin>
    <x-spin :class="$style.spin" :size="50"></x-spin>
    <x-spin :class="$style.spin" type="gray" :size="70"></x-spin>
  </div>
</template>
<style module lang="scss">
.main{
  .spin{
    margin-right: 50px;
  }
}
</style>
```

#### 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 颜色类型   | string  |   default / gray |    default     |
| size     | 尺寸（单位像素）   | number  |   --  |    42     |