(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-home"],{"36ff":function(t,e,i){"use strict";i.r(e);var n=i("3a47"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,function(){return n[t]})}(o);e["default"]=a.a},"3a47":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=p(i("a34a")),a=p(i("e143")),o=i("c440"),s=i("5177"),c=p(i("3e72")),r=p(i("0ad7")),u=p(i("cff3")),l=p(i("8c9a")),d=p(i("4207"));function p(t){return t&&t.__esModule?t:{default:t}}function v(t,e,i,n,a,o,s){try{var c=t[o](s),r=c.value}catch(u){return void i(u)}c.done?e(r):Promise.resolve(r).then(n,a)}function f(t){return function(){var e=this,i=arguments;return new Promise(function(n,a){var o=t.apply(e,i);function s(t){v(o,n,a,s,c,"next",t)}function c(t){v(o,n,a,s,c,"throw",t)}s(void 0)})}}var g=!1,h=[],m=a.default.extend({components:{MescrollUni:c.default,showTips:r.default,uniGrid:u.default,productListBeing:l.default,productList:d.default},data:function(){return{indicatorDots:!0,autoplay:!0,interval:5e3,duration:500,circular:!0,indicatorActiveColor:"#fe7f00",easing:"easeInOutCubic",multiple:1,searchIcon:"/static/icon/icon_search.png",productList:[],productListIng:[],productListData:[],swiperGridHeight:"0px",swiperGridWidth:"100%",swiper:[],LastTranActiveList:[],activeids:[],isReseMode:!1,PageCount:1,pageNum:1,pageSize:10,list:[{image:"/static/icon_experience.png",text:"品类",navigateTo:"experience"},{image:"/static/icon_show.png",text:"晒单",navigateTo:"show"},{image:"/static/icon_exchange.png",text:"兑换",navigateTo:"exchange"},{image:"/static/icon_guide.png",text:"新手指南",navigateTo:"guide"}],mescroll:null}},onLoad:function(t){var e=uni.getStorageSync("SessionKey"),i=uni.getStorageSync("UserInfo");if(t.id){var n=t.id;e||i||uni.setStorageSync("scene",n)}if(t.scene){var a=decodeURIComponent(t.scene);console.log("scene:"+a),e||i||uni.setStorageSync("scene",a)}},onShow:function(){this.websocket()},onHide:function(){uni.closeSocket()},onUnload:function(){uni.closeSocket()},onShareAppMessage:function(t){return(0,o.onShareAppMessage)(t)},methods:{websocket:function(){var t=this;uni.connectSocket({url:"wss://websocket.tengpaisc.com"}),uni.onSocketOpen(function(e){console.log("WebSocket连接已打开！"),uni.hideLoading(),g=!0;for(var i=0;i<h.length;i++)t.sendSocketMessage(h[i]);if(h=[],t.getHomeProductList(),t.mescroll){var n=t.mescroll;t.downCallback(n)}t.onSocketMessage()}),uni.onSocketError(function(e){console.log("WebSocket连接打开失败，请检查！"),(0,o.showErrorToast)("断线重连中..."),t.websocket()})},sendSocketMessage:function(t){var e=JSON.stringify(t);console.log("发送数据",g,t),g?uni.sendSocketMessage({data:e}):h.push(t)},onSocketMessage:function(){var t=this;uni.onSocketMessage(function(e){console.log("收到服务器内容："+e.data);var i=JSON.parse(e.data),n=i.msgType;if(null!=i)try{switch(n){case 21:t.productListIng.map(function(t){i.ActiveID===t.Active.ID&&(i.LastBill&&(t.Active.LastBillUserName=decodeURIComponent(i.LastBill.nick),t.Active.LastBillUserFace=i.LastBill.face),t.Price=i.Price,t.Active.SeqMiniSeconds=i.SeqMiniSeconds,t.Status=i.Status)}),t.productList.map(function(t){i.ActiveID===t.Active.ID&&(i.LastBill&&(t.Active.LastBillUserName=decodeURIComponent(i.LastBill.nick),t.Active.LastBillUserFace=i.LastBill.face),t.Price=i.Price,t.Active.SeqMiniSeconds=i.SeqMiniSeconds,t.Status=i.Status)});var a=JSON.parse(JSON.stringify(t.productListIng));t.productListIng=a;var o=JSON.parse(JSON.stringify(t.productList));t.productList=o;break}}catch(s){console.error("处理消息出错："+s)}})},msgSubscribe:function(t){console.log("发送对该活动的消息订阅");var e=t,i=(0,o.formatTime)(new Date),n=this.isReseMode,a={msgType:20,msgTime:i,isReseMode:n,Activeids:e};this.sendSocketMessage(a)},downCallback:function(t){this.getAdsList(),this.getLastTransactionList(),this.isReseMode=!0,this.mescroll=t,t.resetUpScroll()},upCallback:function(t){var e=this;this.getListDataFromNet(t.num,t.size,function(i){t.endSuccess(i.length),1==t.num&&(e.productList=[]),e.productList=e.productList.concat(i),e.isReseMode=!1},function(){t.endErr()})},getListDataFromNet:function(){var t=f(n.default.mark(function t(e,i,a,o){var s,c,r;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,this.getHomeProductListIng(e,i);case 3:s=t.sent,c=s.productList,r=s.data,this.msgSubscribe(r),a&&a(c),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](0),o&&o();case 13:case"end":return t.stop()}},t,this,[[0,10]])}));function e(e,i,n,a){return t.apply(this,arguments)}return e}(),getAdsList:function(){var t=this,e={AdName:"首页头部轮播"};(0,o.request)(s.AdsListGet,e).then(function(e){t.swiper=e.AdsList[0].AdsViewList})},getLastTransactionList:function(){var t=this,e={};(0,o.request)(s.LastTransactionListGet,e).then(function(e){t.LastTranActiveList=e.LastTranActiveList,t.LastTranActiveList.map(function(t){t.OrderUserNick=decodeURIComponent(t.OrderUserNick)}),e.LastTranActiveList.length>=2&&(t.multiple=2)})},getHomeProductListIng:function(t,e){var i=this;return new Promise(function(n,a){var c={PageID:t,PageSize:e,SearchType:"home2"};(0,o.request)(s.HomeProductListGet,c).then(function(t){var e=t.ProductList,i=e.map(function(t){return t.Active.ID});n({productList:e,data:i})}).catch(function(t){var e=i.mescroll;e.endErr()})})},getHomeProductList:function(){var t=this,e=this.pageNum,i=this.pageSize,n={PageID:e,PageSize:i,SearchType:"home1"};(0,o.request)(s.HomeProductListGet,n).then(function(i){1===e&&(t.productListIng=[]),t.productListIng=t.productListIng.concat(i.ProductList),t.productListIng.map(function(t){t.Active.LastBillUserName=decodeURIComponent(t.Active.LastBillUserName)}),t.PageCount=i.PageCount;var n=t.productListIng,a=n.map(function(t){return t.Active.ID});t.msgSubscribe(a)})},lower:function(t){this.pageNum<this.PageCount&&(this.pageNum++,this.getHomeProductList())},noticeList:function(){(0,o.navigateTo)("../mall/notice/notice")},search:function(){(0,o.navigateTo)("../mall/search/search")},listClick:function(t){var e="../mall/".concat(t.navigateTo,"/").concat(t.navigateTo);(0,o.navigateTo)(e)},productDetailsTo:function(t,e,i){e&&i&&(0,o.navigateTo)("".concat(e,"?").concat(i))}}});e.default=m},"3af4":function(t,e,i){var n=i("87a4");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("8e5a7eee",n,!0,{sourceMap:!1,shadowMode:!1})},5309:function(t,e,i){"use strict";var n=i("3af4"),a=i.n(n);a.a},"87a4":function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".uni-swiper-dots-horizontal[data-v-025e0988]{position:absolute;font-size:0;margin-bottom:%?40?%;-webkit-transform-origin:20% 40%;-ms-transform-origin:20% 40%;transform-origin:20% 40%}.teng-option[data-v-025e0988]{position:relative}.teng-options[data-v-025e0988]{position:absolute;top:%?-32?%;background-color:#fff;width:100%;height:%?36?%;border-radius:50%/100% 100% 0 0}.search-swiper[data-v-025e0988]{position:relative}.search[data-v-025e0988]{position:absolute;top:%?20?%;left:50%;-webkit-transform:translate(-50%);-ms-transform:translate(-50%);transform:translate(-50%);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;width:90%;height:%?60?%;background-color:hsla(0,0%,100%,.4);border-radius:%?100?%;border:%?2?% solid #d7d8da;z-index:999}.search-icon[data-v-025e0988]{width:%?28?%;height:%?28?%}.search uni-input[data-v-025e0988]{width:20%;color:#707070;margin-left:%?10?%;padding:%?10?% 0 %?10?% 0}.placeholder[data-v-025e0988]{color:#707070}.teng-options-grid[data-v-025e0988]{background-color:#fff}.swiper-box[data-v-025e0988]{height:%?480?%}.i-swiper-msg[data-v-025e0988]{border-top:%?2?% solid #f4f4f4}.i-swiper-msg-icon[data-v-025e0988]{width:%?180?%;height:%?80?%;margin-right:%?20?%}.uni-swiper-wrapper[data-v-025e0988]{position:relative;width:90%;border-left:%?2?% solid #f4f4f4;padding-left:%?20?%}.i-notice-original[data-v-025e0988]{color:#fe7f00}.notice-more[data-v-025e0988]{width:%?120?%;color:#6a6a6a;border-left:%?4?% solid #f4f4f4;padding-left:%?20?%;z-index:10}.i-item-msg[data-v-025e0988]{word-break:break-all;display:-webkit-box;overflow:hidden;line-height:1.5;-o-text-overflow:ellipsis;text-overflow:ellipsis;-webkit-box-orient:vertical;-webkit-line-clamp:1}",""])},e79a:function(t,e,i){"use strict";i.r(e);var n=i("f8a8"),a=i("36ff");for(var o in a)"default"!==o&&function(t){i.d(e,t,function(){return a[t]})}(o);i("5309");var s=i("2877"),c=Object(s["a"])(a["default"],n["a"],n["b"],!1,null,"025e0988",null);e["default"]=c.exports},f8a8:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("mescroll-uni",{on:{down:function(e){e=t.$handleEvent(e),t.downCallback(e)},up:function(e){e=t.$handleEvent(e),t.upCallback(e)}}},[i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"search-swiper"},[i("v-uni-view",{staticClass:"search",on:{click:function(e){e=t.$handleEvent(e),t.search(e)}}},[i("v-uni-image",{staticClass:"search-icon",attrs:{src:t.searchIcon}}),i("v-uni-input",{attrs:{placeholder:"搜索好物","placeholder-class":"placeholder",disabled:"true"}})],1),i("v-uni-view",{staticClass:"i-padding-wrap"},[i("v-uni-view",{staticClass:"page-section swiper"},[i("v-uni-view",{staticClass:"page-section-spacing"},[i("v-uni-swiper",{staticClass:"swiper-box round-dot",attrs:{"indicator-dots":t.indicatorDots,autoplay:t.autoplay,interval:t.interval,duration:t.duration,circular:t.circular,"indicator-active-color":t.indicatorActiveColor,"easing-function":t.easing}},t._l(t.swiper,function(e,n){return i("v-uni-swiper-item",{key:n},[i("v-uni-image",{attrs:{src:e.AdPicUrl,mode:"aspectFill"},on:{click:function(i){i=t.$handleEvent(i),t.productDetailsTo(e.ID,e.AdLinkUrl,e.AdParaments)}}})],1)}),1)],1)],1)],1)],1),i("v-uni-view",{staticClass:"teng-option"},[i("v-uni-view",{staticClass:"teng-options"}),i("v-uni-view",{staticClass:"teng-options-grid"},[i("uni-grid",{attrs:{options:t.list,"show-border":!1,"show-out-border":!1,"column-num":4},on:{click:function(e){e=t.$handleEvent(e),t.listClick(e)}}})],1)],1),i("v-uni-view",{staticClass:"uni-swiper-msg"},[i("v-uni-view",{staticClass:"i-swiper-msg-icon"},[i("v-uni-image",{attrs:{src:"/static/icon/icon_notice.png",mode:"aspectFit"}})],1),i("v-uni-swiper",{staticClass:"uni-swiper-wrapper",attrs:{vertical:"true",autoplay:"true",circular:"true",interval:"3000","display-multiple-items":t.multiple}},[t._l(t.LastTranActiveList,function(e,n){return[i("v-uni-swiper-item",[i("v-uni-view",{staticClass:"i-item-msg"},[i("v-uni-view",{staticClass:"teng-notice-content"},[i("v-uni-text",[t._v("恭喜")]),i("v-uni-text",{staticClass:"i-notice-original"},[t._v(t._s(e.OrderUserNick))]),t._v("以"),i("v-uni-text",{staticClass:"i-notice-original"},[t._v("¥"+t._s(e.OrderMoney))]),i("v-uni-text",[t._v("元拍得")]),i("v-uni-text",[t._v(t._s(e.ProductName))])],1)],1)],1)]})],2),i("v-uni-view",{staticClass:"notice-more",on:{click:function(e){e=t.$handleEvent(e),t.noticeList(e)}}},[t._v("更多")])],1),i("product-list-being",{attrs:{options:t.productListIng},on:{lower:function(e){e=t.$handleEvent(e),t.lower(e)}}}),i("product-list",{attrs:{options:t.productList}})],1)],1)],1)},a=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return a})}}]);