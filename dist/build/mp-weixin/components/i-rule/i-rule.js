(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/i-rule/i-rule"],{"0d7b":function(e,t,n){"use strict";n.r(t);var o=n("b353"),u=n("d7e3");for(var r in u)"default"!==r&&function(e){n.d(t,e,function(){return u[e]})}(r);var c=n("2877"),i=Object(c["a"])(u["default"],o["a"],o["b"],!1,null,null,null);t["default"]=i.exports},"6e5d":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=c(n("66fd")),u=n("c440"),r=n("5177");function c(e){return e&&e.__esModule?e:{default:e}}var i=function(){return Promise.all([n.e("common/vendor"),n.e("components/uParse/src/wxParse")]).then(n.bind(null,"5f49"))},a='\n<img src="http://api.tengpaisc.com/upload/0697de3744b7d12e15eb171b47d247a.jpg" />\n    ',d=o.default.extend({components:{uParse:i},data:function(){return{id:"",article:a}},onLoad:function(e){this.id=e.id,this.getProduct(),console.log("onLoad",e)},methods:{getProduct:function(){var e=this,t=this.id,n={ProductID:t};(0,u.request)(r.ProductGet,n).then(function(t){e.article=t.Product.ProductDesc})},preview:function(e,t){console.log("src: "+e)},navigate:function(e,t){console.log("href: "+e),(0,u.showModal)("点击链接为："+e)}}});t.default=d},b353:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},u=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return u})},d7e3:function(e,t,n){"use strict";n.r(t);var o=n("6e5d"),u=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);t["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/i-rule/i-rule-create-component',
    {
        'components/i-rule/i-rule-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("0d7b"))
        })
    },
    [['components/i-rule/i-rule-create-component']]
]);                
