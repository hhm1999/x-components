### table 表格
table 表格。

```html
<template>
  <x-table :data="tableData" :columns="tableColumns"></x-table>
</template>
<script>
export default {
  data () {
    return {
      tableData: [
        {
          id: 1,
          birthday: '2012-12-12',
          gender: '男',
          name: '小明'
        },
        {
          id: 2,
          birthday: '2019-12-12',
          gender: '女',
          name: '小红'
        }
      ],
      tableColumns: [
        {
          key: 'name',
          title: '姓名'
        },
        {
          key: 'birthday',
          title: '生日'
        },
        {
          key: 'gender',
          title: '性别'
        }
      ]
    }
  }
}
</script>
```

#### 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data  | 表格的数据源，必须有`v_key`字段，且必须保持唯一性，用于`vue for`循环的`key`使用 | array  |   -- |    --     |
| columns  | 表格列的描述，具体见下表 | array  |   -- |    --     |
| vue-key  | 指定`data`中用于`vue``v-for循环`的`v-key`的字段名称，必须保持该字段对应的数据的唯一性 | string  |   -- |    id     |

#### columns 字段
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| key  | 对应`data`数据中的数据对象的`key` |  --  |   -- |    --     |
| title  | 列头显示文本 | --  |   -- |    --     |
| html  | 指定该列是否使用`v-html`形式将内容渲染为`html`代码 | boolean  |   -- |    false     |

#### 函数属性
| 参数      | 说明    | 类型      | 回调参数  | 返回要求  |
|---------- |-------- |---------- |-------- | -------- | 
| is-html     | 逐个单元格回调确认是否使用`v-html`形式将内容渲染为`html`代码 |  function(column, data) | `column`数据对应的列描述</br>`data` 数据内容  | 以`html`形式渲染返回`true`，不以`html`形式渲染返回`false` | 

