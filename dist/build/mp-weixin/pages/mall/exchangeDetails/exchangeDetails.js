(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/exchangeDetails/exchangeDetails"],{"0fcb":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=a(t("a34a")),r=a(t("66fd")),s=t("c440"),i=t("5177");function a(e){return e&&e.__esModule?e:{default:e}}function c(e,n,t,o,r,s,i){try{var a=e[s](i),c=a.value}catch(u){return void t(u)}a.done?n(c):Promise.resolve(c).then(o,r)}function u(e){return function(){var n=this,t=arguments;return new Promise(function(o,r){var s=e.apply(n,t);function i(e){c(s,o,r,i,a,"next",e)}function a(e){c(s,o,r,i,a,"throw",e)}i(void 0)})}}var d=function(){return Promise.all([t.e("common/vendor"),t.e("components/uParse/src/wxParse")]).then(t.bind(null,"5f49"))},f=r.default.extend({components:{uParse:d},data:function(){return{id:"",addressID:"",article:"",integrals:"",userInfo:"",addressList:[],show:!1}},onLoad:function(e){this.id=e.id,this.integrals=e.integrals,console.log("onLoad",e)},onShow:function(){this.getProduct()},methods:{getProduct:function(){var n=u(o.default.mark(function n(){var t,r,a,c,u=this;return o.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return t=this.id,r={ProductID:t},(0,s.request)(i.ProductGet,r).then(function(e){u.article=e.Product.ProductDesc}),this.addressID=e.getStorageSync("addressID"),n.next=6,this.getLoginUser();case 6:return a=n.sent,this.userInfo=a,n.next=10,this.getUserAddressList();case 10:c=n.sent,this.addressList=c.AddressList;case 12:case"end":return n.stop()}},n,this)}));function t(){return n.apply(this,arguments)}return t}(),preview:function(e,n){console.log("src: "+e)},navigate:function(n,t){console.log("href: "+n),e.showModal({content:"点击链接为："+n,showCancel:!1})},isShow:function(){this.show=!0},getLoginUser:function(){return new Promise(function(n,t){var o={};(0,s.request)(i.GetLoginUser,o).then(function(t){e.setStorageSync("UserInfo",t.UserInfo),n(t.UserInfo)})})},getUserAddressList:function(){var e=this;return new Promise(function(n,t){var o=e.addressID,r={AddressID:o};(0,s.request)(i.UserAddressListGet,r).then(function(e){n(e)})})},exchangeSubmit:function(){var e=this,n=this.id,t=this.addressID;if(!t){var o="你还没有默认地址，请点击确定去填写地址信息！";(0,s.defaultShowModal)(o).then(function(e){console.log(e),e.confirm?(console.log("用户点击确定"),(0,s.navigateTo)("../../ucenter/addressShipping/addressShipping")):e.cancel&&console.log("用户点击取消")})}var r={ExchangeID:n,AddressID:t};(0,s.request)(i.OrderExchangeSubmit,r).then(function(n){e.show=!1;var t="兑换成功，请点击确定查看订单！";(0,s.defaultShowModal)(t).then(function(e){if(console.log(e),e.confirm){console.log("用户点击确定");var n="-1";(0,s.navigateTo)("../../ucenter/orderList/orderList?status="+n)}else e.cancel&&console.log("用户点击取消")}),console.log(n)})},hide:function(){this.show=!1},moveHandle:function(){this.show=!1},addressClick:function(){var e=!0;(0,s.navigateTo)("../../ucenter/addressShipping/addressShipping?disabled="+e)}}});n.default=f}).call(this,t("543d")["default"])},"240c":function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},r=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return r})},"2f50":function(e,n,t){},"47d4":function(e,n,t){"use strict";t.r(n);var o=t("0fcb"),r=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,function(){return o[e]})}(s);n["default"]=r.a},"4a96":function(e,n,t){"use strict";var o=t("2f50"),r=t.n(o);r.a},c4b6:function(e,n,t){"use strict";t.r(n);var o=t("240c"),r=t("47d4");for(var s in r)"default"!==s&&function(e){t.d(n,e,function(){return r[e]})}(s);t("4a96");var i=t("2877"),a=Object(i["a"])(r["default"],o["a"],o["b"],!1,null,null,null);n["default"]=a.exports}},[["4684","common/runtime","common/vendor"]]]);