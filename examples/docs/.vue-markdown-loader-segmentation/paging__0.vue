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