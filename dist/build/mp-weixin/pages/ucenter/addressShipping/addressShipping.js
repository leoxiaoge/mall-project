(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/addressShipping/addressShipping"],{1097:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"a",function(){return s}),n.d(t,"b",function(){return r})},"3ff3":function(e,t,n){"use strict";n.r(t);var s=n("1097"),r=n("ff55");for(var d in r)"default"!==d&&function(e){n.d(t,e,function(){return r[e]})}(d);n("8aa1");var o=n("2877"),i=Object(o["a"])(r["default"],s["a"],s["b"],!1,null,null,null);t["default"]=i.exports},"8aa1":function(e,t,n){"use strict";var s=n("b56b"),r=n.n(s);r.a},b56b:function(e,t,n){},d8b3:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i(n("a34a")),r=i(n("66fd")),d=n("c440"),o=n("5177");function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,s,r,d,o){try{var i=e[d](o),a=i.value}catch(u){return void n(u)}i.done?t(a):Promise.resolve(a).then(s,r)}function u(e){return function(){var t=this,n=arguments;return new Promise(function(s,r){var d=e.apply(t,n);function o(e){a(d,s,r,o,i,"next",e)}function i(e){a(d,s,r,o,i,"throw",e)}o(void 0)})}}var c=function(){return n.e("components/u-no/u-no").then(n.bind(null,"19e5"))},f=function(){return n.e("components/uni-icon/uni-icon").then(n.bind(null,"f0ab"))},l=r.default.extend({components:{uNo:c,uniIcon:f},data:function(){return{productID:"",orderID:"",addressID:"",addressList:[],type:"checkbox-filled",isDefault:!1,disabled:!1,noTitle:"您还没有可以用收货地址喔~",noIcon:"/static/icon/icon_no_address.png",isData:!1}},onLoad:function(e){console.log("onLoad",e),this.productID=e.productID,e.disabled&&(this.disabled=e.disabled),this.orderID=e.orderID},onShow:function(){this.getUserAddressList()},onShareAppMessage:function(e){return(0,d.onShareAppMessage)(e)},methods:{getUserAddressList:function(){var e=this,t={};(0,d.request)(o.UserAddressListGet,t).then(function(t){console.log(t),e.addressList=t.AddressList,t.AddressList<=0&&(e.isData=!0)})},setDefaultAddress:function(t){var n=this,s=t,r={AddressID:s};(0,d.request)(o.UserAddressSetDefault,r).then(function(s){console.log(s),(0,d.showToast)("设置成功！"),n.getUserAddressList(),e.setStorageSync("addressID",t)})},editAddress:function(e){(0,d.navigateTo)("../addressUpdate/addressUpdate?addressID="+e)},deleteAddress:function(t,n){var s=this,r=n;e.showModal({title:"温馨提示",content:"是否删除收货地址！",confirmColor:"#fe7f00",success:function(n){if(n.confirm){console.log("用户点击确定");var i={AddressID:r};(0,d.request)(o.UserAddressDelete,i).then(function(n){(0,d.showToast)("删除成功！"),s.getUserAddressList(),1===t&&e.removeStorageSync("addressID")})}else n.cancel&&console.log("用户点击取消")}})},addAddress:function(){var e=this.productID,t=0,n=this.disabled,s=this.orderID;(0,d.navigateTo)("../addressUpdate/addressUpdate?addressID="+t+"&disabled="+n+"&orderID="+s+"&productID="+e)},setAddress:function(){var t=u(s.default.mark(function t(n){return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e.setStorageSync("addressID",n),this.addressID=n,!this.orderID){t.next=7;break}return t.next=5,this.orderAddressSubmit();case 5:t.sent,(0,d.redirectTo)("../orderDetail/orderDetail?id="+this.productID+"&OrderID="+this.orderID);case 7:case"end":return t.stop()}},t,this)}));function n(e){return t.apply(this,arguments)}return n}(),orderAddressSubmit:function(){var e=this;return new Promise(function(t,n){var s=e.orderID,r=e.addressID,i={OrderID:s,AddressID:r};(0,d.request)(o.OrderAddressSubmit,i).then(function(e){(0,d.showToast)("订单提交收货地址成功！"),t(e)})})}}});t.default=l}).call(this,n("543d")["default"])},ff55:function(e,t,n){"use strict";n.r(t);var s=n("d8b3"),r=n.n(s);for(var d in s)"default"!==d&&function(e){n.d(t,e,function(){return s[e]})}(d);t["default"]=r.a}},[["cff1","common/runtime","common/vendor"]]]);