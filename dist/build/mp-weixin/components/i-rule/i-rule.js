(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/i-rule/i-rule"],{"0d7b":function(t,n,e){"use strict";e.r(n);var o=e("1677"),u=e("d7e3");for(var r in u)"default"!==r&&function(t){e.d(n,t,function(){return u[t]})}(r);var c=e("2877"),i=Object(c["a"])(u["default"],o["a"],o["b"],!1,null,null,null);n["default"]=i.exports},1677:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return u})},d431:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(e("66fd")),u=e("c440"),r=e("5177");function c(t){return t&&t.__esModule?t:{default:t}}var i=function(){return Promise.all([e.e("common/vendor"),e.e("components/uParse/src/wxParse")]).then(e.bind(null,"5f49"))},a=o.default.extend({components:{uParse:i},data:function(){return{id:"",article:""}},onLoad:function(t){this.id=t.id,this.getProduct(),console.log("onLoad",t)},methods:{getProduct:function(){var t=this,n=this.id,e={ProductID:n};(0,u.request)(r.ProductGet,e).then(function(n){t.article=n.Product.ProductDesc})},preview:function(t,n){console.log("src: "+t)},navigate:function(n,e){console.log("href: "+n),t.showModal({content:"点击链接为："+n,showCancel:!1})}}});n.default=a}).call(this,e("543d")["default"])},d7e3:function(t,n,e){"use strict";e.r(n);var o=e("d431"),u=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,function(){return o[t]})}(r);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/i-rule/i-rule-create-component',
    {
        'components/i-rule/i-rule-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0d7b"))
        })
    },
    [['components/i-rule/i-rule-create-component']]
]);                
