<template>
  <div :class="$style.main">
    <table :class="$style.table" cellspacing="0" cellpadding="0" border="0">
      <!-- <colgroup>
        <col v-for="column in columns" :name="column.key" :key="column.key" :width="column.width">
      </colgroup> -->
      <thead :class="$style.thead">
        <tr :class="$style.tr">
          <th :class="$style.th" :name="column.key" :key="column.key" v-for="column in columns">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody :class="$style.tbody">
        <tr :class="$style.tr" :key="item[vueKey]" v-for="item in data">
          <td @click="handleTdClick" :class="$style.td" :key="column['key']" v-for="column in columns">
            <template v-if="column.isWwOpenData">
              <x-ww-open-data type="userName" :openid="item[column['key']]" />
            </template>
            <template v-else-if="isHtml && isHtml(column, item)">
              <div v-html="item[column['key']]"></div>
            </template>
            <template v-else-if="column.html">
              <div v-html="item[column['key']]"></div>
            </template>
            <template v-else>
              {{ item[column['key']] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'x-table',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    vueKey: {
      type: String,
      default: 'id'
    },
    isHtml: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    handleTdClick (e) {
      this.$emit('cell-click', e)
    }
  },
  computed: {
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  box-sizing: border-box;
  border: 1px solid $border-color-lighter;
  border-right: none;
  border-bottom: none;
  font-size: 14px;
  color: $color-text-regular;
  .table{
    width: 100%;
    .thead{
      .th{
        border-bottom: 1px solid $border-color-lighter;
        border-right: 1px solid $border-color-lighter;
        padding: 12px;
        box-sizing: border-box;
        text-align: left;
        background: $background-color-base;
        color: $color-text-regular;
        // &:last-child{
        //   border-right: none;
        // }
      }
    }
    .tbody{
      .td{
        border-bottom: 1px solid $border-color-lighter;
        border-right: 1px solid $border-color-lighter;
        padding: 12px;
        box-sizing: border-box;
      }
      // &:last-child{
      //   border-right: none;
      // }
    }
  }
}
</style>
