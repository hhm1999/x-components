<template>
  <div :class="$style.main" v-x-clickoutside="handlerClickoutside">
    <div :class="$style.item" ref="tagColor" @mouseleave="leaveColor" @mouseenter="colorPickerVisibility=true">
      <x-icon type="font-color"></x-icon>
    </div>
    <div :class="$style.item" ref="tagfontSize" @mouseleave="leaveFontSize" @mouseenter="fontSizeVisibility=true">
      <x-icon type="font-size"></x-icon>
    </div>
    <x-drop-down
      :height="132"
      :width="132"
      :show="colorPickerVisibility"
      ref="colorPickerDropDown"
      priorityDirectionVertical="top"
      @hide="colorPickerVisibility=false"
      @mouseleave.native="leaveColor"
    >
      <colorPicker v-model="colors"></colorPicker>
    </x-drop-down>
    <x-drop-down
      :height="62"
      :width="172"
      :show="fontSizeVisibility"
      ref="fontSizeDropDown"
      priorityDirectionVertical="top"
      @hide="fontSizeVisibility=false"
      @mouseleave.native="leaveFontSize"
    >
      <x-number :class="$style.font_size_number" v-model="fontSize"></x-number>
    </x-drop-down>
  </div>
</template>
<script>
import { Material } from 'vue-color';

export default {
  props: {
  },
  data() {
    return {
      colors: '',
      fontSize: 12,
      colorPickerVisibility: false,
      fontSizeVisibility: false,
    };
  },
  watch: {
    colors(val) {
      console.log(val);
      // console.log(window.getSelection());
    }
  },
  methods: {
    setReferenceDom () {
      this.$refs.colorPickerDropDown.open_setReferenceDom(this.$refs.tagColor)
      this.$refs.fontSizeDropDown.open_setReferenceDom(this.$refs.tagfontSize)
    },
    triggerColor() {
      this.colorPickerVisibility = !this.colorPickerVisibility
      this.fontSizeVisibility = false;
    },
    triggerFontSize() {
      this.fontSizeVisibility = !this.fontSizeVisibility;
      this.colorPickerVisibility = false;
    },
    handlerClickoutside() {
      // this.colorPickerVisibility = false;
      // this.fontSizeVisibility = false;
    },
    leaveFontSize(e) {
      if (e.toElement === this.$refs.fontSizeDropDown.$el || this.$refs.fontSizeDropDown.$el.contains(e.toElement)) {
        return;
      }
      this.fontSizeVisibility = false;
    },
    leaveColor(e) {
      if (e.toElement === this.$refs.colorPickerDropDown.$el || this.$refs.colorPickerDropDown.$el.contains(e.toElement)) {
        return;
      }
      this.colorPickerVisibility = false;
    }
  },
  mounted() {
    this.setReferenceDom()
  },
  activated () {
    this.$nextTick(() => {
      this.setReferenceDom()
    })
  },
  components: {
    colorPicker: Material,
  },
};
</script>
<style module lang="scss">
.main{
  width: 100%;
  height: 35px;
  display: flex;
  // margin-bottom: 5px;
  border: 1px solid $border-color-base;
  border-bottom: none;
  border-radius: 4px 4px 0px 0px;
  box-sizing: border-box;
  .item{
    width: 35px;
    height: 100%;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    // overflow: hidden;
    &:hover{
      background: $color-primary-extra-light;
      color: $color-primary-dark;
    }
  }
}
.font_size_number{
  margin: 10px;
}
</style>
