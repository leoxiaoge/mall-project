(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/productDetailsPage/productDetailsPage"],{"0c1d":function(t,e,n){"use strict";var i=n("ed1d"),o=n.n(i);o.a},"479e":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},a653:function(t,e,n){"use strict";n.r(e);var i=n("479e"),o=n("c6f7");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("0c1d");var r=n("2877"),u=Object(r["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=u.exports},c6f7:function(t,e,n){"use strict";n.r(e);var i=n("f0f7"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=o.a},ed1d:function(t,e,n){},f0f7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("66fd")),o=n("c440"),a=n("5177");function r(t){return t&&t.__esModule?t:{default:t}}var u=i.default.extend({data:function(){return{indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,circular:!0,indicatorActiveColor:"#fe7f00",swiper:[],title:"服务",id:"",product:"",tab:["零风险","正品承诺","极速发货","公平公正"]}},onLoad:function(t){this.id=t.id,this.getProduct(),console.log("onLoad",t)},methods:{getProduct:function(){var t=this,e=this.id,n={ProductID:e};(0,o.request)(a.ProductGet,n).then(function(e){console.log(e),t.product=e.Product,t.swiper=e.Product.ProductPicList})},activePath:function(){var t=this.id;(0,o.navigateTo)("../activeBilList/activeBilList?id="+t)},productDetailsUparsePath:function(){var t=this.id;(0,o.navigateTo)("../productDetailsUparse/productDetailsUparse?id="+t)}}});e.default=u}},[["2baa","common/runtime","common/vendor"]]]);