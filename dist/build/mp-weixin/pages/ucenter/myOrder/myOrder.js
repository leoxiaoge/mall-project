(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/myOrder/myOrder"],{"3b94":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=a(e("66fd")),o=e("c440"),r=e("5177");function a(t){return t&&t.__esModule?t:{default:t}}var c=u.default.extend({data:function(){return{title:"自助服务"}},onLoad:function(t){this.getData(),console.log("onLoad",t)},methods:{getData:function(){var t={};(0,o.request)(r.ProductPaiListGet,t).then(function(t){console.log(t)})}}});n.default=c},"46b3":function(t,n,e){"use strict";var u=e("cdb8"),o=e.n(u);o.a},"4f20":function(t,n,e){"use strict";e.r(n);var u=e("59be"),o=e("a967");for(var r in o)"default"!==r&&function(t){e.d(n,t,function(){return o[t]})}(r);e("46b3");var a=e("2877"),c=Object(a["a"])(o["default"],u["a"],u["b"],!1,null,null,null);n["default"]=c.exports},"59be":function(t,n,e){"use strict";var u=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return u}),e.d(n,"b",function(){return o})},a967:function(t,n,e){"use strict";e.r(n);var u=e("3b94"),o=e.n(u);for(var r in u)"default"!==r&&function(t){e.d(n,t,function(){return u[t]})}(r);n["default"]=o.a},cdb8:function(t,n,e){}},[["9a31","common/runtime","common/vendor"]]]);