<template>
  <div :class="$style.main">
    <x-forms ref="forms" :descriptor="descriptor" :model="formData">
      <x-forms-item horizontal explain="提示" label="姓名" prop="name">
        <x-input v-model="formData.name"></x-input>
      </x-forms-item>
      <x-forms-item horizontal label="性别" prop="gender">
        <x-radio-group v-model="formData.gender">
          <x-radio label="men">
            男
          </x-radio>
          <x-radio label="women">
            女
          </x-radio>
        </x-radio-group>
      </x-forms-item>
    </x-forms>
    <x-btn @click="submit" :class="$style.btn" type="primary">提交</x-btn>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        name: null,
        gender: null
      },
      descriptor: {
        name: [
          {
            required: true,
            message: '必须填写'
          }
        ],
        gender: [
          {
            required: true,
            message: '必须填写'
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.forms.open_validate().then(function () {
        console.log('数据校验通过')
      }).catch(function(e){
        console.log(e)
      })
    }
  }
}
</script>
<style module lang="scss">
.main{
  width: 300px;
  .btn{
    margin-left: 150px;
    margin-top: 20px;
  }
}
</style>