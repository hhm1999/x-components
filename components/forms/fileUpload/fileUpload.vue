<template>
  <div :class="classMain">
    <div :class="$style.file_item" :key="item" v-for="(item, i) in value">
      <x-icon :class="$style.file_iocn" :type="getFileIocnType(item)"></x-icon>
      <a :class="[$style.file_link, $style.c_ellipsis]" target="_blank" :href="'https://catflow-upload.gugugame.com/' + item">{{ getFileName(item) }}</a>
      <x-icon v-if="!disabled" @click.native="handelDel(i)" :class="$style.del" type="file-upload-del"></x-icon>
    </div>
    <div :class="classTagWrap">
      <div v-if="disabled" :class="$style.disabled"></div>
      <div @click="handelShowMaxNumberTip" v-show="showMaxNumberTip" :class="$style.max_tip"></div>
      <div v-show="isUploadIng" :class="$style.spin_wrap"><x-spin :size="20"></x-spin></div>
      <div :class="$style.tag" ref="tag">
        <template v-if="!isUploadIng"><x-icon :class="$style.choose_icon" type="file-upload-choose"></x-icon> 添加文件</template>
      </div>
    </div>
  </div>
</template>
<script>
import qq from 'fine-uploader/lib/core'
import utils from '../../utils/utils.js'
export default {
  name: 'x-file-upload',
  formsMark: {
    name: 'x-file-upload',
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
      isUploadIng: false,
      extensionIcon: {
        'jpeg': 'file-upload-image',
        'jpg': 'file-upload-image',
        'png': 'file-upload-image',
        'gif': 'file-upload-image',
        'psd': 'file-upload-image',
        'dox': 'file-upload-word',
        'docx': 'file-upload-word',
        'pdf': 'file-upload-pdf',
        'xls': 'file-upload-excel',
        'xlsx': 'file-upload-excel',
        'zip': 'file-upload-zip',
        'rar': 'file-upload-rar',
        'mp3': 'file-upload-mp3',
        'ppt': 'file-upload-ppt'
      }
    }
  },
  created () {
    this.valueInternal = this.value
  },
  mounted () {
    const that = this
    const sizeLimit = 209715200 // 200m
    this.uploader = new qq.FineUploaderBasic({
      autoUpload: true,
      button: this.$refs.tag,
      request: {
        endpoint: '/api/upload'
      },
      validation: {
        // allowedExtensions: ['png', 'jpg', 'jpeg', 'gif', 'psd', 'zip', ''],
        sizeLimit: sizeLimit
      },
      text: {
        defaultResponseError: '上传失败，未知错误，请重试'
      },
      messages: {
        // typeError: '图片上传失败，只能上传：{extensions} 文件',
        sizeError: '文件上传失败，文件大小必须小于' + (sizeLimit / 1024 /1024) + 'M'
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
    classMain () {
      return {
        [this.$style.main]: true,
        [this.$style.mobile]: utils.isMobile(),
        [this.$style.pc]: !utils.isMobile()
      }
    },
    showMaxNumberTip () {
      return this.maxNumber && this.value && this.value.length >= this.maxNumber
    }
  },
  methods: {
    getFileIocnType (item) {
      const itemArr = item.split('.')
      if (itemArr && itemArr.length > 0) {
        const extension = itemArr[itemArr.length - 1]
        if (this.extensionIcon[extension]) {
          return this.extensionIcon[extension]
        }
      }
      return 'file-upload-file'
    },
    handelShowMaxNumberTip () {
      const that = this
      that.$message({
        type: 'error',
        message: '最多只允许上传' + that.maxNumber + '个文件'
      })
    },
    handelDel (index) {
      let newValue = this.$utils.clone(this.value)
      newValue.splice(index, 1)
      this.$emit('input', newValue)
    },
    getFileName (item) {
      return item.split('____originalFileName____')[1]
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  width: 100%;
  &.pc{
    .file_item{
      width: 300px;
    }
  }
  &.mobile{
    .file_item{
      width: 100%;
    }
  }
  .file_item{
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    position: relative;
    display: block;
    margin-bottom: 5px;
    padding-right: 20px;
    padding-left: 25px;
    box-sizing: border-box;
    color: $color-primary-dark;
    .file_iocn{
      color: $color-primary;
      font-size: 20px;
      margin-right: 5px;
      position: absolute;
      left: 0px;
      top: 5px;
    }
    .file_link{
      display: inline-block;
      width: 100%;
      cursor: pointer;
      color: $color-primary-dark;
      text-decoration: none;
      &:hover{
        text-decoration: underline;
      }
    }
    .del{
      width: 20px;
      height: 20px;
      // border-radius: 12px;
      font-size: 14px;
      color: $color-danger;
      line-height: 20px;
      text-align: center;
      margin-left: 5px;
      position: absolute;
      right: 0px;
      top: 5px;
      // background-color: $color-danger;
      cursor: pointer;
      &:hover{
        color: $color-danger-dark;
      }
    }
  }
  .tag_wrap{
    border-radius: 2px;
    position: relative;
    width: 200px;
    height: 35px;
    background-color: $background-color-base;
    box-sizing: border-box;
    border: 1px solid $border-color-base;
    &.no_disabled{
      &:hover{
        border: 1px solid $color-primary;
        color: $color-primary;
      }
    }
    &.disabled{
      border: 1px solid $border-color-light;
      color: $color-text-placeholder;
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
      text-align: center;
      line-height: 33px;
      position: absolute;
      width: 100%;
      height: 100%;
      .choose_icon{
        font-size: 14px;
        margin-right: 7px;
      }
    }
  }
}
</style>
