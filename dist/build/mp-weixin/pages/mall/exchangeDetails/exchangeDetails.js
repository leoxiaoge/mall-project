(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/exchangeDetails/exchangeDetails"],{"2f50":function(e,n,t){},"47d4":function(e,n,t){"use strict";t.r(n);var r=t("73a3"),s=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,function(){return r[e]})}(o);n["default"]=s.a},"4a96":function(e,n,t){"use strict";var r=t("2f50"),s=t.n(r);s.a},"50c1":function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement;e._self._c},s=[];t.d(n,"a",function(){return r}),t.d(n,"b",function(){return s})},"73a3":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t("a34a")),s=a(t("66fd")),o=t("c440"),i=t("5177");function a(e){return e&&e.__esModule?e:{default:e}}function u(e,n,t,r,s,o,i){try{var a=e[o](i),u=a.value}catch(c){return void t(c)}a.done?n(u):Promise.resolve(u).then(r,s)}function c(e){return function(){var n=this,t=arguments;return new Promise(function(r,s){var o=e.apply(n,t);function i(e){u(o,r,s,i,a,"next",e)}function a(e){u(o,r,s,i,a,"throw",e)}i(void 0)})}}var d=function(){return Promise.all([t.e("common/vendor"),t.e("components/uParse/src/wxParse")]).then(t.bind(null,"5f49"))},f=s.default.extend({components:{uParse:d},data:function(){return{id:"",productID:"",addressID:"",article:"",integrals:"",userInfo:"",addressList:"",show:!1}},onLoad:function(e){this.id=e.id,this.productID=e.productID,this.integrals=e.integrals},onShow:function(){this.getProduct()},onShareAppMessage:function(e){return(0,o.onShareAppMessage)(e)},methods:{getProduct:function(){var n=c(r.default.mark(function n(){var t,s,a,u,c=this;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return t=this.productID,s={ProductID:t},(0,o.request)(i.ProductGet,s).then(function(e){c.article=e.Product.ProductDesc}),this.addressID=e.getStorageSync("addressID"),n.next=6,this.getLoginUser();case 6:return a=n.sent,this.userInfo=a,n.next=10,this.getUserAddressList();case 10:u=n.sent,this.addressList=u;case 12:case"end":return n.stop()}},n,this)}));function t(){return n.apply(this,arguments)}return t}(),preview:function(e,n){console.log("src: "+e)},navigate:function(e,n){(0,o.showModal)("点击链接为："+e)},isShow:function(){this.show=!0},getLoginUser:function(){return new Promise(function(n,t){var r={};(0,o.request)(i.GetLoginUser,r).then(function(t){e.setStorageSync("UserInfo",t.UserInfo),n(t.UserInfo)})})},getUserAddressList:function(){var e=this;return new Promise(function(n,t){var r=e.addressID,s={AddressID:r};(0,o.request)(i.UserAddressListGet,s).then(function(e){console.log(e.AddressList);var t=e.AddressList;t.map(function(e){console.log(e),1===e.IsDefault&&n(e)})})})},exchangeSubmit:function(){var e=this,n=this.id,t=this.addressID;if(!t){var r="你还没有默认地址，请点击确定去填写地址信息！";(0,o.defaultShowModal)(r).then(function(e){e.confirm?(console.log("用户点击确定"),(0,o.navigateTo)("../../ucenter/addressShipping/addressShipping")):e.cancel&&console.log("用户点击取消")})}var s={ExchangeID:n,AddressID:t};(0,o.request)(i.OrderExchangeSubmit,s).then(function(n){e.show=!1;var t="兑换成功，请点击确定查看订单！";(0,o.defaultShowModal)(t).then(function(e){if(e.confirm){console.log("用户点击确定");var n="-1";(0,o.navigateTo)("../../ucenter/orderList/orderList?status="+n)}else e.cancel&&console.log("用户点击取消")})})},hide:function(){this.show=!1},moveHandle:function(){this.show=!1},addressClick:function(){(0,o.navigateTo)("../../ucenter/addressShipping/addressShipping")}}});n.default=f}).call(this,t("543d")["default"])},c4b6:function(e,n,t){"use strict";t.r(n);var r=t("50c1"),s=t("47d4");for(var o in s)"default"!==o&&function(e){t.d(n,e,function(){return s[e]})}(o);t("4a96");var i=t("2877"),a=Object(i["a"])(s["default"],r["a"],r["b"],!1,null,null,null);n["default"]=a.exports}},[["4684","common/runtime","common/vendor"]]]);