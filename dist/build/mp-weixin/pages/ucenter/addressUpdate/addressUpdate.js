(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/addressUpdate/addressUpdate"],{"269c":function(e,t,s){},2910:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(s("66fd")),i=s("c440"),o=s("5177");function r(e){return e&&e.__esModule?e:{default:e}}var a=function(){return Promise.all([s.e("common/vendor"),s.e("components/mpvue-citypicker/mpvueCityPicker")]).then(s.bind(null,"94ab"))},d=n.default.extend({components:{mpvueCityPicker:a},data:function(){return{AddressID:0,realName:"",Mobile:"",Province:"",City:"",Area:"",Address:"",ZipCode:"",IsDefault:0,themeColor:"#fe7f00",cityPickerValueDefault:[0,0,1]}},onLoad:function(e){var t=e.id;this.AddressID=e.id,this.getUserAddressList(t),console.log("onLoad",e)},methods:{getUserAddressList:function(e){var t=this;if(console.log(e),0!=e){var s={AddressID:e};(0,i.request)(o.UserAddressListGet,s).then(function(e){console.log(e);var s=e.AddressList[0];t.realName=s.realName,t.Mobile=s.Mobile,t.Province=s.Province,t.City=s.City,t.Area=s.Area,t.Address=s.Address,t.ZipCode=s.ZipCode,t.IsDefault=s.IsDefault})}},showMulLinkageThreePicker:function(){console.log(this.$refs.mpvueCityPicker);var e=this.$refs;e.mpvueCityPicker.show()},onCancel:function(e){console.log(e)},onConfirm:function(e){var t=e.label,s=t.split("-"),n=s[0],i=s[1],o=s[2];this.Province=n,this.City=i,this.Area=o},onrealNameInput:function(e){this.realName=e.target.value},onMobileInput:function(e){this.Mobile=e.target.value},onAddressInput:function(e){this.Address=e.target.value},onZipCodeInput:function(e){this.ZipCode=e.target.value},updateAddress:function(){var e=this.AddressID,t=this.realName,s=this.Mobile,n=this.Province,r=this.City,a=this.Area,d=this.Address,u=this.ZipCode,l=this.IsDefault;if(e||(e=0),t)if(s)if(n||r||a)if(d){l||(l=0);var c={AddressID:e,realName:t,Mobile:s,Province:n,City:r,Area:a,Address:d,ZipCode:u,IsDefault:l};(0,i.request)(o.UserAddressUpdate,c).then(function(e){console.log(e),(0,i.showToast)("保存成功！"),(0,i.navigateTo)("../addressShipping/addressShipping")})}else(0,i.showToast)("请填写收货人!");else(0,i.showToast)("请填写收货人!");else(0,i.showToast)("请填写收货人!");else(0,i.showToast)("请填写收货人!")}}});t.default=d},"4e43":function(e,t,s){"use strict";var n=s("269c"),i=s.n(n);i.a},b667:function(e,t,s){"use strict";s.r(t);var n=s("e547"),i=s("e6b7");for(var o in i)"default"!==o&&function(e){s.d(t,e,function(){return i[e]})}(o);s("4e43");var r=s("2877"),a=Object(r["a"])(i["default"],n["a"],n["b"],!1,null,null,null);t["default"]=a.exports},e547:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c},i=[];s.d(t,"a",function(){return n}),s.d(t,"b",function(){return i})},e6b7:function(e,t,s){"use strict";s.r(t);var n=s("2910"),i=s.n(n);for(var o in n)"default"!==o&&function(e){s.d(t,e,function(){return n[e]})}(o);t["default"]=i.a}},[["b7bc","common/runtime","common/vendor"]]]);