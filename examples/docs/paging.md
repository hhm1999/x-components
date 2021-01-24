### paging 分页
paging 分页、翻页等功能的组件。

```vue
<template>
  <x-paging 
    v-model="currentPage" 
    :total="300"
    :page-size="15"
    :pager-count="10"
  >
  </x-paging>
</template>
<script>
export default {
  data () {
    return {
      currentPage: 1
    }
  }
}
</script>
```

#### 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model  | 当前页数，支持 .sync 修饰符 | number  |   -- |    --     |
| total  | 总条目数 | number  |   -- |    --     |
| page-size | 每页显示条目个数 | number  |   -- |    10     |
| pager-count | 最多显示多少个翻页按钮，超过隐藏 | number  |   -- |    5     |


