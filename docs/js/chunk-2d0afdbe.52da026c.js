(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0afdbe"],{"0fb4":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e._m(0),a("vueMarkdownLoaderDemoContainer",[a("template",{slot:"component"},[a("vue_markdown_loader_component_debris_0")],1),a("template",{slot:"code"},[a("div",{pre:!0},[a("pre",[a("code",{pre:!0,attrs:{class:"language-html"}},[e._v('<template>\n  <div>\n    <p class="c_title">单独使用</p>\n    <x-checkbox v-model="valueSeparate">选项</x-checkbox>\n    <p class="c_title">禁用</p>\n    <x-checkbox disabled v-model="valueDisabled">选项</x-checkbox>\n    <p class="c_title">半选中状态</p>\n    <x-checkbox indeterminate v-model="valueIndeterminate">选项</x-checkbox>\n    <p class="c_title">选项组</p>\n    <x-checkbox-group v-model="valueGroup">\n      <x-checkbox :label="1">\n        选项1\n      </x-checkbox>\n      <x-checkbox :label="2">\n        选项2\n      </x-checkbox>\n      <x-checkbox :label="3">\n        选项3\n      </x-checkbox>\n    </x-checkbox-group>\n    <p class="c_title">选项组-数据版</p>\n    <x-checkbox-group :options="options" v-model="valueData"></x-checkbox-group>\n  </div>\n</template>\n<script>\nexport default {\n  data () {\n    return {\n      valueSeparate: true,\n      valueDisabled: false,\n      valueIndeterminate: true,\n      valueData: [\'Apple\'],\n      valueGroup: [2],\n      options: [\n        { label: \'Apple\', value: \'Apple\' },\n        { label: \'Pear\', value: \'Pear\' },\n        { label: \'Orange\', value: \'Orange\', disabled: true }\n      ]\n    }\n  }\n}\n<\/script>\n')])])])])],2),e._m(1)],1)},n=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vue-markdown-loader_markdown"},[a("h3",[e._v("checkbox 多选框")]),a("p",[e._v("多选框。")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vue-markdown-loader_markdown"},[a("h4",[e._v("x-checkbox 属性")]),a("table",[a("thead",[a("tr",[a("th",[e._v("参数")]),a("th",[e._v("说明")]),a("th",[e._v("类型")]),a("th",[e._v("可选值")]),a("th",[e._v("默认值")])])]),a("tbody",[a("tr",[a("td",[e._v("v-model")]),a("td",[e._v("选中项的值")]),a("td",[e._v("array")]),a("td",[e._v("--")]),a("td",[e._v("--")])]),a("tr",[a("td",[e._v("disabled")]),a("td",[e._v("是否禁用")]),a("td",[e._v("boolean")]),a("td",[e._v("--")]),a("td",[e._v("false")])]),a("tr",[a("td",[e._v("indeterminate")]),a("td",[e._v("半选中状态")]),a("td",[e._v("boolean")]),a("td",[e._v("--")]),a("td",[e._v("false")])]),a("tr",[a("td",[e._v("label")]),a("td",[e._v("多选项状态下的选项值")]),a("td",[e._v("--")]),a("td",[e._v("--")]),a("td",[e._v("--")])])])]),a("h4",[e._v("x-checkbox-group 属性")]),a("table",[a("thead",[a("tr",[a("th",[e._v("参数")]),a("th",[e._v("说明")]),a("th",[e._v("类型")]),a("th",[e._v("可选值")]),a("th",[e._v("默认值")])])]),a("tbody",[a("tr",[a("td",[e._v("v-model")]),a("td",[e._v("选中项的值")]),a("td",[e._v("array")]),a("td",[e._v("--")]),a("td",[e._v("--")])]),a("tr",[a("td",[e._v("options")]),a("td",[e._v("选项数据")]),a("td",[e._v("array")]),a("td",[e._v("--")]),a("td",[e._v("--")])]),a("tr",[a("td",[e._v("options[i].label")]),a("td",[e._v("选项数据标签值")]),a("td",[e._v("--")]),a("td",[e._v("--")]),a("td",[e._v("--")])]),a("tr",[a("td",[e._v("options[i].value")]),a("td",[e._v("选项数据值")]),a("td",[e._v("--")]),a("td",[e._v("--")]),a("td",[e._v("--")])]),a("tr",[a("td",[e._v("options[i].disabled")]),a("td",[e._v("选项是否不可用")]),a("td",[e._v("boolean")]),a("td",[e._v("--")]),a("td",[e._v("false")])])])])])}],v=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("p",{staticClass:"c_title"},[e._v("单独使用")]),a("x-checkbox",{model:{value:e.valueSeparate,callback:function(t){e.valueSeparate=t},expression:"valueSeparate"}},[e._v("选项")]),a("p",{staticClass:"c_title"},[e._v("禁用")]),a("x-checkbox",{attrs:{disabled:""},model:{value:e.valueDisabled,callback:function(t){e.valueDisabled=t},expression:"valueDisabled"}},[e._v("选项")]),a("p",{staticClass:"c_title"},[e._v("半选中状态")]),a("x-checkbox",{attrs:{indeterminate:""},model:{value:e.valueIndeterminate,callback:function(t){e.valueIndeterminate=t},expression:"valueIndeterminate"}},[e._v("选项")]),a("p",{staticClass:"c_title"},[e._v("选项组")]),a("x-checkbox-group",{model:{value:e.valueGroup,callback:function(t){e.valueGroup=t},expression:"valueGroup"}},[a("x-checkbox",{attrs:{label:1}},[e._v(" 选项1 ")]),a("x-checkbox",{attrs:{label:2}},[e._v(" 选项2 ")]),a("x-checkbox",{attrs:{label:3}},[e._v(" 选项3 ")])],1),a("p",{staticClass:"c_title"},[e._v("选项组-数据版")]),a("x-checkbox-group",{attrs:{options:e.options},model:{value:e.valueData,callback:function(t){e.valueData=t},expression:"valueData"}})],1)},o=[],c={data:function(){return{valueSeparate:!0,valueDisabled:!1,valueIndeterminate:!0,valueData:["Apple"],valueGroup:[2],options:[{label:"Apple",value:"Apple"},{label:"Pear",value:"Pear"},{label:"Orange",value:"Orange",disabled:!0}]}}},d=c,r=a("5d22"),_=Object(r["a"])(d,v,o,!1,null,null,null),s=_.exports,u={components:{vue_markdown_loader_component_debris_0:s}},i=u,p=Object(r["a"])(i,l,n,!1,null,null,null);t["default"]=p.exports}}]);