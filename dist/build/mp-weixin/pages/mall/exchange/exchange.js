(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/exchange/exchange"],{"15f6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("66fd")),a=n("c440"),r=n("5177");function i(t){return t&&t.__esModule?t:{default:t}}var c=o.default.extend({data:function(){return{categoryList:[],subCategoryList:[],categoryActive:0,height:0,scrollTop:0,scrollHeight:0,statusIcon:"/static/icon/icon_done.png"}},onLoad:function(){console.log("onLoad");var e=t.getSystemInfoSync().windowHeight;this.height=e},onShow:function(){console.log("onShow"),this.getCategory()},methods:{scroll:function(t){this.scrollHeight=t.detail.scrollHeight},getCategory:function(){var t=this,e={};(0,a.request)(r.ProductCategoryListGet,e).then(function(e){t.categoryList=e.CategoryList,t.categoryClickMain(0)})},categoryClickMain:function(t){var e=this,n=this.categoryList[t];this.categoryActive=t;var o=n.ID,i={PageID:1,PageSize:10,CategoryID:o};(0,a.request)(r.ProductExchangeListGet,i).then(function(t){var n=t.ProductList;n.map(function(t){t.ProductPrimeCost=0===t.ProductPrimeCost?"马上兑换":"参加下一期"}),e.subCategoryList=n})}}});e.default=c}).call(this,n("543d")["default"])},5436:function(t,e,n){"use strict";n.r(e);var o=n("5448"),a=n("ab6d");for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n("e73a");var i=n("2877"),c=Object(i["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},5448:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.subCategoryList,function(e,n){var o=t._f("url")(e.ProductPics);return{$orig:t.__get_orig(e),f0:o}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},ab6d:function(t,e,n){"use strict";n.r(e);var o=n("15f6"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=a.a},c4ae:function(t,e,n){},e73a:function(t,e,n){"use strict";var o=n("c4ae"),a=n.n(o);a.a}},[["2ae0","common/runtime","common/vendor"]]]);