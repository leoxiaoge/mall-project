(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ucenter/orderDryingUpload/orderDryingUpload"],{"7c74":function(e,o,t){"use strict";var n=function(){var e=this,o=e.$createElement;e._self._c},r=[];t.d(o,"a",function(){return n}),t.d(o,"b",function(){return r})},afb5:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=a(t("66fd")),r=t("c440"),c=t("5177");function a(e){return e&&e.__esModule?e:{default:e}}var i=function(){return t.e("components/robby-image-upload/robby-image-upload").then(t.bind(null,"73ba"))},l=n.default.extend({data:function(){return{chosen:"",order:[],id:"",orderID:"",comment:"",commentPic:"",enableDel:!1,enableAdd:!1,enableDrag:!1,show:!0,imageData:[],serverUrl:"http://localhost:2000/work/uploadWorkPicture",serverUrlDeleteImage:"http://localhost:2000/work/deleteWorkPicture",formData:{userId:2}}},components:{robbyImageUpload:i},onLoad:function(e){this.id=e.id,this.orderID=e.OrderID,this.getProduct(),console.log("onLoad",e)},methods:{getProduct:function(){var e=this,o=this.orderID,t={OrderID:o};(0,r.request)(c.OrderListGet,t).then(function(o){console.log(o),e.order=o.OrderList})},deleteImage:function(e){console.log(e),this.commentPic=e.allImages},addImage:function(e){console.log("addImage",e),this.commentPic=e},bindTextAreaBlur:function(e){console.log(e.detail.value),this.comment=e.detail.value},formSubmit:function(){console.log("提交数据");var e=this.orderID,o=this.comment,t=JSON.stringify(this.commentPic);if(console.log(t),o){var n={OrderID:e,Comment:o,CommentPic:t};(0,r.request)(c.OrderDrying,n).then(function(e){var o="提交晒单成功，点击确定返回订单中心！";(0,r.defaultShowModal)(o).then(function(e){console.log(e),e.confirm?(console.log("用户点击确定"),(0,r.navigateTo)("../../ucenter/orderList/orderList")):e.cancel&&console.log("用户点击取消")})})}else(0,r.showToast)("请填写晒单内容！")},formReset:function(){console.log("清空数据"),this.chosen=""}}});o.default=l},b6c7:function(e,o,t){"use strict";t.r(o);var n=t("7c74"),r=t("ec53");for(var c in r)"default"!==c&&function(e){t.d(o,e,function(){return r[e]})}(c);t("bdf9");var a=t("2877"),i=Object(a["a"])(r["default"],n["a"],n["b"],!1,null,null,null);o["default"]=i.exports},bdf9:function(e,o,t){"use strict";var n=t("e142"),r=t.n(n);r.a},e142:function(e,o,t){},ec53:function(e,o,t){"use strict";t.r(o);var n=t("afb5"),r=t.n(n);for(var c in n)"default"!==c&&function(e){t.d(o,e,function(){return n[e]})}(c);o["default"]=r.a}},[["eca5","common/runtime","common/vendor"]]]);