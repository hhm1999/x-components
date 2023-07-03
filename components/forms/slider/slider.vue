<template>
  <div :class="$style.main" ref="main">
    <div :class="$style.line_bg">
      <div :class="classLine" :style="lineStyle"></div>
    </div>
    <div :class="classBar" :style="barStyle" ref="bar"></div>
  </div>
</template>
<script>
export default {
  name: 'x-slider',
  formsMark: {
    name: 'x-slider',
    events: [
      'focus',
      'blur'
    ]
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      pageY: 0,
      barLeft: 0,
      isMoveing: false,
    }
  },
  created () {
  },
  mounted() {
    window.addEventListener('mouseup', () => {
      document.body.removeEventListener('mousemove', this.mouseover);
      this.isMoveing = false;
      this.$emit('up');
    });
    this.$refs.bar.addEventListener('mousedown', (e) => {
      this.pageX = e.pageX;
      this.pageY = e.pageY;
      this.barLeftStart = this.barLeft;
      this.maxWidth = this.$refs.main.offsetWidth - 18;
      this.isMoveing = true;
      document.body.addEventListener('mousemove', this.mouseover);
    });
    this.maxWidth = this.$refs.main.offsetWidth - 18;
    this.calculateBarLeft();
  },
  watch: {
    value () {
      this.calculateBarLeft();
    },
    min() {
      this.calculateBarLeft();
    },
    max() {
      this.calculateBarLeft();
    },
    barLeft () {
    },
  },
  computed: {
    classBar() {
      return {
        [this.$style.bar]: true,
        [this.$style.process]: !this.isMoveing,
      }
    },
    classLine() {
      return {
        [this.$style.line]: true,
        [this.$style.process]: !this.isMoveing,
      }
    },
    classMain() {
      return {
        [this.$style.main]: true,
        [this.$style.disabled]: this.disabled
      }
    },
    barStyle() {
      return {
        left: `${this.barLeft}px`,
      }
    },
    lineStyle() {
      return {
        left: `${this.barLeft}px`,
      }
    },
  },
  methods: {
    calculateBarLeft() {
      const value = this.value;
      this.barLeft = (value - this.min) / (this.max - this.min) * this.maxWidth;
    },
    mouseover(e) {
      e.preventDefault();
      const left = this.barLeftStart + (e.pageX - this.pageX);
      if (left <= this.maxWidth && left >= 0) {
        this.barLeft = left;
      } else {
        if (left > this.maxWidth) {
          this.barLeft = this.maxWidth;
        } else if (left < 0) {
          this.barLeft = 0;
        }
      }
      const value = (this.barLeft / this.maxWidth) * (this.max - this.min) + this.min;
      this.$emit('input', parseInt(value));
    },
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  width: 100%;
  position: relative;
  height: 18px;
  .bar{
    // cursor: ew-resize;
    position:absolute;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: $color-white;
    box-shadow: $boxShadowFloat;
    left: 0px;
    &.process{
      transition-duration: 0.3s;
    }
  }
  .line_bg{
    width: 100%;
    height: 4px;
    background: #dbdbdf;
    position: absolute;
    top: 7px;
    overflow: hidden;
    .line{
      position: absolute;
      width: 100%;
      height: 4px;
      left: 0px;
      background: $color-primary;
      margin-left: -100%;
      &.process{
        transition-duration: 0.3s;
      }
    }
  }
}
</style>
