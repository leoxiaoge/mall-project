(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/helpAndFeedback/helpAndFeedback"],{"4a7b":function(n,t,e){},"4fdf":function(n,t,e){"use strict";e.r(t);var o=e("e7a5"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=i.a},"7a7b":function(n,t,e){"use strict";e.r(t);var o=e("f207"),i=e("4fdf");for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);e("8ddf");var c=e("2877"),s=Object(c["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=s.exports},"8ddf":function(n,t,e){"use strict";var o=e("4a7b"),i=e.n(o);i.a},e7a5:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=c(e("66fd")),i=e("c440"),u=e("5177");function c(n){return n&&n.__esModule?n:{default:n}}var s=function(){return e.e("components/uni-collapse/uni-collapse").then(e.bind(null,"e8f4"))},a=function(){return e.e("components/uni-collapse-item/uni-collapse-item").then(e.bind(null,"67cf"))},l=function(){return e.e("components/uni-popup/uni-popup").then(e.bind(null,"1c89"))},f=o.default.extend({components:{uniCollapse:s,uniCollapseItem:a,uniPopup:l},data:function(){return{contactList:[],helpList:[],iconQuestion:"/static/icon/icon_question.png",iconAnswe:"/static/icon/icon_answe.png",type:!1}},onLoad:function(n){this.getHelpContactList(),this.getHelpList(),console.log("onLoad",n)},methods:{getHelpContactList:function(){var n=this,t={};(0,i.request)(u.HelpContactListGet,t).then(function(t){console.log(t),n.contactList=t.ContactList})},getHelpList:function(){var n=this,t={};(0,i.request)(u.HelpListGet,t).then(function(t){n.helpList=t.HelpList})},setClipboard:function(t){console.log(t),n.setClipboardData({data:t,success:function(){console.log("success")}})},togglePopup:function(n){this.type=!this.type}}});t.default=f}).call(this,e("543d")["default"])},f207:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})}},[["9451","common/runtime","common/vendor"]]]);