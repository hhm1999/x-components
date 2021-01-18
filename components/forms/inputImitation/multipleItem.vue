<template>
  <div :class="classMain">
    <slot></slot><x-icon @click.native.stop="$emit('del')" :class="$style.close" type="select-close"></x-icon>
  </div>
</template>
<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  watch: {
  },
  computed: {
    classMain () {
      return {
        [this.$style.c_ellipsis]: true,
        [this.$style.main]: true,
        [this.$style.disabled]: this.disabled
      }
    }
  },
  methods: {
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  font-size: 12px;
  padding: 0px 18px 0px 4px;
  box-sizing: border-box;
  background-color: $background-color-base;
  color: $color-text-secondary;
  border: 1px solid $border-color-lighter;
  line-height: 20px;
  height: 21px;
  margin-right: 5px;
  border-radius: $radius;
  display: inline-block;
  max-width: 100%;
  position: relative;
  .close{
    top: 4px;
    right: 3px;
    position: absolute;
    margin-left: 4px;
    color: $color-text-secondary;
    &:hover{
      color: $color-danger;
    }
  }
  &.disabled{
    border-color: $border-color-light;
    background-color: $background-color-base;
    padding-right: 4px;
    .close{
      display: none;
    }
  }
}
</style>
