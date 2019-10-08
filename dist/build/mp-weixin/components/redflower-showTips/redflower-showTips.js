(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/redflower-showTips/redflower-showTips"],{"0ad7":function(t,e,n){"use strict";n.r(e);var s=n("ea83"),i=n("d87f");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("9a7f");var o=n("2877"),a=Object(o["a"])(i["default"],s["a"],s["b"],!1,null,null,null);e["default"]=a.exports},2851:function(t,e,n){},"9a7f":function(t,e,n){"use strict";var s=n("2851"),i=n.n(s);i.a},a09e:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=i(n("66fd"));function i(t){return t&&t.__esModule?t:{default:t}}var u=s.default.extend({name:"showTips",data:function(){return{isFirst:!0,showTips:!1}},created:function(){var e=this,n=t.getStorageSync("isFirst");n?this.showTips=!1:(this.showTips=!0,setTimeout((function(){e.showTips=!1}),5e3))},methods:{closeTips:function(){this.showTips=!1,t.setStorageSync("isFirst",!0)}}});e.default=u}).call(this,n("543d")["default"])},d87f:function(t,e,n){"use strict";n.r(e);var s=n("a09e"),i=n.n(s);for(var u in s)"default"!==u&&function(t){n.d(e,t,(function(){return s[t]}))}(u);e["default"]=i.a},ea83:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c},i=[];n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return i}))}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/redflower-showTips/redflower-showTips-create-component',
    {
        'components/redflower-showTips/redflower-showTips-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0ad7"))
        })
    },
    [['components/redflower-showTips/redflower-showTips-create-component']]
]);                
