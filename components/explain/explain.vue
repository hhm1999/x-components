<template>
  <div :class="$style.main">
    <x-tooltip :placement="placement">
      <template slot="content">
        <slot></slot>
      </template>
      <x-icon :class="$style.icon" type="explain"></x-icon>
    </x-tooltip>
  </div>
</template>
<script>
export default {
  name: 'x-explain',
  props: {
    placement: {
      type: String,
      default: undefined
    }
  },
  computed: {
    styleMain () {
      return {
        color: this.color,
        fontSize: this.size
      }
    }
  }
}
</script>
<style module lang="scss">
.main{
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  .icon{
    color: $color-primary-light;
  }
}
</style>
