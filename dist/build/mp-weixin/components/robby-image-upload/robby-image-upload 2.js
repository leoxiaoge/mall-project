(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/robby-image-upload/robby-image-upload"],{"35f1":function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=(e._self._c,e.__map(e.picUrl,function(t,i){var a=e.isDragging(i);return{$orig:e.__get_orig(t),m0:a}}));e.$mp.data=Object.assign({},{$root:{l0:i}})},n=[];i.d(t,"a",function(){return a}),i.d(t,"b",function(){return n})},"73ba":function(e,t,i){"use strict";i.r(t);var a=i("35f1"),n=i("d1b1");for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);i("f94b");var o=i("2877"),r=Object(o["a"])(n["default"],a["a"],a["b"],!1,null,null,null);t["default"]=r.exports},b39f:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,n=i("c440"),s=i("5177"),o={name:"robby-image-upload",props:{value:{type:Array,default:function(){return[]}},enableDel:{type:Boolean,default:!0},enableAdd:{type:Boolean,default:!0}},data:function(){return{imageBasePos:{x0:-1,y0:-1,w:-1,h:-1},showMoveImage:!1,moveImagePath:"",moveLeft:0,moveTop:0,deltaLeft:0,deltaTop:0,dragIndex:null,targetImageIndex:null,picUrl:[],url:"https://api.tengpaisc.com",imageUpload:"/static/icon/icon_image_upload.png"}},computed:{posMoveImageLeft:function(){return this.moveLeft+"px"},posMoveImageTop:function(){return this.moveTop+"px"},isShowDel:function(){return!1!==this.enableDel},isShowAdd:function(){return!1!==this.enableAdd&&!(this.limit&&this.value.length>=this.limit)},isDragable:function(){return!1!==this.enableDrag}},methods:{selectImage:function(){a=this,a.value||(a.value=[]),e.chooseImage({count:a.limit?a.limit-a.value.length:999,success:function(e){var t=e.tempFilePaths;if(a.limit){var i=a.limit-a.value.length;if(i<t.length){var s="图片总数限制为".concat(a.limit,"张，当前还可以选").concat(i,"张");return void(0,n.showToast)(s)}}console.log(t),t.forEach(function(e){a.uploadImage(e)});for(var o=0;o<t.length;o++)a.value.push(t[o])}})},uploadImage:function(e){var t=this,i={};(0,n.upload)(s.OrderDryingUpload,i,e).then(function(e){console.log(e);var i=JSON.parse(e);console.log(i.PicUrl),console.log(a.picUrl);var n=i.PicUrl;console.log(a.picUrl,n),a.picUrl=a.picUrl.concat(i.PicUrl),t.$emit("add",{currentImage:n,allImages:a.picUrl})})},deleteImage:function(e){var t=e.currentTarget.dataset.index,i=this.value[t];this.value.splice(t,1),this.picUrl.splice(t,1),this.$emit("delete",{currentImage:i,allImages:this.picUrl}),this.$emit("input",this.value)},previewImage:function(t){var i=t.currentTarget.dataset.index,a=this.value[i],n=this.value;e.previewImage({current:a,indicator:"number",loop:"true",urls:n})},initImageBasePos:function(){var t=.024;a=this,e.getSystemInfo({success:function(e){var i=e.screenWidth,n=Math.ceil(t*i),s=Math.ceil((i-2*n)/4);a.imageBasePos.x0=n,a.imageBasePos.w=s,a.imageBasePos.h=s}})},findOverlapImage:function(e,t){var i=Math.floor((e-this.imageBasePos.x0)/this.imageBasePos.w),a=Math.floor((t-this.imageBasePos.y0)/this.imageBasePos.h),n=4*a+i;return n},isDragging:function(e){return this.dragIndex===e},start:function(e){if(this.isDragable){if(this.dragIndex=e.currentTarget.dataset.index,this.moveImagePath=this.value[this.dragIndex],this.movePicImagePath=this.picUrl[this.dragIndex],this.showMoveImage=!0,-1===this.imageBasePos.y0){this.initImageBasePos();var t=Math.floor(this.dragIndex/4)*this.imageBasePos.h,i=e.currentTarget.offsetTop;this.imageBasePos.y0=i-t}this.moveLeft=e.target.offsetLeft,this.moveTop=e.target.offsetTop}},move:function(e){if(this.isDragable){var t=e.touches[0];this.targetImageIndex=this.findOverlapImage(t.clientX,t.clientY),0===this.deltaLeft&&(this.deltaLeft=t.clientX-this.moveLeft,this.deltaTop=t.clientY-this.moveTop),this.moveLeft=t.clientX-this.deltaLeft,this.moveTop=t.clientY-this.deltaTop}},stop:function(e){this.isDragable&&(null!==this.dragIndex&&null!==this.targetImageIndex&&(this.targetImageIndex<0&&(this.targetImageIndex=0),this.targetImageIndex>=this.value.length&&(this.targetImageIndex=this.value.length-1),this.dragIndex!==this.targetImageIndex&&(this.value[this.dragIndex]=this.value[this.targetImageIndex],this.value[this.targetImageIndex]=this.moveImagePath,this.picUrl[this.dragIndex]=this.picUrl[this.targetImageIndex],this.picUrl[this.targetImageIndex]=this.movePicImagePath)),this.dragIndex=null,this.targetImageIndex=null,this.deltaLeft=0,this.deltaTop=0,this.showMoveImage=!1,console.log(this.value),console.log(this.picUrl),this.$emit("input",this.value),this.$emit("picUrlInput",this.picUrl))}}};t.default=o}).call(this,i("543d")["default"])},d1b1:function(e,t,i){"use strict";i.r(t);var a=i("b39f"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,function(){return a[e]})}(s);t["default"]=n.a},f94b:function(e,t,i){"use strict";var a=i("ffb7"),n=i.n(a);n.a},ffb7:function(e,t,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/robby-image-upload/robby-image-upload-create-component',
    {
        'components/robby-image-upload/robby-image-upload-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("73ba"))
        })
    },
    [['components/robby-image-upload/robby-image-upload-create-component']]
]);                
