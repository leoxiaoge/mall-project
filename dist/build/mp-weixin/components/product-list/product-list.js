(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/product-list/product-list"],{"05d9":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return c})},"24d7":function(t,e,n){},"2fec":function(t,e,n){"use strict";var a=n("24d7"),c=n.n(a);c.a},4207:function(t,e,n){"use strict";n.r(e);var a=n("05d9"),c=n("8def");for(var u in c)"default"!==u&&function(t){n.d(e,t,function(){return c[t]})}(u);n("2fec");var i=n("2877"),o=Object(i["a"])(c["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports},"8def":function(t,e,n){"use strict";n.r(e);var a=n("c6cf"),c=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);e["default"]=c.a},c6cf:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=u(n("66fd")),c=n("c440");function u(t){return t&&t.__esModule?t:{default:t}}var i=function(){return n.e("components/page-head/page-head").then(n.bind(null,"0586"))},o=function(){return n.e("components/uni-countdown/uni-countdown").then(n.bind(null,"6f12"))},r=a.default.extend({components:{pageHead:i,uniCountdown:o},name:"productList",props:{options:{type:Array},title:{type:String,default:"即将竞拍"}},data:function(){return{activeStatus:"马上参与"}},computed:{product:function(){var t=this,e=this.options;return e.map(function(e){try{switch(e.Status){case 0:t.activeStatus=t.activeStatus;break;case 1:t.activeStatus=t.activeStatus;break;case 2:t.activeStatus=t.activeStatus;break;case 3:t.activeStatus=t.activeStatus;break;case 4:var n="参与下一期";t.activeStatus=n;break}}catch(l){console.error("处理消息出错："+l)}var a=e.Active.SeqMiniSeconds,c=a/864e5,u=parseInt(c),i=a%864e5/36e5,o=parseInt(i),r=a%36e5/6e4,s=parseInt(r),d=a%6e4/1e3,f=parseInt(d);e.Active.day=u,e.Active.hour=o,e.Active.minute=s,e.Active.second=f,e.seconds=60*u*60*24+60*o*60+60*s+f}),e=JSON.parse(JSON.stringify(e)),console.log("list",e),e}},methods:{productDetailsTo:function(t){(0,c.navigateTo)("/pages/mall/productDetailsPage/productDetailsPage?activeID="+t)}}});e.default=r}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/product-list/product-list-create-component',
    {
        'components/product-list/product-list-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4207"))
        })
    },
    [['components/product-list/product-list-create-component']]
]);                
