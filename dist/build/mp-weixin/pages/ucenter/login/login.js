<<<<<<< HEAD
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/login/login"],{"458c":function(e,n,t){},7461:function(e,n,t){"use strict";t.r(n);var o=t("a08a"),i=t("d753");for(var r in i)"default"!==r&&function(e){t.d(n,e,function(){return i[e]})}(r);t("8603");var c=t("2877"),s=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},8603:function(e,n,t){"use strict";var o=t("458c"),i=t.n(o);i.a},a08a:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})},d753:function(e,n,t){"use strict";t.r(n);var o=t("f57d"),i=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);n["default"]=i.a},f57d:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=s(t("66fd")),i=t("2f62"),r=t("c440"),c=t("5177");function s(e){return e&&e.__esModule?e:{default:e}}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,o)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(t,!0).forEach(function(n){u(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(t).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function u(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var f=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"f0ab"))},d=o.default.extend({components:{uniIcon:f},computed:l({},(0,i.mapState)(["hasLogin"])),data:function(){return{wxFace:"",wxNick:"",refUserID:"",logo:"/static/icon/icon_login.png",checked:!0,Mobile:"",LoginCode:"",loading:!1,time:"获取验证码",currentTime:60,disabled:!1,interval:""}},onLoad:function(n){console.log(this.$store.state),e.getProvider({service:"oauth",success:function(n){console.log(n.provider),~n.provider.indexOf("weixin")&&e.login({provider:"weixin",success:function(n){console.log(JSON.stringify(n));var t=n.code,o={JSCode:t};(0,r.request)(c.GetWXOpenID,o).then(function(n){console.log(n);var t=n.OpenID;e.setStorageSync("OpenID",t)})}})}})},onUnload:function(){var e=this.interval;clearInterval(e)},methods:l({},(0,i.mapMutations)(["login"]),{mobileInput:function(e){console.log(e),this.Mobile=e.detail.value},codeInput:function(e){console.log(e),this.LoginCode=e.detail.value},getCode:function(e){var n=this;console.log(e);var t=this.Mobile;if(t){this.getLoginCode();var o=this.currentTime;this.time=o+"s后可重发",this.disabled=!0;var i=setInterval(function(){n.time=o-1+"s后可重发",o--,o<=0&&(clearInterval(i),n.time="重新获取",n.currentTime=60,n.disabled=!1)},1e3);this.interval=i}else(0,r.showToast)("手机号码不能为空！")},getLoginCode:function(){var e=this.Mobile,n={Mobile:e};(0,r.request)(c.GetLoginCode,n).then(function(e){console.log(e),(0,r.showToast)("发送成功！")})},radioClick:function(){this.checked=!this.checked},wxLogin:function(e){console.log(e);var n=e.detail.userInfo;this.wxFace=n.avatarUrl,this.wxNick=n.nickName,this.userLogin()},userLogin:function(){var n=this,t=this.Mobile,o=this.LoginCode,i=this.wxFace,s=this.wxNick,a=this.refUserID;if(e.getStorageSync("scene")&&(a=e.getStorageSync("scene")),t)if(o){this.loading=!0;var l={Mobile:t,LoginCode:o,wxFace:i,wxNick:s,RefUserID:a};(0,r.request)(c.UserLogin,l).then(function(t){console.log(t),n.loading=!1;var o=t.SessionKey,i=t.UserInfo;e.setStorageSync("SessionKey",o),e.setStorageSync("UserInfo",i),(0,r.showToast)("登录成功！"),e.navigateBack({delta:1})})}else(0,r.showToast)("验证码不能为空！");else(0,r.showToast)("手机号码不能为空！")},getuserinfo:function(e){console.log(e)}})});n.default=d}).call(this,t("543d")["default"])}},[["a773","common/runtime","common/vendor"]]]);
=======
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/login/login"],{7026:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=s(t("66fd")),i=t("2f62"),c=t("c440"),r=t("5177");function s(e){return e&&e.__esModule?e:{default:e}}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},o=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(t).filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.forEach(function(n){l(e,n,t[n])})}return e}function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var u=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"f0ab"))},f=o.default.extend({components:{uniIcon:u},computed:a({},(0,i.mapState)(["hasLogin"])),data:function(){return{wxFace:"",wxNick:"",logo:"/static/icon/icon_login.png",checked:!0,Mobile:"",LoginCode:"",loading:!1,time:"获取验证码",currentTime:60,disabled:!1,interval:""}},onLoad:function(n){console.log(this.$store.state),e.getProvider({service:"oauth",success:function(n){console.log(n.provider),~n.provider.indexOf("weixin")&&e.login({provider:"weixin",success:function(n){console.log(JSON.stringify(n));var t=n.code,o={JSCode:t};(0,c.request)(r.GetWXOpenID,o).then(function(n){console.log(n);var t=n.OpenID;e.setStorageSync("OpenID",t)})}})}})},onUnload:function(){var e=this.interval;clearInterval(e)},methods:a({},(0,i.mapMutations)(["login"]),{mobileInput:function(e){console.log(e),this.Mobile=e.detail.value},codeInput:function(e){console.log(e),this.LoginCode=e.detail.value},getCode:function(e){var n=this;console.log(e);var t=this.Mobile;if(t){this.getLoginCode();var o=this.currentTime;this.time=o+"s后可重发",this.disabled=!0;var i=setInterval(function(){n.time=o-1+"s后可重发",o--,o<=0&&(clearInterval(i),n.time="重新获取",n.currentTime=60,n.disabled=!1)},1e3);this.interval=i}else(0,c.showToast)("手机号码不能为空！")},getLoginCode:function(){var e=this.Mobile,n={Mobile:e};(0,c.request)(r.GetLoginCode,n).then(function(e){console.log(e),(0,c.showToast)("发送成功！")})},radioClick:function(){this.checked=!this.checked},wxLogin:function(e){console.log(e);var n=e.detail.userInfo;this.wxFace=n.avatarUrl,this.wxNick=n.nickName,this.userLogin()},userLogin:function(){var n=this,t=this.Mobile,o=this.LoginCode,i=this.wxFace,s=this.wxNick;if(t)if(o){this.loading=!0;var a={Mobile:t,LoginCode:o,wxFace:i,wxNick:s};(0,c.request)(r.UserLogin,a).then(function(t){console.log(t),n.loading=!1;var o=t.SessionKey,i=t.UserInfo;e.setStorageSync("SessionKey",o),e.setStorageSync("UserInfo",i),(0,c.showToast)("登录成功！"),e.navigateBack({delta:1})})}else(0,c.showToast)("验证码不能为空！");else(0,c.showToast)("手机号码不能为空！")},getuserinfo:function(e){console.log(e)}})});n.default=f}).call(this,t("543d")["default"])},7461:function(e,n,t){"use strict";t.r(n);var o=t("db21"),i=t("d753");for(var c in i)"default"!==c&&function(e){t.d(n,e,function(){return i[e]})}(c);t("8603");var r=t("2877"),s=Object(r["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=s.exports},8603:function(e,n,t){"use strict";var o=t("918c"),i=t.n(o);i.a},"918c":function(e,n,t){},d753:function(e,n,t){"use strict";t.r(n);var o=t("7026"),i=t.n(o);for(var c in o)"default"!==c&&function(e){t.d(n,e,function(){return o[e]})}(c);n["default"]=i.a},db21:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})}},[["a773","common/runtime","common/vendor"]]]);
>>>>>>> 49f6dd955dfa63b795bcfd1a55d42a38ea1f7be1
