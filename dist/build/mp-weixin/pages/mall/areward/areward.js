(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/areward/areward"],{"406b":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return o}))},5135:function(t,e,n){"use strict";n.r(e);var i=n("90c2"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},6534:function(t,e,n){"use strict";n.r(e);var i=n("406b"),o=n("5135");for(var s in o)"default"!==s&&function(t){n.d(e,t,(function(){return o[t]}))}(s);n("b01a");var c=n("2877"),r=Object(c["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},7576:function(t,e,n){},"90c2":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("a34a")),o=r(n("66fd")),s=n("c440"),c=n("5177");function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,i,o,s,c){try{var r=t[s](c),a=r.value}catch(u){return void n(u)}r.done?e(a):Promise.resolve(a).then(i,o)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var s=t.apply(e,n);function c(t){a(s,i,o,c,r,"next",t)}function r(t){a(s,i,o,c,r,"throw",t)}c(void 0)}))}}var l=function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-diy/mescroll-beibei")]).then(n.bind(null,"3e72"))},d=function(){return n.e("components/redflower-showTips/redflower-showTips").then(n.bind(null,"0ad7"))},f=function(){return n.e("components/uni-grid/uni-grid").then(n.bind(null,"cff3"))},g=function(){return n.e("components/product-list-being/product-list-being").then(n.bind(null,"8c9a"))},p=function(){return n.e("components/product-list/product-list").then(n.bind(null,"4207"))},h=!1,m=[],v=o.default.extend({components:{MescrollUni:l,showTips:d,uniGrid:f,productListBeing:g,productList:p},data:function(){return{indicatorDots:!0,autoplay:!0,interval:5e3,duration:500,circular:!0,indicatorActiveColor:"#fe7f00",easing:"easeInOutCubic",multiple:1,searchIcon:"/static/icon/icon_search.png",productList:[],productListIng:[],productListData:[],swiperGridHeight:"0px",swiperGridWidth:"100%",swiper:[],LastTranActiveList:[],activeids:[],isResetMode:!1,PageCount:1,pageNum:1,pageSize:10,list:[{image:"/static/icon_experience.png",text:"品类",navigateTo:"experience"},{image:"/static/icon_show.png",text:"晒单",navigateTo:"show"},{image:"/static/icon_exchange.png",text:"兑换",navigateTo:"exchange"},{image:"/static/icon_guide.png",text:"新手指南",navigateTo:"guide"}],mescroll:null}},onLoad:function(e){var n=t.getStorageSync("SessionKey"),i=t.getStorageSync("UserInfo");if(e.id){var o=e.id;n||i||t.setStorageSync("scene",o)}if(e.scene){var s=decodeURIComponent(e.scene);console.log("scene:"+s),n||i||t.setStorageSync("scene",s)}},onShow:function(){if(this.mescroll){var t=this.mescroll;this.downCallback(t)}},onShareAppMessage:function(t){return(0,s.onShareAppMessage)(t)},methods:{websocket:function(){var e=this;t.connectSocket({url:"wss://websocket.tengpaisc.com"}),t.onSocketOpen((function(n){console.log("WebSocket连接已打开！"),t.hideLoading(),h=!0;for(var i=0;i<m.length;i++)e.sendSocketMessage(m[i]);m=[]})),t.onSocketError((function(t){console.log(t),console.log("WebSocket连接打开失败，请检查！"),(0,s.showErrorToast)("断线重连中..."),e.websocket()})),this.onSocketMessage()},sendSocketMessage:function(e){var n=JSON.stringify(e);console.log("发送数据",h,e),h?t.sendSocketMessage({data:n}):m.push(e)},onSocketMessage:function(){return new Promise((function(e,n){t.onSocketMessage((function(t){console.log("收到服务器内容："+t.data);var n=JSON.parse(t.data);console.log(n),e(n)}))}))},msgSubscribe:function(){var t=this.activeids,e=(0,s.formatTime)(new Date),n=this.isResetMode,i={msgType:20,msgTime:e,isResetMode:n,Activeids:t};this.sendSocketMessage(i)},downCallback:function(t){this.getAdsList(),this.getLastTransactionList(),this.mescroll=t,t.resetUpScroll()},upCallback:function(){var t=u(i.default.mark((function t(e){var n=this;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.onSocketMessage();case 2:t.sent,this.getListDataFromNet(e.num,e.size,(function(t){e.endSuccess(t.length),1==e.num&&(n.productList=[]),n.productList=n.productList.concat(t)}),(function(){e.endErr()}));case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),getListDataFromNet:function(){var t=u(i.default.mark((function t(e,n,o,s){var c;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.getHomeProductListIng(e,n);case 3:c=t.sent,this.getHomeProductList(),o&&o(c),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),s&&s();case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(e,n,i,o){return t.apply(this,arguments)}return e}(),getAdsList:function(){var t=this,e={AdName:"首页头部轮播"};(0,s.request)(c.AdsListGet,e).then((function(e){t.swiper=e.AdsList[0].AdsViewList}))},getLastTransactionList:function(){var t=this,e={};(0,s.request)(c.LastTransactionListGet,e).then((function(e){t.LastTranActiveList=e.LastTranActiveList,t.LastTranActiveList.map((function(t){t.OrderUserNick=decodeURIComponent(t.OrderUserNick)})),e.LastTranActiveList.length>=2&&(t.multiple=2)}))},getHomeProductListIng:function(t,e){var n=this;return new Promise((function(i,o){var r={PageID:t,PageSize:e,SearchType:"home2"};(0,s.request)(c.HomeProductListGet,r).then((function(t){i(t.ProductList)})).catch((function(t){var e=n.mescroll;e.endErr()}))}))},getHomeProductList:function(){var t=u(i.default.mark((function t(){var e,n,o,r=this;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.onSocketMessage();case 2:t.sent,e=this.pageNum,n=this.pageSize,o={PageID:e,PageSize:n,SearchType:"home1"},(0,s.request)(c.HomeProductListGet,o).then((function(t){1===e&&(r.productListIng=[]),r.productListIng=r.productListIng.concat(t.ProductList),r.productListIng.map((function(t){t.Active.LastBillUserName=decodeURIComponent(t.Active.LastBillUserName)}));var n=r.productListIng,i=n.map((function(t){return t.Active.ID}));r.activeids=i,r.PageCount=t.PageCount,r.msgSubscribe()}));case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),lower:function(t){this.pageNum<this.PageCount&&(this.pageNum++,this.getHomeProductList())},noticeList:function(){(0,s.navigateTo)("../mall/notice/notice")},search:function(){(0,s.navigateTo)("../mall/search/search")},listClick:function(t){var e="../mall/".concat(t.navigateTo,"/").concat(t.navigateTo);(0,s.navigateTo)(e)}}});e.default=v}).call(this,n("543d")["default"])},"9e7c":function(t,e,n){"use strict";(function(t){n("6cdc"),n("921b");var e=i(n("6534"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},b01a:function(t,e,n){"use strict";var i=n("7576"),o=n.n(i);o.a}},[["9e7c","common/runtime","common/vendor"]]]);