(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/settingUserNick/settingUserNick"],{"157b":function(e,n,t){"use strict";var r=function(){var e=this,n=e.$createElement;e._self._c},u=[];t.d(n,"a",function(){return r}),t.d(n,"b",function(){return u})},"1a77":function(e,n,t){"use strict";var r=t("fbee"),u=t.n(r);u.a},"8c3a":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=a(t("a34a")),u=a(t("66fd")),o=t("c440"),i=t("5177");function a(e){return e&&e.__esModule?e:{default:e}}function s(e,n,t,r,u,o,i){try{var a=e[o](i),s=a.value}catch(c){return void t(c)}a.done?n(s):Promise.resolve(s).then(r,u)}function c(e){return function(){var n=this,t=arguments;return new Promise(function(r,u){var o=e.apply(n,t);function i(e){s(o,r,u,i,a,"next",e)}function a(e){s(o,r,u,i,a,"throw",e)}i(void 0)})}}var f=u.default.extend({data:function(){return{userNick:""}},onLoad:function(e){this.useInfo()},onShareAppMessage:function(e){return(0,o.onShareAppMessage)(e)},methods:{useInfo:function(){var e=c(r.default.mark(function e(){var n;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.getLoginUser();case 2:n=e.sent,this.userNick=decodeURIComponent(n.userNick);case 4:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),getLoginUser:function(){return new Promise(function(e,n){var t={};(0,o.request)(i.GetLoginUser,t).then(function(n){e(n.UserInfo)})})},blur:function(e){this.userNick=e.target.value},save:function(){var e=encodeURIComponent(this.userNick);if(e){var n={UserNick:e};(0,o.request)(i.UpdateUserInfo,n).then(function(e){(0,o.showToast)("保存成功！")})}else(0,o.showToast)("请输入昵称！")}}});n.default=f},b027:function(e,n,t){"use strict";t.r(n);var r=t("157b"),u=t("b3f4");for(var o in u)"default"!==o&&function(e){t.d(n,e,function(){return u[e]})}(o);t("1a77");var i=t("2877"),a=Object(i["a"])(u["default"],r["a"],r["b"],!1,null,null,null);n["default"]=a.exports},b3f4:function(e,n,t){"use strict";t.r(n);var r=t("8c3a"),u=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,function(){return r[e]})}(o);n["default"]=u.a},fbee:function(e,n,t){}},[["aff7","common/runtime","common/vendor"]]]);