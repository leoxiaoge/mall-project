(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/helpAndFeedback/helpAndFeedback"],{"41ef":function(n,t,e){},"47d7":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=c(e("66fd")),u=e("c440"),i=e("5177");function c(n){return n&&n.__esModule?n:{default:n}}var s=function(){return e.e("components/uni-collapse/uni-collapse").then(e.bind(null,"e8f4"))},a=function(){return e.e("components/uni-collapse-item/uni-collapse-item").then(e.bind(null,"67cf"))},l=function(){return e.e("components/uni-popup/uni-popup").then(e.bind(null,"1c89"))},r=o.default.extend({components:{uniCollapse:s,uniCollapseItem:a,uniPopup:l},data:function(){return{contactList:[],helpList:[],iconQuestion:"/static/icon/icon_question.png",iconAnswe:"/static/icon/icon_answe.png",type:!1}},onLoad:function(n){this.getHelpContactList(),this.getHelpList(),console.log("onLoad",n)},onShareAppMessage:function(n){return(0,u.onShareAppMessage)(n)},methods:{getHelpContactList:function(){var n=this,t={};(0,u.request)(i.HelpContactListGet,t).then((function(t){console.log(t),n.contactList=t.ContactList}))},getHelpList:function(){var n=this,t={};(0,u.request)(i.HelpListGet,t).then((function(t){n.helpList=t.HelpList}))},setClipboard:function(t){console.log(t),n.setClipboardData({data:t,success:function(){console.log("success")}})},togglePopup:function(n){this.type=!this.type}}});t.default=r}).call(this,e("543d")["default"])},"4fdf":function(n,t,e){"use strict";e.r(t);var o=e("47d7"),u=e.n(o);for(var i in o)"default"!==i&&function(n){e.d(t,n,(function(){return o[n]}))}(i);t["default"]=u.a},"7a7b":function(n,t,e){"use strict";e.r(t);var o=e("93ed"),u=e("4fdf");for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);e("8ddf");var c=e("2877"),s=Object(c["a"])(u["default"],o["a"],o["b"],!1,null,null,null);t["default"]=s.exports},"8ddf":function(n,t,e){"use strict";var o=e("41ef"),u=e.n(o);u.a},"93ed":function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"a",(function(){return o})),e.d(t,"b",(function(){return u}))},9451:function(n,t,e){"use strict";(function(n){e("6cdc"),e("921b");var t=o(e("7a7b"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])}},[["9451","common/runtime","common/vendor"]]]);