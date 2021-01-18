<template>
  <div :class="classMain">
    <div :class="$style.btn_wrap">
      <x-btn @click="!prevDisabled && handlePrevClick()" :disabled="prevDisabled" plain size="small" :class="[$style.prev, $style.item]"><x-icon type="paging-prev"></x-icon></x-btn>
      <x-btn :key="item" @click="handleItemClick(item)" v-for="item in pageArray" size="small" :type="getItemType(item)" :class="getItemClass(item)">{{ item }}</x-btn>
      <x-btn @click="!nextDisabled && handleNextClick()" :disabled="nextDisabled" plain size="small" :class="[$style.next, $style.item]"><x-icon type="paging-next"></x-icon></x-btn>
    </div>
    <div :class="$style.total">共 {{ number }} 页 - {{ total }} 条</div>
  </div>
</template>
<script>
export default {
  name: 'x-paging',
  model: {
    prop: 'currentPage',
    event: 'change'
  },
  props: {
    total: {
      type: Number,
      default: undefined
    },
    pageSize: { // 一页显示多少个
      type: Number,
      default: 10
    },
    pagerCount: { // 显示多少个翻页按钮
      type: Number,
      default: 5
    },
    currentPage: { // 当前页数
      type: Number,
      default: 1
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    prevDisabled () {
      return this.currentPage <= 1
    },
    nextDisabled () {
      return this.currentPage >= this.number
    },
    classMain () {
      return {
        [this.$style.main]: true,
        [this.$style.c_noselect]: true
      }
    },
    number () { // 一共多少按钮
      return Math.ceil(this.total / this.pageSize)
    },
    pageLast () {
      if (this.pagerCount >= this.number) {
        return this.number
      } else {
        let last = null
        const rightNumberNormal = Math.ceil((this.pagerCount - 1) / 2) // 右边正常显示个数
        const leftNumberNormal = (this.pagerCount - 1) - rightNumberNormal // 左边边正常显示个数
        if (this.currentPage - leftNumberNormal <= 0) {
          last = this.currentPage + rightNumberNormal + (leftNumberNormal + 1 - this.currentPage)
        } else {
          last = this.currentPage + rightNumberNormal
        }
        return last < this.number ? last : this.number
      }
    },
    pageStart () {
      let start = this.pageLast - this.pagerCount + 1
      return start > 0 ? start : 1
    },
    pageArray () {
      let array = []
      for (let i = this.pageStart; i <= this.pageLast; i++) {
        array.push(i)
      }
      return array
    }
  },
  methods: {
    handlePrevClick () {
      this.$emit('change', this.currentPage - 1)
    },
    handleNextClick () {
      this.$emit('change', this.currentPage + 1)
    },
    pageIsShow (number) {
      return number
    },
    getItemClass (item) {
      return {
        [this.$style.item]: true,
        [this.$style.current]: item === this.currentPage
      }
    },
    getItemType (item) {
      return item === this.currentPage ? 'primary' : 'default'
    },
    handleItemClick (number) {
      this.$emit('change', number)
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  .total{
    line-height: 20px;
    height: 20px;
    text-align: center;
    font-size: 12px;
    margin-top: 5px;
    color: $color-text-secondary;
  }
  .btn_wrap{
    text-align: center;
    .item{
      margin-right: 5px;
      &:last-child{
        margin-right: 0px;
      }
    }
  }
}
</style>
