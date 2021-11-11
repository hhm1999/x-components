<script>
// import utils from '../utils/utils.js'
export default {
  name: 'x-tab-pane',
  render(createElement) {
    const items = [];
    for (let i = 0; i < this.panes.length; i++) {
      const name = this.panes[i].name
      items.push(createElement(
        'div',
        {
          class: this.classItems(name),
          key: name,
          on: {
            click: () => {
              this.handlerBarClick(name)
            },
          },
        },
        [
          this.panes[i].$slots.label || this.panes[i].label,
        ],
      ))
    }
    return createElement(
      'div',
      {
        class: {
          [this.$style.main]: true,
        },
        style: this.styleMain,
      },
      items,
    )
  },
  props: {
    panes: {
      type: Array,
      default () {
        return null
      }
    },
    currentName: {
      type: [String, Number],
      default: null
    },
    height: {
      type: Number,
      default: 40
    },
    align: {
      type: String,
      default: 'initial'
    }
  },
  data () {
    return {
    }
  },
  created () {
  },
  computed: {
    styleMain () {
      return {
        height: this.height + 'px',
        lineHeight: this.height + 'px',
        textAlign: this.align
      }
    }
  },
  methods: {
    handlerBarClick (paneName) {
      this.$emit('switch', paneName)
    },
    classItems (paneName) {
      return {
        [this.$style.items]: true,
        [this.$style.on]: this.currentName === paneName
      }
    }
  },
  components: {
  }
}
</script>
<style module lang="scss">
.main{
  box-sizing: border-box;
  border-bottom: 1px solid $border-color-light;
  color: $color-text-regular;
  font-size: 14px;
  .items{
    // color: $color-text-primary;
    font-weight: $bold-weight;
    height: 100%;
    // height: 40px;
    // line-height: 40px;
    display: inline-block;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    &.on{
      color: $color-primary;
      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 2px;
        background-color: $color-primary;
        z-index: 1;
      }
    }
  }
}
</style>
