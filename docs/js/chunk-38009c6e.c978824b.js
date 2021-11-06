(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-38009c6e"],{"393f":function(e,s,n){"use strict";var t=n("6820"),a=n.n(t);n.d(s,"default",(function(){return a.a}))},6820:function(e,s,n){var t=n("d48c");"string"===typeof t&&(t=[[e.i,t,""]]),t.locals&&(e.exports=t.locals);var a=n("85cb").default;a("ac61384e",t,!0,{sourceMap:!1,shadowMode:!1})},"771e":function(e,s,n){"use strict";n.r(s);var t=function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("div",[e._m(0),n("vueMarkdownLoaderDemoContainer",[n("template",{slot:"component"},[n("vue_markdown_loader_component_debris_0")],1),n("template",{slot:"code"},[n("div",{pre:!0},[n("pre",[n("code",{pre:!0,attrs:{class:"language-html"}},[e._v('<template>\n  <div :class="$style.main">\n    <x-btn @click="normalMessage" :class="$style.btn" type="primary">普通提示</x-btn>\n    <x-btn @click="successMessage" :class="$style.btn" type="success">完成提示</x-btn>\n    <x-btn @click="warningMessage" :class="$style.btn" type="warning">警告提示</x-btn>\n    <x-btn @click="dangerMessage" :class="$style.btn" type="danger">错误提示</x-btn>\n    </br>\n    <x-btn @click="durationMessage" :class="$style.btn">自定义显示时间</x-btn>\n    <x-btn @click="closeMessage" :class="$style.btn">显示关闭图标</x-btn>\n    <x-btn @click="noAutoCloseMessage" :class="$style.btn">不自动关闭</x-btn>\n  </div>\n  </div>\n</template>\n<script>\nexport default {\n  methods: {\n    normalMessage () {\n      this.$message(\'普通提示\')\n    },\n    successMessage () {\n      this.$message({\n        type: \'success\',\n        message: \'成功提示\'\n      })\n    },\n    warningMessage () {\n      this.$message({\n        type: \'warning\',\n        message: \'警告提示\'\n      })\n    },\n    dangerMessage () {\n      this.$message({\n        type: \'error\',\n        message: \'错误提示\'\n      })\n    },\n    durationMessage () {\n      this.$message({\n        type: \'success\',\n        message: \'这个提示5秒才会消失\',\n        duration: 5000\n      })\n    },\n    closeMessage () {\n      this.$message({\n        type: \'success\',\n        message: \'点击右侧图标可提前关闭消息\',\n        showClose: true\n      })\n    },\n    noAutoCloseMessage () {\n      this.$message({\n        type: \'success\',\n        message: \'不自动消失的消息，点击右侧图标可关闭\',\n        showClose: true,\n        duration: 0\n      })\n    }\n  }\n}\n<\/script>\n<style module lang="scss">\n.main{\n  .btn{\n    margin: 0 20px 20px 0;\n  }\n}\n</style>\n')])])])])],2),e._m(1)],1)},a=[function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("div",{staticClass:"vue-markdown-loader_markdown"},[n("h3",[e._v("message 消息提示")]),n("p",[e._v("各种风格的消息提示。")]),n("h4",[e._v("点击按钮弹出各类提示")])])},function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("div",{staticClass:"vue-markdown-loader_markdown"},[n("div",{staticClass:"warning"},[n("p",[e._v("x-components 会在Vue全局注入"),n("code",[e._v("$message")]),e._v("方法，在Vue实例内可直接采用 "),n("code",[e._v("this.$message()")]),e._v("的方法调用。")])]),n("h4",[e._v("drag 属性")]),n("table",[n("thead",[n("tr",[n("th",[e._v("参数")]),n("th",[e._v("说明")]),n("th",[e._v("类型")]),n("th",[e._v("可选值")]),n("th",[e._v("默认值")])])]),n("tbody",[n("tr",[n("td",[e._v("type")]),n("td",[e._v("消息的风格类型")]),n("td",[e._v("string")]),n("td",[e._v("info / success / warning / error")]),n("td",[e._v("info")])]),n("tr",[n("td",[e._v("message")]),n("td",[e._v("消息内容")]),n("td",[e._v("string")]),n("td",[e._v("--")]),n("td",[e._v("--")])]),n("tr",[n("td",[e._v("duration")]),n("td",[e._v("显示时间，单位毫秒，该值为0时消息不自动消失")]),n("td",[e._v("number")]),n("td",[e._v("--")]),n("td",[e._v("3000")])]),n("tr",[n("td",[e._v("showClose")]),n("td",[e._v("是否显示关闭图标按钮")]),n("td",[e._v("boolean")]),n("td",[e._v("--")]),n("td",[e._v("false")])])])])])}],c=function(){var e=this,s=e.$createElement,n=e._self._c||s;return n("div",{class:e.$style.main},[n("x-btn",{class:e.$style.btn,attrs:{type:"primary"},on:{click:e.normalMessage}},[e._v("普通提示")]),n("x-btn",{class:e.$style.btn,attrs:{type:"success"},on:{click:e.successMessage}},[e._v("完成提示")]),n("x-btn",{class:e.$style.btn,attrs:{type:"warning"},on:{click:e.warningMessage}},[e._v("警告提示")]),n("x-btn",{class:e.$style.btn,attrs:{type:"danger"},on:{click:e.dangerMessage}},[e._v("错误提示")]),n("br"),n("x-btn",{class:e.$style.btn,on:{click:e.durationMessage}},[e._v("自定义显示时间")]),n("x-btn",{class:e.$style.btn,on:{click:e.closeMessage}},[e._v("显示关闭图标")]),n("x-btn",{class:e.$style.btn,on:{click:e.noAutoCloseMessage}},[e._v("不自动关闭")])],1)},l=[],o={methods:{normalMessage:function(){this.$message("普通提示")},successMessage:function(){this.$message({type:"success",message:"成功提示"})},warningMessage:function(){this.$message({type:"warning",message:"警告提示"})},dangerMessage:function(){this.$message({type:"error",message:"错误提示"})},durationMessage:function(){this.$message({type:"success",message:"这个提示5秒才会消失",duration:5e3})},closeMessage:function(){this.$message({type:"success",message:"点击右侧图标可提前关闭消息",showClose:!0})},noAutoCloseMessage:function(){this.$message({type:"success",message:"不自动消失的消息，点击右侧图标可关闭",showClose:!0,duration:0})}}},_=o,r=n("393f"),i=n("5d22");function g(e){this["$style"]=r["default"].locals||r["default"]}var m=Object(i["a"])(_,c,l,!1,g,null,null),d=m.exports,u={components:{vue_markdown_loader_component_debris_0:d}},v=u,p=Object(i["a"])(v,t,a,!1,null,null,null);s["default"]=p.exports},d48c:function(e,s,n){var t=n("a1a8");s=t(!1),s.push([e.i,'.message__0_c_ellipsis_2JM3X{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.message__0_c_noselect_3D1XC{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.message__0_c_cf_1h-zG{*zoom:1}.message__0_c_cf_1h-zG:after,.message__0_c_cf_1h-zG:before{display:table;content:"";line-height:0}.message__0_c_cf_1h-zG:after{clear:both}.message__0_main_Ky_S7 .message__0_btn_1myI4{margin:0 20px 20px 0}',""]),s.locals={c_ellipsis:"message__0_c_ellipsis_2JM3X",c_noselect:"message__0_c_noselect_3D1XC",c_cf:"message__0_c_cf_1h-zG",main:"message__0_main_Ky_S7",btn:"message__0_btn_1myI4"},e.exports=s}}]);