(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mall-advertisingPage-advertisingPage"],{2950:function(e,n,t){"use strict";t.r(n);var a=t("946e"),o=t("eaa5");for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);var r=t("2877"),u=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,"56422db0",null);n["default"]=u.exports},"946e":function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-uni-view",{staticClass:"content"},[t("v-uni-view",{staticClass:"parse"},[t("uParse",{attrs:{content:e.article},on:{preview:function(n){n=e.$handleEvent(n),e.preview(n)},navigate:function(n){n=e.$handleEvent(n),e.navigate(n)}}})],1)],1)},o=[];t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return o}))},ca44:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=u(t("e143")),o=t("c440"),i=t("5177"),r=u(t("5f49"));function u(e){return e&&e.__esModule?e:{default:e}}var c=a.default.extend({components:{uParse:r.default},data:function(){return{id:"",article:""}},onLoad:function(e){this.id=e.id,this.getProduct(),console.log("onLoad",e)},onShareAppMessage:function(e){return(0,o.onShareAppMessage)(e)},methods:{getProduct:function(){var e=this,n=this.id,t={ID:n};(0,o.request)(i.GetEssayByID,t).then((function(n){e.article=n.EssayInfo.Context}))},preview:function(e,n){console.log("src: "+e)},navigate:function(e,n){console.log("href: "+e),uni.showModal({content:"点击链接为："+e,showCancel:!1})}}});n.default=c},eaa5:function(e,n,t){"use strict";t.r(n);var a=t("ca44"),o=t.n(a);for(var i in a)"default"!==i&&function(e){t.d(n,e,(function(){return a[e]}))}(i);n["default"]=o.a}}]);