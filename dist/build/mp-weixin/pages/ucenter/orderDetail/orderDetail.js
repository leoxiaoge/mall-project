(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/orderDetail/orderDetail"],{"04d4":function(e,t,n){"use strict";n.r(t);var r=n("cc5c"),i=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);t["default"]=i.a},2708:function(e,t,n){},"2de5":function(e,t,n){"use strict";var r=n("2708"),i=n.n(r);i.a},"3ad3":function(e,t,n){"use strict";n.r(t);var r=n("cd9e"),i=n("04d4");for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);n("2de5");var a=n("2877"),s=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,null,null);t["default"]=s.exports},cc5c:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=s(n("a34a")),i=s(n("66fd")),o=n("c440"),a=n("5177");function s(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,r,i,o,a){try{var s=e[o](a),u=s.value}catch(c){return void n(c)}s.done?t(u):Promise.resolve(u).then(r,i)}function c(e){return function(){var t=this,n=arguments;return new Promise(function(r,i){var o=e.apply(t,n);function a(e){u(o,r,i,a,s,"next",e)}function s(e){u(o,r,i,a,s,"throw",e)}a(void 0)})}}var d=function(){return n.e("components/uni-icon/uni-icon").then(n.bind(null,"f0ab"))},f=function(){return n.e("components/uni-steps/uni-steps").then(n.bind(null,"947b"))},p=i.default.extend({components:{uniIcon:d,uniSteps:f},data:function(){return{indicatorDots:!1,autoplay:!1,interval:5e3,duration:500,circular:!0,active:0,id:"",orderID:"",PayTypeID:1,icon:"",order:[],address:[]}},onLoad:function(e){this.id=e.id,this.orderID=e.OrderID},onShow:function(){this.getOrderList(),this.$store.dispatch("getUserOpenId")},onShareAppMessage:function(e){return(0,o.onShareAppMessage)(e)},methods:{getOrderList:function(){var e=this,t=this.orderID,n={OrderID:t};(0,o.request)(a.OrderListGet,n).then(function(t){console.log(t.OrderList[0]);var n=t.OrderList;e.order=n,n.map(function(t){t.CreatedTime=(0,o.formatTime)(new Date(t.Created)),t.UpdatedTime=(0,o.formatTime)(new Date(t.Updated)),t.SendGoodsDateTime=(0,o.formatTime)(new Date(t.SendGoodsDate)),0===t.OrderStatus?e.icon="/static/icon/icon_order-status1.png":1===t.OrderStatus?e.icon="/static/icon/icon_order-status2.png":2===t.OrderStatus?e.icon="/static/icon/icon_order-status3.png":3===t.OrderStatus?e.icon="/static/icon/icon_order-status4.png":e.icon="/static/icon/icon_order-status5.png"})})},setClipboard:function(t){console.log(t),e.setClipboardData({data:t,success:function(){console.log("success")}})},addressPath:function(){(0,o.navigateTo)("../addressShipping/addressShipping")},actionButton:function(){var e=c(r.default.mark(function e(t){var n,i,a;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:console.log(t),e.t0=t,e.next="填写地址"===e.t0?4:"确认收货"===e.t0?8:"去支付"===e.t0?13:"晒单"===e.t0?15:17;break;case 4:return n=!0,i=this.orderID,(0,o.navigateTo)("../addressShipping/addressShipping?disabled="+n+"&orderID="+i),e.abrupt("break",17);case 8:return e.next=10,this.orderConfirmReceiving();case 10:return a=e.sent,a.IsError?(0,o.showToast)(a.ErrMsg):((0,o.showToast)("确认收货成功！"),this.getOrderList()),e.abrupt("break",17);case 13:return this.payment(),e.abrupt("break",17);case 15:return(0,o.navigateTo)("../orderDryingUpload/orderDryingUpload?id="+this.id+"&OrderID="+this.orderID),e.abrupt("break",17);case 17:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),orderConfirmReceiving:function(){var e=this;return new Promise(function(t,n){var r=e.orderID,i={OrderID:r};(0,o.request)(a.OrderConfirmReceiving,i).then(function(e){t(e),console.log(e)})})},payment:function(){var t=c(r.default.mark(function t(){var n,i,a;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=this,t.next=3,this.payMoneySubmit();case 3:i=t.sent,a=JSON.parse(i),e.requestPayment({timeStamp:a.timeStamp,nonceStr:a.nonceStr,package:a.package,signType:"MD5",paySign:a.paySign,success:function(){(0,o.showToast)("充值成功！!"),n.getOrderList()},fail:function(){(0,o.showModal)("支付失败，用户取消支付!")}});case 6:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),payMoneySubmit:function(){var e=c(r.default.mark(function e(){var t,n,i,s;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this.$store.state,n=t.openid,i=this.orderID,s=this.PayTypeID,e.abrupt("return",new Promise(function(e,t){var r={OrderID:i,PayTypeID:s,OpenID:n};(0,o.request)(a.OrderPay,r).then(function(t){console.log(t),e(t.PayParam)})}));case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()}});t.default=p}).call(this,n("543d")["default"])},cd9e:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return i})}},[["e025","common/runtime","common/vendor"]]]);