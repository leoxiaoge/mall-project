(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/product-list/product-list"],{"2fec":function(t,e,n){"use strict";var o=n("8af1"),u=n.n(o);u.a},4207:function(t,e,n){"use strict";n.r(e);var o=n("ec9d"),u=n("8def");for(var i in u)"default"!==i&&function(t){n.d(e,t,function(){return u[t]})}(i);n("2fec");var r=n("2877"),c=Object(r["a"])(u["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},"8af1":function(t,e,n){},"8def":function(t,e,n){"use strict";n.r(e);var o=n("b83d"),u=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=u.a},b83d:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=i(n("66fd")),u=n("c440");function i(t){return t&&t.__esModule?t:{default:t}}var r=function(){return n.e("components/uni-countdown/uni-countdown").then(n.bind(null,"6f12"))},c=o.default.extend({components:{uniCountdown:r},name:"productList",props:{options:{type:Array,default:function(){return[]}},title:{type:String,default:"正在竞拍"}},data:function(){return{options:[]}},computed:{product:function(){console.log(this.options);var t=this.options;return t.map(function(t){var e=t.Active.ActiveEndTime,n=new Date,o=n.getTime()-new Date(e).getTime(),u=(Math.floor(o/6e4),Math.floor(o/864e5)),i=o%864e5,r=Math.floor(i/36e5),c=i%36e5,a=Math.floor(c/6e4),f=c%6e4,d=Math.round(f/1e3);t.Active.day=u,t.Active.hour=r,t.Active.minute=a,t.Active.second=d,console.log(" 相差 "+u+"天 "+r+"小时 "+a+" 分钟"+d+" 秒")}),console.log(t),t}},methods:{productDetailsTo:function(t){(0,u.navigateTo)("../mall/productDetailsPage/productDetailsPage?id="+t)}}});e.default=c},ec9d:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return u})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/product-list/product-list-create-component',
    {
        'components/product-list/product-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4207"))
        })
    },
    [['components/product-list/product-list-create-component']]
]);                
