(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/product-search-list/product-search-list"],{"4eee":function(t,e,a){"use strict";var n=a("73f7"),c=a.n(n);c.a},"73f7":function(t,e,a){},9163:function(t,e,a){"use strict";a.r(e);var n=a("a2a1"),c=a.n(n);for(var u in n)"default"!==u&&function(t){a.d(e,t,function(){return n[t]})}(u);e["default"]=c.a},a2a1:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(a("66fd")),c=a("c440");function u(t){return t&&t.__esModule?t:{default:t}}var r=function(){return a.e("components/uni-countdown/uni-countdown").then(a.bind(null,"6f12"))},i=n.default.extend({components:{uniCountdown:r},name:"productList",props:{options:{type:Array}},data:function(){return{activeStatus:"马上参与"}},computed:{product:function(){var t=this,e=this.options;return e.map(function(e){try{switch(e.Status){case 0:t.activeStatus=t.activeStatus;break;case 1:t.activeStatus=t.activeStatus;break;case 2:t.activeStatus=t.activeStatus;break;case 3:t.activeStatus=t.activeStatus;break;case 4:var a="参与下一期";t.activeStatus=a;break}}catch(l){console.error("处理消息出错："+l)}var n=e.Active.SeqMiniSeconds,c=n/864e5,u=parseInt(c),r=n%864e5/36e5,i=parseInt(r),o=n%36e5/6e4,s=parseInt(o),f=n%6e4/1e3,d=parseInt(f);e.Active.day=u,e.Active.hour=i,e.Active.minute=s,e.Active.second=d,e.seconds=60*u*60*24+60*i*60+60*s+d}),e=JSON.parse(JSON.stringify(e)),e}},methods:{productDetailsTo:function(t){(0,c.navigateTo)("/pages/mall/productDetailsPage/productDetailsPage?activeID="+t)}}});e.default=i},c5fc:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},c=[];a.d(e,"a",function(){return n}),a.d(e,"b",function(){return c})},ef58:function(t,e,a){"use strict";a.r(e);var n=a("c5fc"),c=a("9163");for(var u in c)"default"!==u&&function(t){a.d(e,t,function(){return c[t]})}(u);a("4eee");var r=a("2877"),i=Object(r["a"])(c["default"],n["a"],n["b"],!1,null,null,null);e["default"]=i.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/product-search-list/product-search-list-create-component',
    {
        'components/product-search-list/product-search-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ef58"))
        })
    },
    [['components/product-search-list/product-search-list-create-component']]
]);                
