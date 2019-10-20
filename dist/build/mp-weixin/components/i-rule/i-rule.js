(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/i-rule/i-rule"],{"0d7b":function(t,n,e){"use strict";e.r(n);var o=e("b353"),u=e("d7e3");for(var r in u)"default"!==r&&function(t){e.d(n,t,function(){return u[t]})}(r);var c=e("2877"),a=Object(c["a"])(u["default"],o["a"],o["b"],!1,null,null,null);n["default"]=a.exports},ad34:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(e("66fd")),u=e("c440"),r=e("5177");function c(t){return t&&t.__esModule?t:{default:t}}var a=function(){return Promise.all([e.e("common/vendor"),e.e("components/uParse/src/wxParse")]).then(e.bind(null,"5f49"))},i='\n<img src="http://api.tengpaisc.com/upload/0697de3744b7d12e15eb171b47d247a.jpg" />\n    ',d=o.default.extend({components:{uParse:a},data:function(){return{id:"",article:i}},onLoad:function(t){this.id=t.id,this.getProduct(),console.log("onLoad",t)},methods:{getProduct:function(){var t=this,n=this.id,e={ProductID:n};(0,u.request)(r.ProductGet,e).then(function(n){t.article=n.Product.ProductDesc})},preview:function(t,n){console.log("src: "+t)},navigate:function(t,n){console.log("href: "+t),(0,u.showModal)("点击链接为："+t)}}});n.default=d},b353:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return u})},d7e3:function(t,n,e){"use strict";e.r(n);var o=e("ad34"),u=e.n(o);for(var r in o)"default"!==r&&function(t){e.d(n,t,function(){return o[t]})}(r);n["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/i-rule/i-rule-create-component',
    {
        'components/i-rule/i-rule-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0d7b"))
        })
    },
    [['components/i-rule/i-rule-create-component']]
]);                
