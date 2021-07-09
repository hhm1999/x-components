<template>
  <div :class="classInput" ref="editable" v-html="valueInternal"></div>
</template>
<script>
// import operation from './operation';
import MediumEditor from 'medium-editor';
import color from './color';
import fontSize from './fontSize';
import utils from '../../utils/utils.js'
import 'medium-editor/dist/css/medium-editor.min.css';
import 'medium-editor/dist/css/themes/beagle.min.css';

export default {
  name: 'x-rich-editor',
  formsMark: {
    name: 'x-rich-editor',
    events: [
      'focus',
      'blur',
    ],
  },
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      valueInternal: this.value,
      vwStyleDataKey: undefined,
    }
  },
  methods: {
    // handleMouseleave() {
    //   console.log(window.getSelection());
    //   console.log('handleMouseleave');
    //   const selection = window.getSelection();
    //   const start = selection.anchorOffset;
    //   const end = selection.focusOffset;
    //   console.log(start, end);
    // },
  },
  mounted() {
    document.execCommand('styleWithCSS', true);
    const mediumEditorColor = color(MediumEditor);
    const mediumEditorFontSize = fontSize(MediumEditor);
    this.editor = new MediumEditor(this.$refs.editable, {
      toolbar: {
        buttons: ['bold', 'color', 'fontSize', 'removeFormat']
      },
      extensions: {
        color: new mediumEditorColor(),
        fontSize: new mediumEditorFontSize(),
      },
      placeholder: {
        text: this.placeholder,
      },
      disableEditing: this.disabled,
    });
    this.editor.subscribe('editableInput', () => {
      this.$nextTick(() => {
        const pxVal = this.editor.getContent();
        if (this.$store) {
          const vwVal = pxVal.replace(/font-size: (\S*)px/g, ($0, $1) => {
            return `font-size: ${(parseFloat($1) / 3.75)}vw`
          })
          if (!this.vwStyleDataKey) {
            this.vwStyleDataKey = utils.getUuid();
          }
          this.$store.commit('belugaActiveDesign/vwStyleData', {
            key: this.vwStyleDataKey,
            value: {
              vw: vwVal,
              px: pxVal,
            },
          });
        }
        // const vwVal = pxVal.replace(/font-size: (\S*)px/g, ($0, $1) => {
        //   return `font-size: ${(parseFloat($1) / 3.75)}vw`
        // })
        // if (!this.vwStyleDataKey) {
        //   this.vwStyleDataKey = utils.getUuid();
        // }
        // console.log({
        //   key: this.vwStyleDataKey,
        //   value: {
        //     vw: vwVal,
        //     px: pxVal,
        //   },
        // });
        this.$emit('input', pxVal)
      })
    });
    // this.editor.subscribe('editableInput', function (event, editable) {
    //   console.log(editable);
    // });
    // console.log(this.editor);
  },
  computed: {
    classInput () {
      return {
        [this.$style.content]: true,
        [this.$style.disabled]: this.disabled
      }
    }
  },
  components: {
    // operation,
  },
};
</script>
<style module lang="scss">
.content{
  // background-color: $color-rainbow-5;
  width: 100%;
  height: 90px;
  // border-radius: 4px;
  // color: @color-white;
  // text-align: center;
  background-color: $color-white;
  border: 1px solid $border-color-base;
  padding: 6px 10px;
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  &:hover{
    border-color: $color-primary-lighter;
  }
  &:focus {
    border-color: $color-primary !important;
  }
  &.disabled{
    background-color: $background-color-base;
    border-color: $border-color-light;
    color: $color-text-placeholder;
    cursor: not-allowed;
  }
}
</style>
