(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/orderDryingUpload/orderDryingUpload"],{"89b0":function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=c(o("66fd")),r=o("c440"),a=o("5177");function c(e){return e&&e.__esModule?e:{default:e}}var u=function(){return o.e("components/robby-image-upload/robby-image-upload").then(o.bind(null,"73ba"))},i=t.default.extend({data:function(){return{chosen:"",order:[],productID:"",orderID:"",comment:"",commentPic:"",enableDel:!1,enableAdd:!1,enableDrag:!1,show:!0,textarea:!1,value:[],limit:9,imageData:[],formData:{userId:2}}},components:{robbyImageUpload:u},onLoad:function(e){this.productID=e.productID,this.orderID=e.OrderID,this.getProduct(),console.log("onLoad",e)},onPullDownRefresh:function(){this.getProduct()},onShareAppMessage:function(e){return(0,r.onShareAppMessage)(e)},methods:{getProduct:function(){var e=this,n=this.orderID,o={OrderID:n};(0,r.request)(a.OrderListGet,o).then(function(n){console.log(n),e.order=n.OrderList,e.textarea=!0})},deleteImage:function(e){console.log(e),this.commentPic=e.allImages},addImage:function(e){console.log("addImage",e),this.commentPic=e.allImages},picUrlInput:function(e){this.commentPic=e},bindTextAreaBlur:function(e){console.log(e.detail.value),this.comment=e.detail.value},formSubmit:function(){console.log("提交数据");var e=this.orderID,n=this.comment,o=JSON.stringify(this.commentPic);if(console.log(o),n){var t={OrderID:e,Comment:n,CommentPic:o};(0,r.request)(a.OrderDrying,t).then(function(e){var n="提交晒单成功，点击确定返回订单中心！";(0,r.defaultShowModal)(n).then(function(e){console.log(e),e.confirm?(console.log("用户点击确定"),(0,r.navigateTo)("../../ucenter/myOrder/myOrder")):e.cancel&&console.log("用户点击取消")})})}else(0,r.showToast)("请填写晒单内容！")},formReset:function(){console.log("清空数据")}}});n.default=i},b6c7:function(e,n,o){"use strict";o.r(n);var t=o("f9e2"),r=o("ec53");for(var a in r)"default"!==a&&function(e){o.d(n,e,function(){return r[e]})}(a);o("bdf9");var c=o("2877"),u=Object(c["a"])(r["default"],t["a"],t["b"],!1,null,null,null);n["default"]=u.exports},bdf9:function(e,n,o){"use strict";var t=o("e142"),r=o.n(t);r.a},e142:function(e,n,o){},ec53:function(e,n,o){"use strict";o.r(n);var t=o("89b0"),r=o.n(t);for(var a in t)"default"!==a&&function(e){o.d(n,e,function(){return t[e]})}(a);n["default"]=r.a},f9e2:function(e,n,o){"use strict";var t=function(){var e=this,n=e.$createElement;e._self._c},r=[];o.d(n,"a",function(){return t}),o.d(n,"b",function(){return r})}},[["eca5","common/runtime","common/vendor"]]]);