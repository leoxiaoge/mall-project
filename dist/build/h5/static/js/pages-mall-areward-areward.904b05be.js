(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mall-areward-areward"],{5135:function(t,e,i){"use strict";i.r(e);var n=i("518d"),a=i.n(n);for(var s in n)"default"!==s&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"518d":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=f(i("a34a")),a=f(i("e143")),s=i("c440"),o=i("5177"),r=f(i("3e72")),c=f(i("0ad7")),u=f(i("cff3")),l=f(i("8c9a")),d=f(i("4207"));function f(t){return t&&t.__esModule?t:{default:t}}function p(t,e,i,n,a,s,o){try{var r=t[s](o),c=r.value}catch(u){return void i(u)}r.done?e(c):Promise.resolve(c).then(n,a)}function v(t){return function(){var e=this,i=arguments;return new Promise((function(n,a){var s=t.apply(e,i);function o(t){p(s,n,a,o,r,"next",t)}function r(t){p(s,n,a,o,r,"throw",t)}o(void 0)}))}}var g=!1,h=[],w=a.default.extend({components:{MescrollUni:r.default,showTips:c.default,uniGrid:u.default,productListBeing:l.default,productList:d.default},data:function(){return{indicatorDots:!0,autoplay:!0,interval:5e3,duration:500,circular:!0,indicatorActiveColor:"#fe7f00",easing:"easeInOutCubic",multiple:1,searchIcon:"/static/icon/icon_search.png",productList:[],productListIng:[],productListData:[],swiperGridHeight:"0px",swiperGridWidth:"100%",swiper:[],LastTranActiveList:[],activeids:[],isResetMode:!1,PageCount:1,pageNum:1,pageSize:10,list:[{image:"/static/icon_experience.png",text:"品类",navigateTo:"experience"},{image:"/static/icon_show.png",text:"晒单",navigateTo:"show"},{image:"/static/icon_exchange.png",text:"兑换",navigateTo:"exchange"},{image:"/static/icon_guide.png",text:"新手指南",navigateTo:"guide"}],mescroll:null}},onLoad:function(t){var e=uni.getStorageSync("SessionKey"),i=uni.getStorageSync("UserInfo");if(t.id){var n=t.id;e||i||uni.setStorageSync("scene",n)}if(t.scene){var a=decodeURIComponent(t.scene);console.log("scene:"+a),e||i||uni.setStorageSync("scene",a)}},onShow:function(){if(this.mescroll){var t=this.mescroll;this.downCallback(t)}},onShareAppMessage:function(t){return(0,s.onShareAppMessage)(t)},methods:{websocket:function(){var t=this;uni.connectSocket({url:"wss://websocket.tengpaisc.com"}),uni.onSocketOpen((function(e){console.log("WebSocket连接已打开！"),uni.hideLoading(),g=!0;for(var i=0;i<h.length;i++)t.sendSocketMessage(h[i]);h=[]})),uni.onSocketError((function(e){console.log(e),console.log("WebSocket连接打开失败，请检查！"),(0,s.showErrorToast)("断线重连中..."),t.websocket()})),this.onSocketMessage()},sendSocketMessage:function(t){var e=JSON.stringify(t);console.log("发送数据",g,t),g?uni.sendSocketMessage({data:e}):h.push(t)},onSocketMessage:function(){return new Promise((function(t,e){uni.onSocketMessage((function(e){console.log("收到服务器内容："+e.data);var i=JSON.parse(e.data);console.log(i),t(i)}))}))},msgSubscribe:function(){var t=this.activeids,e=(0,s.formatTime)(new Date),i=this.isResetMode,n={msgType:20,msgTime:e,isResetMode:i,Activeids:t};this.sendSocketMessage(n)},downCallback:function(t){this.getAdsList(),this.getLastTransactionList(),this.mescroll=t,t.resetUpScroll()},upCallback:function(){var t=v(n.default.mark((function t(e){var i=this;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.onSocketMessage();case 2:t.sent,this.getListDataFromNet(e.num,e.size,(function(t){e.endSuccess(t.length),1==e.num&&(i.productList=[]),i.productList=i.productList.concat(t)}),(function(){e.endErr()}));case 4:case"end":return t.stop()}}),t,this)})));function e(e){return t.apply(this,arguments)}return e}(),getListDataFromNet:function(){var t=v(n.default.mark((function t(e,i,a,s){var o;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.getHomeProductListIng(e,i);case 3:o=t.sent,this.getHomeProductList(),a&&a(o),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),s&&s();case 11:case"end":return t.stop()}}),t,this,[[0,8]])})));function e(e,i,n,a){return t.apply(this,arguments)}return e}(),getAdsList:function(){var t=this,e={AdName:"首页头部轮播"};(0,s.request)(o.AdsListGet,e).then((function(e){t.swiper=e.AdsList[0].AdsViewList}))},getLastTransactionList:function(){var t=this,e={};(0,s.request)(o.LastTransactionListGet,e).then((function(e){t.LastTranActiveList=e.LastTranActiveList,t.LastTranActiveList.map((function(t){t.OrderUserNick=decodeURIComponent(t.OrderUserNick)})),e.LastTranActiveList.length>=2&&(t.multiple=2)}))},getHomeProductListIng:function(t,e){var i=this;return new Promise((function(n,a){var r={PageID:t,PageSize:e,SearchType:"home2"};(0,s.request)(o.HomeProductListGet,r).then((function(t){n(t.ProductList)})).catch((function(t){var e=i.mescroll;e.endErr()}))}))},getHomeProductList:function(){var t=v(n.default.mark((function t(){var e,i,a,r=this;return n.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.onSocketMessage();case 2:t.sent,e=this.pageNum,i=this.pageSize,a={PageID:e,PageSize:i,SearchType:"home1"},(0,s.request)(o.HomeProductListGet,a).then((function(t){1===e&&(r.productListIng=[]),r.productListIng=r.productListIng.concat(t.ProductList),r.productListIng.map((function(t){t.Active.LastBillUserName=decodeURIComponent(t.Active.LastBillUserName)}));var i=r.productListIng,n=i.map((function(t){return t.Active.ID}));r.activeids=n,r.PageCount=t.PageCount,r.msgSubscribe()}));case 7:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),lower:function(t){this.pageNum<this.PageCount&&(this.pageNum++,this.getHomeProductList())},noticeList:function(){(0,s.navigateTo)("../mall/notice/notice")},search:function(){(0,s.navigateTo)("../mall/search/search")},listClick:function(t){var e="../mall/".concat(t.navigateTo,"/").concat(t.navigateTo);(0,s.navigateTo)(e)}}});e.default=w},"628e":function(t,e,i){var n=i("d2f4");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("ba03347e",n,!0,{sourceMap:!1,shadowMode:!1})},6534:function(t,e,i){"use strict";i.r(e);var n=i("8670"),a=i("5135");for(var s in a)"default"!==s&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("65d4");var o=i("2877"),r=Object(o["a"])(a["default"],n["a"],n["b"],!1,null,"5c58fe7c",null);e["default"]=r.exports},"65d4":function(t,e,i){"use strict";var n=i("628e"),a=i.n(n);a.a},8670:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("mescroll-uni",{on:{down:function(e){e=t.$handleEvent(e),t.downCallback(e)},up:function(e){e=t.$handleEvent(e),t.upCallback(e)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"search-swiper"},[i("v-uni-view",{staticClass:"search",on:{click:function(e){e=t.$handleEvent(e),t.search(e)}}},[i("v-uni-image",{staticClass:"search-icon",attrs:{src:t.searchIcon}}),i("v-uni-input",{attrs:{placeholder:"搜索好物","placeholder-class":"placeholder",disabled:"true"}})],1),i("v-uni-view",{staticClass:"i-padding-wrap"},[i("v-uni-view",{staticClass:"page-section swiper"},[i("v-uni-view",{staticClass:"page-section-spacing"},[i("v-uni-swiper",{staticClass:"swiper-box round-dot",attrs:{"indicator-dots":t.indicatorDots,autoplay:t.autoplay,interval:t.interval,duration:t.duration,circular:t.circular,"indicator-active-color":t.indicatorActiveColor,"easing-function":t.easing}},t._l(t.swiper,(function(t,e){return i("v-uni-swiper-item",{key:e},[i("v-uni-image",{attrs:{src:t.AdPicUrl,mode:"aspectFill"}})],1)})),1)],1)],1)],1)],1),i("v-uni-view",{staticClass:"teng-option"},[i("v-uni-view",{staticClass:"teng-options"}),i("v-uni-view",{staticClass:"teng-options-grid"},[i("uni-grid",{attrs:{options:t.list,"show-border":!1,"show-out-border":!1,"column-num":4},on:{click:function(e){e=t.$handleEvent(e),t.listClick(e)}}})],1)],1),i("v-uni-view",{staticClass:"uni-swiper-msg"},[i("v-uni-view",{staticClass:"i-swiper-msg-icon"},[i("v-uni-image",{attrs:{src:"/static/icon/icon_notice.png",mode:"aspectFit"}})],1),i("v-uni-swiper",{staticClass:"uni-swiper-wrapper",attrs:{vertical:"true",autoplay:"true",circular:"true",interval:"3000","display-multiple-items":t.multiple}},[t._l(t.LastTranActiveList,(function(e,n){return[i("v-uni-swiper-item",[i("v-uni-view",{staticClass:"i-item-msg"},[i("v-uni-view",{staticClass:"teng-notice-content"},[i("v-uni-text",[t._v("恭喜")]),i("v-uni-text",{staticClass:"i-notice-original"},[t._v(t._s(e.OrderUserNick))]),t._v("以"),i("v-uni-text",{staticClass:"i-notice-original"},[t._v("¥"+t._s(e.OrderMoney))]),i("v-uni-text",[t._v("元拍得")]),i("v-uni-text",[t._v(t._s(e.ProductName))])],1)],1)],1)]}))],2),i("v-uni-view",{staticClass:"notice-more",on:{click:function(e){e=t.$handleEvent(e),t.noticeList(e)}}},[t._v("更多")])],1),i("product-list-being",{attrs:{options:t.productListIng},on:{lower:function(e){e=t.$handleEvent(e),t.lower(e)}}}),i("product-list",{attrs:{options:t.productList}})],1)],1)],1)},a=[];i.d(e,"a",(function(){return n})),i.d(e,"b",(function(){return a}))},d2f4:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-swiper-dots-horizontal[data-v-5c58fe7c]{position:absolute;font-size:0;margin-bottom:%?40?%;-webkit-transform-origin:20% 40%;-ms-transform-origin:20% 40%;transform-origin:20% 40%}.teng-option[data-v-5c58fe7c]{position:relative}.teng-options[data-v-5c58fe7c]{position:absolute;left:-20%;top:%?-24?%;background-color:#fff;width:140%;height:%?80?%;border-radius:50%/100% 100% 0 0}.search-swiper[data-v-5c58fe7c]{position:relative}.search[data-v-5c58fe7c]{position:absolute;top:%?20?%;left:50%;-webkit-transform:translate(-50%);-ms-transform:translate(-50%);transform:translate(-50%);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:90%;height:%?60?%;background-color:hsla(0,0%,100%,.4);border-radius:%?100?%;border:%?2?% solid #d7d8da;z-index:999}.search-icon[data-v-5c58fe7c]{width:%?28?%;height:%?28?%}.search uni-input[data-v-5c58fe7c]{width:20%;color:#707070;margin-left:%?10?%;padding:%?10?% 0 %?10?% 0}.placeholder[data-v-5c58fe7c]{color:#707070}.teng-options-grid[data-v-5c58fe7c]{background-color:#fff}.swiper-box[data-v-5c58fe7c]{height:%?480?%}.i-swiper-msg[data-v-5c58fe7c]{border-top:%?2?% solid #f4f4f4}.i-swiper-msg-icon[data-v-5c58fe7c]{width:%?180?%;height:%?80?%;margin-right:%?20?%}.uni-swiper-wrapper[data-v-5c58fe7c]{position:relative;width:90%;border-left:%?2?% solid #f4f4f4;padding-left:%?20?%}.i-notice-original[data-v-5c58fe7c]{color:#fe7f00}.notice-more[data-v-5c58fe7c]{width:%?120?%;color:#6a6a6a;border-left:%?4?% solid #f4f4f4;padding-left:%?20?%;z-index:10}.i-item-msg[data-v-5c58fe7c]{word-break:break-all;display:-webkit-box;overflow:hidden;line-height:1.5;-o-text-overflow:ellipsis;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:1}",""])}}]);