(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/orderList/orderList"],{"4f4d":function(t,e,n){"use strict";n.r(e);var r=n("e6a4"),o=n("d54b");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("b26e");var i=n("2877"),u=Object(i["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=u.exports},"7c44":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=u(n("a34a")),o=u(n("66fd")),a=n("c440"),i=n("5177");function u(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,r,o,a,i){try{var u=t[a](i),s=u.value}catch(c){return void n(c)}u.done?e(s):Promise.resolve(s).then(r,o)}function c(t){return function(){var e=this,n=arguments;return new Promise(function(r,o){var a=t.apply(e,n);function i(t){s(a,r,o,i,u,"next",t)}function u(t){s(a,r,o,i,u,"throw",t)}i(void 0)})}}var l=function(){return Promise.all([n.e("common/vendor"),n.e("components/mescroll-diy/mescroll-beibei")]).then(n.bind(null,"3e72"))},d=function(){return n.e("components/order-list/order-list").then(n.bind(null,"cc87"))},f=o.default.extend({components:{MescrollUni:l,mediaList:d},data:function(){return{current:0,OrderStatus:0,orderList:[],tabBars:[{name:"全部",id:"0",status:""},{name:"待付款",id:"1",status:"1"},{name:"待发货",id:"2",status:"2"},{name:"待收货",id:"3",status:"3"},{name:"待晒单",id:"4",status:"4"}],mescroll:[]}},onLoad:function(t){console.log(t);var e=t.status;this.current=e,this.OrderStatus=e},methods:{tapTab:function(t){this.current=t.target.dataset.current,this.OrderStatus=t.target.dataset.current;var e=this.mescroll;this.downCallback(e)},downCallback:function(t){this.mescroll=t,t.resetUpScroll()},upCallback:function(t){var e=this;this.getListDataFromNet(t.num,t.size,function(n){t.endSuccess(n.length),1==t.num&&(e.orderList=[]),e.orderList=e.orderList.concat(n)},function(){t.endErr()})},getListDataFromNet:function(){var t=c(r.default.mark(function t(e,n,o,a){var i;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e,n),t.prev=1,t.next=4,this.getOrderList(e,n);case 4:i=t.sent,this.orderList=i,console.log("data",this.orderList),o&&o(i),t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](1),a&&a();case 13:case"end":return t.stop()}},t,this,[[1,10]])}));function e(e,n,r,o){return t.apply(this,arguments)}return e}(),getOrderList:function(t,e){var n=this;return new Promise(function(r,o){var u=n.OrderStatus,s={OrderStatus:u,PageID:t,PageSize:e};(0,a.request)(i.OrderListGet,s).then(function(t){console.log(t),r(t.OrderList)})})},goDetail:function(e){console.log(e),t.navigateTo({url:"../orderDetail/orderDetail?id="+e.OrderID})},goOrderDrying:function(e){console.log(e),t.navigateTo({url:"../orderDryingUpload/orderDryingUpload?id="+e.OrderID})}}});e.default=f}).call(this,n("543d")["default"])},b26e:function(t,e,n){"use strict";var r=n("b597"),o=n.n(r);o.a},b597:function(t,e,n){},d54b:function(t,e,n){"use strict";n.r(e);var r=n("7c44"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);e["default"]=o.a},e6a4:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return o})}},[["e2f2","common/runtime","common/vendor"]]]);