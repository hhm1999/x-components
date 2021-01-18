<template>
  <div :class="$style.wrap">
    <!-- <x-btn @click="has=!has">消失/出现</x-btn> -->
    <x-forms ref="forms" :descriptor="descriptor" :model="formData">
      <x-forms-item v-if="has" label="普通输入框" prop="input">
        <x-input v-model="formData.input"></x-input>
      </x-forms-item>
    </x-forms>
    <br>
    <x-btn @click="validate">验证合法性</x-btn>
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      has: true,
      formData: {
        input: ''
      },
      descriptor: {
        input: [
          {
            required: true,
            message: '必须填写'
          },
          {
            max: 12,
            message: '长度必须少于或等于' + 12 + '个字符'
          }
        ]
      }
    }
  },
  created () {
  },
  mounted() {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    validate () {
      this.$refs.forms.open_validate().then(function () {
      }).catch(function(e){
        console.log(e)
      })
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.wrap{
  width: 30%;
}
</style>
