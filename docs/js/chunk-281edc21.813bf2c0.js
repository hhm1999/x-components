(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-281edc21"],{"0506":function(e,t,l){var n=l("a1a8");t=n(!1),t.push([e.i,'.select__1_c_ellipsis_2EEg7{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.select__1_c_noselect_1C34W{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select__1_c_cf_1AwPr{*zoom:1}.select__1_c_cf_1AwPr:after,.select__1_c_cf_1AwPr:before{display:table;content:"";line-height:0}.select__1_c_cf_1AwPr:after{clear:both}.select__1_loading_tip_ObO5X{height:140px;text-align:center}.select__1_loading_tip_ObO5X .select__1_spin_14UXr{margin-top:50px}.select__1_main_2P-MH{width:300px}',""]),t.locals={c_ellipsis:"select__1_c_ellipsis_2EEg7",c_noselect:"select__1_c_noselect_1C34W",c_cf:"select__1_c_cf_1AwPr",loading_tip:"select__1_loading_tip_ObO5X",spin:"select__1_spin_14UXr",main:"select__1_main_2P-MH"},e.exports=t},"2bac":function(e,t,l){var n=l("a1a8");t=n(!1),t.push([e.i,'.select__0_c_ellipsis_2Qc-N{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.select__0_c_noselect_2mX_L{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select__0_c_cf_2crXN{*zoom:1}.select__0_c_cf_2crXN:after,.select__0_c_cf_2crXN:before{display:table;content:"";line-height:0}.select__0_c_cf_2crXN:after{clear:both}.select__0_main_mIkHg{width:300px}',""]),t.locals={c_ellipsis:"select__0_c_ellipsis_2Qc-N",c_noselect:"select__0_c_noselect_2mX_L",c_cf:"select__0_c_cf_2crXN",main:"select__0_main_mIkHg"},e.exports=t},"46cd":function(e,t,l){var n=l("0506");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var s=l("85cb").default;s("694cc50b",n,!0,{sourceMap:!1,shadowMode:!1})},"7a49":function(e,t,l){"use strict";var n=l("8712"),s=l.n(n);l.d(t,"default",(function(){return s.a}))},"82d4":function(e,t,l){var n=l("9de4");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var s=l("85cb").default;s("4324a9cd",n,!0,{sourceMap:!1,shadowMode:!1})},8712:function(e,t,l){var n=l("2bac");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var s=l("85cb").default;s("e1163f6e",n,!0,{sourceMap:!1,shadowMode:!1})},"9de4":function(e,t,l){var n=l("a1a8");t=n(!1),t.push([e.i,'.select__2_c_ellipsis_fDpwX{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.select__2_c_noselect_DFSlk{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.select__2_c_cf_3Wb0B{*zoom:1}.select__2_c_cf_3Wb0B:after,.select__2_c_cf_3Wb0B:before{display:table;content:"";line-height:0}.select__2_c_cf_3Wb0B:after{clear:both}.select__2_tip_17gI4{height:140px;text-align:center}.select__2_tip_17gI4 .select__2_text_v3w8G{height:135px;line-height:140px;color:#909399;font-size:14px}.select__2_tip_17gI4 .select__2_spin_2YHMw{margin-top:50px}.select__2_main_2M743{width:300px}',""]),t.locals={c_ellipsis:"select__2_c_ellipsis_fDpwX",c_noselect:"select__2_c_noselect_DFSlk",c_cf:"select__2_c_cf_3Wb0B",tip:"select__2_tip_17gI4",text:"select__2_text_v3w8G",spin:"select__2_spin_2YHMw",main:"select__2_main_2M743"},e.exports=t},a28f:function(e,t,l){"use strict";var n=l("82d4"),s=l.n(n);l.d(t,"default",(function(){return s.a}))},a2c0:function(e,t,l){"use strict";l.r(t);var n=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[e._m(0),l("vueMarkdownLoaderDemoContainer",[l("template",{slot:"component"},[l("vue_markdown_loader_component_debris_0")],1),l("template",{slot:"code"},[l("div",{pre:!0},[l("pre",[l("code",{pre:!0,attrs:{class:"language-html"}},[e._v('<template>\n  <div :class="$style.main">\n    <p class="c_title">基础</p>\n    <x-select placeholder="请选择" v-model="valueBasis">\n      <x-select-option\n        :disabled="item.disabled"\n        :value="item.value"\n        v-for="item in options"\n        :key="item.value"\n      >\n        {{ item.label }}\n      </x-select-option>\n    </x-select>\n    <p class="c_title">多选</p>\n    <x-select multiple v-model="valueMultiple">\n      <x-select-option\n        :disabled="item.disabled"\n        :value="item.value"\n        v-for="item in options"\n        :key="item.value"\n      >\n        {{ item.label }}\n      </x-select-option>\n    </x-select>\n    <p class="c_title">可搜索</p>\n    <x-select search v-model="valueSearch">\n      <x-select-option\n        :disabled="item.disabled"\n        :value="item.value"\n        v-for="item in options"\n        :key="item.value"\n      >\n        {{ item.label }}\n      </x-select-option>\n    </x-select>\n    <p class="c_title" @click="multiple=true">数据版</p>\n    <x-select :multiple="multiple" :options="options" v-model="valueDatas">\n    </x-select>\n  </div>\n</template>\n<script>\nexport default {\n   data () {\n    return {\n      valueMultiple: [ 1, 3 ],\n      valueBasis: 2,\n      valueSearch: 3,\n      valueDatas: null,\n      multiple: false,\n      options: [\n        {\n          label: \'选项1\',\n          value: 1\n        },\n        {\n          label: \'选项2\',\n          value: 2\n        },\n        {\n          label: \'选项3\',\n          value: 3\n        },\n        {\n          label: \'选项4\',\n          value: 4\n        }\n      ]\n    }\n  },\n}\n<\/script>\n<style module lang="scss">\n.main{\n  width: 300px;\n}\n</style>\n')])])])])],2),e._m(1),l("vueMarkdownLoaderDemoContainer",[l("template",{slot:"component"},[l("vue_markdown_loader_component_debris_1")],1),l("template",{slot:"code"},[l("div",{pre:!0},[l("pre",[l("code",{pre:!0,attrs:{class:"language-html"}},[e._v('<template>\n  <div :class="$style.main">\n    <x-select :label-init="labelInit" @drop-down-visibility-change="handlerDropDownVisibilityChange" v-model="valueBasis">\n      <x-select-option\n        :disabled="item.disabled"\n        :value="item.value"\n        v-for="item in options"\n        :key="item.value"\n      >\n        {{ item.label }}\n      </x-select-option>\n      <div v-if="isLoading" :class="$style.loading_tip"><x-spin :size="30" :class="$style.spin"></x-spin></div>\n    </x-select>\n  </div>\n</template>\n<script>\nexport default {\n  data () {\n    return {\n      valueBasis: 4,\n      labelInit: \'惰性加载选项4\',\n      options: [],\n      isFirstShow: true,\n      isLoading: true\n    }\n  },\n  methods: {\n    handlerDropDownVisibilityChange (visibility) {\n      if (this.isFirstShow) {\n        this.isFirstShow = false\n        setTimeout(() => {\n          for (let i = 0; i < 12; i++) {\n            this.options.push({\n              label: \'惰性加载选项\' + i,\n              value: i,\n            })\n          }\n          this.isLoading = false\n        }, 1000)\n      }\n    }\n  }\n}\n<\/script>\n<style module lang="scss">\n.loading_tip{\n  height: 140px;\n  text-align: center;\n  .spin{\n    margin-top: 50px;\n  }\n}\n.main{\n  width: 300px;\n}\n</style>\n')])])])])],2),e._m(2),l("vueMarkdownLoaderDemoContainer",[l("template",{slot:"component"},[l("vue_markdown_loader_component_debris_2")],1),l("template",{slot:"code"},[l("div",{pre:!0},[l("pre",[l("code",{pre:!0,attrs:{class:"language-html"}},[e._v('<template>\n  <div :class="$style.main">\n    <x-select\n      :label-init="labelInit"\n      @search-key-change="handlerSearchKeyChange"\n      search\n      v-model="valueBasis"\n    >\n      <x-select-option\n        :disabled="item.disabled"\n        :value="item.value"\n        v-for="item in options"\n        :key="item.value"\n      >\n        {{ item.label }}\n      </x-select-option>\n      <div v-show="isShowTipText || isLoading" :class="$style.tip">\n        <div v-show="isShowTipText" :class="$style.text">{{ tipText }}</div>\n        <x-spin v-show="isLoading" :size="30" :class="$style.spin"></x-spin>\n      </div>\n    </x-select>\n  </div>\n</template>\n<script>\nexport default {\n  data () {\n    return {\n      valueBasis: 4,\n      labelInit: \'惰性加载选项4\',\n      options: [],\n      isShowTipText: true,\n      isLoading: false,\n      tipText: \'请输入关键字搜索\'\n    }\n  },\n  methods: {\n    handlerSearchKeyChange (key) {\n      this.options.splice(0, this.options.length)\n      this.isLoading = true\n      this.isShowTipText = false\n      setTimeout(() => {\n        for (let i = 0; i < 12; i++) {\n          this.options.push({\n            label: key + \'@惰性加载选项\' + i,\n            value: i + key,\n          })\n        }\n        this.isLoading = false\n      }, 1000)\n    }\n  }\n}\n<\/script>\n<style module lang="scss">\n.tip{\n  height: 140px;\n  text-align: center;\n  .text{\n    height: 135px;\n    line-height: 140px;\n    color: #909399;\n    font-size: 14px;\n  }\n  .spin{\n    margin-top: 50px;\n  }\n}\n.main{\n  width: 300px;\n}\n</style>\n')])])])])],2),e._m(3)],1)},s=[function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"vue-markdown-loader_markdown"},[l("h3",[e._v("select 选择器")]),l("p",[e._v("支持多选、搜索等功能的选择器。")]),l("h4",[e._v("基础用法")])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"vue-markdown-loader_markdown"},[l("h4",[e._v("惰性加载选项数据")])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"vue-markdown-loader_markdown"},[l("h4",[e._v("远程搜索数据")])])},function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"vue-markdown-loader_markdown"},[l("h4",[e._v("x-select 属性")]),l("table",[l("thead",[l("tr",[l("th",[e._v("参数")]),l("th",[e._v("说明")]),l("th",[e._v("类型")]),l("th",[e._v("可选值")]),l("th",[e._v("默认值")])])]),l("tbody",[l("tr",[l("td",[e._v("value")]),l("td",[e._v("选中项绑定值")]),l("td",[e._v("--")]),l("td",[e._v("--")]),l("td",[e._v("--")])]),l("tr",[l("td",[e._v("search")]),l("td",[e._v("是否支持搜索")]),l("td",[e._v("boolean")]),l("td",[e._v("--")]),l("td",[e._v("false")])]),l("tr",[l("td",[e._v("multiple")]),l("td",[e._v("是否支持多选")]),l("td",[e._v("boolean")]),l("td",[e._v("--")]),l("td",[e._v("false")])]),l("tr",[l("td",[e._v("disabled")]),l("td",[e._v("是否禁用")]),l("td",[e._v("boolean")]),l("td",[e._v("--")]),l("td",[e._v("false")])]),l("tr",[l("td",[e._v("drop-down-width")]),l("td",[e._v("选项下拉框宽度")]),l("td",[e._v("number")]),l("td",[e._v("string")]),l("td",[e._v("--")])]),l("tr",[l("td",[e._v("label-init")]),l("td",[e._v("惰性加载状态或远程搜索因为没有初始选项数据所以无法自动获取标签值，所以需要这个参数")]),l("td",[e._v("--")]),l("td",[e._v("--")]),l("td",[e._v("--")])]),l("tr",[l("td",[e._v("placeholder")]),l("td",[e._v("输入框提示文字")]),l("td",[e._v("string")]),l("td",[e._v("--")]),l("td",[e._v("请选择")])])])]),l("h4",[e._v("x-select 事件")]),l("table",[l("thead",[l("tr",[l("th",[e._v("事件名称")]),l("th",[e._v("说明")]),l("th",[e._v("回调参数")])])]),l("tbody",[l("tr",[l("td",[e._v("drop-down-visibility-change")]),l("td",[e._v("下拉框可见状态发生改变时触发")]),l("td",[l("code",[e._v("visibility")]),e._v("下拉框是否可见")])]),l("tr",[l("td",[e._v("search-key-change")]),l("td",[e._v("远程搜索状态下输入框输入的关键字变化时回调")]),l("td",[l("code",[e._v("key")]),e._v("用户输入的关键字")])])])]),l("h4",[e._v("x-select-option 属性")]),l("table",[l("thead",[l("tr",[l("th",[e._v("参数")]),l("th",[e._v("说明")]),l("th",[e._v("类型")]),l("th",[e._v("可选值")]),l("th",[e._v("默认值")])])]),l("tbody",[l("tr",[l("td",[e._v("value")]),l("td",[e._v("选中项的值")]),l("td",[e._v("--")]),l("td",[e._v("--")]),l("td",[e._v("--")])]),l("tr",[l("td",[e._v("disabled")]),l("td",[e._v("是否禁用")]),l("td",[e._v("boolean")]),l("td",[e._v("--")]),l("td",[e._v("false")])])])])])}],i=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{class:e.$style.main},[l("p",{staticClass:"c_title"},[e._v("基础")]),l("x-select",{attrs:{placeholder:"请选择"},model:{value:e.valueBasis,callback:function(t){e.valueBasis=t},expression:"valueBasis"}},e._l(e.options,(function(t){return l("x-select-option",{key:t.value,attrs:{disabled:t.disabled,value:t.value}},[e._v(" "+e._s(t.label)+" ")])})),1),l("p",{staticClass:"c_title"},[e._v("多选")]),l("x-select",{attrs:{multiple:""},model:{value:e.valueMultiple,callback:function(t){e.valueMultiple=t},expression:"valueMultiple"}},e._l(e.options,(function(t){return l("x-select-option",{key:t.value,attrs:{disabled:t.disabled,value:t.value}},[e._v(" "+e._s(t.label)+" ")])})),1),l("p",{staticClass:"c_title"},[e._v("可搜索")]),l("x-select",{attrs:{search:""},model:{value:e.valueSearch,callback:function(t){e.valueSearch=t},expression:"valueSearch"}},e._l(e.options,(function(t){return l("x-select-option",{key:t.value,attrs:{disabled:t.disabled,value:t.value}},[e._v(" "+e._s(t.label)+" ")])})),1),l("p",{staticClass:"c_title",on:{click:function(t){e.multiple=!0}}},[e._v("数据版")]),l("x-select",{attrs:{multiple:e.multiple,options:e.options},model:{value:e.valueDatas,callback:function(t){e.valueDatas=t},expression:"valueDatas"}})],1)},a=[],o={data:function(){return{valueMultiple:[1,3],valueBasis:2,valueSearch:3,valueDatas:null,multiple:!1,options:[{label:"选项1",value:1},{label:"选项2",value:2},{label:"选项3",value:3},{label:"选项4",value:4}]}}},c=o,_=l("7a49"),r=l("5d22");function d(e){this["$style"]=_["default"].locals||_["default"]}var v=Object(r["a"])(c,i,a,!1,d,null,null),u=v.exports,p=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{class:e.$style.main},[l("x-select",{attrs:{"label-init":e.labelInit},on:{"drop-down-visibility-change":e.handlerDropDownVisibilityChange},model:{value:e.valueBasis,callback:function(t){e.valueBasis=t},expression:"valueBasis"}},[e._l(e.options,(function(t){return l("x-select-option",{key:t.value,attrs:{disabled:t.disabled,value:t.value}},[e._v(" "+e._s(t.label)+" ")])})),e.isLoading?l("div",{class:e.$style.loading_tip},[l("x-spin",{class:e.$style.spin,attrs:{size:30}})],1):e._e()],2)],1)},h=[],m={data:function(){return{valueBasis:4,labelInit:"惰性加载选项4",options:[],isFirstShow:!0,isLoading:!0}},methods:{handlerDropDownVisibilityChange:function(e){var t=this;this.isFirstShow&&(this.isFirstShow=!1,setTimeout((function(){for(var e=0;e<12;e++)t.options.push({label:"惰性加载选项"+e,value:e});t.isLoading=!1}),1e3))}}},f=m,b=l("aedb");function x(e){this["$style"]=b["default"].locals||b["default"]}var w=Object(r["a"])(f,p,h,!1,x,null,null),g=w.exports,y=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{class:e.$style.main},[l("x-select",{attrs:{"label-init":e.labelInit,search:""},on:{"search-key-change":e.handlerSearchKeyChange},model:{value:e.valueBasis,callback:function(t){e.valueBasis=t},expression:"valueBasis"}},[e._l(e.options,(function(t){return l("x-select-option",{key:t.value,attrs:{disabled:t.disabled,value:t.value}},[e._v(" "+e._s(t.label)+" ")])})),l("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowTipText||e.isLoading,expression:"isShowTipText || isLoading"}],class:e.$style.tip},[l("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowTipText,expression:"isShowTipText"}],class:e.$style.text},[e._v(e._s(e.tipText))]),l("x-spin",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],class:e.$style.spin,attrs:{size:30}})],1)],2)],1)},k=[],S=(l("3cb3"),{data:function(){return{valueBasis:4,labelInit:"惰性加载选项4",options:[],isShowTipText:!0,isLoading:!1,tipText:"请输入关键字搜索"}},methods:{handlerSearchKeyChange:function(e){var t=this;this.options.splice(0,this.options.length),this.isLoading=!0,this.isShowTipText=!1,setTimeout((function(){for(var l=0;l<12;l++)t.options.push({label:e+"@惰性加载选项"+l,value:l+e});t.isLoading=!1}),1e3)}}}),T=S,$=l("a28f");function B(e){this["$style"]=$["default"].locals||$["default"]}var L=Object(r["a"])(T,y,k,!1,B,null,null),C=L.exports,D={components:{vue_markdown_loader_component_debris_0:u,vue_markdown_loader_component_debris_1:g,vue_markdown_loader_component_debris_2:C}},M=D,I=Object(r["a"])(M,n,s,!1,null,null,null);t["default"]=I.exports},aedb:function(e,t,l){"use strict";var n=l("46cd"),s=l.n(n);l.d(t,"default",(function(){return s.a}))}}]);