<template>
  <x-tabs v-model="currentName" @click.native="is=false" >
    <x-tab-pane label="标签页A" name="first">
      <div :class="$style.content">标签页A内容</div>
    </x-tab-pane>
    <x-tab-pane label="标签页B" v-if="is" name="second">
      <div :class="$style.content">标签页B内容</div>
    </x-tab-pane>
  </x-tabs>
</template>
<script>
export default {
  data () {
    return {
      is: true,
      currentName: 'second'
    }
  }
}
</script>
<style module lang="scss">
.content{
  height: 200px;
  padding: 10px;
  font-size: 14px;
}
</style>