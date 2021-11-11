<template>
  <div :class="$style.main">
    <x-forms :class="$style.wrap" ref="forms" :descriptor="descriptor" :model="formData">
      <x-forms-item horizontal label="标题:" prop="name">
        <x-input v-model="formData.title"></x-input>
      </x-forms-item>
      <x-forms-item horizontal label="key:" prop="key">
        <x-input v-model="formData.key"></x-input>
      </x-forms-item>
      <x-forms-item horizontal label="表单类型:" prop="name">
        <x-select placeholder="请选择" v-model="formData.type">
          <x-select-option
            :value="1"
            :key="1"
          >
            图片上传表单
          </x-select-option>
        </x-select>
      </x-forms-item>
    </x-forms>
    <x-forms :class="$style.wrap" ref="forms" :descriptor="descriptor" :model="formData">
      <x-forms-item horizontal label="标题:" prop="name">
        <x-input placeholder="请输入配置项标题"></x-input>
      </x-forms-item>
      <x-forms-item horizontal label="key:" prop="key">
        <x-input placeholder="请输入配置项key" ></x-input>
      </x-forms-item>
      <x-forms-item horizontal label="表单类型:" prop="name">
        <x-select placeholder="请选择配置项表单类型" >
          <x-select-option
            :value="1"
            :key="1"
          >
            图片上传表单
          </x-select-option>
        </x-select>
      </x-forms-item>
    </x-forms>
    <x-btn @click="submit" :class="$style.btn" type="primary">添加一个配置项</x-btn>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formData: {
        title: '头部海报',
        key: ' bannerImgUrl',
        type: 1,
      },
      descriptor: {
        name: [
          {
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
  
  .btn{
    margin-left: 150px;
    margin-top: 20px;
  }
  .wrap{
    width: 600px;
    border-bottom: 1px solid #E4E7ED;
    margin-bottom: 20px;
    padding-right: 100px;
    box-sizing: border-box;
  }
}
</style>