<template>
  <div>
    <p class="c_title">普通</p>
    <x-switch v-model="value">选项</x-switch>
    <p class="c_title">禁用</p>
    <x-switch disabled v-model="valueDisabled">选项</x-switch>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: true,
      valueDisabled: true
    }
  }
}
</script>