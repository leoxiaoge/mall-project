(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/guide/guide"],{"285d":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(t("66fd")),u=t("c440"),a=t("5177");function r(n){return n&&n.__esModule?n:{default:n}}var c=function(){return Promise.all([t.e("common/vendor"),t.e("components/uParse/src/wxParse")]).then(t.bind(null,"5f49"))},l="\n<p>图文介绍，内容待定</p>\n    ",i=o.default.extend({components:{uParse:c},data:function(){return{article:l}},onLoad:function(n){this.getData(),console.log("onLoad",n)},methods:{getData:function(){var n={};(0,u.request)(a.ProductPaiListGet,n).then(function(n){console.log(n)})},preview:function(n,e){console.log("src: "+n)},navigate:function(e,t){console.log("href: "+e),n.showModal({content:"点击链接为："+e,showCancel:!1})}}});e.default=i}).call(this,t("543d")["default"])},4334:function(n,e,t){"use strict";var o=function(){var n=this,e=n.$createElement;n._self._c},u=[];t.d(e,"a",function(){return o}),t.d(e,"b",function(){return u})},c9c0:function(n,e,t){"use strict";t.r(e);var o=t("4334"),u=t("d148");for(var a in u)"default"!==a&&function(n){t.d(e,n,function(){return u[n]})}(a);var r=t("2877"),c=Object(r["a"])(u["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},d148:function(n,e,t){"use strict";t.r(e);var o=t("285d"),u=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,function(){return o[n]})}(a);e["default"]=u.a}},[["8781","common/runtime","common/vendor"]]]);