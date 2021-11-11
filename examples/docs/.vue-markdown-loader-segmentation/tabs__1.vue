<template>
  <x-tabs v-model="currentName" :forceUpdateNav="forceUpdateNav">
    <x-tab-pane name="first">
      <x-tooltip slot="label" content="正下方位置 placement=bottom" :visibility="visibility" :interaction="false" placement="bottom">
        <span>自定义标签页</span>
      </x-tooltip>
      <div :class="$style.content">标签页A内容</div>
    </x-tab-pane>
    <x-tab-pane label="标签页B" name="second">
      <div :class="$style.content" @click="(visibility = true) && (forceUpdateNav++)">标签页B内容</div>
    </x-tab-pane>
  </x-tabs>
</template>
<script>
export default {
  data () {
    return {
      forceUpdateNav: 0,
      visibility: false,
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