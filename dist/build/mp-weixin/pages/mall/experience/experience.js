(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/experience/experience"],{2086:function(t,e,n){"use strict";n.r(e);var i=n("8486"),a=n("2390");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("e9c2");var r=n("2877"),c=Object(r["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},2390:function(t,e,n){"use strict";n.r(e);var i=n("3fc1"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},"3fc1":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=c(n("a34a")),a=c(n("66fd")),o=n("c440"),r=n("5177");function c(t){return t&&t.__esModule?t:{default:t}}function u(t,e,n,i,a,o,r){try{var c=t[o](r),u=c.value}catch(s){return void n(s)}c.done?e(u):Promise.resolve(u).then(i,a)}function s(t){return function(){var e=this,n=arguments;return new Promise(function(i,a){var o=t.apply(e,n);function r(t){u(o,i,a,r,c,"next",t)}function c(t){u(o,i,a,r,c,"throw",t)}r(void 0)})}}var f=a.default.extend({data:function(){return{categoryList:[],subCategoryList:[],categoryActive:0,height:0,scrollTop:0,scrollHeight:0,categoryID:"",pageNum:0,pageSize:10,pageCount:1,statusIconDone:"/static/icon/icon_done.png",statusIconFlow:"/static/icon/icon_flow.png"}},onLoad:function(){var e=t.getSystemInfoSync().windowHeight;this.height=e,this.getCategory()},methods:{scroll:function(t){this.scrollHeight=t.detail.scrollHeight},getCategory:function(){var t=this,e={};(0,o.request)(r.ProductCategoryListGet,e).then(function(e){t.categoryList=e.CategoryList,t.categoryClickMain(0)})},categoryClickMain:function(t){var e=this;return new Promise(function(n,i){var a=e.categoryList[t];e.categoryActive=t,e.categoryID=a.ID,e.pageNum=0,e.lower()})},getProductPaiList:function(){var t=this;return new Promise(function(e,n){var i=t.categoryID,a=t.pageNum,c=t.pageSize,u={PageID:a,PageSize:c,CategoryID:i};(0,o.request)(r.ProductPaiListGet,u).then(function(n){var i=n.ProductList;i.map(function(t){t.activeButton=4===t.Active.ActiveStatus?"参加下一期":"参加竞拍"}),t.pageCount=n.PageCount,e(i)})})},lower:function(){var t=s(i.default.mark(function t(){var e;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!(this.pageNum<this.pageCount)){t.next=6;break}return this.pageNum++,t.next=4,this.getProductPaiList();case 4:e=t.sent,1===this.pageNum?this.subCategoryList=e:this.subCategoryList=this.subCategoryList.concat(e);case 6:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),productDetailsTo:function(t,e){(0,o.navigateTo)("../../mall/productDetailsPage/productDetailsPage?id="+t+"&activeID="+e)}}});e.default=f}).call(this,n("543d")["default"])},"7df3":function(t,e,n){},8486:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},e9c2:function(t,e,n){"use strict";var i=n("7df3"),a=n.n(i);a.a}},[["a903","common/runtime","common/vendor"]]]);