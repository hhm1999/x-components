(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4940a205"],{"0a95":function(t,e,n){var a=n("a1a8");e=a(!1),e.push([t.i,'.loading__0_c_ellipsis_1-u2o{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.loading__0_c_noselect_3UOIc{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.loading__0_c_cf_px4EE{*zoom:1}.loading__0_c_cf_px4EE:after,.loading__0_c_cf_px4EE:before{display:table;content:"";line-height:0}.loading__0_c_cf_px4EE:after{clear:both}.loading__0_main_1Qvcm{position:relative;height:250px}',""]),e.locals={c_ellipsis:"loading__0_c_ellipsis_1-u2o",c_noselect:"loading__0_c_noselect_3UOIc",c_cf:"loading__0_c_cf_px4EE",main:"loading__0_main_1Qvcm"},t.exports=e},"235a":function(t,e,n){"use strict";var a=n("d37e"),l=n.n(a);n.d(e,"default",(function(){return l.a}))},"633c":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),n("vueMarkdownLoaderDemoContainer",[n("template",{slot:"component"},[n("vue_markdown_loader_component_debris_0")],1),n("template",{slot:"code"},[n("div",{pre:!0},[n("pre",[n("code",{pre:!0,attrs:{class:"language-html"}},[t._v('<template>\n  <div :class="$style.main">\n    <x-loading loading-text="数据加载中···"></x-loading>\n  </div>\n</template>\n<style module lang="scss">\n.main{\n  position: relative;\n  height: 250px;\n}\n</style>\n')])])])])],2),t._m(1),n("vueMarkdownLoaderDemoContainer",[n("template",{slot:"component"},[n("vue_markdown_loader_component_debris_1")],1),n("template",{slot:"code"},[n("div",{pre:!0},[n("pre",[n("code",{pre:!0,attrs:{class:"language-html"}},[t._v('<template>\n  <div :class="$style.main">\n    <div :class="$style.container">\n      <x-loading :type="type">\n        <template v-if="type===\'error\'">\n          <p :class="$style.text">数据加载失败</p>\n          <x-btn size="small" round>重新加载</x-btn>\n        </template>\n        <p v-else-if="type===\'success\'" :class="$style.text">数据提交成功</p>\n        <p v-else-if="type===\'warning\'" :class="$style.text">网络错误</p>\n      </x-loading>\n    </div>\n    <x-btn @click="type=\'loading\'" :class="$style.btn" type="primary">加载 状态</x-btn>\n    <x-btn @click="type=\'success\'" :class="$style.btn" type="success">完成 状态</x-btn>\n    <x-btn @click="type=\'warning\'" :class="$style.btn" type="warning">警告 状态</x-btn>\n    <x-btn @click="type=\'error\'" :class="$style.btn" type="danger">错误 状态</x-btn>\n  </div>\n</template>\n<script>\nexport default {\n  data () {\n    return {\n      type: \'loading\'\n    }\n  },\n  methods: {\n  }\n}\n<\/script>\n<style module lang="scss">\n.main{\n  text-align: center;\n  .container{\n    position: relative;\n    height: 250px;\n    margin-bottom: 10px;\n    /* background-color: #dd7c4f; */\n    .text{\n      margin: 10px 0px;\n    }\n  }\n  .btn{\n    margin-right: 10px;\n  }\n}\n</style>\n')])])])])],2),t._m(2)],1)},l=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"markdown"},[n("h3",[t._v("loading 加载提示")]),n("p",[t._v("加载中，成功，失败，重试等状态提示")]),n("h4",[t._v("基础用法")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"markdown"},[n("h4",[t._v("状态切换")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"markdown"},[n("h4",[t._v("属性")]),n("table",[n("thead",[n("tr",[n("th",[t._v("参数")]),n("th",[t._v("说明")]),n("th",[t._v("类型")]),n("th",[t._v("可选值")]),n("th",[t._v("默认值")])])]),n("tbody",[n("tr",[n("td",[t._v("type")]),n("td",[t._v("状态")]),n("td",[t._v("string")]),n("td",[t._v("loading / success / warning / error")]),n("td",[t._v("loading")])]),n("tr",[n("td",[t._v("loading-text")]),n("td",[t._v("加载中的文字提示")]),n("td",[t._v("string")]),n("td",[t._v("--")]),n("td",[t._v("加载中···")])])])])])}],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.$style.main},[n("x-loading",{attrs:{"loading-text":"数据加载中···"}})],1)},o=[],_=n("bd29"),i=n("5d22"),c={};function r(t){this["$style"]=_["default"].locals||_["default"]}var d=Object(i["a"])(c,s,o,!1,r,null,null),p=d.exports,u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.$style.main},[n("div",{class:t.$style.container},[n("x-loading",{attrs:{type:t.type}},["error"===t.type?[n("p",{class:t.$style.text},[t._v("数据加载失败")]),n("x-btn",{attrs:{size:"small",round:""}},[t._v("重新加载")])]:"success"===t.type?n("p",{class:t.$style.text},[t._v("数据提交成功")]):"warning"===t.type?n("p",{class:t.$style.text},[t._v("网络错误")]):t._e()],2)],1),n("x-btn",{class:t.$style.btn,attrs:{type:"primary"},on:{click:function(e){t.type="loading"}}},[t._v("加载 状态")]),n("x-btn",{class:t.$style.btn,attrs:{type:"success"},on:{click:function(e){t.type="success"}}},[t._v("完成 状态")]),n("x-btn",{class:t.$style.btn,attrs:{type:"warning"},on:{click:function(e){t.type="warning"}}},[t._v("警告 状态")]),n("x-btn",{class:t.$style.btn,attrs:{type:"danger"},on:{click:function(e){t.type="error"}}},[t._v("错误 状态")])],1)},g=[],v={data:function(){return{type:"loading"}},methods:{}},m=v,f=n("235a");function x(t){this["$style"]=f["default"].locals||f["default"]}var y=Object(i["a"])(m,u,g,!1,x,null,null),b=y.exports,h={components:{vue_markdown_loader_component_debris_0:p,vue_markdown_loader_component_debris_1:b}},w=h,k=Object(i["a"])(w,a,l,!1,null,null,null);e["default"]=k.exports},b0d8:function(t,e,n){var a=n("0a95");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var l=n("85cb").default;l("8696ec0e",a,!0,{sourceMap:!1,shadowMode:!1})},b161:function(t,e,n){var a=n("a1a8");e=a(!1),e.push([t.i,'.loading__1_c_ellipsis_39av4{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.loading__1_c_noselect_ILTdW{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.loading__1_c_cf_cV3MS{*zoom:1}.loading__1_c_cf_cV3MS:after,.loading__1_c_cf_cV3MS:before{display:table;content:"";line-height:0}.loading__1_c_cf_cV3MS:after{clear:both}.loading__1_main_106m4{text-align:center}.loading__1_main_106m4 .loading__1_container_U3k1e{position:relative;height:250px;margin-bottom:10px}.loading__1_main_106m4 .loading__1_container_U3k1e .loading__1_text__A9wn{margin:10px 0}.loading__1_main_106m4 .loading__1_btn_QTkD7{margin-right:10px}',""]),e.locals={c_ellipsis:"loading__1_c_ellipsis_39av4",c_noselect:"loading__1_c_noselect_ILTdW",c_cf:"loading__1_c_cf_cV3MS",main:"loading__1_main_106m4",container:"loading__1_container_U3k1e",text:"loading__1_text__A9wn",btn:"loading__1_btn_QTkD7"},t.exports=e},bd29:function(t,e,n){"use strict";var a=n("b0d8"),l=n.n(a);n.d(e,"default",(function(){return l.a}))},d37e:function(t,e,n){var a=n("b161");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var l=n("85cb").default;l("1c327c59",a,!0,{sourceMap:!1,shadowMode:!1})}}]);
//# sourceMappingURL=chunk-4940a205.fd3f7598.js.map