<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
// import AsyncValidator from 'async-validator'
import utils from '../../utils/utils.js'
export default {
  name: 'x-forms',
  componentName: 'x-forms',
  props: {
    model: {
      type: Object,
      default: function () {
        return null
      }
    },
    descriptor: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      formsItems: []
    }
  },
  created () {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    open_validate (key) {
      let that = this
      return new Promise(function(resolve, reject) {
        let promises = []
        for (let i = 0; i < that.formsItems.length; i++) {
          promises.push(that.formsItems[i].open_validate())
        }
        utils.promise.all(promises).then(function () {
          resolve(key)
        }).catch(function(e){
          if (key) {
            reject(key, e)
          } else {
            reject(e)
          }
        })
      })
    },
    open_setFormsItem (formsItem) {
      this.formsItems.push(formsItem)
    },
    open_removeFormsItem (formsItem) {
      for (var i = 0; i < this.formsItems.length; i++) {
        if (this.formsItems[i] === formsItem) {
          this.formsItems.splice(i, 1)
          break
        }
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
</style>
