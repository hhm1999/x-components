``` html
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