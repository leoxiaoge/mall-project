(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/ucenter"],{"0707":function(t,n,e){"use strict";e.r(n);var i=e("2715"),o=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);n["default"]=o.a},1488:function(t,n,e){"use strict";var i=e("47b6"),o=e.n(i);o.a},2715:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=s(e("a34a")),o=s(e("66fd")),a=e("c440"),r=e("5177");function s(t){return t&&t.__esModule?t:{default:t}}function c(t,n,e,i,o,a,r){try{var s=t[a](r),c=s.value}catch(u){return void e(u)}s.done?n(c):Promise.resolve(c).then(i,o)}function u(t){return function(){var n=this,e=arguments;return new Promise(function(i,o){var a=t.apply(n,e);function r(t){c(a,i,o,r,s,"next",t)}function s(t){c(a,i,o,r,s,"throw",t)}r(void 0)})}}var d=function(){return e.e("components/uni-grid/uni-grid").then(e.bind(null,"cff3"))},g=function(){return e.e("components/uni-list/uni-list").then(e.bind(null,"7f33"))},f=function(){return e.e("components/uni-list-item/uni-list-item").then(e.bind(null,"4c2b"))},l=function(){return e.e("components/uni-icon/uni-icon").then(e.bind(null,"f0ab"))},p=o.default.extend({components:{uniGrid:d,uniList:g,uniListItem:f,uniIcon:l},data:function(){return{sessionkey:"",userInfo:"",userFace:"",userNick:"",Integrals:"",lists:[{id:0,image:"/static/icon/icon_pending_address.png",text:"待填地址",status:0,totals:0,navigateTo:"orderList"},{id:1,image:"/static/icon/icon_pending_payment.png",text:"待付款",status:1,totals:0,navigateTo:"orderList"},{id:2,image:"/static/icon/icon_pending_receipt.png",text:"待收货",status:3,totals:0,navigateTo:"orderList"},{id:3,image:"/static/icon/icon_pending_order.png",text:"待晒单",status:4,totals:0,navigateTo:"orderList"}],listItem:[{icon:"/static/icon/icon_auction.png",title:"我的竞拍",navigateTo:"myAuction"},{icon:"/static/icon/icon_order.png",title:"我的晒单",navigateTo:"myOrder"},{icon:"/static/icon/icon_address.png",title:"收货地址",navigateTo:"addressShipping"},{icon:"/static/icon/icon_exchange.png",title:"积分兑换",navigateTo:"exchange"},{icon:"/static/icon/icon_share.png",title:"分享得豪礼",navigateTo:"sharePromotion"},{icon:"/static/icon/icon_feedback.png",title:"帮助反馈",navigateTo:"helpAndFeedback"}]}},onLoad:function(){},onShow:function(){t.getStorageSync("SessionKey")||this.empty(),this.useInfo(),this.getOrderSummary()},onShareAppMessage:function(t){return(0,a.onShareAppMessage)(t)},onNavigationBarButtonTap:function(t){(0,a.navigateTo)("/pages/ucenter/setting/setting")},methods:{useInfo:function(){var n=u(i.default.mark(function n(){var e;return i.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return this.sessionkey=t.getStorageSync("SessionKey"),n.next=3,this.getLoginUser();case 3:e=n.sent,this.userInfo=e,this.userFace=e.userFace,this.userNick=decodeURIComponent(e.userNick),e.Integrals&&t.showTabBarRedDot({index:3}),this.listItem.map(function(t,n){3===n&&(t.showBadge=!0,t.badgeText=e.Integrals)});case 9:case"end":return n.stop()}},n,this)}));function e(){return n.apply(this,arguments)}return e}(),getOrderSummary:function(){var t=u(i.default.mark(function t(){var n,e,o;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.orderSummary();case 2:n=t.sent,e=JSON.parse(JSON.stringify(this.lists)),e.map(function(t){n.map(function(n){t.status===n.OrderStatus&&(t.totals=n.TotalCount)})}),o=JSON.parse(JSON.stringify(e)),this.lists=o;case 7:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),orderSummary:function(){return new Promise(function(t,n){var e={};(0,a.request)(r.OrderSummary,e).then(function(n){t(n.SummaryList)})})},VIPCard:function(){(0,a.navigateTo)("../store/store/store")},loginPath:function(){(0,a.navigateTo)("../ucenter/login/login")},recharge:function(){(0,a.navigateTo)("../ucenter/recharge/recharge")},allOrderClick:function(){var t=-1;(0,a.navigateTo)("../ucenter/orderList/orderList?status="+t)},getLoginUser:function(){return new Promise(function(n,e){var i={};(0,a.request)(r.GetLoginUser,i).then(function(e){t.setStorageSync("UserInfo",e.UserInfo),n(e.UserInfo)})})},orderClick:function(t){var n=t.status,e="../ucenter/".concat(t.navigateTo,"/").concat(t.navigateTo,"?status=")+n;(0,a.navigateTo)(e)},clear:function(){var n=this,e="是否确定退出登录？";(0,a.defaultShowModal)(e).then(function(e){if(e.confirm){console.log("用户点击确定");try{t.clearStorageSync(),n.empty()}catch(i){(0,a.showToast)("退出登录失败")}}else e.cancel&&console.log("用户点击取消")})},empty:function(){this.userInfo="",this.lists=[{id:0,image:"/static/icon/icon_pending_address.png",text:"待填地址",status:0,totals:0,navigateTo:"orderList"},{id:1,image:"/static/icon/icon_pending_payment.png",text:"待付款",status:1,totals:0,navigateTo:"orderList"},{id:2,image:"/static/icon/icon_pending_receipt.png",text:"待收货",status:3,totals:0,navigateTo:"orderList"},{id:3,image:"/static/icon/icon_pending_order.png",text:"待晒单",status:4,totals:0,navigateTo:"orderList"}]}}});n.default=p}).call(this,e("543d")["default"])},"47b6":function(t,n,e){},6101:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return o})},9386:function(t,n,e){"use strict";e.r(n);var i=e("6101"),o=e("0707");for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);e("1488");var r=e("2877"),s=Object(r["a"])(o["default"],i["a"],i["b"],!1,null,null,null);n["default"]=s.exports}},[["e6fd","common/runtime","common/vendor"]]]);