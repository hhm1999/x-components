<template>
  <div :class="$style.main">
    <x-file-upload disabled v-model="value"></x-file-upload>
    {{ value }}
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      value: [
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____图片.jpeg',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____图片.jpg',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____图片.png',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____图片.gif',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____图片.psd',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____word.dox',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____word.docx',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____pdf.pdf',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____excel.xls',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____excel.xlsx',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____压缩包.zip',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____压缩包.rar',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____mp3.mp3',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____ppt.ppt',
        'cc0ccf80-f908-49bc-94b6-5b52ce1f60ec____originalFileName____其它文件.other'
      ]
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
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  padding: 10px;
}
</style>
