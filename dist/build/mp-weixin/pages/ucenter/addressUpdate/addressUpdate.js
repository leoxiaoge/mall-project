(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/addressUpdate/addressUpdate"],{"269c":function(e,t,s){},"4e43":function(e,t,s){"use strict";var i=s("269c"),n=s.n(i);n.a},5022:function(e,t,s){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},n=[];s.d(t,"a",function(){return i}),s.d(t,"b",function(){return n})},"886f":function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=r(s("66fd")),n=s("c440"),o=s("5177");function r(e){return e&&e.__esModule?e:{default:e}}var a=function(){return Promise.all([s.e("common/vendor"),s.e("components/mpvue-citypicker/mpvueCityPicker")]).then(s.bind(null,"94ab"))},d=i.default.extend({components:{mpvueCityPicker:a},data:function(){return{AddressID:0,realName:"",Mobile:"",Province:"",City:"",Area:"",Address:"",ZipCode:"",IsDefault:0,themeColor:"#fe7f00",cityPickerValueDefault:[0,0,1]}},onLoad:function(e){var t=e.id;this.AddressID=e.id,this.getUserAddressList(t),console.log("onLoad",e)},methods:{getUserAddressList:function(e){var t=this;if(console.log(e),0!=e){var s={AddressID:e};(0,n.request)(o.UserAddressListGet,s).then(function(e){console.log(e);var s=e.AddressList[0];t.realName=s.realName,t.Mobile=s.Mobile,t.Province=s.Province,t.City=s.City,t.Area=s.Area,t.Address=s.Address,t.ZipCode=s.ZipCode,t.IsDefault=s.IsDefault})}},showMulLinkageThreePicker:function(){console.log(this.$refs.mpvueCityPicker);var e=this.$refs;e.mpvueCityPicker.show()},onCancel:function(e){console.log(e)},onConfirm:function(e){var t=e.label,s=t.split("-"),i=s[0],n=s[1],o=s[2];this.Province=i,this.City=n,this.Area=o},onrealNameInput:function(e){this.realName=e.target.value},onMobileInput:function(e){this.Mobile=e.target.value},onAddressInput:function(e){this.Address=e.target.value},onZipCodeInput:function(e){this.ZipCode=e.target.value},updateAddress:function(){var e=this.AddressID,t=this.realName,s=this.Mobile,i=this.Province,r=this.City,a=this.Area,d=this.Address,u=this.ZipCode,l=this.IsDefault;if(e||(e=0),t)if(s)if(i||r||a)if(d){l||(l=0);var c={AddressID:e,realName:t,Mobile:s,Province:i,City:r,Area:a,Address:d,ZipCode:u,IsDefault:l};(0,n.request)(o.UserAddressUpdate,c).then(function(e){console.log(e),(0,n.showToast)("保存成功！"),(0,n.redirectTo)("../addressShipping/addressShipping")})}else(0,n.showToast)("请填写收货人!");else(0,n.showToast)("请填写收货人!");else(0,n.showToast)("请填写收货人!");else(0,n.showToast)("请填写收货人!")}}});t.default=d},b667:function(e,t,s){"use strict";s.r(t);var i=s("5022"),n=s("e6b7");for(var o in n)"default"!==o&&function(e){s.d(t,e,function(){return n[e]})}(o);s("4e43");var r=s("2877"),a=Object(r["a"])(n["default"],i["a"],i["b"],!1,null,null,null);t["default"]=a.exports},e6b7:function(e,t,s){"use strict";s.r(t);var i=s("886f"),n=s.n(i);for(var o in i)"default"!==o&&function(e){s.d(t,e,function(){return i[e]})}(o);t["default"]=n.a}},[["b7bc","common/runtime","common/vendor"]]]);