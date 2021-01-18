<template>
  <svg class="x-spin-circular" :style="styleCircular" :viewBox="viewBox">
    <circle class="path" :style="pathStyle" :cx="size" :cy="size" :r="radius" fill="none" />
  </svg>
</template>
<script>
import scssVariable from '../assets/css/variableJs.scss'
export default {
  name: 'x-spin',
  props: {
    size: {
      type: Number,
      default: 42
    },
    type: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      pathStrokeDasharray: null,
      pathStrokeDashoffset: null
    }
  },
  created () {
    // console.log('周长: ' + (Math.PI * this.radius * 2))
    // console.log('周长3/4: ' + (Math.PI * this.radius * 2) * (3/4))
    // console.log('周长1/4: ' + (Math.PI * this.radius * 2) * (1/4))
    this.createKeyframes()
  },
  computed: {
    radius () {
      return this.size / 2 - 2
    },
    perimeter () {
      return Math.PI * this.radius * 2
    },
    styleCircular () {
      return {
        height: this.size + 'px',
        width: this.size + 'px'
      }
    },
    viewBox () {
      return this.size / 2 + ' ' + this.size / 2 + ' ' + this.size + ' ' + this.size
    },
    pathStyle () {
      let stroke = scssVariable.colorPrimary
      if (this.type === 'gray') {
        stroke = scssVariable.colorTextPlaceholder
      }
      return {
        'stroke-dasharray': this.pathStrokeDasharray,
        'stroke-dashoffset': this.pathStrokeDashoffset,
        'stroke': stroke,
        'animation': 'x-spin-dash' + this.size + ' 1.5s ease-in-out infinite'
      }
    }
  },
  methods: {
    createKeyframes () {
      // var proportion = Math.PI * this.size
      // var reference = Math.PI * 42
      // var strokeDasharray0 = '1,' + (proportion / reference * 200)
      // var strokeDasharray50AndTo = (proportion / reference * 90) + ',' + (proportion / reference * 150)
      // var strokeDashoffset50 = (proportion / reference * 40)
      // var strokeDashoffsetTo = (proportion / reference * 120)
      // 0% {
      //   stroke-dasharray: ${strokeDasharray0};
      //   stroke-dashoffset: 0;
      // }
      // 50% {
      //   stroke-dasharray: ${strokeDasharray50AndTo};
      //   stroke-dashoffset: -${strokeDashoffset50}px;
      // }
      // to {
      //   stroke-dasharray: ${strokeDasharray50AndTo};
      //   stroke-dashoffset: -${strokeDashoffsetTo}px;
      // }
      var strokeDasharray0 = '1,' + this.perimeter
      var strokeDashoffset0 = 0
      var strokeDasharray50 = this.perimeter * (3 / 4) + ',' + this.perimeter * (1 / 4)
      var strokeDashoffset50 = this.perimeter * (1 / 4)
      var strokeDasharrayTo = this.perimeter * (3 / 4) + ',' + this.perimeter
      var strokeDashoffsetTo = this.perimeter - 1
      const runkeyframes =` @keyframes x-spin-dash${this.size}{
        0% {
          stroke-dasharray: ${strokeDasharray0};
          stroke-dashoffset: ${strokeDashoffset0};
        }
        50% {
          stroke-dasharray: ${strokeDasharray50};
          stroke-dashoffset: -${strokeDashoffset50}px;
        }
        to {
          stroke-dasharray: ${strokeDasharrayTo};
          stroke-dashoffset: -${strokeDashoffsetTo}px;
        }
      }`
      const style = document.createElement('style')
      style.type = 'text/css'
      style.innerHTML = runkeyframes
      document.getElementsByTagName('head')[0].appendChild(style)
      this.pathStrokeDasharray = strokeDasharray50
      this.pathStrokeDashoffset = strokeDashoffset50
    }
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
.x-spin-circular{
  display: inline-block;
  animation: x-spin-rotate 2s linear infinite;
  .path{
    stroke-width: 2;
    stroke-linecap: round;
  }
}
@keyframes x-spin-rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>
