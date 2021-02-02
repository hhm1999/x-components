<template>
  <div :class="$style.main">
    <x-loading loading-text="数据加载中···"></x-loading>
  </div>
</template>
<style module lang="scss">
.main{
  z-index: 1;
  position: relative;
  height: 250px;
}
</style>