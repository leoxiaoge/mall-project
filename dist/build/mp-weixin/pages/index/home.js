(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/home"],{"1a23":function(t,e,n){},"36ff":function(t,e,n){"use strict";n.r(e);var i=n("7533"),s=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=s.a},"3ed8":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return s})},7533:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("a34a")),s=r(n("66fd")),o=n("c440"),c=n("5177");function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,i,s,o,c){try{var r=t[o](c),a=r.value}catch(u){return void n(u)}r.done?e(a):Promise.resolve(a).then(i,s)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(i,s){var o=t.apply(e,n);function c(t){a(o,i,s,c,r,"next",t)}function r(t){a(o,i,s,c,r,"throw",t)}c(void 0)})}}var l=function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-diy/mescroll-beibei")]).then(n.bind(null,"3e72"))},d=function(){return n.e("components/redflower-showTips/redflower-showTips").then(n.bind(null,"0ad7"))},f=function(){return n.e("components/uni-grid/uni-grid").then(n.bind(null,"cff3"))},p=function(){return n.e("components/product-list-being/product-list-being").then(n.bind(null,"8c9a"))},g=function(){return n.e("components/product-list/product-list").then(n.bind(null,"4207"))},h=!1,v=[],m=s.default.extend({components:{MescrollUni:l,showTips:d,uniGrid:f,productListBeing:p,productList:g},data:function(){return{indicatorDots:!0,autoplay:!0,interval:5e3,duration:500,circular:!0,indicatorActiveColor:"#fe7f00",easing:"easeInOutCubic",multiple:1,searchIcon:"/static/icon/icon_search.png",productList:[],productListIng:[],productListIngs:[],productLists:[],productListData:[],swiperGridHeight:"0px",swiperGridWidth:"100%",swiper:[],LastTranActiveList:[],activeids:[],isReseMode:!1,PageCount:1,pageNum:1,pageSize:10,list:[{image:"/static/icon_experience.png",text:"品类",navigateTo:"experience"},{image:"/static/icon_show.png",text:"晒单",navigateTo:"show"},{image:"/static/icon_exchange.png",text:"兑换",navigateTo:"exchange"},{image:"/static/icon_guide.png",text:"新手指南",navigateTo:"guide"}],mescroll:null}},onLoad:function(e){var n=t.getStorageSync("SessionKey"),i=t.getStorageSync("UserInfo");if(e.id){var s=e.id;n||i||t.setStorageSync("scene",s)}if(e.scene){var o=decodeURIComponent(e.scene);console.log("scene:"+o),n||i||t.setStorageSync("scene",o)}},onShow:function(){if(this.mescroll){var t=this.mescroll;this.downCallback(t)}this.getHomeProductList(),this.websocket()},onUnload:function(){t.closeSocket()},onShareAppMessage:function(t){return(0,o.onShareAppMessage)(t)},methods:{downCallback:function(t){this.getAdsList(),this.getLastTransactionList(),this.isReseMode=!0,this.mescroll=t,t.resetUpScroll()},upCallback:function(t){var e=this;this.isReseMode=!1,this.getListDataFromNet(t.num,t.size,function(n){t.endSuccess(n.length),1==t.num&&(e.productList=[]),e.productList=e.productList.concat(n)},function(){t.endErr()})},getListDataFromNet:function(){var t=u(i.default.mark(function t(e,n,s,o){var c;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.getHomeProductListIng(e,n);case 3:c=t.sent,s&&s(c),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),o&&o();case 10:case"end":return t.stop()}},t,this,[[0,7]])}));function e(e,n,i,s){return t.apply(this,arguments)}return e}(),getAdsList:function(){var t=this,e={AdName:"首页头部轮播"};(0,o.request)(c.AdsListGet,e).then(function(e){t.swiper=e.AdsList[0].AdsViewList})},getLastTransactionList:function(){var t=this,e={};(0,o.request)(c.LastTransactionListGet,e).then(function(e){t.LastTranActiveList=e.LastTranActiveList,t.LastTranActiveList.map(function(t){t.OrderUserNick=decodeURIComponent(t.OrderUserNick)}),e.LastTranActiveList.length>=2&&(t.multiple=2)})},getHomeProductListIng:function(t,e){var n=this;return new Promise(function(i,s){var r={PageID:t,PageSize:e,SearchType:"home2"};(0,o.request)(c.HomeProductListGet,r).then(function(t){var e=t.ProductList,s=e.map(function(t){return t.Active.ID});n.msgSubscribe(s),i(t.ProductList)}).catch(function(t){var e=n.mescroll;e.endErr()})})},getHomeProductList:function(){var t=this,e=this.pageNum,n=this.pageSize,i={PageID:e,PageSize:n,SearchType:"home1"};(0,o.request)(c.HomeProductListGet,i).then(function(n){1===e&&(t.productListIng=[]),t.productListIng=t.productListIng.concat(n.ProductList),t.productListIng.map(function(t){t.Active.LastBillUserName=decodeURIComponent(t.Active.LastBillUserName)});var i=t.productListIng,s=i.map(function(t){return t.Active.ID});t.PageCount=n.PageCount,t.msgSubscribe(s)})},lower:function(t){this.pageNum<this.PageCount&&(this.pageNum++,this.getHomeProductList())},websocket:function(){var e=this;t.connectSocket({url:"wss://websocket.tengpaisc.com"}),t.onSocketOpen(function(n){console.log("WebSocket连接已打开！"),t.hideLoading(),h=!0;for(var i=0;i<v.length;i++)e.sendSocketMessage(v[i]);v=[]}),t.onSocketError(function(t){console.log("WebSocket连接打开失败，请检查！"),(0,o.showErrorToast)("断线重连中..."),e.websocket()}),this.onSocketMessage()},sendSocketMessage:function(e){var n=JSON.stringify(e);console.log("发送数据",h,e),h?t.sendSocketMessage({data:n}):v.push(e)},onSocketMessage:function(){var e=this;t.onSocketMessage(function(t){console.log("收到服务器内容："+t.data);var n=JSON.parse(t.data);console.log(n),e.proccessMsg(n)})},msgSubscribe:function(t){var e=t,n=(0,o.formatTime)(new Date),i=this.isReseMode,s={msgType:20,msgTime:n,isReseMode:i,Activeids:e};this.sendSocketMessage(s)},proccessMsg:function(){var t=u(i.default.mark(function t(e){var n,s;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=e,s=n.msgType,null!=n){t.next=4;break}return t.abrupt("return");case 4:t.prev=4,t.t0=s,t.next=21===t.t0?8:14;break;case 8:return this.productListIng.map(function(t){n.ActiveID===t.Active.ID&&(n.LastBill&&(t.Active.LastBillUserName=decodeURIComponent(n.LastBill.nick),t.Active.LastBillUserFace=n.LastBill.face),t.Price=n.Price,t.Active.SeqMiniSeconds=n.SeqMiniSeconds,t.Status=n.Status)}),this.productList.map(function(t){n.ActiveID===t.Active.ID&&(n.LastBill&&(t.Active.LastBillUserName=decodeURIComponent(n.LastBill.nick),t.Active.LastBillUserFace=n.LastBill.face),t.Price=n.Price,t.Active.SeqMiniSeconds=n.SeqMiniSeconds,t.Status=n.Status)}),this.productListIngs=JSON.parse(JSON.stringify(this.productListIng)),this.productLists=JSON.parse(JSON.stringify(this.productList)),console.log(this.productListIngs,this.productLists),t.abrupt("break",14);case 14:t.next=19;break;case 16:t.prev=16,t.t1=t["catch"](4),console.error("处理消息出错："+t.t1);case 19:case"end":return t.stop()}},t,this,[[4,16]])}));function e(e){return t.apply(this,arguments)}return e}(),noticeList:function(){(0,o.navigateTo)("../mall/notice/notice")},search:function(){(0,o.navigateTo)("../mall/search/search")},listClick:function(t){var e="../mall/".concat(t.navigateTo,"/").concat(t.navigateTo);(0,o.navigateTo)(e)}}});e.default=m}).call(this,n("543d")["default"])},c96d:function(t,e,n){"use strict";var i=n("1a23"),s=n.n(i);s.a},e79a:function(t,e,n){"use strict";n.r(e);var i=n("3ed8"),s=n("36ff");for(var o in s)"default"!==o&&function(t){n.d(e,t,function(){return s[t]})}(o);n("c96d");var c=n("2877"),r=Object(c["a"])(s["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports}},[["f661","common/runtime","common/vendor"]]]);