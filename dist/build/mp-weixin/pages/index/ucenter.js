(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/ucenter"],{"0707":function(n,t,e){"use strict";e.r(t);var i=e("8f06"),o=e.n(i);for(var a in i)"default"!==a&&function(n){e.d(t,n,(function(){return i[n]}))}(a);t["default"]=o.a},1488:function(n,t,e){"use strict";var i=e("a455"),o=e.n(i);o.a},"35b8":function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"a",(function(){return i})),e.d(t,"b",(function(){return o}))},"8f06":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=c(e("a34a")),o=c(e("66fd")),a=e("c440"),r=e("5177");function c(n){return n&&n.__esModule?n:{default:n}}function s(n,t,e,i,o,a,r){try{var c=n[a](r),s=c.value}catch(u){return void e(u)}c.done?t(s):Promise.resolve(s).then(i,o)}function u(n){return function(){var t=this,e=arguments;return new Promise((function(i,o){var a=n.apply(t,e);function r(n){s(a,i,o,r,c,"next",n)}function c(n){s(a,i,o,r,c,"throw",n)}r(void 0)}))}}var f=function(){return e.e("components/uni-grid/uni-grid").then(e.bind(null,"cff3"))},d=function(){return e.e("components/uni-list/uni-list").then(e.bind(null,"7f33"))},l=function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"4c2b"))},g=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"f0ab"))},p=o.default.extend({components:{uniGrid:f,uniList:d,uniListItem:l,uniIcon:g},data:function(){return{sessionkey:"",userInfo:"",userFace:"",userNick:"",Integrals:"",lists:[{id:0,image:"/static/icon/icon_pending_address.png",text:"待填地址",status:"0",navigateTo:"orderList"},{id:1,image:"/static/icon/icon_pending_payment.png",text:"待付款",status:"1",navigateTo:"orderList"},{id:2,image:"/static/icon/icon_pending_receipt.png",text:"待收货",status:"3",navigateTo:"orderList"},{id:3,image:"/static/icon/icon_pending_order.png",text:"待晒单",status:"4",navigateTo:"orderList"}],listItem:[{icon:"/static/icon/icon_auction.png",title:"我的竞拍",navigateTo:"myAuction"},{icon:"/static/icon/icon_order.png",title:"我的晒单",navigateTo:"myOrder"},{icon:"/static/icon/icon_address.png",title:"收货地址",navigateTo:"addressShipping"},{icon:"/static/icon/icon_exchange.png",title:"积分兑换",navigateTo:"exchange"},{icon:"/static/icon/icon_share.png",title:"分享得豪礼",navigateTo:"sharePromotion"},{icon:"/static/icon/icon_feedback.png",title:"帮助反馈",navigateTo:"helpAndFeedback"}]}},onLoad:function(){},onShow:function(){this.useInfo()},onShareAppMessage:function(n){return(0,a.onShareAppMessage)(n)},onNavigationBarButtonTap:function(n){(0,a.navigateTo)("/pages/ucenter/setting/setting")},methods:{useInfo:function(){var t=u(i.default.mark((function t(){var e;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return this.sessionkey=n.getStorageSync("SessionKey"),t.next=3,this.getLoginUser();case 3:e=t.sent,this.userInfo=e,this.userFace=e.userFace,this.userNick=decodeURIComponent(e.userNick),e.Integrals&&n.showTabBarRedDot({index:3}),this.listItem.map((function(n,t){3===t&&(n.showBadge=!0,n.badgeText=e.Integrals)}));case 9:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),VIPCard:function(){(0,a.navigateTo)("../store/store/store")},loginPath:function(){(0,a.navigateTo)("../ucenter/login/login")},recharge:function(){(0,a.navigateTo)("../ucenter/recharge/recharge")},allOrderClick:function(){var n=-1;(0,a.navigateTo)("../ucenter/orderList/orderList?status="+n)},getLoginUser:function(){return new Promise((function(t,e){var i={};(0,a.request)(r.GetLoginUser,i).then((function(e){n.setStorageSync("UserInfo",e.UserInfo),t(e.UserInfo)}))}))},orderClick:function(n){var t=n.status,e="../ucenter/".concat(n.navigateTo,"/").concat(n.navigateTo,"?status=")+t;(0,a.navigateTo)(e)},clear:function(){var t=this,e="是否确定退出登录？";(0,a.defaultShowModal)(e).then((function(e){if(e.confirm){console.log("用户点击确定");try{n.clearStorageSync()}catch(i){(0,a.showToast)("退出登录失败")}t.sessionkey="",t.userInfo=""}else e.cancel&&console.log("用户点击取消")}))}}});t.default=p}).call(this,e("543d")["default"])},9386:function(n,t,e){"use strict";e.r(t);var i=e("35b8"),o=e("0707");for(var a in o)"default"!==a&&function(n){e.d(t,n,(function(){return o[n]}))}(a);e("1488");var r=e("2877"),c=Object(r["a"])(o["default"],i["a"],i["b"],!1,null,null,null);t["default"]=c.exports},a455:function(n,t,e){},e6fd:function(n,t,e){"use strict";(function(n){e("6cdc"),e("921b");var t=i(e("9386"));function i(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])}},[["e6fd","common/runtime","common/vendor"]]]);