### drag 拖拽排序
快速实现拖拽排序功能。

#### 拖动方块可调整位置
```html
<template>
  <div :class="$style.main">
    <x-drag-group @order-change="handleOrderChange">
      <x-drag
        v-for="drag in drags" 
        :key="drag" 
        :order-key="drag"
        :style="styleDrag(drag)"
        :class="$style.drag">
        {{ drag }}
        <div :class="$style.drag_bar" dragBar></div>
      </x-drag>
    </x-drag-group>
  </div>
</template>
<script>
export default {
  data () {
    return {
      drags: [1, 2, 3, 4, 5, 6],
      colors: ['#f26970', '#dd7c4f', '#fcd978', '#9ec29c', '#b59cd5', '#e1adaf']
    }
  },
  methods: {
    styleDrag (val) {
      return {
        backgroundColor: this.colors[val - 1]
      }
    },
    handleOrderChange (orderKeys) {
      console.log(orderKeys)
    }
  }
}
</script>
<style module lang="scss">
.main{
  .drag{
    width: 70px;
    height: 70px;
    line-height: 70px;
    border-radius: 5px;
    text-align: center;
    display: inline-block;
    margin: 10px;
    color: #fff;
    font-weight: 600;
    position: relative;
    .drag_bar{
      position:absolute;
      width: 100%;
      height: 100%;
      cursor: move;
      top: 0px;
      left: 0px;
    }
  }
}
</style>
```

#### drag-group 事件
| 事件名称      | 说明    | 回调参数  |
|---------- |-------- |---------- |
| order-change | 顺序改变时触发 | `orderKeys`新的顺序数组  |

#### drag 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| order-key  | 代表每个排序对象的唯一值，会在`drag-group`的`order-change`事件的回调参数数组中代表每个排序对象的顺序 | string  |   -- |    --     |