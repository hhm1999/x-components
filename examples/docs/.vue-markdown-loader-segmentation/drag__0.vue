``` html
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
    <x-file-upload v-model="value"></x-file-upload>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: null,
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