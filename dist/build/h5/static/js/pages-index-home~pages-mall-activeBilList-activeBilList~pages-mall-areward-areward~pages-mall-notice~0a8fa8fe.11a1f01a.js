(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-home~pages-mall-activeBilList-activeBilList~pages-mall-areward-areward~pages-mall-notice~0a8fa8fe"],{"3e72":function(t,o,e){"use strict";e.r(o);var i=e("7c75"),n=e("4847");for(var s in n)"default"!==s&&function(t){e.d(o,t,function(){return n[t]})}(s);e("6451");var l=e("2877"),r=Object(l["a"])(n["default"],i["a"],i["b"],!1,null,"8560cae0",null);o["default"]=r.exports},4847:function(t,o,e){"use strict";e.r(o);var i=e("5611"),n=e.n(i);for(var s in i)"default"!==s&&function(t){e.d(o,t,function(){return i[t]})}(s);o["default"]=n.a},5611:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var i=s(e("e90d")),n=s(e("93cf"));function s(t){return t&&t.__esModule?t:{default:t}}var l={data:function(){return{mescroll:null,viewId:"id_"+Math.random().toString(36).substr(2),downHight:0,downRotate:0,isDownReset:!1,isDownLoading:!1,isUpLoading:!1,isUpNoMore:!1,isShowEmpty:!1,isShowToTop:!1,scrollAble:!0,scrollTop:0,scrollAnim:!1,windowTop:0,windowBottom:0}},props:{down:Object,up:Object,top:[String,Number],bottom:[String,Number],fixed:{type:Boolean,default:function(){return!0}}},computed:{numTop:function(){return uni.upx2px(Number(this.top||0))},fixedTop:function(){return this.fixed?this.numTop+this.windowTop+"px":0},padTop:function(){return this.fixed?0:this.numTop+"px"},numBottom:function(){return uni.upx2px(Number(this.bottom||0))},fixedBottom:function(){return this.fixed?this.numBottom+this.windowBottom+"px":0},padBottom:function(){return this.fixed?0:this.numBottom+"px"},optEmpty:function(){return this.mescroll.optUp.empty},transition:function(){return this.isDownReset?"transform 300ms":""},translateY:function(){return this.downHight>0?"translateY("+this.downHight+"px)":""}},methods:{scroll:function(t){var o=this;this.mescroll.scroll(t.detail,function(){o.$emit("scroll",o.mescroll)})},touchstartEvent:function(t){this.mescroll.touchstartEvent(t)},touchmoveEvent:function(t){this.mescroll.touchmoveEvent(t)},touchendEvent:function(t){this.mescroll.touchendEvent(t)},emptyClick:function(){this.$emit("emptyclick",this.mescroll)},toTopClick:function(){this.isShowToTop=!1,this.mescroll.scrollTo(0,this.mescroll.optUp.toTop.duration),this.$emit("topclick",this.mescroll)},setClientHeight:function(){var t=this;0!==this.mescroll.getClientHeight(!0)||this.isExec||(this.isExec=!0,this.$nextTick(function(){var o=uni.createSelectorQuery().in(t).select("#"+t.viewId);o.boundingClientRect(function(o){t.isExec=!1,o?t.mescroll.setClientHeight(o.height):3!=t.clientNum&&(t.clientNum=null==t.clientNum?1:t.clientNum+1,setTimeout(function(){t.setClientHeight()},100*t.clientNum))}).exec()}))}},created:function(){var t=this,o={down:{offset:uni.upx2px(130),inOffset:function(o){t.scrollAble=!1,t.isDownReset=!1,t.isDownLoading=!1,t.downRotate="rotate(0deg)"},outOffset:function(o){t.scrollAble=!1,t.isDownReset=!1,t.isDownLoading=!1,t.downRotate="rotate(180deg)"},onMoving:function(o,e,i){t.downHight=i},showLoading:function(o,e){t.scrollAble=!0,t.isDownReset=!0,t.isDownLoading=!0,t.downHight=e},endDownScroll:function(o){t.scrollAble=!0,t.isDownReset=!0,t.isDownLoading=!1,t.downHight=0},callback:function(o){t.$emit("down",o)}},up:{showLoading:function(){t.isUpLoading=!0,t.isUpNoMore=!1},showNoMore:function(){t.isUpLoading=!1,t.isUpNoMore=!0},hideUpScroll:function(){t.isUpLoading=!1,t.isUpNoMore=!1},empty:{onShow:function(o){t.isShowEmpty=o}},toTop:{onShow:function(o){t.isShowToTop=o}},callback:function(o){t.$emit("up",o),t.setClientHeight()}}};i.default.extend(o,n.default);var e=JSON.parse(JSON.stringify({down:t.down,up:t.up}));i.default.extend(e,o),t.mescroll=new i.default(e),t.mescroll.viewId=t.viewId,t.$emit("init",t.mescroll),uni.getSystemInfo({success:function(o){o.windowTop&&(t.windowTop=o.windowTop),o.windowBottom&&(t.windowBottom=o.windowBottom),t.mescroll.setBodyHeight(o.windowHeight)}}),t.mescroll.resetScrollTo(function(o,e){var i=t.mescroll.getScrollTop();0===e?(t.scrollAnim=!1,t.scrollTop=i,t.$nextTick(function(){t.scrollTop=o})):(t.scrollAnim=!0,t.mescroll.getStep(i,o,function(o){t.scrollTop=o},e))})},mounted:function(){this.setClientHeight()}};o.default=l},6451:function(t,o,e){"use strict";var i=e("cce8"),n=e.n(i);n.a},"7c75":function(t,o,e){"use strict";var i=function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("v-uni-view",{staticClass:"mescroll-uni-warp"},[e("v-uni-scroll-view",{staticClass:"mescroll-uni",class:{"mescroll-uni-fixed":t.fixed},style:{"padding-top":t.padTop,"padding-bottom":t.padBottom,top:t.fixedTop,bottom:t.fixedBottom},attrs:{id:t.viewId,"scroll-top":t.scrollTop,"scroll-with-animation":t.scrollAnim,"scroll-y":t.scrollAble,throttle:null==t.mescroll.optUp.onScroll,"enable-back-to-top":!0},on:{scroll:function(o){o=t.$handleEvent(o),t.scroll(o)},touchstart:function(o){o=t.$handleEvent(o),t.touchstartEvent(o)},touchmove:function(o){o=t.$handleEvent(o),t.touchmoveEvent(o)},touchend:function(o){o=t.$handleEvent(o),t.touchendEvent(o)},touchcancel:function(o){o=t.$handleEvent(o),t.touchendEvent(o)}}},[e("v-uni-view",{style:{transform:t.translateY,transition:t.transition}},[t.mescroll.optDown.use?e("v-uni-view",{staticClass:"mescroll-downwarp mescroll-uni-bg"},[e("v-uni-view",{staticClass:"downwarp-content"},[e("v-uni-image",{staticClass:"downwarp-slogan",attrs:{src:"https://api.tengpaisc.com/upload/guidang/icon_slogan.png",mode:"widthFix"}}),t.isDownLoading?t._e():e("v-uni-view",{staticClass:"downwarp-progress",style:{transform:t.downRotate}}),t.isDownLoading?e("v-uni-view",{staticClass:"downwarp-loading mescroll-rotate"}):t._e(),e("v-uni-view",{staticClass:"downwarp-mascot"})],1)],1):t._e(),t._t("default"),t.isShowEmpty?e("v-uni-view",{staticClass:"mescroll-empty",class:{"empty-fixed":t.optEmpty.fixed},style:{"z-index":t.optEmpty.zIndex,top:t.optEmpty.top}},[t.optEmpty.icon?e("v-uni-image",{staticClass:"empty-icon",attrs:{src:t.optEmpty.icon,mode:"widthFix"}}):t._e(),t.optEmpty.tip?e("v-uni-view",{staticClass:"empty-tip"},[t._v(t._s(t.optEmpty.tip))]):t._e(),t.optEmpty.btnText?e("v-uni-view",{staticClass:"empty-btn",on:{click:function(o){o=t.$handleEvent(o),t.emptyClick(o)}}},[t._v(t._s(t.optEmpty.btnText))]):t._e()],1):t._e(),t.mescroll.optUp.use?e("v-uni-view",{staticClass:"mescroll-upwarp"},[e("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.isUpLoading,expression:"isUpLoading"}]},[e("v-uni-view",{staticClass:"upwarp-progress mescroll-rotate"}),e("v-uni-view",{staticClass:"upwarp-tip"},[t._v(t._s(t.mescroll.optUp.textLoading))])],1),!t.isDownLoading&&t.isUpNoMore?e("v-uni-view",{staticClass:"upwarp-nodata"},[t._v(t._s(t.mescroll.optUp.textNoMore))]):t._e()],1):t._e()],2)],1),t.mescroll.optUp.toTop.src?e("v-uni-image",{staticClass:"mescroll-totop",class:{"mescroll-fade-in":t.isShowToTop},attrs:{src:t.mescroll.optUp.toTop.src,mode:"widthFix"},on:{click:function(o){o=t.$handleEvent(o),t.toTopClick(o)}}}):t._e()],1)},n=[];e.d(o,"a",function(){return i}),e.d(o,"b",function(){return n})},"825b":function(t,o,e){o=t.exports=e("2350")(!1),o.push([t.i,"/* mescroll-uni\n * version 1.1.8\n * 2019-11-01 wenju\n * http://www.mescroll.com\n */uni-page-body[data-v-8560cae0]{height:100%;-webkit-box-sizing:border-box;box-sizing:border-box; /* 避免设置padding出现双滚动条的问题 */-webkit-overflow-scrolling:touch /*使iOS列表滑动流畅*/}.mescroll-uni-warp[data-v-8560cae0]{height:100%}.mescroll-uni[data-v-8560cae0]{position:relative;width:100%;height:100%;min-height:%?200?%;overflow-y:auto;-webkit-box-sizing:border-box;box-sizing:border-box /* 避免设置padding出现双滚动条的问题 */}\n\n /* 定位的方式固定高度 */.mescroll-uni-fixed[data-v-8560cae0]{z-index:1;position:fixed;top:0;left:0;right:0;bottom:0;width:auto; /* 使right生效 */height:auto /* 使bottom生效 */}\n\n /* 下拉刷新区域 */.mescroll-downwarp[data-v-8560cae0]{position:absolute;top:-100%;left:0;width:100%;height:100%;text-align:center}\n\n /* 下拉刷新--内容区,定位于区域底部 */.mescroll-downwarp .downwarp-content[data-v-8560cae0]{position:absolute;left:0;bottom:0;width:100%;min-height:%?60?%;padding:%?20?% 0;text-align:center}\n\n /* 上拉加载区域 */.mescroll-upwarp[data-v-8560cae0]{min-height:%?60?%;padding:%?30?% 0;text-align:center;clear:both}\n\n /* 下拉刷新,上拉加载--提示文本 */.mescroll-downwarp .downwarp-tip[data-v-8560cae0],.mescroll-upwarp .upwarp-nodata[data-v-8560cae0],.mescroll-upwarp .upwarp-tip[data-v-8560cae0]{display:inline-block;font-size:%?28?%;color:grey;vertical-align:middle}.mescroll-downwarp .downwarp-tip[data-v-8560cae0],.mescroll-upwarp .upwarp-tip[data-v-8560cae0]{margin-left:%?16?%}\n\n /* 下拉刷新,上拉加载--旋转进度条 */.mescroll-downwarp .downwarp-progress[data-v-8560cae0],.mescroll-upwarp .upwarp-progress[data-v-8560cae0]{display:inline-block;width:%?32?%;height:%?32?%;border-radius:50%;border:%?2?% solid grey;border-bottom-color:rgba(0,0,0,0);vertical-align:middle}\n\n /* 旋转动画 */.mescroll-rotate[data-v-8560cae0]{-webkit-animation:mescrollRotate-data-v-8560cae0 .6s linear infinite;animation:mescrollRotate-data-v-8560cae0 .6s linear infinite}@-webkit-keyframes mescrollRotate-data-v-8560cae0{0%{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(1turn)}}@keyframes mescrollRotate-data-v-8560cae0{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\n\n /* 无任何数据的空布局 */.mescroll-empty[data-v-8560cae0]{-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;padding:%?40?%;text-align:center}.mescroll-empty.empty-fixed[data-v-8560cae0]{z-index:99;position:fixed; /*transform会使fixed失效,最终会降级为absolute */top:20%;left:0}.mescroll-empty .empty-icon[data-v-8560cae0]{width:45%}.mescroll-empty .empty-tip[data-v-8560cae0]{margin-top:%?20?%;font-size:%?24?%;color:grey}.mescroll-empty .empty-btn[data-v-8560cae0]{display:inline-block;margin-top:%?40?%;min-width:%?200?%;padding:%?18?%;font-size:%?28?%;border:%?1?% solid #e04b28;border-radius:%?60?%;color:#e04b28}.mescroll-empty .empty-btn[data-v-8560cae0]:active{opacity:.75}\n\n /* 回到顶部的按钮 */.mescroll-totop[data-v-8560cae0]{z-index:9990;position:fixed!important; /* 避免编译到H5,在多mescroll中定位失效 */right:%?20?%;bottom:%?120?%;width:%?72?%;height:%?72?%;border-radius:50%;opacity:0}\n\n /* 显示动画--淡入 */.mescroll-fade-in[data-v-8560cae0],.mescroll-lazy-in[data-v-8560cae0]{-webkit-animation:mescrollFadeIn-data-v-8560cae0 .3s linear forwards;animation:mescrollFadeIn-data-v-8560cae0 .3s linear forwards}@-webkit-keyframes mescrollFadeIn-data-v-8560cae0{0%{opacity:0}to{opacity:1}}@keyframes mescrollFadeIn-data-v-8560cae0{0%{opacity:0}to{opacity:1}}\n\n /* 隐藏动画--淡出 */.mescroll-fade-out[data-v-8560cae0]{pointer-events:none;-webkit-animation:mescrollFadeOut-data-v-8560cae0 .5s linear forwards;animation:mescrollFadeOut-data-v-8560cae0 .5s linear forwards}@-webkit-keyframes mescrollFadeOut-data-v-8560cae0{0%{opacity:1}to{opacity:0}}@keyframes mescrollFadeOut-data-v-8560cae0{0%{opacity:1}to{opacity:0}}.mescroll-uni-bg[data-v-8560cae0]{background-color:#fff}\n\n /*下拉刷新--标语*/.mescroll-downwarp .downwarp-slogan[data-v-8560cae0]{display:block;width:%?420?%;height:%?168?%;margin:auto}\n\n /*下拉刷新--向下进度动画*/.mescroll-downwarp .downwarp-progress[data-v-8560cae0]{display:inline-block;width:%?40?%;height:%?40?%;border:none;margin:auto;background-size:contain;background-repeat:no-repeat;background-position:50%;background-image:url(https://api.tengpaisc.com/upload/guidang/icon_downwarp.png);-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}\n\n /*下拉刷新--进度条*/.mescroll-downwarp .downwarp-loading[data-v-8560cae0]{display:inline-block;width:%?32?%;height:%?32?%;border-radius:50%;border:%?2?% solid #ff8095;border-bottom-color:rgba(0,0,0,0)}\n\n /*下拉刷新--吉祥物*/.mescroll-downwarp .downwarp-mascot[data-v-8560cae0]{position:absolute;right:%?16?%;bottom:0;width:%?100?%;height:%?100?%;background-size:contain;background-repeat:no-repeat;-webkit-animation:animMascot .6s steps(1) infinite;animation:animMascot .6s steps(1) infinite}\n\n /* @-webkit-keyframes animMascot {\n\t0% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb1.png)}\n\t25% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb2.png)}\n\t50% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb3.png)}\n\t75% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb4.png)}\n\t100% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb1.png)}\n}\n@keyframes animMascot {\n\t0% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb1.png)}\n\t25% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb2.png)}\n\t50% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb3.png)}\n\t75% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb4.png)}\n\t100% {background-image: url(http://www.mescroll.com/img/beibei/mescroll-bb1.png)}\n} */",""])},"93cf":function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var i={down:{offset:80},up:{textLoading:"加载中 ...",textNoMore:"-- END --",toTop:{src:"http://www.mescroll.com/img/mescroll-totop.png?v=1",offset:1e3,duration:300},empty:{use:!0,icon:"http://www.mescroll.com/img/mescroll-empty.png?v=1",tip:"~ 暂无相关数据 ~"}}},n=i;o.default=n},cce8:function(t,o,e){var i=e("825b");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var n=e("4f06").default;n("828e2ccc",i,!0,{sourceMap:!1,shadowMode:!1})},e90d:function(t,o,e){"use strict";function i(t){return i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i(t)}function n(t){var o=this;o.version="1.1.8",o.options=t||{},o.isDownScrolling=!1,o.isUpScrolling=!1;var e=o.options.down&&o.options.down.callback;o.initDownScroll(),o.initUpScroll(),setTimeout(function(){o.optDown.use&&o.optDown.auto&&e&&(o.optDown.autoShowLoading?o.triggerDownScroll():o.optDown.callback&&o.optDown.callback(o)),o.optUp.use&&o.optUp.auto&&!o.isUpAutoLoad&&o.triggerUpScroll()},30)}Object.defineProperty(o,"__esModule",{value:!0}),o.default=n,n.prototype.extendDownScroll=function(t){n.extend(t,{use:!0,auto:!0,autoShowLoading:!1,isLock:!1,offset:80,startTop:100,fps:40,inOffsetRate:1,outOffsetRate:.2,bottomOffset:20,minAngle:45,textInOffset:"下拉刷新",textOutOffset:"释放更新",textLoading:"加载中 ...",inited:null,inOffset:null,outOffset:null,onMoving:null,beforeLoading:null,showLoading:null,afterLoading:null,endDownScroll:null,callback:function(t){t.resetUpScroll()}})},n.prototype.extendUpScroll=function(t){n.extend(t,{use:!0,auto:!0,isLock:!1,isBoth:!0,isBounce:!1,callback:null,page:{num:0,size:10,time:null},noMoreSize:5,offset:80,textLoading:"加载中 ...",textNoMore:"-- END --",inited:null,showLoading:null,showNoMore:null,hideUpScroll:null,toTop:{src:null,offset:1e3,duration:300,btnClick:null,onShow:null},empty:{use:!0,icon:null,tip:"~ 暂无相关数据 ~",btnText:"",btnClick:null,onShow:null},onScroll:!1})},n.extend=function(t,o){if(!t)return o;for(var e in o)if(null==t[e]){var s=o[e];null!=s&&"object"===i(s)?t[e]=n.extend({},s):t[e]=s}else"object"===i(t[e])&&n.extend(t[e],o[e]);return t},n.prototype.initDownScroll=function(){var t=this;t.optDown=t.options.down||{},t.extendDownScroll(t.optDown),t.downHight=0,t.optDown.use&&t.optDown.inited&&setTimeout(function(){t.optDown.inited(t)},0)},n.prototype.touchstartEvent=function(t){this.optDown.use&&(this.startPoint=this.getPoint(t),this.startTop=this.getScrollTop(),this.lastPoint=this.startPoint,this.maxTouchmoveY=this.getBodyHeight()-this.optDown.bottomOffset,this.inTouchend=!1)},n.prototype.touchmoveEvent=function(t){if(this.optDown.use&&this.startPoint){var o=this,e=(new Date).getTime();if(!(o.moveTime&&e-o.moveTime<o.moveTimeDiff)){o.moveTime=e,o.moveTimeDiff=1e3/o.optDown.fps;var i=o.getScrollTop(),n=o.getPoint(t),s=n.y-o.startPoint.y;if(s>0&&(i<=0||i<=o.optDown.startTop&&i===o.startTop)&&o.optDown.use&&!o.inTouchend&&!o.isDownScrolling&&!o.optDown.isLock&&(!o.isUpScrolling||o.isUpScrolling&&o.optUp.isBoth)){var l=Math.abs(o.lastPoint.x-n.x),r=Math.abs(o.lastPoint.y-n.y),a=Math.sqrt(l*l+r*r);if(0!==a){var p=Math.asin(r/a)/Math.PI*180;if(p<o.optDown.minAngle)return}if(o.maxTouchmoveY>0&&n.y>=o.maxTouchmoveY)return o.inTouchend=!0,void o.touchendEvent();o.preventDefault(t);var c=n.y-o.lastPoint.y;o.downHight<o.optDown.offset?(1!==o.movetype&&(o.movetype=1,o.optDown.inOffset&&o.optDown.inOffset(o),o.isMoveDown=!0),o.downHight+=c*o.optDown.inOffsetRate):(2!==o.movetype&&(o.movetype=2,o.optDown.outOffset&&o.optDown.outOffset(o),o.isMoveDown=!0),o.downHight+=c>0?Math.round(c*o.optDown.outOffsetRate):c);var u=o.downHight/o.optDown.offset;o.optDown.onMoving&&o.optDown.onMoving(o,u,o.downHight)}o.lastPoint=n}}},n.prototype.touchendEvent=function(t){if(this.optDown.use)if(this.isMoveDown)this.downHight>=this.optDown.offset?this.triggerDownScroll():(this.downHight=0,this.optDown.endDownScroll&&this.optDown.endDownScroll(this)),this.movetype=0,this.isMoveDown=!1;else if(this.getScrollTop()===this.startTop){var o=this.getPoint(t).y-this.startPoint.y<0;o&&this.triggerUpScroll(!0)}},n.prototype.getPoint=function(t){return t?t.touches&&t.touches[0]?{x:t.touches[0].pageX,y:t.touches[0].pageY}:t.changedTouches&&t.changedTouches[0]?{x:t.changedTouches[0].pageX,y:t.changedTouches[0].pageY}:{x:t.clientX,y:t.clientY}:{x:0,y:0}},n.prototype.triggerDownScroll=function(){this.optDown.beforeLoading&&this.optDown.beforeLoading(this)||(this.showDownScroll(),this.optDown.callback&&this.optDown.callback(this))},n.prototype.showDownScroll=function(){this.isDownScrolling=!0,this.downHight=this.optDown.offset,this.optDown.showLoading(this,this.downHight)},n.prototype.endDownScroll=function(){var t=this,o=function(){t.downHight=0,t.isDownScrolling=!1,t.optDown.endDownScroll&&t.optDown.endDownScroll(t),t.setScrollHeight(0)},e=0;t.optDown.afterLoading&&(e=t.optDown.afterLoading(t)),"number"===typeof e&&e>0?setTimeout(o,e):o()},n.prototype.lockDownScroll=function(t){null==t&&(t=!0),this.optDown.isLock=t},n.prototype.initUpScroll=function(){var t=this;t.optUp=t.options.up||{use:!1},t.extendUpScroll(t.optUp),t.optUp.isBounce||t.setBounce(!1),!1!==t.optUp.use&&(t.optUp.hasNext=!0,t.startNum=t.optUp.page.num+1,t.optUp.inited&&setTimeout(function(){t.optUp.inited(t)},0))},n.prototype.scroll=function(t,o){this.setScrollTop(t.scrollTop),this.setScrollHeight(t.scrollHeight),null==this.preScrollY&&(this.preScrollY=0),this.isScrollUp=t.scrollTop-this.preScrollY>0,this.preScrollY=t.scrollTop,this.isScrollUp&&this.triggerUpScroll(!0),t.scrollTop>=this.optUp.toTop.offset?this.showTopBtn():this.hideTopBtn(),this.optUp.onScroll&&o&&o()},n.prototype.triggerUpScroll=function(t){if(!this.isUpScrolling&&this.optUp.use&&this.optUp.callback){if(!0===t){var o=!1;if(!this.optUp.hasNext||this.optUp.isLock||this.isDownScrolling||this.getScrollBottom()<=this.optUp.offset&&(o=!0),!1===o)return}this.showUpScroll(),this.optUp.page.num++,this.isUpAutoLoad=!0,this.num=this.optUp.page.num,this.size=this.optUp.page.size,this.time=this.optUp.page.time,this.optUp.callback(this)}},n.prototype.showUpScroll=function(){this.isUpScrolling=!0,this.optUp.showLoading&&this.optUp.showLoading(this)},n.prototype.showNoMore=function(){this.optUp.hasNext=!1,this.optUp.showNoMore&&this.optUp.showNoMore(this)},n.prototype.hideUpScroll=function(){this.optUp.hideUpScroll&&this.optUp.hideUpScroll(this)},n.prototype.endUpScroll=function(t){null!=t&&(t?this.showNoMore():this.hideUpScroll()),this.isUpScrolling=!1},n.prototype.resetUpScroll=function(t){if(this.optUp&&this.optUp.use){var o=this.optUp.page;this.prePageNum=o.num,this.prePageTime=o.time,o.num=this.startNum,o.time=null,this.isDownScrolling||!1===t||(null==t?(this.removeEmpty(),this.showUpScroll()):this.showDownScroll()),this.isUpAutoLoad=!0,this.num=o.num,this.size=o.size,this.time=o.time,this.optUp.callback&&this.optUp.callback(this)}},n.prototype.setPageNum=function(t){this.optUp.page.num=t-1},n.prototype.setPageSize=function(t){this.optUp.page.size=t},n.prototype.endByPage=function(t,o,e){var i;this.optUp.use&&null!=o&&(i=this.optUp.page.num<o),this.endSuccess(t,i,e)},n.prototype.endBySize=function(t,o,e){var i;if(this.optUp.use&&null!=o){var n=(this.optUp.page.num-1)*this.optUp.page.size+t;i=n<o}this.endSuccess(t,i,e)},n.prototype.endSuccess=function(t,o,e){var i=this;if(i.isDownScrolling&&i.endDownScroll(),i.optUp.use){var n;if(null!=t){var s=i.optUp.page.num,l=i.optUp.page.size;if(1===s&&e&&(i.optUp.page.time=e),t<l||!1===o)if(i.optUp.hasNext=!1,0===t&&1===s)n=!1,i.showEmpty();else{var r=(s-1)*l+t;n=!(r<i.optUp.noMoreSize),i.removeEmpty()}else n=!1,i.optUp.hasNext=!0,i.removeEmpty()}i.endUpScroll(n)}},n.prototype.endErr=function(){if(this.isDownScrolling){var t=this.optUp.page;t&&this.prePageNum&&(t.num=this.prePageNum,t.time=this.prePageTime),this.endDownScroll()}this.isUpScrolling&&(this.optUp.page.num--,this.endUpScroll(!1))},n.prototype.showEmpty=function(){this.optUp.empty.use&&this.optUp.empty.onShow&&this.optUp.empty.onShow(!0)},n.prototype.removeEmpty=function(){this.optUp.empty.use&&this.optUp.empty.onShow&&this.optUp.empty.onShow(!1)},n.prototype.showTopBtn=function(){this.topBtnShow||(this.topBtnShow=!0,this.optUp.toTop.onShow&&this.optUp.toTop.onShow(!0))},n.prototype.hideTopBtn=function(){this.topBtnShow&&(this.topBtnShow=!1,this.optUp.toTop.onShow&&this.optUp.toTop.onShow(!1))},n.prototype.getScrollTop=function(){return this.scrollTop||0},n.prototype.setScrollTop=function(t){this.scrollTop=t},n.prototype.scrollTo=function(t,o){this.myScrollTo&&this.myScrollTo(t,o)},n.prototype.resetScrollTo=function(t){this.myScrollTo=t},n.prototype.getScrollBottom=function(){return this.getScrollHeight()-this.getClientHeight()-this.getScrollTop()},n.prototype.getStep=function(t,o,e,i,n){var s=o-t;if(0!==i&&0!==s){i=i||300,n=n||30;var l=i/n,r=s/l,a=0,p=setInterval(function(){a<l-1?(t+=r,e&&e(t,p),a++):(e&&e(o,p),clearInterval(p))},n)}else e&&e(o)},n.prototype.getClientHeight=function(t){var o=this.clientHeight||0;return 0===o&&!0!==t&&(o=this.getBodyHeight()),o},n.prototype.setClientHeight=function(t){this.clientHeight=t},n.prototype.getScrollHeight=function(){return this.scrollHeight||0},n.prototype.setScrollHeight=function(t){this.scrollHeight=t},n.prototype.getBodyHeight=function(){return this.bodyHeight||0},n.prototype.setBodyHeight=function(t){this.bodyHeight=t},n.prototype.preventDefault=function(t){t&&t.cancelable&&!t.defaultPrevented&&t.preventDefault()},n.prototype.setBounce=function(t){if(!1===t){if(this.optUp.isBounce=!1,setTimeout(function(){var t=document.getElementsByTagName("uni-page")[0];t&&t.setAttribute("use_mescroll",!0)},30),window.isSetBounce)return;window.isSetBounce=!0,window.bounceTouchmove=function(t){var o=t.target,e=!0;while(o!==document.body&&o!==document){if("UNI-PAGE"===o.tagName){o.getAttribute("use_mescroll")||(e=!1);break}var i=o.classList;if(i){if(i.contains("mescroll-touch")){e=!1;break}if(i.contains("mescroll-touch-x")||i.contains("mescroll-touch-y")){var n=t.touches?t.touches[0].pageX:t.clientX,s=t.touches?t.touches[0].pageY:t.clientY;this.preWinX||(this.preWinX=n),this.preWinY||(this.preWinY=s);var l=Math.abs(this.preWinX-n),r=Math.abs(this.preWinY-s),a=Math.sqrt(l*l+r*r);if(this.preWinX=n,this.preWinY=s,0!==a){var p=Math.asin(r/a)/Math.PI*180;if(p<=45&&i.contains("mescroll-touch-x")||p>45&&i.contains("mescroll-touch-y")){e=!1;break}}}}o=o.parentNode}e&&t.cancelable&&!t.defaultPrevented&&"function"===typeof t.preventDefault&&t.preventDefault()},window.addEventListener("touchmove",window.bounceTouchmove,{passive:!1})}else this.optUp.isBounce=!0,window.bounceTouchmove&&(window.removeEventListener("touchmove",window.bounceTouchmove),window.bounceTouchmove=null,window.isSetBounce=!1)}}}]);