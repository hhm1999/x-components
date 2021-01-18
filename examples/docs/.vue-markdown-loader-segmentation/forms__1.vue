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