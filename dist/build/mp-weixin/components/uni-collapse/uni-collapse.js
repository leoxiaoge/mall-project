(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-collapse/uni-collapse"],{"5bb6":function(n,t,e){"use strict";var a=e("ae7f"),u=e.n(a);u.a},"91df":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={name:"UniCollapse",props:{accordion:{type:Boolean,default:!1}},data:function(){return{}},provide:function(){return{collapse:this}},created:function(){this.childrens=[]},methods:{onChange:function(){var n=[];this.childrens.forEach(function(t,e){t.isOpen&&n.push(t.nameSync)}),this.$emit("change",n)}}};t.default=a},ab2b:function(n,t,e){"use strict";var a=function(){var n=this,t=n.$createElement;n._self._c},u=[];e.d(t,"a",function(){return a}),e.d(t,"b",function(){return u})},ae7f:function(n,t,e){},e8f4:function(n,t,e){"use strict";e.r(t);var a=e("ab2b"),u=e("f715");for(var o in u)"default"!==o&&function(n){e.d(t,n,function(){return u[n]})}(o);e("5bb6");var r=e("2877"),c=Object(r["a"])(u["default"],a["a"],a["b"],!1,null,null,null);t["default"]=c.exports},f715:function(n,t,e){"use strict";e.r(t);var a=e("91df"),u=e.n(a);for(var o in a)"default"!==o&&function(n){e.d(t,n,function(){return a[n]})}(o);t["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-collapse/uni-collapse-create-component',
    {
        'components/uni-collapse/uni-collapse-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("e8f4"))
        })
    },
    [['components/uni-collapse/uni-collapse-create-component']]
]);                
