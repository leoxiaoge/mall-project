(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/product-list/product-list"],{"2fec":function(t,e,n){"use strict";var o=n("8af1"),u=n.n(o);u.a},4207:function(t,e,n){"use strict";n.r(e);var o=n("4e3d"),u=n("ebc7");for(var c in u)"default"!==c&&function(t){n.d(e,t,function(){return u[t]})}(c);n("2fec");var i=n("2877"),r=Object(i["a"])(u["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},"4e3d":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},u=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return u})},"8af1":function(t,e,n){},"9eb6":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n("c440"),u=function(){return n.e("components/uni-countdown/uni-countdown").then(n.bind(null,"6f12"))},c={components:{uniCountdown:u},name:"productList",props:{options:{type:Array,default:function(){return[]}},title:{type:String,default:"即将开拍"}},data:function(){return{}},computed:{product:function(){console.log(this.options);var t=this.options;return t.map(function(t){var e=t.Active.ActiveEndTime,n=new Date,o=n.getTime()-new Date(e).getTime(),u=(Math.floor(o/6e4),Math.floor(o/864e5)),c=o%864e5,i=Math.floor(c/36e5),r=c%36e5,a=Math.floor(r/6e4),l=r%6e4,f=Math.round(l/1e3);t.Active.day=u,t.Active.hour=i,t.Active.minute=a,t.Active.second=f,console.log(" 相差 "+u+"天 "+i+"小时 "+a+" 分钟"+f+" 秒")}),console.log(t),t}},methods:{productDetailsTo:function(t){(0,o.navigateTo)("../mall/productDetailsPage/productDetailsPage?id="+t)}}};e.default=c},ebc7:function(t,e,n){"use strict";n.r(e);var o=n("9eb6"),u=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);e["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/product-list/product-list-create-component',
    {
        'components/product-list/product-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4207"))
        })
    },
    [['components/product-list/product-list-create-component']]
]);                
