<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/addressShipping/addressShipping"],{"3ff3":function(e,n,t){"use strict";t.r(n);var s=t("7cc3"),o=t("ff55");for(var d in o)"default"!==d&&function(e){t.d(n,e,function(){return o[e]})}(d);t("8aa1");var r=t("2877"),a=Object(r["a"])(o["default"],s["a"],s["b"],!1,null,null,null);n["default"]=a.exports},"7cc3":function(e,n,t){"use strict";var s=function(){var e=this,n=e.$createElement;e._self._c},o=[];t.d(n,"a",function(){return s}),t.d(n,"b",function(){return o})},"8aa1":function(e,n,t){"use strict";var s=t("b56b"),o=t.n(s);o.a},b56b:function(e,n,t){},fdba:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=r(t("66fd")),o=t("c440"),d=t("5177");function r(e){return e&&e.__esModule?e:{default:e}}var a=function(){return t.e("components/u-no/u-no").then(t.bind(null,"19e5"))},i=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"f0ab"))},c=s.default.extend({components:{uNo:a,uniIcon:i},data:function(){return{addressList:[],type:"checkbox-filled",isDefault:!1,noTitle:"您还没有可以用收货地址喔~",noIcon:"/static/icon/icon_no_address.png",isData:!1,isMaxData:!1}},onLoad:function(e){console.log("onLoad",e)},onShow:function(){this.getUserAddressList()},methods:{getUserAddressList:function(){var e=this,n={};(0,o.request)(d.UserAddressListGet,n).then(function(n){console.log(n),e.addressList=n.AddressList,n.AddressList.length<=0&&(e.isData=!0),n.AddressList.length<=4&&(e.isMaxData=!0)})},setDefaultAddress:function(n){var t=this,s=n,r={AddressID:s};(0,o.request)(d.UserAddressSetDefault,r).then(function(s){console.log(s),(0,o.showToast)("设置成功！"),t.getUserAddressList(),e.setStorageSync("addressID",n)})},editAddress:function(e){(0,o.navigateTo)("../addressUpdate/addressUpdate?id="+e)},deleteAddress:function(n,t){var s=this,r=t;e.showModal({title:"温馨提示",content:"是否删除收货地址！",confirmColor:"#fe7f00",success:function(t){if(t.confirm){console.log("用户点击确定");var a={AddressID:r};(0,o.request)(d.UserAddressDelete,a).then(function(t){console.log(t),(0,o.showToast)("删除成功！"),s.getUserAddressList(),1===n&&e.removeStorageSync("addressID")})}else t.cancel&&console.log("用户点击取消")}})},addAddress:function(){var e=0;(0,o.navigateTo)("../addressUpdate/addressUpdate?id="+e)}}});n.default=c}).call(this,t("543d")["default"])},ff55:function(e,n,t){"use strict";t.r(n);var s=t("fdba"),o=t.n(s);for(var d in s)"default"!==d&&function(e){t.d(n,e,function(){return s[e]})}(d);n["default"]=o.a}},[["cff1","common/runtime","common/vendor"]]]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/addressShipping/addressShipping"],{"3ff3":function(e,n,t){"use strict";t.r(n);var s=t("7cc3"),o=t("ff55");for(var d in o)"default"!==d&&function(e){t.d(n,e,function(){return o[e]})}(d);t("8aa1");var r=t("2877"),a=Object(r["a"])(o["default"],s["a"],s["b"],!1,null,null,null);n["default"]=a.exports},"7cc3":function(e,n,t){"use strict";var s=function(){var e=this,n=e.$createElement;e._self._c},o=[];t.d(n,"a",function(){return s}),t.d(n,"b",function(){return o})},"8aa1":function(e,n,t){"use strict";var s=t("9f46"),o=t.n(s);o.a},"9f46":function(e,n,t){},af4b:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s=r(t("66fd")),o=t("c440"),d=t("5177");function r(e){return e&&e.__esModule?e:{default:e}}var a=function(){return t.e("components/u-no/u-no").then(t.bind(null,"19e5"))},i=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"f0ab"))},c=s.default.extend({components:{uNo:a,uniIcon:i},data:function(){return{addressList:[],type:"checkbox-filled",isDefault:!1,noTitle:"您还没有可以用收货地址喔~",noIcon:"/static/icon/icon_no_address.png",isData:!1,isMaxData:!1}},onLoad:function(e){console.log("onLoad",e)},onShow:function(){this.getUserAddressList()},methods:{getUserAddressList:function(){var e=this,n={};(0,o.request)(d.UserAddressListGet,n).then(function(n){console.log(n),e.addressList=n.AddressList,n.AddressList.length<=0&&(e.isData=!0),n.AddressList.length<=4&&(e.isMaxData=!0)})},setDefaultAddress:function(n){var t=this,s=n,r={AddressID:s};(0,o.request)(d.UserAddressSetDefault,r).then(function(s){console.log(s),(0,o.showToast)("设置成功！"),t.getUserAddressList(),e.setStorageSync("addressID",n)})},editAddress:function(e){(0,o.navigateTo)("../addressUpdate/addressUpdate?id="+e)},deleteAddress:function(n,t){var s=this,r=t;e.showModal({title:"温馨提示",content:"是否删除收货地址！",confirmColor:"#fe7f00",success:function(t){if(t.confirm){console.log("用户点击确定");var a={AddressID:r};(0,o.request)(d.UserAddressDelete,a).then(function(t){console.log(t),(0,o.showToast)("删除成功！"),s.getUserAddressList(),1===n&&e.removeStorageSync("addressID")})}else t.cancel&&console.log("用户点击取消")}})},addAddress:function(){var e=0;(0,o.navigateTo)("../addressUpdate/addressUpdate?id="+e)}}});n.default=c}).call(this,t("543d")["default"])},ff55:function(e,n,t){"use strict";t.r(n);var s=t("af4b"),o=t.n(s);for(var d in s)"default"!==d&&function(e){t.d(n,e,function(){return s[e]})}(d);n["default"]=o.a}},[["cff1","common/runtime","common/vendor"]]]);
>>>>>>> 49f6dd955dfa63b795bcfd1a55d42a38ea1f7be1
