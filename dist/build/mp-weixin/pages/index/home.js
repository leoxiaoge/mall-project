(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/home"],{"36ff":function(t,n,e){"use strict";e.r(n);var i=e("c007"),o=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,function(){return i[t]})}(c);n["default"]=o.a},"69a9":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return o})},"8ee9":function(t,n,e){},c007:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=a(e("a34a")),o=a(e("66fd")),c=e("c440"),r=e("5177");function a(t){return t&&t.__esModule?t:{default:t}}function s(t,n,e,i,o,c,r){try{var a=t[c](r),s=a.value}catch(u){return void e(u)}a.done?n(s):Promise.resolve(s).then(i,o)}function u(t){return function(){var n=this,e=arguments;return new Promise(function(i,o){var c=t.apply(n,e);function r(t){s(c,i,o,r,a,"next",t)}function a(t){s(c,i,o,r,a,"throw",t)}r(void 0)})}}var l=function(){return Promise.all([e.e("common/vendor"),e.e("components/mescroll-diy/mescroll-beibei")]).then(e.bind(null,"3e72"))},d=function(){return e.e("components/uni-grid/uni-grid").then(e.bind(null,"cff3"))},f=function(){return e.e("components/product-list/product-list").then(e.bind(null,"4207"))},g=function(){return e.e("components/product-list-being/product-list-being").then(e.bind(null,"8c9a"))},p=o.default.extend({components:{MescrollUni:l,uniGrid:d,productListBeing:g,productList:f},data:function(){return{indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,circular:!0,indicatorActiveColor:"#fe7f00",multiple:1,productList:[],productListIng:[],productListData:[],swiperGridHeight:"0px",swiperGridWidth:"100%",swiper:[],LastTranActiveList:[],list:[{image:"/static/icon_experience.png",text:"体验区",navigateTo:"experience"},{image:"/static/icon_show.png",text:"晒单",navigateTo:"show"},{image:"/static/icon_exchange.png",text:"兑换",navigateTo:"exchange"},{image:"/static/icon_guide.png",text:"新手指南",navigateTo:"guide"}],mescroll:[]}},onLoad:function(){},methods:{downCallback:function(t){this.getAdsList(),this.getLastTransactionList(),this.getLastTransactionList(),this.mescroll=t,t.resetUpScroll()},upCallback:function(t){var n=this;this.getListDataFromNet(t.num,t.size,function(e){t.endSuccess(e.length),console.log(e),1==t.num&&(n.productListIng=[]),console.log("productListIng",n.productListIng),n.productListIng=n.productListIng.concat(e)},function(){t.endErr()})},getListDataFromNet:function(){var t=u(i.default.mark(function t(n,e,o,c){var r;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log(n,e),t.prev=1,t.next=4,this.getHomeProductListIng(n,e);case 4:r=t.sent,console.log("data",this.productListIng),o&&o(r),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](1),c&&c();case 12:case"end":return t.stop()}},t,this,[[1,9]])}));function n(n,e,i,o){return t.apply(this,arguments)}return n}(),getAdsList:function(){var t=this,n={AdName:"首页头部轮播"};(0,c.request)(r.AdsListGet,n).then(function(n){console.log(n),t.swiper=n.AdsList[0].AdsViewList})},getLastTransactionList:function(){var t=this,n={};(0,c.request)(r.LastTransactionListGet,n).then(function(n){console.log(n),t.LastTranActiveList=n.LastTranActiveList,n.LastTranActiveList.length>=2&&(t.multiple=2)})},getHomeProductListIng:function(t,n){return new Promise(function(e,i){var o={PageID:t,PageSize:n,SearchType:"home2"};(0,c.request)(r.HomeProductListGet,o).then(function(t){console.log(t.ProductList),e(t.ProductList)})})},noticeList:function(){(0,c.navigateTo)("../mall/notice/notice")},listClick:function(t){var n="../mall/".concat(t.navigateTo,"/").concat(t.navigateTo);(0,c.navigateTo)(n)}}});n.default=p},c96d:function(t,n,e){"use strict";var i=e("8ee9"),o=e.n(i);o.a},e79a:function(t,n,e){"use strict";e.r(n);var i=e("69a9"),o=e("36ff");for(var c in o)"default"!==c&&function(t){e.d(n,t,function(){return o[t]})}(c);e("c96d");var r=e("2877"),a=Object(r["a"])(o["default"],i["a"],i["b"],!1,null,null,null);n["default"]=a.exports}},[["f661","common/runtime","common/vendor"]]]);