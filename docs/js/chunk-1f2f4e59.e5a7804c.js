(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f2f4e59"],{"0a18":function(e,t,l){var a=l("a1a8");t=a(!1),t.push([e.i,'.input__0_c_ellipsis_KCk6-{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.input__0_c_noselect_gk6K4{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.input__0_c_cf_2Hah2{*zoom:1}.input__0_c_cf_2Hah2:after,.input__0_c_cf_2Hah2:before{display:table;content:"";line-height:0}.input__0_c_cf_2Hah2:after{clear:both}.input__0_main_3KzkY{width:300px}',""]),t.locals={c_ellipsis:"input__0_c_ellipsis_KCk6-",c_noselect:"input__0_c_noselect_gk6K4",c_cf:"input__0_c_cf_2Hah2",main:"input__0_main_3KzkY"},e.exports=t},"3cc4":function(e,t,l){var a=l("0a18");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var n=l("5925").default;n("61e27f0a",a,!0,{sourceMap:!1,shadowMode:!1})},7212:function(e,t,l){"use strict";l.r(t);var a=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[e._m(0),l("vueMarkdownLoaderDemoContainer",[l("template",{slot:"component"},[l("vue_markdown_loader_component_debris_0")],1),l("template",{slot:"code"},[l("div",{pre:!0},[l("pre",[l("code",{pre:!0,attrs:{class:"language-html"}},[e._v('<template>\n  <div :class="$style.main">\n    <p class="c_title">基础用法</p>\n    <x-input placeholder="请输入" v-model="valueBasis"></x-input>\n    <p class="c_title">小尺寸</p>\n    <x-input size="small" v-model="valueSmall"></x-input>\n    <p class="c_title">迷你尺寸</p>\n    <x-input size="mini" v-model="valueMini"></x-input>\n    <p class="c_title">只读</p>\n    <x-input readonly v-model="valueDisabled"></x-input>\n    <p class="c_title">禁用</p>\n    <x-input disabled v-model="valueDisabled"></x-input>\n  </div>\n</template>\n<script>\nexport default {\n  data () {\n    return {\n      valueBasis: \'\',\n      valueSmall: \'small\',\n      valueMini: \'mini\',\n      valueReadonly: \'readonly\',\n      valueDisabled: \'不可修改\',\n    }\n  }\n}\n<\/script>\n<style module lang="scss">\n.main{\n  width: 300px;\n}\n</style>\n')])])])])],2),e._m(1)],1)},n=[function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"vue-markdown-loader_markdown"},[l("h3",[e._v("input 输入框")]),l("p",[e._v("input 输入框。")])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"vue-markdown-loader_markdown"},[l("h4",[e._v("x-checkbox 属性")]),l("table",[l("thead",[l("tr",[l("th",[e._v("参数")]),l("th",[e._v("说明")]),l("th",[e._v("类型")]),l("th",[e._v("可选值")]),l("th",[e._v("默认值")])])]),l("tbody",[l("tr",[l("td",[e._v("v-model")]),l("td",[e._v("输入框内容")]),l("td",[e._v("--")]),l("td",[e._v("--")]),l("td",[e._v("--")])]),l("tr",[l("td",[e._v("size")]),l("td",[e._v("尺寸")]),l("td",[e._v("string")]),l("td",[e._v("default / small / mini")]),l("td",[e._v("default")])]),l("tr",[l("td",[e._v("readonly")]),l("td",[e._v("是否设置为只可读状态")]),l("td",[e._v("boolean")]),l("td",[e._v("--")]),l("td",[e._v("false")])]),l("tr",[l("td",[e._v("disabled")]),l("td",[e._v("是否禁用")]),l("td",[e._v("boolean")]),l("td",[e._v("--")]),l("td",[e._v("false")])]),l("tr",[l("td",[e._v("placeholder")]),l("td",[e._v("输入框提示文字")]),l("td",[e._v("string")]),l("td",[e._v("--")]),l("td",[e._v("请选择")])])])])])}],i=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{class:e.$style.main},[l("p",{staticClass:"c_title"},[e._v("基础用法")]),l("x-input",{attrs:{placeholder:"请输入"},model:{value:e.valueBasis,callback:function(t){e.valueBasis=t},expression:"valueBasis"}}),l("p",{staticClass:"c_title"},[e._v("小尺寸")]),l("x-input",{attrs:{size:"small"},model:{value:e.valueSmall,callback:function(t){e.valueSmall=t},expression:"valueSmall"}}),l("p",{staticClass:"c_title"},[e._v("迷你尺寸")]),l("x-input",{attrs:{size:"mini"},model:{value:e.valueMini,callback:function(t){e.valueMini=t},expression:"valueMini"}}),l("p",{staticClass:"c_title"},[e._v("只读")]),l("x-input",{attrs:{readonly:""},model:{value:e.valueDisabled,callback:function(t){e.valueDisabled=t},expression:"valueDisabled"}}),l("p",{staticClass:"c_title"},[e._v("禁用")]),l("x-input",{attrs:{disabled:""},model:{value:e.valueDisabled,callback:function(t){e.valueDisabled=t},expression:"valueDisabled"}})],1)},s=[],_={data:function(){return{valueBasis:"",valueSmall:"small",valueMini:"mini",valueReadonly:"readonly",valueDisabled:"不可修改"}}},c=_,u=l("9130"),o=l("4ac2");function d(e){this["$style"]=u["default"].locals||u["default"]}var v=Object(o["a"])(c,i,s,!1,d,null,null),r=v.exports,p={components:{vue_markdown_loader_component_debris_0:r}},m=p,f=Object(o["a"])(m,a,n,!1,null,null,null);t["default"]=f.exports},9130:function(e,t,l){"use strict";var a=l("3cc4"),n=l.n(a);l.d(t,"default",(function(){return n.a}))}}]);