(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-ucenter-login-login"],{"05d9":function(t,e,n){"use strict";var i=n("98ad"),o=n.n(i);o.a},1790:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"container"},[n("v-uni-view",{staticClass:"i-header-logo"},[n("v-uni-image",{attrs:{src:t.logo}})],1),n("v-uni-view",{staticClass:"i-login-mobile i-border-bottom i-flex-between"},[n("v-uni-view",{staticClass:"i-login-content i-flex"},[n("v-uni-image",{staticClass:"i-login-mobile-image"}),n("v-uni-input",{staticClass:"i-login-mobile-input",attrs:{type:"number",focus:t.focus,value:t.Mobile,placeholder:"请输入手机号码"},on:{input:function(e){e=t.$handleEvent(e),t.mobileInput(e)}}})],1),n("v-uni-view",{staticClass:"i-login-set-code"},[n("v-uni-button",{staticClass:"i-button-get",attrs:{disabled:t.disabled},on:{click:function(e){e=t.$handleEvent(e),t.getCode(e)}}},[t._v(t._s(t.time))])],1)],1),n("v-uni-view",{staticClass:"i-login-code i-border-bottom"},[n("v-uni-view",{staticClass:"i-login-content i-flex"},[n("v-uni-image",{staticClass:"i-login-code-image"}),n("v-uni-input",{staticClass:"i-login-code-input",attrs:{type:"number",value:t.LoginCode,placeholder:"验证码"},on:{input:function(e){e=t.$handleEvent(e),t.codeInput(e)}}})],1)],1),n("v-uni-view",{staticClass:"i-login-radio"},[n("v-uni-radio-group",{attrs:{name:"radio"}},[n("v-uni-label",{staticClass:"radio"},[n("v-uni-radio",{attrs:{checked:t.checked,color:t.color},on:{click:function(e){e.stopPropagation(),e.preventDefault(),e=t.$handleEvent(e),t.radioClick(e)}}})],1),n("v-uni-text",{staticClass:"protocol-agree"},[t._v("我已阅读并同意")]),n("v-uni-text",{staticClass:"protocol-text",on:{click:function(e){e=t.$handleEvent(e),t.protocol(e)}}},[t._v("《腾拍商场购物协议》")])],1)],1),n("v-uni-view",{staticClass:"i-login-button-view"},[n("v-uni-button",{staticClass:"btn i-login-button",attrs:{loading:t.loading,disabled:!t.checked},on:{click:function(e){e=t.$handleEvent(e),t.userLogin(e)}}},[t._v("登录")])],1)],1)},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},"33da":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=u(n("a34a")),o=u(n("e143")),a=n("2f62"),r=n("c440"),s=n("5177"),c=u(n("f0ab"));function u(t){return t&&t.__esModule?t:{default:t}}function l(t,e,n,i,o,a,r){try{var s=t[a](r),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(i,o)}function d(t){return function(){var e=this,n=arguments;return new Promise(function(i,o){var a=t.apply(e,n);function r(t){l(a,i,o,r,s,"next",t)}function s(t){l(a,i,o,r,s,"throw",t)}r(void 0)})}}function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,i)}return n}function g(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(n,!0).forEach(function(e){v(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}function v(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var b=o.default.extend({components:{uniIcon:c.default},computed:g({},(0,a.mapState)(["hasLogin"])),data:function(){return{wxFace:"",wxNick:"",refUserID:"",logo:"/static/icon/icon_login.png",checked:!0,color:"#fe7f00",focus:!0,Mobile:"",LoginCode:"",loading:!1,time:"获取验证码",currentTime:60,disabled:!1,interval:""}},onLoad:function(t){},onUnload:function(){var t=this.interval;clearInterval(t)},onShareAppMessage:function(t){return(0,r.onShareAppMessage)(t)},methods:g({},(0,a.mapMutations)(["login"]),{getProvider:function(){return new Promise(function(t,e){uni.getProvider({service:"oauth",success:function(e){t(e.provider)}})})},login:function(){var t=d(i.default.mark(function t(){var e;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.getProvider();case 2:return e=t.sent,t.abrupt("return",new Promise(function(t,n){~e.indexOf("weixin")&&uni.login({provider:"weixin",success:function(e){var n=e.code;console.log(n);var i={JSCode:n};(0,r.request)(s.GetWXOpenID,i).then(function(e){t(e.OpenID)})}})}));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),mobileInput:function(t){this.Mobile=t.detail.value},codeInput:function(t){this.LoginCode=t.detail.value},getCode:function(t){var e=this,n=this.Mobile;if(n){this.getLoginCode();var i=this.currentTime;this.time=i+"s后可重发",this.disabled=!0;var o=setInterval(function(){e.time=i-1+"s后可重发",i--,i<=0&&(clearInterval(o),e.time="重新获取",e.currentTime=60,e.disabled=!1)},1e3);this.interval=o}else(0,r.showToast)("手机号码不能为空！")},getLoginCode:function(){var t=this.Mobile,e={Mobile:t};(0,r.request)(s.GetLoginCode,e).then(function(t){console.log(t),(0,r.showToast)("发送成功！")})},radioClick:function(){this.checked=!this.checked},wxLogin:function(){var t=d(i.default.mark(function t(e){var n,o;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e),n=e.detail.userInfo,this.wxFace=n.avatarUrl,this.wxNick=n.nickName,t.next=6,this.login();case 6:o=t.sent,uni.setStorageSync("OpenID",o),this.userLogin();case 9:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),userLogin:function(){var t=d(i.default.mark(function t(){var e,n,o,a,c,u,l=this;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(e=this.Mobile,n=this.LoginCode,o=this.wxFace,a=encodeURIComponent(this.wxNick),c=this.refUserID,uni.getStorageSync("scene")&&(c=uni.getStorageSync("scene")),e){t.next=9;break}return(0,r.showToast)("手机号码不能为空！"),t.abrupt("return");case 9:if(n){t.next=12;break}return(0,r.showToast)("验证码不能为空！"),t.abrupt("return");case 12:this.loading=!0,u={Mobile:e,LoginCode:n,wxFace:o,wxNick:a,RefUserID:c},(0,r.request)(s.UserLogin,u).then(function(t){l.loading=!1;var e=t.SessionKey,n=t.UserInfo;uni.setStorageSync("SessionKey",e),uni.setStorageSync("UserInfo",n),(0,r.showToast)("登录成功！"),(0,r.navigateBack)(1)});case 15:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getuserinfo:function(t){console.log(t)},protocol:function(){(0,r.navigateTo)("../protocol/protocol")}})});e.default=b},3599:function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,'uni-page-body[data-v-77b82587]{background-color:#fff}.i-header-logo[data-v-77b82587]{padding:%?80?% 0 %?80?% 0;text-align:center}.i-header-logo uni-image[data-v-77b82587]{width:%?180?%;height:%?180?%}.i-border-bottom[data-v-77b82587]{border-bottom:%?2?% solid #f4f4f4}.i-login-mobile[data-v-77b82587]{margin:0 %?60?%;padding:%?20?% 0}.i-login-code[data-v-77b82587]{margin:0 %?60?%;padding:%?20?% 0}.i-login-mobile-image[data-v-77b82587]{background:url(https://api.tengpaisc.com/Resources/images/icon_login_mobile.png) 50% no-repeat;background-size:100%;width:%?36?%;height:%?52?%}.i-login-code-image[data-v-77b82587]{background:url(https://api.tengpaisc.com/Resources/images/icon_login_code.png) 50% no-repeat;background-size:100%;width:%?36?%;height:%?52?%}.i-login-content[data-v-77b82587]{width:65%}.i-login-mobile-input[data-v-77b82587]{margin-left:%?20?%}.i-login-code-input[data-v-77b82587]{margin-left:%?20?%}.i-login-radio[data-v-77b82587]{margin:0 %?60?%;padding:%?20?% 0}.radio[data-v-77b82587]{padding:0}.protocol-agree[data-v-77b82587]{margin-left:%?10?%}.protocol-text[data-v-77b82587]{color:#fe7f00}.i-button-get[data-v-77b82587]{background-color:#fff;font-size:%?32?%;color:#fe7f00}uni-button[data-v-77b82587]:after{content:" ";width:200%;height:200%;position:absolute;top:0;left:0;border:none;-webkit-transform:scale(.5);-ms-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:0 0;-ms-transform-origin:0 0;transform-origin:0 0;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:10px}uni-button[disabled][data-v-77b82587]:not([type]),uni-button[disabled][type=default][data-v-77b82587]{color:rgba(0,0,0,.3);background-color:#f4f4f4}.i-login-button[data-v-77b82587]{font-size:%?32?%;line-height:%?80?%;width:80%;color:#fff;background-color:#fe7f00;border-radius:%?100?%;margin-top:%?40?%}body.?%PAGE?%[data-v-77b82587]{background-color:#fff}',""])},7461:function(t,e,n){"use strict";n.r(e);var i=n("1790"),o=n("d753");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("05d9");var r=n("2877"),s=Object(r["a"])(o["default"],i["a"],i["b"],!1,null,"77b82587",null);e["default"]=s.exports},"98ad":function(t,e,n){var i=n("3599");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var o=n("4f06").default;o("76bcca7a",i,!0,{sourceMap:!1,shadowMode:!1})},d753:function(t,e,n){"use strict";n.r(e);var i=n("33da"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=o.a}}]);