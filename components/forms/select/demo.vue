<template>
  <div :class="$style.main">
    <x-forms-item label="单选">
      <x-select disabled v-model="val1">
        <x-select-option
          :disabled="item.disabled"
          :value="item.value"
          v-for="item in options"
          :key="item.value"
        >
          {{ item.label }}
        </x-select-option>
      </x-select>
    </x-forms-item>
    <x-forms-item label="多选">
      <x-select disabled multiple placeholder="请选择" search v-model="val3">
        <x-select-option
          :disabled="item.disabled"
          :value="item.value"
          v-for="item in options"
          :key="item.value"
        >
          {{ item.label }}
        </x-select-option>
      </x-select>
    </x-forms-item>
    <x-forms-item label="可搜索">
      <x-select multiple placeholder="请选择" search v-model="val2">
        <x-select-option
          :disabled="item.disabled"
          :value="item.value"
          v-for="item in options"
          :key="item.value"
        >
          {{ item.label }}
        </x-select-option>
      </x-select>
    </x-forms-item>
    <!-- <x-forms-item label="惰性加载数据">
      <x-select @drop-down-visibility-change="handlerDropDownVisibilityChange" @search-key-change="handlerSearchKeyChange" placeholder="请选择" v-model="value1" :label-init="labelInit1">
        <x-select-option
          :disabled="item.disabled"
          :value="item.value"
          v-for="item in networkOptions"
          :key="item.value"
        >
          {{ item.label }}
        </x-select-option>
        <x-select-option-tip v-if="optionsTipShow">{{ optionsTipText }}</x-select-option-tip>
      </x-select>
    </x-forms-item> -->
    <!-- <div @click="has=!has">去掉</div>
    <x-select disabled search @drop-down-visibility-change="handlerDropDownVisibilityChange" @search-key-change="handlerSearchKeyChange" placeholder="请选择" v-model="value1" :label-init="labelInit1">
      <x-select-option
        :disabled="item.disabled"
        :value="item.value"
        v-for="item in networkOptions"
        :key="item.value"
      >
        {{ item.label }}
      </x-select-option>
      <x-select-option-tip v-if="optionsTipShow">{{ optionsTipText }}</x-select-option-tip>
    </x-select>
    <br> <br> <br> <br> <br> <br>
    <div @click="handlerClick" ref="scrollWrap" :class="$style.scroll_wrap">
      <input type="text" autocomplete="off" />
      <div :class="$style.strut">12</div>
      <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
      普通单选：
      <x-select placeholder="请选择" search v-model="valueOne">
        <x-select-option
          :disabled="item.disabled"
          :value="item.value"
          v-for="item in options"
          :key="item.value"
        >
          {{ item.label }}
        </x-select-option>
      </x-select>
      普通多选：
      <x-select disabled multiple placeholder="请选择" search v-model="values">
        <x-select-option
          :disabled="item.disabled"
          :value="item.value"
          v-for="item in options"
          :key="item.value"
        >
          {{ item.label }}
        </x-select-option>
      </x-select>
      <br> <br>
      <div :class="$style.select_wrap">
        单选远程可搜索：
        <x-select search @drop-down-visibility-change="handlerDropDownVisibilityChange" @search-key-change="handlerSearchKeyChange" placeholder="请选择" v-model="value1" :label-init="labelInit1">
          <x-select-option
            :disabled="item.disabled"
            :value="item.value"
            v-for="item in networkOptions"
            :key="item.value"
          >
            {{ item.label }}
          </x-select-option>
          <x-select-option-tip v-if="optionsTipShow">{{ optionsTipText }}</x-select-option-tip>
        </x-select>
      </div>
      <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br>
    </div>
    <div class=""> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br></div>
    <div :class="$style.select_wrap">
      多选远程可搜索：
      <x-select search multiple @drop-down-visibility-change="handlerDropDownVisibilityChange" @search-key-change="handlerSearchKeyChange" v-model="value2" :label-init="labelInit2">
        <x-select-option
          :disabled="item.disabled"
          :value="item.value"
          v-for="item in networkOptions"
          :key="item.value"
        >
          {{ item.label }}
        </x-select-option>
        <x-select-option-tip v-if="optionsTipShow">{{ optionsTipText }}</x-select-option-tip>
      </x-select>
    </div>
    <div class=""> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br></div>
    <div class=""> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br> <br></div> -->
  </div>
</template>
<script>
export default {
  props: {
  },
  data () {
    return {
      val1: 1,
      val2: null,
      val3: [ 2, 4 ],
      has: true,
      dropDownFirstTime: true,
      optionsTipShow: true,
      optionsTipText: '输入关键字搜索',
      value1: '212313123',
      labelInit1: '选项13',
      value2: ['12345678901'],
      labelInit2: ['马斯克1'],
      values: [1, 2],
      valueOne: 1,
      options: [],
      networkOptions: [],
      networkOptionsDefault: []
    }
  },
  created () {
    for (var i = 0; i < 30; i++) {
      this.options.push({
        label: '选项' + i,
        value: i,
        disabled: false
      })
    }
  },
  mounted() {
  },
  watch: {
  },
  computed: {
  },
  methods: {
    handlerClick () {
      alert(123)
    },
    handlerDropDownVisibilityChange: function (visibility) {
      if (visibility) {
        if (this.dropDownFirstTime) {
          this.dropDownFirstTime = false
          this.optionsTipShow = true
          var that = this
          that.optionsTipText = '数据加载中···'
          this.$axios.get('/demo/select').then(rsp => {
            this.networkOptionsDefault = this.$utils.clone(rsp.data.list)
            if (that.networkOptions.length <= 0) {
              that.networkOptions.splice(0, that.networkOptions.length)
              that.networkOptions = rsp.data.list
              if (that.networkOptions.length <= 0) {
                that.optionsTipShow = true
                that.optionsTipText = '没有选项'
              } else {
                that.optionsTipShow = false
              }
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.optionsTipShow = false
          this.networkOptions.splice(0, this.networkOptions.length)
          this.networkOptions = this.$utils.clone(this.networkOptionsDefault)
        }
      }
    },
    handlerSearchKeyChange: function (key) {
      this.optionsTipShow = true
      this.networkOptions.splice(0, this.networkOptions.length)
      if (key) {
        var that = this
        that.optionsTipText = '搜索中···'
        this.$axios.get('/demo/select').then(rsp => {
          that.networkOptions.splice(0, that.networkOptions.length)
          that.networkOptions = rsp.data.list
          if (that.networkOptions.length <= 0) {
            that.optionsTipShow = true
            that.optionsTipText = '没有符合条件的选项'
          } else {
            that.optionsTipShow = false
          }
        }).catch(error => {
          console.log(error)
        })
      } else {
        this.optionsTipShow = false
        this.networkOptions.splice(0, this.networkOptions.length)
        this.networkOptions = this.$utils.clone(this.networkOptionsDefault)
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  width: 50%;
  .width,
  .width_input{
    display: inline-block;
    font-size: 14px;
    border: 1px solid #DCDFE6;
  }
  .select_wrap{
    width: 300px;
    margin-left: 200px;
  }
  .scroll_wrap{
    margin-left: 50px;
    width: 300px;
    height: 500px;
    overflow: auto;
    background-color: #eee;
    position: relative;
    .select_wrap{
      width: 200px;
      margin-left: 50px;
    }
  }
  .strut{
    width: 200%;
  }
}
</style>
