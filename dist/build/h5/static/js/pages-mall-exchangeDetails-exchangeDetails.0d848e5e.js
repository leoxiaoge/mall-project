(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mall-exchangeDetails-exchangeDetails"],{"327a":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",{staticClass:"parse"},[n("uParse",{attrs:{content:e.article},on:{preview:function(t){t=e.$handleEvent(t),e.preview(t)},navigate:function(t){t=e.$handleEvent(t),e.navigate(t)}}})],1),n("v-uni-view",{staticClass:"i-kong"}),n("v-uni-view",{staticClass:"mask-show",class:e.show?"show":"hide"},[n("v-uni-view",{staticClass:"mask",on:{click:function(t){t=e.$handleEvent(t),e.hide(t)},touchmove:function(t){t.stopPropagation(),t.preventDefault(),t=e.$handleEvent(t),e.moveHandle(t)}}}),n("v-uni-view",{staticClass:"exchange"},[e.show?e._e():n("v-uni-view",{staticClass:"exchange-now"},[n("v-uni-button",{staticClass:"btn exchange-btn",on:{click:function(t){t=e.$handleEvent(t),e.isShow(t)}}},[e._v("马上兑换")])],1),n("v-uni-view",{staticClass:"exchange-model mask-content"},[n("v-uni-view",{staticClass:"exchange-model-head"},[n("v-uni-text",[e._v("订单信息确认")])],1),e._l(e.addressList,(function(t,a){return n("v-uni-view",{key:a,staticClass:"exchange-model-address",on:{click:function(t){t=e.$handleEvent(t),e.addressClick(t)}}},[n("v-uni-view",{staticClass:"exchange-model-address-body"},[n("v-uni-view",{staticClass:"exchange-model-address-user"},[n("v-uni-text",[e._v(e._s(t.realName))]),n("v-uni-text",{staticClass:"exchange-model-mobile"},[e._v(e._s(t.Mobile))])],1),n("v-uni-view",{staticClass:"exchange-model-address-list"},[n("v-uni-text",[e._v(e._s(t.Province))]),n("v-uni-text",[e._v(e._s(t.City))]),n("v-uni-text",[e._v(e._s(t.Area))]),n("v-uni-text",[e._v(e._s(t.Address))])],1)],1),n("v-uni-view",{staticClass:"exchange-model-arrow uni-icon uni-icon-arrowright"})],1)})),e.addressList.length<=0?n("v-uni-view",{staticClass:"exchange-model-address",on:{click:function(t){t=e.$handleEvent(t),e.addressClick(t)}}},[n("v-uni-view",{staticClass:"exchange-model-address-body"}),n("v-uni-view",{staticClass:"exchange-model-arrow uni-icon uni-icon-arrowright"})],1):e._e(),n("v-uni-view",{staticClass:"exchange-model-integrals"},[e.userInfo?n("v-uni-view",{staticClass:"exchange-model-remaining-integrals"},[n("v-uni-text",[e._v("剩余积分：")]),n("v-uni-text",[e._v(e._s(e.userInfo.SeqIntegrals))]),n("v-uni-text",[e._v("分")])],1):e._e(),e.integrals?n("v-uni-view",{staticClass:"exchange-model-need-integrals"},[n("v-uni-text",[e._v("所需积分：")]),n("v-uni-text",[e._v(e._s(e.integrals))]),n("v-uni-text",[e._v("分")])],1):e._e()],1),n("v-uni-view",{staticClass:"exchange-submit"},[n("v-uni-button",{staticClass:"submitBtn",on:{click:function(t){t=e.$handleEvent(t),e.exchangeSubmit(t)}}},[e._v("确认订单")])],1)],2)],1)],1)],1)},s=[];n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return s}))},"47d4":function(e,t,n){"use strict";n.r(t);var a=n("7346"),s=n.n(a);for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);t["default"]=s.a},7346:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=d(n("a34a")),s=d(n("e143")),i=n("c440"),o=n("5177"),r=d(n("5f49"));function d(e){return e&&e.__esModule?e:{default:e}}function c(e,t,n,a,s,i,o){try{var r=e[i](o),d=r.value}catch(c){return void n(c)}r.done?t(d):Promise.resolve(d).then(a,s)}function l(e){return function(){var t=this,n=arguments;return new Promise((function(a,s){var i=e.apply(t,n);function o(e){c(i,a,s,o,r,"next",e)}function r(e){c(i,a,s,o,r,"throw",e)}o(void 0)}))}}var u=s.default.extend({components:{uParse:r.default},data:function(){return{id:"",addressID:"",article:"",integrals:"",userInfo:"",addressList:[],show:!1}},onLoad:function(e){this.id=e.id,this.integrals=e.integrals},onShow:function(){this.getProduct()},onShareAppMessage:function(e){return(0,i.onShareAppMessage)(e)},methods:{getProduct:function(){var e=l(a.default.mark((function e(){var t,n,s,r,d=this;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=this.id,n={ProductID:t},(0,i.request)(o.ProductGet,n).then((function(e){d.article=e.Product.ProductDesc})),this.addressID=uni.getStorageSync("addressID"),e.next=6,this.getLoginUser();case 6:return s=e.sent,this.userInfo=s,e.next=10,this.getUserAddressList();case 10:r=e.sent,this.addressList=r.AddressList;case 12:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),preview:function(e,t){console.log("src: "+e)},navigate:function(e,t){(0,i.showModal)("点击链接为："+e)},isShow:function(){this.show=!0},getLoginUser:function(){return new Promise((function(e,t){var n={};(0,i.request)(o.GetLoginUser,n).then((function(t){uni.setStorageSync("UserInfo",t.UserInfo),e(t.UserInfo)}))}))},getUserAddressList:function(){var e=this;return new Promise((function(t,n){var a=e.addressID,s={AddressID:a};(0,i.request)(o.UserAddressListGet,s).then((function(e){t(e)}))}))},exchangeSubmit:function(){var e=this,t=this.id,n=this.addressID;if(!n){var a="你还没有默认地址，请点击确定去填写地址信息！";(0,i.defaultShowModal)(a).then((function(e){e.confirm?(console.log("用户点击确定"),(0,i.navigateTo)("../../ucenter/addressShipping/addressShipping")):e.cancel&&console.log("用户点击取消")}))}var s={ExchangeID:t,AddressID:n};(0,i.request)(o.OrderExchangeSubmit,s).then((function(t){e.show=!1;var n="兑换成功，请点击确定查看订单！";(0,i.defaultShowModal)(n).then((function(e){if(e.confirm){console.log("用户点击确定");var t="-1";(0,i.navigateTo)("../../ucenter/orderList/orderList?status="+t)}else e.cancel&&console.log("用户点击取消")}))}))},hide:function(){this.show=!1},moveHandle:function(){this.show=!1},addressClick:function(){var e=!0;(0,i.navigateTo)("../../ucenter/addressShipping/addressShipping?disabled="+e)}}});t.default=u},aa38:function(e,t,n){var a=n("f8d3");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var s=n("4f06").default;s("355566cf",a,!0,{sourceMap:!1,shadowMode:!1})},c4b6:function(e,t,n){"use strict";n.r(t);var a=n("327a"),s=n("47d4");for(var i in s)"default"!==i&&function(e){n.d(t,e,(function(){return s[e]}))}(i);n("d65c");var o=n("2877"),r=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,"b27abdfe",null);t["default"]=r.exports},d65c:function(e,t,n){"use strict";var a=n("aa38"),s=n.n(a);s.a},f8d3:function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,".mask[data-v-b27abdfe]{position:fixed;top:0;left:0;right:0;bottom:0;z-index:10;background:rgba(0,0,0,.3);display:none;z-index:998}.mask-content[data-v-b27abdfe]{position:fixed;left:0;bottom:0;width:100%;background-color:#fff;-webkit-transform:translateY(100%);-ms-transform:translateY(100%);transform:translateY(100%);-webkit-transition:all .4s ease;-o-transition:all .4s ease;transition:all .4s ease;z-index:999}.show .mask-content[data-v-b27abdfe]{-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.show .mask[data-v-b27abdfe]{display:block}.exchange[data-v-b27abdfe]{position:fixed;bottom:0;width:100%;z-index:999}.exchange-btn[data-v-b27abdfe]{color:#fff;background-color:#fe7f00}.exchange-model[data-v-b27abdfe]{background-color:#fff}.exchange-model-head[data-v-b27abdfe]{font-size:%?32?%;color:#767676;text-align:center;padding:%?20?% 0}.exchange-model-address[data-v-b27abdfe]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border-top:%?2?% solid #f4f4f4;border-bottom:%?2?% solid #f4f4f4;padding:%?20?% %?30?%}.exchange-model-address-user uni-text[data-v-b27abdfe]{font-size:%?32?%}.exchange-model-mobile[data-v-b27abdfe]{margin-left:%?60?%}.exchange-model-integrals[data-v-b27abdfe]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;padding:%?20?% %?30?%}.exchange-model-need-integrals uni-text[data-v-b27abdfe]{color:#fe7f00}.exchange-submit[data-v-b27abdfe]{padding:%?20?% %?30?%}.submitBtn[data-v-b27abdfe]{line-height:%?80?%;color:#fff;background-color:#fe7f00;border-radius:%?100?%}",""])}}]);