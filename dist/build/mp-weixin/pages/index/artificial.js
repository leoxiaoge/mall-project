(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/artificial"],{2094:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},"4dbe":function(t,e,n){},9018:function(t,e,n){"use strict";var o=n("4dbe"),i=n.n(o);i.a},"949f":function(t,e,n){"use strict";n.r(e);var o=n("de7a"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e["default"]=i.a},d182:function(t,e,n){"use strict";n.r(e);var o=n("2094"),i=n("949f");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("9018");var r=n("2877"),u=Object(r["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=u.exports},de7a:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(n("a34a")),i=u(n("66fd")),a=n("c440"),r=n("5177");function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e,n,o,i,a,r){try{var u=t[a](r),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(o,i)}function s(t){return function(){var e=this,n=arguments;return new Promise(function(o,i){var a=t.apply(e,n);function r(t){c(a,o,i,r,u,"next",t)}function u(t){c(a,o,i,r,u,"throw",t)}r(void 0)})}}var f=function(){return n.e("components/no-tuned/no-tuned").then(n.bind(null,"68e1"))},l=i.default.extend({components:{noTuned:f},data:function(){return{categoryList:[],subCategoryList:[],categoryActive:0,height:0,scrollTop:0,scrollHeight:0,categoryID:"",pageNum:0,pageSize:10,pageCount:1,statusIconDone:"/static/icon/icon_done.png",statusIconFlow:"/static/icon/icon_flow.png",thumb:"/static/img/no_tuned.jpg"}},onLoad:function(){var e=t.getSystemInfoSync().windowHeight;this.height=e},onShow:function(){this.getCategory()},onShareAppMessage:function(t){return(0,a.onShareAppMessage)(t)},methods:{scroll:function(t){this.scrollHeight=t.detail.scrollHeight},getCategory:function(){var t=this,e={};(0,a.request)(r.ProductCategoryListGet,e).then(function(e){t.categoryList=e.CategoryList,t.categoryClickMain(0)})},categoryClickMain:function(t){var e=this;return new Promise(function(n,o){var i=e.categoryList[t];e.categoryActive=t,e.categoryID=i.ID,e.pageNum=0,e.lower()})},getProductPaiList:function(){var t=this;return new Promise(function(e,n){var o=t.categoryID,i=t.pageNum,u=t.pageSize,c={PageID:i,PageSize:u,CategoryID:o,ActiveType:1};(0,a.request)(r.ProductPaiListGet,c).then(function(n){var o=n.ProductList;o.map(function(t){t.activeButton=4===t.Active.ActiveStatus?"参加下一期":"参加竞拍"}),t.pageCount=n.PageCount,e(o)})})},lower:function(){var t=s(o.default.mark(function t(){var e;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!(this.pageNum<this.pageCount)){t.next=6;break}return this.pageNum++,t.next=4,this.getProductPaiList();case 4:e=t.sent,1===this.pageNum?this.subCategoryList=e:this.subCategoryList=this.subCategoryList.concat(e);case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),productDetailsTo:function(t,e){(0,a.navigateTo)("../mall/productDetailsPage/productDetailsPage?id="+t+"&activeID="+e)}}});e.default=l}).call(this,n("543d")["default"])}},[["6dad","common/runtime","common/vendor"]]]);