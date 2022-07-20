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
        },
        {
          key: 'x-action',
          title: '操作',
        }
      ]
    }
  }
}
</script>