(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-countdown/uni-countdown"],{"239a":function(t,n,e){"use strict";var o=e("9281"),i=e.n(o);i.a},"6f12":function(t,n,e){"use strict";e.r(n);var o=e("b688"),i=e("b627");for(var s in i)"default"!==s&&function(t){e.d(n,t,function(){return i[t]})}(s);e("239a");var u=e("2877"),r=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=r.exports},"7f58":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={name:"UniCountdown",props:{original:{type:Boolean,default:!1},showDay:{type:Boolean,default:!1},showColon:{type:Boolean,default:!0},seconds:{type:Number,default:0}},data:function(){return{timer:null,d:"00",h:"00",i:"00",s:"00",leftTime:0,secondes:0}},watch:{seconds:{handler:function(t,n){var e=this;clearInterval(this.timer),this.secondes=t||n,console.log(this.secondes),this.countDown(),this.timer=setInterval(function(){e.secondes--,e.secondes<0?e.timeUp():e.countDown()},1e3)},deep:!0,immediate:!0}},computed:{secondsData:function(){console.log("this.seconds",this.seconds);var t=100;return t}},beforeDestroy:function(){clearInterval(this.timer)},methods:{toSeconds:function(t,n,e,o){return 60*t*60*24+60*n*60+60*e+o},timeUp:function(){clearInterval(this.timer),this.$emit("timeup")},countDown:function(){var t=this.secondes,n=0,e=0,o=0,i=0;t>0?(n=Math.floor(t/86400),e=Math.floor(t/3600)-24*n,o=Math.floor(t/60)-24*n*60-60*e,i=Math.floor(t)-24*n*60*60-60*e*60-60*o):this.timeUp(),n<10&&(n="0"+n),e<10&&(e="0"+e),o<10&&(o="0"+o),i<10&&(i="0"+i),e=+e+24*n,this.d=n,this.h=e,this.i=o,this.s=i}}};n.default=o},9281:function(t,n,e){},b627:function(t,n,e){"use strict";e.r(n);var o=e("7f58"),i=e.n(o);for(var s in o)"default"!==s&&function(t){e.d(n,t,function(){return o[t]})}(s);n["default"]=i.a},b688:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-countdown/uni-countdown-create-component',
    {
        'components/uni-countdown/uni-countdown-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6f12"))
        })
    },
    [['components/uni-countdown/uni-countdown-create-component']]
]);                
