(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/product-list/product-list"],{"24d7":function(t,n,e){},"2fec":function(t,n,e){"use strict";var u=e("24d7"),o=e.n(u);o.a},4207:function(t,n,e){"use strict";e.r(n);var u=e("85d4"),o=e("8def");for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);e("2fec");var c=e("2877"),r=Object(c["a"])(o["default"],u["a"],u["b"],!1,null,null,null);n["default"]=r.exports},"85d4":function(t,n,e){"use strict";var u=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return u}),e.d(n,"b",function(){return o})},"8def":function(t,n,e){"use strict";e.r(n);var u=e("c6cf"),o=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);n["default"]=o.a},c6cf:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=a(e("66fd")),o=e("c440");function a(t){return t&&t.__esModule?t:{default:t}}var c=function(){return e.e("components/page-head/page-head").then(e.bind(null,"0586"))},r=function(){return e.e("components/uni-countdown/uni-countdown").then(e.bind(null,"6f12"))},i=u.default.extend({components:{pageHead:c,uniCountdown:r},name:"productList",props:{options:{type:Array},title:{type:String,default:"即将竞拍"}},data:function(){return{}},computed:{product:function(){var t=this.options;return t.map(function(t){var n=t.Active.StartCountCown,e=n/864e5,u=parseInt(e),o=n%864e5/36e5,a=parseInt(o),c=n%36e5/6e4,r=parseInt(c),i=n%6e4/1e3,d=parseInt(i);t.Active.day=u,t.Active.hour=a,t.Active.minute=r,t.Active.second=d,console.log(" 相差 "+u+"天 "+a+"小时 "+r+" 分钟"+d+" 秒")}),t}},methods:{productDetailsTo:function(t,n){(0,o.navigateTo)("/pages/mall/productDetailsPage/productDetailsPage?id="+t+"&activeID="+n)}}});n.default=i}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/product-list/product-list-create-component',
    {
        'components/product-list/product-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4207"))
        })
    },
    [['components/product-list/product-list-create-component']]
]);                
