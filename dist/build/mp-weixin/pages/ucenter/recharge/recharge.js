(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/recharge/recharge"],{"0e4a":function(n,e,t){"use strict";t.r(e);var o=t("73d5"),a=t.n(o);for(var i in o)"default"!==i&&function(n){t.d(e,n,(function(){return o[n]}))}(i);e["default"]=a.a},"32ca":function(n,e,t){"use strict";(function(n){t("6cdc"),t("921b");var e=o(t("4781"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},4781:function(n,e,t){"use strict";t.r(e);var o=t("e922"),a=t("0e4a");for(var i in a)"default"!==i&&function(n){t.d(e,n,(function(){return a[n]}))}(i);t("5744");var r=t("2877"),c=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},5744:function(n,e,t){"use strict";var o=t("bc9f"),a=t.n(o);a.a},"73d5":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(t("a34a")),a=t("c440"),i=t("5177");function r(n){return n&&n.__esModule?n:{default:n}}function c(n,e,t,o,a,i,r){try{var c=n[i](r),u=c.value}catch(s){return void t(s)}c.done?e(u):Promise.resolve(u).then(o,a)}function u(n){return function(){var e=this,t=arguments;return new Promise((function(o,a){var i=n.apply(e,t);function r(n){c(i,o,a,r,u,"next",n)}function u(n){c(i,o,a,r,u,"throw",n)}r(void 0)}))}}var s={data:function(){return{title:"request-payment",loading:!1,price:1,color:"#fe7f00",current:0,providerList:[{name:"微信",id:"wxpay",value:"wxpay",icon:"/static/icon/icon_wxpay.png"},{name:"支付宝",id:"alipay",value:"alipay",icon:"/static/icon/icon_alipay.png"}],payList:[],payIndex:0,moneyID:"",payMoney:"",payTypeID:1}},onLoad:function(){this.getPayMoneyList(),this.getProvider()},onShareAppMessage:function(n){return(0,a.onShareAppMessage)(n)},methods:{getProvider:function(){n.getProvider({service:"payment",success:function(n){console.log("payment success:"+JSON.stringify(n));var e=[];n.provider.map((function(n){switch(n){case"wxpay":e.push({name:"微信",icon:"/static/icon/icon_wxpay.png",id:n,value:n,loading:!1});break;case"alipay":e.push({name:"支付宝",icon:"/static/icon/icon_alipay.png",id:n,value:n,loading:!1});break;default:break}}))},fail:function(n){console.log("获取支付通道失败：",n)}})},getPayMoneyList:function(){var n=this,e={};(0,a.request)(i.PayMoneyListGet,e).then((function(e){console.log(e),n.payList=e.PayMoneyList,n.moneyID=e.PayMoneyList[0].ID,n.payMoney=e.PayMoneyList[0].PayMoney}))},changePayment:function(n){this.payIndex=n;var e=this.payList,t=e[n].ID;this.moneyID=t,console.log(t),this.payMoney=e[n].PayMoney},payment:function(){var e=u(o.default.mark((function e(){var t,i,r=this;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log("发起支付"),this.loading=!0,e.next=4,this.payMoneySubmit();case 4:t=e.sent,i=JSON.parse(t),console.log(i),console.log(i.timeStamp),n.requestPayment({timeStamp:i.timeStamp,nonceStr:i.nonceStr,package:i.package,signType:"MD5",paySign:i.paySign,success:function(n){showToast("充值成功！")},fail:function(n){(0,a.showModal)("支付失败，用户取消支付！")},complete:function(){r.loading=!1}});case 9:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),getWXOpenIDH5:function(){return this.getJDKWXOpenID(),new Promise((function(n,e){var t=theRequest,o={JSCode:t};(0,a.request)(i.GetWXOpenID,o).then((function(e){console.log(e),n(e.OpenID)}))}))},getWXOpenID:function(){var e=this;return new Promise((function(t,o){n.login({success:function(n){console.log("login success",n);var e=n.code,o={JSCode:e};(0,a.request)(i.GetWXOpenID,o).then((function(n){console.log(n),t(n.OpenID)}))},fail:function(n){console.log("fail",n),e.loading=!1}})}))},formSubmit:function(n){var e=n.detail.formId,t={FormID:e};(0,a.request)(i.AddUserFormID,t).then((function(n){console.log(n)}))},payMoneySubmit:function(){var n=u(o.default.mark((function n(){var e,t=this;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,this.getWXOpenID();case 2:return e=n.sent,n.abrupt("return",new Promise((function(n,o){var r=t.moneyID,c=t.payTypeID,u={MoneyID:r,PayTypeID:c,OpenID:e};(0,a.request)(i.PayMoneySubmit,u).then((function(e){console.log(e),n(e.PayParam)}))})));case 4:case"end":return n.stop()}}),n,this)})));function e(){return n.apply(this,arguments)}return e}(),getOrderInfo:function(){var n=this,e="";return new Promise((function(t,o){var r=n.moneyID,c=n.payTypeID,u={MoneyID:r,PayTypeID:c,appid:e};(0,a.request)(i.PayMoneySubmit,u).then((function(n){console.log(n),t(n)}))}))}}};e.default=s}).call(this,t("543d")["default"])},bc9f:function(n,e,t){},e922:function(n,e,t){"use strict";var o=function(){var n=this,e=n.$createElement;n._self._c},a=[];t.d(e,"a",(function(){return o})),t.d(e,"b",(function(){return a}))}},[["32ca","common/runtime","common/vendor"]]]);