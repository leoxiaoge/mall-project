(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/login/login"],{"458c":function(e,n,t){},7461:function(e,n,t){"use strict";t.r(n);var r=t("e171"),o=t("d753");for(var i in o)"default"!==i&&function(e){t.d(n,e,function(){return o[e]})}(i);t("8603");var c=t("2877"),u=Object(c["a"])(o["default"],r["a"],r["b"],!1,null,null,null);n["default"]=u.exports},8603:function(e,n,t){"use strict";var r=t("458c"),o=t.n(r);o.a},d753:function(e,n,t){"use strict";t.r(n);var r=t("f57d"),o=t.n(r);for(var i in r)"default"!==i&&function(e){t.d(n,e,function(){return r[e]})}(i);n["default"]=o.a},e171:function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement;e._self._c},o=[];t.d(n,"a",function(){return r}),t.d(n,"b",function(){return o})},f57d:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t("a34a")),o=a(t("66fd")),i=t("2f62"),c=t("c440"),u=t("5177");function a(e){return e&&e.__esModule?e:{default:e}}function s(e,n,t,r,o,i,c){try{var u=e[i](c),a=u.value}catch(s){return void t(s)}u.done?n(a):Promise.resolve(a).then(r,o)}function l(e){return function(){var n=this,t=arguments;return new Promise(function(r,o){var i=e.apply(n,t);function c(e){s(i,r,o,c,u,"next",e)}function u(e){s(i,r,o,c,u,"throw",e)}c(void 0)})}}function f(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?f(t,!0).forEach(function(n){h(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):f(t).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function h(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var p=function(){return t.e("components/uni-icon/uni-icon").then(t.bind(null,"f0ab"))},v=o.default.extend({components:{uniIcon:p},computed:d({},(0,i.mapState)(["hasLogin"])),data:function(){return{wxFace:"",wxNick:"",refUserID:"",logo:"/static/icon/icon_login.png",checked:!0,color:"#fe7f00",focus:!0,Mobile:"",LoginCode:"",loading:!1,time:"获取验证码",currentTime:60,disabled:!1,interval:""}},onLoad:function(e){},onUnload:function(){var e=this.interval;clearInterval(e)},methods:d({},(0,i.mapMutations)(["login"]),{getProvider:function(){return new Promise(function(n,t){e.getProvider({service:"oauth",success:function(e){n(e.provider)}})})},login:function(){var n=l(r.default.mark(function n(){var t;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,this.getProvider();case 2:return t=n.sent,n.abrupt("return",new Promise(function(n,r){~t.indexOf("weixin")&&e.login({provider:"weixin",success:function(e){var t=e.code;console.log(t);var r={JSCode:t};(0,c.request)(u.GetWXOpenID,r).then(function(e){n(e.OpenID)})}})}));case 4:case"end":return n.stop()}},n,this)}));function t(){return n.apply(this,arguments)}return t}(),mobileInput:function(e){this.Mobile=e.detail.value},codeInput:function(e){this.LoginCode=e.detail.value},getCode:function(e){var n=this,t=this.Mobile;if(t){this.getLoginCode();var r=this.currentTime;this.time=r+"s后可重发",this.disabled=!0;var o=setInterval(function(){n.time=r-1+"s后可重发",r--,r<=0&&(clearInterval(o),n.time="重新获取",n.currentTime=60,n.disabled=!1)},1e3);this.interval=o}else(0,c.showToast)("手机号码不能为空！")},getLoginCode:function(){var e=this.Mobile,n={Mobile:e};(0,c.request)(u.GetLoginCode,n).then(function(e){console.log(e),(0,c.showToast)("发送成功！")})},radioClick:function(){this.checked=!this.checked},wxLogin:function(){var n=l(r.default.mark(function n(t){var o,i;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return console.log(t),o=t.detail.userInfo,this.wxFace=o.avatarUrl,this.wxNick=o.nickName,n.next=6,this.login();case 6:i=n.sent,e.setStorageSync("OpenID",i),this.userLogin();case 9:case"end":return n.stop()}},n,this)}));function t(e){return n.apply(this,arguments)}return t}(),userLogin:function(){var n=l(r.default.mark(function n(){var t,o,i,a,s,l,f,d=this;return r.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:if(t=this.Mobile,o=this.LoginCode,i=this.wxFace,a=this.wxNick,s=this.refUserID,e.getStorageSync("scene")&&(s=e.getStorageSync("scene")),t){n.next=9;break}return(0,c.showToast)("手机号码不能为空！"),n.abrupt("return");case 9:if(o){n.next=12;break}return(0,c.showToast)("验证码不能为空！"),n.abrupt("return");case 12:return this.loading=!0,n.next=15,this.login();case 15:l=n.sent,f={Mobile:t,LoginCode:o,OpenID:l,wxFace:i,wxNick:a,RefUserID:s},(0,c.request)(u.UserLogin,f).then(function(n){d.loading=!1;var t=n.SessionKey,r=n.UserInfo;e.setStorageSync("SessionKey",t),e.setStorageSync("UserInfo",r),(0,c.showToast)("登录成功！"),(0,c.navigateBack)(1)});case 18:case"end":return n.stop()}},n,this)}));function t(){return n.apply(this,arguments)}return t}(),getuserinfo:function(e){console.log(e)},protocol:function(){(0,c.navigateTo)("../protocol/protocol")}})});n.default=v}).call(this,t("543d")["default"])}},[["a773","common/runtime","common/vendor"]]]);