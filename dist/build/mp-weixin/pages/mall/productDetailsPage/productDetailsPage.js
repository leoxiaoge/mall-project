(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/productDetailsPage/productDetailsPage"],{"0c1d":function(t,e,i){"use strict";var n=i("9742"),s=i.n(n);s.a},9742:function(t,e,i){},a653:function(t,e,i){"use strict";i.r(e);var n=i("df4a"),s=i("c6f7");for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);i("0c1d");var o=i("2877"),r=Object(o["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=r.exports},c6f7:function(t,e,i){"use strict";i.r(e);var n=i("ec76"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e["default"]=s.a},df4a:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},ec76:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(i("a34a")),s=r(i("66fd")),a=i("c440"),o=i("5177");function r(t){return t&&t.__esModule?t:{default:t}}function h(t,e,i,n,s,a,o){try{var r=t[a](o),h=r.value}catch(c){return void i(c)}r.done?e(h):Promise.resolve(h).then(n,s)}function c(t){return function(){var e=this,i=arguments;return new Promise(function(n,s){var a=t.apply(e,i);function o(t){h(a,n,s,o,r,"next",t)}function r(t){h(a,n,s,o,r,"throw",t)}o(void 0)})}}var u=function(){return i.e("components/i-past/i-past").then(i.bind(null,"ed17"))},l=function(){return i.e("components/i-show/i-show").then(i.bind(null,"d057"))},g=function(){return i.e("components/i-rule/i-rule").then(i.bind(null,"0d7b"))},d=function(){return i.e("components/i-popup/i-popup").then(i.bind(null,"fbff"))},S=function(){return i.e("components/product-table/product-table").then(i.bind(null,"31a0"))},b=!1,p=[],f=s.default.extend({components:{iPast:u,iShow:l,iRule:g,iPopup:d,productTable:S},data:function(){return{indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,circular:!0,indicatorActiveColor:"#fe7f00",disabled:!1,swiper:[],id:"",orderID:"",product:"",num:"1",pageID:1,pageSize:10,hasPastNext:!1,hasOrderNext:!1,activeDetail:"",activeShow:!1,active:[],activeType:0,tabIndex:0,pastList:[],showList:[],ruleList:"",show:!1,label:["零风险","正品承诺","极速发货","公平公正"],tab:["往期成交","分享晒单","竞拍规则"],src:"/static/icon_experience.png",leading:"/static/icon/icon_leading.png",activeID:"",Price:"",msgID:"",msgType:"",timer:0,newCurrent:"",newCurrentBidder:"",buttonsList:[],price:"",lastBills:[],timerDurationTitle:"",onTimerStatus:"",OnTimerDowns:"",currSignups:"",maxSignups:"",signups:"",seqSignups:"",allBills:"0",myBills:"0",seqBills:"0",seqBillsShow:!1,seq:"",MyBills:"",SeqBills:"0",Signups:"",SeqSignups:"0",mySeqBills:"0",UserID:"",tapbtn:"",BillStat:"",newPrice:"",newBill:"",newNick:"",newFace:"",newCity:"",times:"",seqTime:new Date}},onLoad:function(t){console.log("options",t),this.id=t.id,this.activeID=t.activeID,this.websocket()},onShow:function(){this.UserID=t.getStorageSync("UserInfo").ID,console.log(this.UserID),this.getActiveByID(),this.getPastTransactionsList(),this.websocket()},onHide:function(){t.hideToast(),t.closeSocket(),t.onSocketClose(function(t){console.log("WebSocket 已关闭！")})},onUnload:function(){t.hideToast(),t.closeSocket(),t.onSocketClose(function(t){console.log("WebSocket 已关闭！")})},onPullDownRefresh:function(){t.closeSocket(),t.onSocketClose(function(t){console.log("WebSocket 已关闭！")}),this.websocket(),this.getActiveByID()},onReachBottom:function(){switch(this.tabIndex){case 0:this.hasPastNext||(this.pageID++,this.getPastTransactionsList());break;case 1:this.hasOrderNext||(this.pageID++,this.getOrderDryingList());break}},methods:{getActiveByID:function(){var t=this,e=this.activeID,i={ActiveID:e};(0,a.request)(o.GetActiveByID,i).then(function(e){console.log("活动详情",e),t.activities(e.ActiveDetail)})},tabClick:function(t){switch(this.tabIndex=t,console.log(this.pageID),t){case 0:this.pageID=1,this.hasPastNext=!1,this.getPastTransactionsList();break;case 1:this.pageID=1,this.hasOrderNext=!1,this.getOrderDryingList();break}},getPastTransactionsList:function(){var t=this,e=this.id,i=this.pageID,n=this.pageSize,s={ProductID:e,PageID:i,PageSize:n};(0,a.request)(o.PastTransactionsListGet,s).then(function(e){1===i&&(t.pastList=[]),t.pastList=t.pastList.concat(e.OrderList),t.pastList.map(function(t){t.percentage=((t.OrderPrimeCost-t.OrderMoneys)/t.OrderPrimeCost*100).toFixed(2),t.CreatedTime=(0,a.formatTime)(new Date(t.Created))}),e.PageCount<=i&&(t.hasPastNext=!0)})},getOrderDryingList:function(){var t=this,e=this.id,i=this.pageID,n=this.pageSize,s={ProductID:e,PageID:i,PageSize:n};(0,a.request)(o.OrderDryingListGet,s).then(function(e){1===i&&(t.showList=[]),t.showList=t.showList.concat(e.OrderList),t.showList.map(function(t){t.SendGoodsDateTime=(0,a.formatTime)(new Date(t.SendGoodsDate))}),e.PageCount<=i&&(t.hasOrderNext=!0)})},change:function(t){console.log(t),this.num=t},hidePopup:function(){var e=c(n.default.mark(function e(i){var s;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:e.t0=i,e.next="参与下一期"===e.t0?3:10;break;case 3:return e.next=5,this.getNextActive();case 5:return s=e.sent,this.activities(s),t.closeSocket(),this.websocket(),e.abrupt("break",11);case 10:this.show=!this.show;case 11:case"end":return e.stop()}},e,this)}));function i(t){return e.apply(this,arguments)}return i}(),getNextActive:function(){var t=this;return new Promise(function(e,i){var n=t.activeID,s={ActiveID:n};(0,a.request)(o.NextActiveGet,s).then(function(t){console.log(t),e(t.NexActive)})})},activities:function(t){this.swiper=t.ProductPicList,this.Price=t.ProductPrice,this.activeDetail=t,this.active=t.Active,this.activeShow=!0,this.activeType=t.Active.ActiveType,this.activeID=t.Active.ID},tolowerShow:function(t){console.log("tolowerShow",t)},allActivePath:function(){var t=this.activeID;(0,a.navigateTo)("../activeBilList/activeBilList?activeID="+t)},myActivePath:function(){console.log(this.activeID);var e=this.activeID,i=t.getStorageSync("UserInfo").ID;if(i)(0,a.navigateTo)("../activeBilList/activeBilList?activeID="+e+"&userID="+i);else{var n="你暂未登录，请点击确定去登录！";(0,a.defaultShowModal)(n).then(function(t){t.confirm?(console.log("用户点击确定"),(0,a.navigateTo)("../../ucenter/login/login")):t.cancel&&console.log("用户点击取消")})}},productDetailsUparsePath:function(){var t=this.id;(0,a.navigateTo)("../productDetailsUparse/productDetailsUparse?id="+t)},websocket:function(){var e=this;t.connectSocket({url:"wss://websocket.tengpaisc.com"}),t.onSocketOpen(function(i){console.log("WebSocket连接已打开！"),t.hideLoading(),b=!0;for(var n=0;n<p.length;n++)e.sendSocketMessage(p[n]);p=[],e.msgSubscribe(),e.reqLogin()}),t.onSocketError(function(t){console.log(t),console.log("WebSocket连接打开失败，请检查！"),(0,a.showErrorToast)("断线重连中..."),e.websocket()}),this.onSocketMessage()},sendSocketMessage:function(e){var i=JSON.stringify(e);console.log("发送数据",b,e),b?t.sendSocketMessage({data:i}):p.push(e)},onSocketMessage:function(){var e=this;return new Promise(function(i,n){t.onSocketMessage(function(t){console.log("收到服务器内容："+t.data);var n=JSON.parse(t.data);console.log(n),e.proccessMsg(),i(n)})})},reqLogin:function(){var e=c(n.default.mark(function e(){var i,s,o,r,h,c;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.GUID();case 2:i=e.sent,s="3957399",o=t.getStorageSync("SessionKey"),r=this.activeID,this.UserID,!1,h=(0,a.formatTime)(new Date),c={ActiveID:r,AppKey:s,SessionKey:o,msgID:i,msgType:3,msgTime:h},this.sendSocketMessage(c);case 11:case"end":return e.stop()}},e,this)}));function i(){return e.apply(this,arguments)}return i}(),msgSubscribe:function(){var t=c(n.default.mark(function t(){var e,i,s,o,r;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.GUID();case 2:e=t.sent,i=this.activeID,s="/Actives/"+i+"/",o=(0,a.formatTime)(new Date),r={Subscribe:s,msgID:e,msgType:0,msgTime:o},this.sendSocketMessage(r);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),proccessMsg:function(){var t=c(n.default.mark(function t(){var e,i,s,o,r,h,c,u,l,g,d,S;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.GUID();case 2:return e=t.sent,new Date,i=(0,a.formatTime)(new Date),t.next=7,this.onSocketMessage();case 7:if(s=t.sent,o=s.msgType,this.msgType=o,console.log(o),null!=s){t.next=13;break}return t.abrupt("return");case 13:t.prev=13,t.t0=o,t.next=0===t.t0?17:1===t.t0?19:2===t.t0?22:3===t.t0?25:4===t.t0?29:5===t.t0?31:6===t.t0?33:7===t.t0?43:8===t.t0?48:9===t.t0?54:10===t.t0?65:11===t.t0?75:12===t.t0?82:90;break;case 17:return s.IsError?(0,a.showToast)("订阅失败："+s.ErrMsg):(0,a.showToast)(s.ErrMsg),t.abrupt("break",90);case 19:return this.buttonStateChanged&&this.buttonStateChanged("报名","0",!0,!0),s.IsError?this.UserID?(0,a.showToast)("报名失败："+s.ErrMsg):(r="你暂未登录，请点击确定去登录！",(0,a.defaultShowModal)(r).then(function(t){t.confirm?(0,a.navigateTo)("../../ucenter/login/login"):t.cancel&&console.log("用户点击取消")})):(this.onUpdateMySignups&&this.onUpdateMySignups(s.Signups,s.SeqSignups),(0,a.showToast)(s.ErrMsg)),t.abrupt("break",90);case 22:return s.IsError?(0,a.showToast)(s.ErrMsg):(this.onUpdateMyBills&&this.onUpdateMyBills(s.MyBills,s.MySeqBills),1===this.activeType&&this.buttonStateChanged&&this.buttonStateChanged("举牌","2",!0,!0)),this.timerState(null),t.abrupt("break",90);case 25:return s.IsError?(console.log("登录失败："+s.ErrMsg),h="你暂未登录，请点击确定去登录！",(0,a.defaultShowModal)(h).then(function(t){t.confirm?(console.log("用户点击确定"),(0,a.navigateTo)("../../ucenter/login/login")):t.cancel&&console.log("用户点击取消")})):this.UserID=s.UserID,c={ActiveID:this.activeID,UserID:this.UserID,msgID:e,msgType:6,msgTime:i},this.sendSocketMessage(c),t.abrupt("break",90);case 29:return s.IsError?(this.buttonStateChanged&&this.buttonStateChanged("托管","1",!0,!0),(0,a.showToast)("托管失败!"+s.ErrMsg)):this.buttonStateChanged&&this.buttonStateChanged("取消托管","1",!0,!0),t.abrupt("break",90);case 31:return s.IsError?(this.buttonStateChanged&&this.buttonStateChanged("取消托管","1",!0,!0),(0,a.showToast)("取消托管,"+s.ErrMsg)):this.buttonStateChanged&&this.buttonStateChanged("托管","1",!0,!0),t.abrupt("break",90);case 33:return this.timerDurationTitle=s.TimerDurationTitle,1===this.activeType&&(this.times=s.TimerDurationText),0===s.TimerDurationValue?this.timerState(null):(u=new Date,l=u.getTime()+s.TimerDurationValue,this.seqTime.setTime(l),this.timerState(this.seqTime)),this.buttonsEvent(s.ButtonsList),console.log(this.seqBillsShow),this.onPriceUpdateEvent&&this.onPriceUpdateEvent(s.Price,s.AllBills,s.LastBills),this.onUpdateAllSignups&&this.onUpdateAllSignups(s.AllSignups,s.MaxSignups),this.onUpdateMySignups&&this.onUpdateMySignups(s.MySignups,s.SeqSignups),this.onUpdateMyBills&&this.onUpdateMyBills(s.MyBills,s.MySeqBills),t.abrupt("break",90);case 43:return this.onUpdateAllSignups&&this.onUpdateAllSignups(s.AllSignups,s.MaxSignups),this.buttonStateChanged&&this.buttonStateChanged("参与下一期","4",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("填写收货地址","3",!1,!1),s.AllSignups===s.MaxSignups?(this.buttonStateChanged&&this.buttonStateChanged("举牌","2",!0,!0),this.buttonStateChanged&&this.buttonStateChanged("托管","1",!0,!0),this.buttonStateChanged&&this.buttonStateChanged("报名","0",!1,!1)):(this.buttonStateChanged&&this.buttonStateChanged("举牌","2",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("托管","1",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("报名","0",!0,!0)),t.abrupt("break",90);case 48:return this.BillStat="总举牌次数："+s.AllBills+"次",s.Bills.length>0&&(this.newPrice="￥".concat(s.Bills[0].Price),this.newBill=s.Bills[0].bill,this.newFace=s.Bills[0].bill.face,this.newNick="领先人：".concat(s.Bills[0].nick)),s.Bills.length>1&&(this.lastBills=s.Bills),s.SeqMiniSecounds>0&&(g=new Date,d=g.getTime()+s.SeqMiniSecounds,this.seqTime.setTime(d),this.timerState(this.seqTime)),this.onPriceUpdateEvent&&this.onPriceUpdateEvent(s.Price,s.AllBills,s.Bills),t.abrupt("break",90);case 54:return S=new Date,S.setTime(S.getTime()+s.SeqMiniSecounds),this.timerState(S),console.log(this.seqTime),this.timerDurationTitle="开拍准备",this.buttonStateChanged&&this.buttonStateChanged("报名","0",!1,!1),0===this.activeType?this.buttonStateChanged&&this.buttonStateChanged("自动举牌中","2",!0,!1):this.buttonStateChanged&&this.buttonStateChanged("举牌","2",!0,!1),this.buttonStateChanged&&this.buttonStateChanged("托管","1",!0,!1),this.buttonStateChanged&&this.buttonStateChanged("填写收货地址","3",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("参与下一期","4",!1,!1),t.abrupt("break",90);case 65:return this.timerDurationTitle="正在竟拍",this.times="等待首牌",this.SeqBills=s.SeqBills,this.timerState(null),this.newPrice="￥"+s.currPrice,0===s.ActiveType?(this.buttonStateChanged&&this.buttonStateChanged("自动举牌中","2",!0,!1),this.buttonStateChanged&&this.buttonStateChanged("托管","1",!0,!1)):(this.buttonStateChanged&&this.buttonStateChanged("举牌","2",!0,!0),this.buttonStateChanged&&this.buttonStateChanged("托管","1",!0,!0)),this.buttonStateChanged&&this.buttonStateChanged("报名","0",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("填写收货地址","3",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("参与下一期","4",!1,!1),t.abrupt("break",90);case 75:return this.timerState(null),this.timerDurationTitle="活动结束",this.times="已成交",this.newCurrent="成交价",this.newCurrentBidder="中拍人",this.UserID===s.WinsBill.bill.UserID?((0,a.showToast)("恭喜，您已中拍！点击确定去填写订单信息吧！"),this.buttonStateChanged&&this.buttonStateChanged("报名","0",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("举牌","2",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("托管","1",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("参与下一期","4",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("填写收货地址","3",!0,!0),this.orderID=s.WinsOrder.OrderID):(this.buttonStateChanged&&this.buttonStateChanged("报名","0",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("举牌","1",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("托管","2",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("填写收货地址","3",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("参与下一期","4",!0,!0)),t.abrupt("break",90);case 82:return this.onTimerStatus="活动流拍",this.OnTimerDowns="-",this.buttonStateChanged&&this.buttonStateChanged("报名","0",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("举牌","1",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("托管","2",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("填写收货地址","3",!1,!1),this.buttonStateChanged&&this.buttonStateChanged("参与下一期","4",!0,!0),t.abrupt("break",90);case 90:t.next=96;break;case 92:t.prev=92,t.t1=t["catch"](13),console.error("处理消息出错："),console.error(t.t1);case 96:case"end":return t.stop()}},t,this,[[13,92]])}));function e(){return t.apply(this,arguments)}return e}(),buttonStateChanged:function(t,e,i,n){var s=this;console.log("按钮处理",t,e,i,n),this.buttonsList.map(function(a,o,r){r[e].ButtonText=t,r[e].ButtonVisibility=i,r[e].ButtonEnabled=n,1===a.ButtonType&&a.ButtonVisibility?s.seqBillsShow=!0:s.seqBillsShow=!1}),this.buttonsEvent(this.buttonsList)},buttonsEvent:function(t){var e=this;this.buttonsList=t,this.buttonsList.map(function(t,i,n){1===t.ButtonType&&t.ButtonVisibility?e.seqBillsShow=!0:2===t.ButtonType&&t.ButtonVisibility?e.seqBillsShow=!0:3===t.ButtonType&&t.ButtonVisibility?e.seqBillsShow=!1:4===t.ButtonType&&t.ButtonVisibility&&(e.seqBillsShow=!1)})},onUpdateAllSignups:function(t,e){this.currSignups="总已报名份数：".concat(t,"份"),this.maxSignups="总需报名份数：".concat(e,"份")},onUpdateMySignups:function(t,e){this.signups="我已报名份数：".concat(t,"份"),this.seqSignups="还可报名份数：".concat(e,"份")},onUpdateMyBills:function(t,e){this.myBills="我的举牌次数：".concat(t,"次"),this.seqBills="剩余可用次数：".concat(e,"次"),this.myBills=t,this.SeqBills=e},onPriceUpdateEvent:function(t,e,i){console.log(i),this.allBills=e,i.length>0?(this.newPrice="￥".concat(i[0].bill.Price),this.newBill=i[0].bill,this.newFace=i[0].face,this.newNick="领先人：".concat(i[0].nick),this.newCity="".concat(i[0].bill.Province," ").concat(i[0].bill.City),this.newCurrentBidder="当前领先出价人",this.newCurrent="当前出价"):(this.newPrice="￥".concat(t),this.newCurrent="起拍价"),i.length>1&&(this.lastBills=i.slice(1,3))},formSubmit:function(t){var e=t.detail.formId,i={FormID:e};(0,a.request)(o.AddUserFormID,i).then(function(t){console.log(t)})},billTap:function(){var e=c(n.default.mark(function e(i){var s,o,r,h,c,u,l,g,d,S,b,p,f;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return s=i,o=this.activeID,r=this.num,h=this.Price,e.next=6,this.GUID();case 6:c=e.sent,u=(0,a.formatTime)(new Date),console.log("switch",i),e.t0=s,e.next="报名"===e.t0?12:"举牌"===e.t0?16:"托管"===e.t0?19:"取消托管"===e.t0?22:"填写收货地址"===e.t0?25:"参与下一期"===e.t0?29:36;break;case 12:return l={ActiveID:o,Shares:r,msgID:c,msgType:1,msgTime:u},this.sendSocketMessage(l),this.show=!this.show,e.abrupt("break",36);case 16:return g={ActiveID:o,Price:h,msgID:c,msgType:2,msgTime:u},this.sendSocketMessage(g),e.abrupt("break",36);case 19:return d={ActiveID:o,msgID:c,msgType:4,msgTime:u},this.sendSocketMessage(d),e.abrupt("break",36);case 22:return S={ActiveID:o,msgID:c,msgType:5,msgTime:u},this.sendSocketMessage(S),e.abrupt("break",36);case 25:return b=!0,p=this.orderID,(0,a.navigateTo)("/pages/ucenter/addressShipping/addressShipping?disabled="+b+"&orderID="+p),e.abrupt("break",36);case 29:return e.next=31,this.getNextActive();case 31:return f=e.sent,this.activities(f),t.closeSocket(),this.websocket(),e.abrupt("break",36);case 36:case"end":return e.stop()}},e,this)}));function i(t){return e.apply(this,arguments)}return i}(),seqDisplay:function(){var t=this.seqTime,e=new Date,i=t-e,n=Math.floor(i/1e3),s=Math.floor(Math.floor(n/60)/60)%24,a=Math.floor(Math.floor(Math.floor(n/60)/60)/24)%30,o=Math.floor(n/60)%60,r=n%60,h=Math.floor(i/100)%10;if(r<=0)this.times="";else{s<10&&(s="0"+s),o<10&&(o="0"+o),r<10&&(r="0"+r);var c=(a>0?a+"天":"")+s+":"+o+":"+r+"."+h;this.times=c}},timerState:function(t){var e=this;null!==t?t instanceof Date?t.getTime()<(new Date).getTime()?console.error("设置倒计时器无效，日期时间必须是未来的时间！"):(clearInterval(this.timer),this.timer=setInterval(function(){e.seqDisplay()},100)):console.error("传入日期时间格式不正确！"):clearInterval(this.timer)},GUID:function(){return new Promise(function(t,e){for(var i="",n=1;n<=32;n++){var s=Math.floor(16*Math.random()).toString(16);i+=s,8!=n&&12!=n&&16!=n&&20!=n||(i+="-")}t(i)})}}});e.default=f}).call(this,i("543d")["default"])}},[["2baa","common/runtime","common/vendor"]]]);