(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/home"],{"1a23":function(t,e,n){},"36ff":function(t,e,n){"use strict";n.r(e);var i=n("7533"),o=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,function(){return i[t]})}(c);e["default"]=o.a},7533:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("a34a")),o=r(n("66fd")),c=n("c440"),s=n("5177");function r(t){return t&&t.__esModule?t:{default:t}}function a(t,e,n,i,o,c,s){try{var r=t[c](s),a=r.value}catch(u){return void n(u)}r.done?e(a):Promise.resolve(a).then(i,o)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(i,o){var c=t.apply(e,n);function s(t){a(c,i,o,s,r,"next",t)}function r(t){a(c,i,o,s,r,"throw",t)}s(void 0)})}}var l=function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-diy/mescroll-beibei")]).then(n.bind(null,"3e72"))},d=function(){return n.e("components/redflower-showTips/redflower-showTips").then(n.bind(null,"0ad7"))},f=function(){return n.e("components/uni-grid/uni-grid").then(n.bind(null,"cff3"))},g=function(){return n.e("components/product-list-being/product-list-being").then(n.bind(null,"8c9a"))},p=function(){return n.e("components/product-list/product-list").then(n.bind(null,"4207"))},h=!1,v=[],m=o.default.extend({components:{MescrollUni:l,showTips:d,uniGrid:f,productListBeing:g,productList:p},data:function(){return{indicatorDots:!0,autoplay:!0,interval:5e3,duration:500,circular:!0,indicatorActiveColor:"#fe7f00",easing:"easeInOutCubic",multiple:1,searchIcon:"/static/icon/icon_search.png",productList:[],productListIng:[],productListData:[],swiperGridHeight:"0px",swiperGridWidth:"100%",swiper:[],LastTranActiveList:[],activeids:[],isReseMode:!1,PageCount:1,pageNum:1,pageSize:10,list:[{image:"/static/icon_experience.png",text:"品类",navigateTo:"experience"},{image:"/static/icon_show.png",text:"晒单",navigateTo:"show"},{image:"/static/icon_exchange.png",text:"兑换",navigateTo:"exchange"},{image:"/static/icon_guide.png",text:"新手指南",navigateTo:"guide"}],mescroll:null}},onLoad:function(e){var n=t.getStorageSync("SessionKey"),i=t.getStorageSync("UserInfo");if(e.id){var o=e.id;n||i||t.setStorageSync("scene",o)}if(e.scene){var c=decodeURIComponent(e.scene);console.log("scene:"+c),n||i||t.setStorageSync("scene",c)}},onShow:function(){if(this.mescroll){var t=this.mescroll;this.downCallback(t)}this.websocket()},onHide:function(){t.closeSocket()},onUnload:function(){t.closeSocket()},onShareAppMessage:function(t){return(0,c.onShareAppMessage)(t)},methods:{websocket:function(){var e=this;t.connectSocket({url:"wss://websocket.tengpaisc.com"}),t.onSocketOpen(function(n){console.log("WebSocket连接已打开！"),t.hideLoading(),h=!0;for(var i=0;i<v.length;i++)e.sendSocketMessage(v[i]);v=[]}),t.onSocketError(function(t){console.log(t),console.log("WebSocket连接打开失败，请检查！"),(0,c.showErrorToast)("断线重连中..."),e.websocket()}),this.onSocketMessage()},sendSocketMessage:function(e){var n=JSON.stringify(e);console.log("发送数据",h,e),h?t.sendSocketMessage({data:n}):v.push(e)},onSocketMessage:function(){var e=this;t.onSocketMessage(function(t){console.log("收到服务器内容："+t.data);var n=JSON.parse(t.data);console.log(n),e.proccessMsg(n)})},msgSubscribe:function(t){var e=t,n=(0,c.formatTime)(new Date),i=this.isReseMode,o={msgType:20,msgTime:n,isReseMode:i,Activeids:e};this.sendSocketMessage(o)},proccessMsg:function(){var t=u(i.default.mark(function t(e){var n,o;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=e,o=n.msgType,console.log(n.ActiveID),null!=n){t.next=5;break}return t.abrupt("return");case 5:t.prev=5,t.t0=o,t.next=21===t.t0?9:12;break;case 9:return this.productListIng.map(function(t){n.ActiveID===t.Active.ID&&(n.LastBill&&(t.Active.LastBillUserName=decodeURIComponent(n.LastBill.nick),t.Active.LastBillUserFace=n.LastBill.face),t.ProductPrice=n.Price,t.Active.StartCountCown=n.SeqMiniSeconds,t.Status=n.Status)}),this.productList.map(function(t){n.ActiveID===t.Active.ID&&(n.LastBill&&(t.Active.LastBillUserName=decodeURIComponent(n.LastBill.nick),t.Active.LastBillUserFace=n.LastBill.face),t.ProductPrice=n.Price,t.Active.StartCountCown=n.SeqMiniSeconds,t.Status=n.Status)}),t.abrupt("break",12);case 12:t.next=17;break;case 14:t.prev=14,t.t1=t["catch"](5),console.error("处理消息出错："+t.t1);case 17:case"end":return t.stop()}},t,this,[[5,14]])}));function e(e){return t.apply(this,arguments)}return e}(),downCallback:function(t){this.getAdsList(),this.getLastTransactionList(),this.isReseMode=!0,this.mescroll=t,t.resetUpScroll()},upCallback:function(t){var e=this;this.getListDataFromNet(t.num,t.size,function(n){t.endSuccess(n.length),1==t.num&&(e.productList=[]),e.productList=e.productList.concat(n);var i=e.productList,o=i.map(function(t){return t.Active.ID});e.msgSubscribe(o)},function(){t.endErr()})},getListDataFromNet:function(){var t=u(i.default.mark(function t(e,n,o,c){var s;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.getHomeProductListIng(e,n);case 3:s=t.sent,this.getHomeProductList(),o&&o(s),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),c&&c();case 11:case"end":return t.stop()}},t,this,[[0,8]])}));function e(e,n,i,o){return t.apply(this,arguments)}return e}(),getAdsList:function(){var t=this,e={AdName:"首页头部轮播"};(0,c.request)(s.AdsListGet,e).then(function(e){t.swiper=e.AdsList[0].AdsViewList})},getLastTransactionList:function(){var t=this,e={};(0,c.request)(s.LastTransactionListGet,e).then(function(e){t.LastTranActiveList=e.LastTranActiveList,t.LastTranActiveList.map(function(t){t.OrderUserNick=decodeURIComponent(t.OrderUserNick)}),e.LastTranActiveList.length>=2&&(t.multiple=2)})},getHomeProductListIng:function(t,e){var n=this;return new Promise(function(i,o){var r={PageID:t,PageSize:e,SearchType:"home2"};(0,c.request)(s.HomeProductListGet,r).then(function(t){i(t.ProductList)}).catch(function(t){var e=n.mescroll;e.endErr()})})},getHomeProductList:function(){var t=this,e=this.pageNum,n=this.pageSize,i={PageID:e,PageSize:n,SearchType:"home1"};(0,c.request)(s.HomeProductListGet,i).then(function(n){1===e&&(t.productListIng=[]),t.productListIng=t.productListIng.concat(n.ProductList),t.productListIng.map(function(t){t.Active.LastBillUserName=decodeURIComponent(t.Active.LastBillUserName)});var i=t.productListIng,o=i.map(function(t){return t.Active.ID});t.PageCount=n.PageCount,t.msgSubscribe(o)})},lower:function(t){this.pageNum<this.PageCount&&(this.pageNum++,this.getHomeProductList())},noticeList:function(){(0,c.navigateTo)("../mall/notice/notice")},search:function(){(0,c.navigateTo)("../mall/search/search")},listClick:function(t){var e="../mall/".concat(t.navigateTo,"/").concat(t.navigateTo);(0,c.navigateTo)(e)}}});e.default=m}).call(this,n("543d")["default"])},a80b:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},c96d:function(t,e,n){"use strict";var i=n("1a23"),o=n.n(i);o.a},e79a:function(t,e,n){"use strict";n.r(e);var i=n("a80b"),o=n("36ff");for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);n("c96d");var s=n("2877"),r=Object(s["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports}},[["f661","common/runtime","common/vendor"]]]);