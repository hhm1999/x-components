### tooltip-confirm 气泡确认框
用于重要操作的二次确认。

### 基础用法
```html
<template>
  <div :class="$style.main">
    <div :class="$style.top">
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="上左对齐位置 placement=top-start" placement="top-start">
        <x-btn :class="$style.btn">top-start</x-btn>
      </x-tooltip-confirm>
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="正上方位置 placement=top" placement="top">
        <x-btn :class="$style.btn">top</x-btn>
      </x-tooltip-confirm>
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="上右对齐位置 placement=top-end" placement="top-end">
        <x-btn :class="$style.btn">top-end</x-btn>
      </x-tooltip-confirm>
    </div>
    <div :class="$style.left">
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="左上对齐位置placement=left-start" placement="left-start">
        <x-btn :class="$style.btn">left-start</x-btn>
      </x-tooltip-confirm>
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="正左方位置placement=left" placement="left">
        <x-btn :class="$style.btn">left</x-btn>
      </x-tooltip-confirm>
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="左下对齐位置placement=left-end" placement="left-end">
        <x-btn :class="$style.btn">left-end</x-btn>
      </x-tooltip-confirm>
    </div>
     <div :class="$style.right">
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="右上对齐位置placement=right-start" placement="right-start">
        <x-btn :class="$style.btn">left-start</x-btn>
      </x-tooltip-confirm>
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="正右方位置placement=right" placement="right">
        <x-btn :class="$style.btn">left</x-btn>
      </x-tooltip-confirm>
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="右下对齐位置placement=right-end" placement="right-end">
        <x-btn :class="$style.btn">left-end</x-btn>
      </x-tooltip-confirm>
    </div>
    <div :class="$style.bottom">
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="下左对齐位置 placement=bottom-start" placement="bottom-start">
        <x-btn :class="$style.btn">bottom-start</x-btn>
      </x-tooltip-confirm>
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="正下方位置 placement=bottom" placement="bottom">
        <x-btn :class="$style.btn">bottom</x-btn>
      </x-tooltip-confirm>
      <x-tooltip-confirm @confirm="confirm" @cancel="cancel" content="下右对齐位置 placement=bottom-end" placement="bottom-end">
        <x-btn :class="$style.btn">bottom-end</x-btn>
      </x-tooltip-confirm>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    confirm () {
      alert('点击了确认')
    },
    cancel () {
      alert('点击了取消')
    }
  }
}
</script>
<style module lang="scss">
.main{
  .btn {
    margin: 10px;
  }
  .top{
    margin-left: 160px; 
  }
  .left{
    width: 150px;
    float: left;
  }
  .right{
    width: 150px;
    margin-left: 500px; 
    text-align: right;
  }
  .bottom{
    margin-left: 120px; 
  }
  @media screen and (max-width: 900px){
    overflow: hidden;
    .btn {
      margin: 2px;
    }
    .top{
      margin-left: 0px;
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
    }
    .right{
      margin-left: 0px;
      float: right;
    }
    .bottom{
      margin-left: 0px;
      width: 100%;
      text-align: center;
      margin-top: 10px;
      float: left;
    }
  }
}
</style>
```

### 通过slot方式自定义提示框的内容和操作
```html
<template>
  <div>
    <x-tooltip-confirm placement="top-start" :visibility="visibility">
      <div :class="$style.content" slot="content">
        <p :class="$style.text">确认删除吗？该操作不可逆！</p>
        <x-btn @click="confirm" :class="$style.btn" size="small" type="danger">删除</x-btn>
        <x-btn @click="cancel" :class="$style.btn" size="small">取消</x-btn>
      </div>
      <x-btn @click="del" type="danger">删除</x-btn>
    </x-tooltip-confirm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visibility: false
    }
  },
  methods: {
    cancel () {
      this.visibility = false
    },
    confirm () {
      this.visibility = false
    },
    del () {
      this.visibility = true
    }
  }
}
</script>
<style module lang="scss">
.content{
  .text{
    margin-bottom: 8px;
    line-height: 25px;
    font-size: 14px;
  }
  .btn{
    margin-left: 8px;
    float: right;
    margin-bottom: 2px;
  }
}
</style>
```

#### 属性
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| content  | 显示的内容文本 | string  |   -- |    --     |
| placement  | 气泡显示位置 |  number  |  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |    bottom     |
| cancel-btn-text  | 取消按钮的文本 | string  |   -- |    取消     |
| confirm-btn-text  | 确定按钮的文本 | string  |   -- |    确定     |
| cancel-btn-type  | 取消按钮的type | string  |   -- |    default     |
| confirm-btn-type  | 确定按钮的type | string  |   -- |    primary     |
| visibility  |  用于控制提示内容的显示和隐藏，配合`slot#content`，可自定义显示内容和操作逻辑 | boolean  |    --     |  false     |

#### 事件
| 事件名称      | 说明    | 回调参数  |
|---------- |-------- |---------- |
| confirm | 用户点击确定按钮 | --  |
| cancel | 用户点击取消按钮 | --  |

#### slot
| name      | 说明    |
|---------- |-------- |
| --  | 触发提示的目标 |
| content  | 用来显示更加复杂的提示内容 |