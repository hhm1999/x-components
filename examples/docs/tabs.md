### tabs 标签页
内容切换组件。

#### 基础用法
``` html
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
```

#### 自定义标签页
``` html
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
```

#### x-tabs 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model  | 当前显示的选项卡的`name`，双向绑定 | --  |   -- |    --     |
| bar-height  | 操作栏的高度，单位：`px` |  number  |   -- |    40     |
| bar-align  | 操作栏是否内容对齐方式 | string  |   center / left / right |    left     |

#### x-tab-pane 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label  | 选项卡标题 | string  |   -- |    --     |
| name  | 与`x-tabs`的`v-model`对应用来控制选项卡是否显示 | string  |   -- |    --     |
|  lazy  | 标签页内容是否延迟渲染 | boolean  |   -- |    false     |