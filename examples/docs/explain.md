### explain 解释说明
鼠标进入后弹出气泡内容。

```vue
<template>
  <div :class="$style.main">
    <x-explain placement="top" :class="$style.explain">解释说明 placement="top"</x-explain>
    <x-explain placement="top-start" :class="$style.explain">解释说明 placement="top-start"</x-explain>
    <x-explain placement="top-end" :class="$style.explain">解释说明 placement="top-end"</x-explain>
    <x-explain placement="bottom" :class="$style.explain">解释说明 placement="bottom"</x-explain>
    <x-explain placement="bottom-start" :class="$style.explain">解释说明 placement="bottom-start"</x-explain>
    <x-explain placement="bottom-end" :class="$style.explain">解释说明 placement="bottom-end"</x-explain>
    <x-explain placement="left" :class="$style.explain">解释说明 placement="left"</x-explain>
    <x-explain placement="left-start" :class="$style.explain">解释说明 placement="left-start"</x-explain>
    <x-explain placement="left-end" :class="$style.explain">解释说明 placement="left-end"</x-explain>
    <x-explain placement="right" :class="$style.explain">解释说明 placement="right"</x-explain>
    <x-explain placement="right-start" :class="$style.explain">解释说明 placement="right-start"</x-explain>
    <x-explain placement="right-end" :class="$style.explain">解释说明 placement="right-end"</x-explain>
  </div>
</template>
<style module lang="scss">
.main{
  .explain{
    margin: 10px;
  }
}
</style>
```

#### 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| placement  | 内容展示的位置   | string  |   top / top-start / top-end / bottom / bottom-start / bottom-end / left / left-start / left-end / right / right-start / right-end |    bottom     |