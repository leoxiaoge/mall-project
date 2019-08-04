(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/search/search"],{"210e":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{keyWord:"",entering:!1,openVoice:!1,manager:null,recording:!1,recordStatus:0}},props:{btnLinkInput:{type:Boolean,default:!1},inputAttr:{type:Object,default:function(){return{}}},btnAttr:{type:Object,default:function(){return{}}},voiceAttr:{type:Object,default:function(){return{}}},iconAttr:{type:Object,default:function(){return{}}},iconSrc:{type:Object,default:function(){return{}}},type:{type:String,default:"text"},password:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},maxLength:{type:Number,default:-1},cursorSpacing:{type:Number,default:0},focus:{type:Boolean,default:!1},confirmType:{type:String,default:"搜索"},confirmHold:{type:Boolean,default:!1},cursor:{type:Number},selectionStart:{type:Number,default:-1},selectionEnd:{type:Number,default:-1},adjustPosition:{type:Boolean,default:!0}},watch:{showVoiceIcon:function(t){t||(this.openVoice=!1)},keyWord:function(t){0===t.length&&(this.entering=!1)}},computed:{showPlaceholderIcon:function(){return this.getPlaceholderText&&this.watchToolIcon("placeholder")},showLogoIcon:function(){return this.watchToolIcon("logo")},showVoiceIcon:function(){return this.watchToolIcon("voice")&&!this.keyWord},showScanIcon:function(){return this.watchToolIcon("scan")&&!this.entering&&!this.keyWord},showClearIcon:function(){return this.watchToolIcon("clear")&&this.keyWord},showSearchIcon:function(){return this.watchToolIcon("search")&&this.keyWord},getFontSize:function(){return t.upx2px(this.inputAttr.fontSize||28)+"px"},getHeight:function(){return t.upx2px(this.inputAttr.height&&this.inputAttr.height>70?this.inputAttr.height:70)+"px"},getBorder:function(){return this.inputAttr.border||"1px solid #c8c7cc"},getBorderWidth:function(){return t.upx2px(this.inputAttr.borderWidth||1)+"px"},getBorderRadius:function(){return t.upx2px(this.inputAttr.borderRadius||100)+"px"},getColor:function(){return this.inputAttr.color||"#333"},getBackgroundColor:function(){return this.inputAttr.backgroundColor||"#ffffff"},getPlaceholderPosition:function(){return this.inputAttr.placeholderPosition||"left"},getPlaceholderColor:function(){return this.inputAttr.placeholderColor||"#808080"},getPlaceholderText:function(){return this.inputAttr.placeholderText||" "},getPlaceholderPaddingLeft:function(){return this.showLogoIcon&&"left"===this.getPlaceholderPosition?t.upx2px((this.iconAttr.width?this.iconAttr.width:this.inputAttr.height||70)+(this.inputAttr.paddingLeft||0))+"px":t.upx2px(this.inputAttr.paddingLeft||20)+"px"},getPaddingLeft:function(){return this.showLogoIcon?t.upx2px(this.inputAttr.paddingLeft||0)+"px":t.upx2px(this.inputAttr.paddingLeft&&this.inputAttr.paddingLeft>20?this.inputAttr.paddingLeft:20)+"px"},getIconWidth:function(){return this.iconAttr.width?t.upx2px(this.iconAttr.width)+"px":this.getHeight},getIconHeight:function(){return this.iconAttr.height?t.upx2px(this.iconAttr.height)+"px":this.getHeight},getIconPadding:function(){return t.upx2px(this.iconAttr.padding)+"px"},getBtnEnable:function(){return this.btnAttr.enable||!1},getBtnText:function(){return this.btnAttr.text||""},getBtnBackgroundColor:function(){return this.btnAttr.backgroundColor||"#ffffff"},getBtnColor:function(){return this.btnAttr.color||"#333"},getBtnBorder:function(){return this.btnAttr.border||"none"},getBtnBackgroundImage:function(){return"url("+this.btnAttr.backgroundImage+")"},getBtnBackgroundPosition:function(){return this.btnAttr.backgroundPosition||"center center"},getBtnbackgroundSize:function(){return this.btnAttr.backgroundSize||"contain"},getBtnBorderRadius:function(){return t.upx2px(this.btnAttr.borderRadius||30)+"px"},getBtnFontSize:function(){return t.upx2px(this.btnAttr.fontSize||28)+"px"},getBtnPaddingLeft:function(){return t.upx2px(this.btnAttr.paddingLeft||10)+"px"},getBtnPaddingRight:function(){return t.upx2px(this.btnAttr.paddingRight||0)+"px"},getBtnBorderWidth:function(){return t.upx2px(this.btnAttr.borderWidth||1)+"px"},getVoiceAttrBtnColor:function(){return this.voiceAttr.btnColor||"#fff"},getVoiceAttrBtnActiveColor:function(){return this.voiceAttr.btnActiveColor||"#fff"},getVoiceAttrListenColor:function(){return this.voiceAttr.listenColor||"#fff"},getVoiceAttrBtnBackgroundColor:function(){return this.voiceAttr.BtnBackgroundColor||"#c8c7cc"},getVoiceAttrBtnBackgroundActiveColor:function(){return this.voiceAttr.BtnBackgroundActiveColor||"#fe7f00"},getVoiceAttrListenBackgroundColor:function(){return this.voiceAttr.listenBackgroundColor||"#fe7f00"},getVoiceAttrText:function(){return this.voiceAttr.text||"按住 说活"},getVoiceAttrActiveText:function(){return this.voiceAttr.activeText||"松开 结束"}},methods:{watchToolIcon:function(t){for(var n=!1,e=0,o=Object.keys(this.iconSrc);e<o.length;e++){var r=o[e];t===r&&this.iconSrc[r]&&(n=!0)}return n},inputFocus:function(){this.$emit("focus")},blur:function(){!this.keyWord&&this.watchToolIcon("scan")&&(this.entering=!1),this.$emit("blur",this.keyWord)},input:function(){this.entering=!0,this.$emit("input",this.keyWord)},confirm:function(){this.$emit("confirm")},clear:function(){this.keyWord="",this.$emit("clear")},scan:function(){t.scanCode({success:function(t){this.$emit("scan",t)}})},search:function(){this.$emit("search",this.keyWord)},btnClick:function(){this.$emit("btnClick",this.btnAttr.text)},voice:function(){this.openVoice=!0},startHandel:function(){var n=this;console.log("按下录音按钮"),this.manager.start({lang:"zh_CN"}),t.vibrateShort({success:function(){n.recordStatus=0,n.recording=!0}})},endHandle:function(){this.recording&&0===this.recordStatus?(console.log("松开了按钮"),this.manager.stop()):console.warn("has finished!")},listenRecordLnit:function(){this.listenManagerStart(),this.listenManagerStop(),this.listenManagerRecognize(),this.listenManagerError()},listenManagerStart:function(){this.manager.onStart=function(t){console.log("开始录音",t)}},listenManagerRecognize:function(){this.manager.onRecognize=function(t){console.log("识别了新内容",t)}},listenManagerError:function(){var t=this;this.manager.onError=function(n){console.log("识别错误事件",n),t.recording=!1}},listenManagerStop:function(){var t=this;this.manager.onStop=function(n){console.log("识别结束事件",n);var e=n.result;""!==e?(t.recordStatus=0,t.keyWord=n.result.substr(0,n.result.length-1),t.recording=!1,t.keyWord&&t.$emit("manager",t.keyWord)):t.showRecordEmptyTip()}},showRecordEmptyTip:function(){this.recording=!1,t.showToast({title:"什么也没听到",icon:"none",duration:1e3})}},onReady:function(){var n=this;if(this.iconSrc.voice){var e=requirePlugin("WechatSI");t.authorize({scope:"scope.record",success:function(){n.manager=e.getRecordRecognitionManager(),n.listenRecordLnit()}})}}};n.default=e}).call(this,e("543d")["default"])},"44e1":function(t,n,e){"use strict";e.r(n);var o=e("bc95"),r=e("e824");for(var i in r)"default"!==i&&function(t){e.d(n,t,function(){return r[t]})}(i);e("50f3");var c=e("2877"),u=Object(c["a"])(r["default"],o["a"],o["b"],!1,null,"ce5fe766",null);n["default"]=u.exports},"50f3":function(t,n,e){"use strict";var o=e("f4b0"),r=e.n(o);r.a},bc95:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=(t._self._c,Array.isArray(t.keyWord));t._isMounted||(t.e0=function(n){var e=t.keyWord,o=n.target,r=!!o.checked;if(Array.isArray(e)){var i=null,c=t._i(e,i);o.checked?c<0&&(t.keyWord=e.concat([i])):c>-1&&(t.keyWord=e.slice(0,c).concat(e.slice(c+1)))}else t.keyWord=r},t.e1=function(n){t.keyWord=null}),t.$mp.data=Object.assign({},{$root:{g0:e}})},r=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return r})},e824:function(t,n,e){"use strict";e.r(n);var o=e("210e"),r=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=r.a},f4b0:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/search/search-create-component',
    {
        'components/search/search-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("44e1"))
        })
    },
    [['components/search/search-create-component']]
]);                
