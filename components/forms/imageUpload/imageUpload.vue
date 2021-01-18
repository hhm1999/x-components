<template>
  <div :class="[$style.main, $style.c_cf]">
    <div :class="$style.img_item" :key="image" v-for="(image, i) in value">
      <div :class="$style.img_wrap"><x-image :class="$style.img" :src="'https://catflow-upload.gugugame.com/' + image"></x-image></div>
      <div v-if="!disabled" @click="handelDel(i)" :class="$style.del"><x-icon type="image-upload-del"></x-icon></div>
    </div>
    <div :class="classTagWrap">
      <div v-if="disabled" :class="$style.disabled"></div>
      <div @click="handelShowMaxNumberTip" v-show="showMaxNumberTip" :class="$style.max_tip"></div>
      <div v-show="isUploadIng" :class="$style.spin_wrap"><x-spin :size="35"></x-spin></div>
      <div :class="$style.tag" ref="tag">
        <span v-show="!isUploadIng" :class="$style.horizontal"></span>
        <span v-show="!isUploadIng" :class="$style.vertical"></span>
      </div>
    </div>
  </div>
</template>
<script>
import qq from 'fine-uploader/lib/core'
export default {
  name: 'x-image-upload',
  formsMark: {
    name: 'x-image-upload',
    events: [
    ]
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxNumber: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      valueInternal: null,
      isUploadIng: false
    }
  },
  created () {
    this.valueInternal = this.value
  },
  mounted () {
    const that = this
    const sizeLimit = 10485760
    this.uploader = new qq.FineUploaderBasic({
      autoUpload: true,
      button: this.$refs.tag,
      request: {
        endpoint: '/api/upload'
      },
      validation: {
        allowedExtensions: ['png', 'jpg', 'jpeg'],
        sizeLimit: sizeLimit
      },
      text: {
        defaultResponseError: '上传失败，未知错误，请重试'
      },
      messages: {
        typeError: '图片上传失败，只能上传：{extensions} 文件',
        sizeError: '图片上传失败，图片大小必须小于' + (sizeLimit / 1024 /1024) + 'M'
      },
      callbacks: {
        onUpload () {
          that.isUploadIng = true
        },
        onComplete (id, name, responseJSON) {
          that.isUploadIng = false
          if (responseJSON.success && responseJSON.name) {
            let newValue = []
            if (that.value) {
              newValue = that.$utils.clone(that.value)
            }
            newValue.push(responseJSON.name)
            that.$emit('input', newValue)
          }
        },
        onError (id, name, errorReason) {
          that.$message({
            type: 'error',
            message: errorReason
          })
        }
      }
    })
  },
  watch: {
    maxNumber (val) {
      if (this.value && this.value.length > val) {
        let newValue = this.$utils.clone(this.value)
        newValue.splice(val, this.value.length - val)
        this.$emit('input', newValue)
      }
    }
  },
  computed: {
    classTagWrap () {
      return {
        [this.$style.tag_wrap]: true,
        [this.$style.no_disabled]: !this.disabled,
        [this.$style.disabled]: this.disabled
      }
    },
    showMaxNumberTip () {
      return this.maxNumber && this.value && this.value.length >= this.maxNumber
    }
  },
  methods: {
    handelShowMaxNumberTip () {
      const that = this
      that.$message({
        type: 'error',
        message: '最多只允许上传' + that.maxNumber + '张图片'
      })
    },
    handelDel (index) {
      let newValue = this.$utils.clone(this.value)
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  width: 100%;
  .img_item{
    width: 100px;
    height: 100px;
    border-radius: 2px;
    float: left;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: $background-color-base;
    position: relative;
    .img_wrap{
      width: 100px;
      height: 100px;
      overflow: hidden;
      text-align: center;
      display: flex;
      align-items:center;
      justify-content:center;
      .img{
        width: 100%;
      }
    }
    .del{
      width: 20px;
      height: 20px;
      border-radius: 12px;
      font-size: 12px;
      color: $color-white;
      line-height: 20px;
      text-align: center;
      position: absolute;
      right: -8px;
      top: -8px;
      background-color: $color-danger;
      cursor: pointer;
      &:hover{
        background-color: $color-danger-dark;
      }
    }
  }
  .tag_wrap{
    float: left;
    border-radius: 2px;
    position: relative;
    width: 100px;
    height: 100px;
    background-color: $background-color-base;
    box-sizing: border-box;
    border: 1px solid $border-color-base;
    &.no_disabled{
      &:hover{
        // background-color: $color-white;
        border: 1px solid $color-primary;
        .horizontal, .vertical{
          background-color: $color-primary !important;
        }
      }
    }
    &.disabled{
      border: 1px solid $border-color-light;
      .horizontal, .vertical{
        background-color: $border-color-light !important;
      }
    }
    .disabled{
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 2;
      cursor: not-allowed;
    }
    .max_tip{
      width: 100%;
      height: 100%;
      position: absolute;
      text-align: center;
      display: flex;
      align-items:center;
      justify-content:center;
      z-index: 1;
    }
    .spin_wrap{
      width: 100%;
      height: 100%;
      position: absolute;
      text-align: center;
      display: flex;
      align-items:center;
      justify-content:center;
      z-index: 1;
    }
    .tag{
      position: absolute;
      width: 100%;
      height: 100%;
      .horizontal{
        position:absolute;
        display: block;
        height: 1px;
        width: 70px;
        background-color: $border-color-base;
        left: 14px;
        top: 48px;
      }
      .vertical{
        position:absolute;
        display: block;
        width: 1px;
        height: 70px;
        background-color: $border-color-base;
        top: 14px;
        left: 48px;
      }
    }
  }
}
</style>
