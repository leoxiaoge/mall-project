(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/productDetailsPage/productDetailsPage"],{"0c1d":function(t,e,i){"use strict";var n=i("9742"),s=i.n(n);s.a},9742:function(t,e,i){},a653:function(t,e,i){"use strict";i.r(e);var n=i("e1d4"),s=i("c6f7");for(var a in s)"default"!==a&&function(t){i.d(e,t,function(){return s[t]})}(a);i("0c1d");var r=i("2877"),o=Object(r["a"])(s["default"],n["a"],n["b"],!1,null,null,null);e["default"]=o.exports},c6f7:function(t,e,i){"use strict";i.r(e);var n=i("ec76"),s=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e["default"]=s.a},e1d4:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c},s=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return s})},ec76:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(i("a34a")),s=o(i("66fd")),a=i("c440"),r=i("5177");function o(t){return t&&t.__esModule?t:{default:t}}function c(t,e,i,n,s,a,r){try{var o=t[a](r),c=o.value}catch(u){return void i(u)}o.done?e(c):Promise.resolve(c).then(n,s)}function u(t){return function(){var e=this,i=arguments;return new Promise(function(n,s){var a=t.apply(e,i);function r(t){c(a,n,s,r,o,"next",t)}function o(t){c(a,n,s,r,o,"throw",t)}r(void 0)})}}var h=function(){return i.e("components/i-past/i-past").then(i.bind(null,"ed17"))},l=function(){return i.e("components/i-show/i-show").then(i.bind(null,"d057"))},g=function(){return i.e("components/i-rule/i-rule").then(i.bind(null,"0d7b"))},d=function(){return i.e("components/i-popup/i-popup").then(i.bind(null,"fbff"))},p=function(){return i.e("components/product-table/product-table").then(i.bind(null,"31a0"))},f=!1,S=[],b=s.default.extend({components:{iPast:h,iShow:l,iRule:g,iPopup:d,productTable:p},data:function(){return{indicatorDots:!0,autoplay:!0,interval:2e3,duration:500,circular:!0,indicatorActiveColor:"#fe7f00",disabled:!1,swiper:[],id:"",orderID:"",product:"",num:"1",pageID:1,pageSize:10,hasPastNext:!1,hasOrderNext:!1,activeDetail:"",active:{},tabIndex:0,pastList:[],showList:[],ruleList:"",show:!1,label:["零风险","正品承诺","极速发货","公平公正"],tab:["往期成交","分享晒单","竞拍规则"],src:"/static/icon_experience.png",leading:"/static/icon/icon_leading.png",ActiveID:"",Price:"",msgID:"",msgType:"",timer:0,newCurrent:"",newCurrentBidder:"",buttonsList:[],price:"",allBills:"0",lastBills:[],timerDurationTitle:"",onTimerStatus:"",OnTimerDowns:"",currSignups:"",maxSignups:"",signups:"",seqSignups:"",myBills:"",seqBills:"",seq:"",MyBills:"",SeqBills:"",Signups:"",SeqSignups:"0",mySeqBills:"0",UserID:"",tapbtn:"",BillStat:"",newPrice:"",newBill:"",newNick:"",newFace:"",newCity:"",lastbills:[],times:"",seqTime:new Date}},onLoad:function(t){console.log("options",t),this.id=t.id,this.ActiveID=t.activeID,this.websocket()},onShow:function(){this.UserID=t.getStorageSync("UserInfo").ID,this.getProduct(),this.getActiveByID(),this.getPastTransactionsList()},onUnload:function(){t.closeSocket()},onPullDownRefresh:function(){this.websocket(),this.getProduct(),this.getActiveByID()},onReachBottom:function(){switch(this.tabIndex){case 0:this.hasPastNext||(this.pageID++,this.getPastTransactionsList());break;case 1:this.hasOrderNext||(this.pageID++,this.getOrderDryingList());break}},methods:{getProduct:function(){var t=this,e=this.id,i={ProductID:e};(0,a.request)(r.ProductGet,i).then(function(e){console.log("Product",e),t.product=e.Product,t.swiper=e.Product.ProductPicList,t.Price=e.Product.ProductPrice})},getActiveByID:function(){var t=this,e=this.ActiveID,i={ActiveID:e};(0,a.request)(r.GetActiveByID,i).then(function(e){console.log("活动详情",e),t.activeDetail=e.ActiveDetail,t.active=e.ActiveDetail.Active})},tabClick:function(t){switch(this.tabIndex=t,console.log(this.pageID),t){case 0:this.pageID=1,this.hasPastNext=!1,this.getPastTransactionsList();break;case 1:this.pageID=1,this.hasOrderNext=!1,this.getOrderDryingList();break}},getPastTransactionsList:function(){var t=this,e=this.id,i=this.pageID,n=this.pageSize,s={ProductID:e,PageID:i,PageSize:n};(0,a.request)(r.PastTransactionsListGet,s).then(function(e){1===i&&(t.pastList=[]),t.pastList=t.pastList.concat(e.OrderList),t.pastList.map(function(t){t.percentage=(t.OrderMoneys/t.OrderPrimeCost*100).toFixed(2),t.CreatedTime=(0,a.formatTime)(new Date(t.Created))}),e.PageCount<=i&&(t.hasPastNext=!0)})},getOrderDryingList:function(){var t=this,e=this.id,i=this.pageID,n=this.pageSize,s={ProductID:e,PageID:i,PageSize:n};(0,a.request)(r.OrderDryingListGet,s).then(function(e){1===i&&(t.showList=[]),t.showList=t.showList.concat(e.OrderList),t.showList.map(function(t){t.SendGoodsDateTime=(0,a.formatTime)(new Date(t.SendGoodsDate))}),e.PageCount<=i&&(t.hasOrderNext=!0)})},change:function(t){console.log(t),this.num=t},hidePopup:function(){var t=u(n.default.mark(function t(e){return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:t.t0=e,t.next="参与下一期"===t.t0?3:7;break;case 3:return t.next=5,this.getNextActive();case 5:return t.sent,t.abrupt("break",8);case 7:this.show=!this.show;case 8:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),getNextActive:function(){var t=this;return new Promise(function(e,i){var n=t.ActiveID,s={ActiveID:n};(0,a.request)(r.NextActiveGet,s).then(function(t){console.log(t),e(t.NexActive)})})},tolowerShow:function(t){console.log("tolowerShow",t)},allActivePath:function(){var t=this.ActiveID;(0,a.navigateTo)("../activeBilList/activeBilList?activeID="+t)},myActivePath:function(){console.log(this.ActiveID);var e=this.ActiveID,i=t.getStorageSync("UserInfo").ID;if(i)(0,a.navigateTo)("../activeBilList/activeBilList?activeID="+e+"&userID="+i);else{var n="你暂未登录，请点击确定去登录！";(0,a.defaultShowModal)(n).then(function(t){t.confirm?(console.log("用户点击确定"),(0,a.navigateTo)("../../ucenter/login/login")):t.cancel&&console.log("用户点击取消")})}},productDetailsUparsePath:function(){var t=this.id;(0,a.navigateTo)("../productDetailsUparse/productDetailsUparse?id="+t)},websocket:function(){var e=this;t.connectSocket({url:"wss://websocket.tengpaisc.com:8888/"}),t.onSocketOpen(function(t){console.log("WebSocket连接已打开！"),f=!0;for(var i=0;i<S.length;i++)e.sendSocketMessage(S[i]);S=[],e.msgSubscribe(),e.reqLogin()}),t.onSocketError(function(t){console.log("WebSocket连接打开失败，请检查！")}),this.onSocketMessage()},sendSocketMessage:function(e){var i=JSON.stringify(e);console.log("发送数据",f,e),f?t.sendSocketMessage({data:i}):S.push(e)},onSocketMessage:function(){var e=this;return new Promise(function(i,n){t.onSocketMessage(function(t){console.log("收到服务器内容："+t.data);var n=JSON.parse(t.data);console.log(n),e.proccessMsg(),i(n)})})},reqLogin:function(){var e=u(n.default.mark(function e(){var i,s,r,o,c,u;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.GUID();case 2:i=e.sent,s="3957399",r=t.getStorageSync("SessionKey"),o=this.ActiveID,this.UserID,!1,c=(0,a.formatTime)(new Date),u={ActiveID:o,AppKey:s,SessionKey:r,msgID:i,msgType:3,msgTime:c},this.sendSocketMessage(u);case 11:case"end":return e.stop()}},e,this)}));function i(){return e.apply(this,arguments)}return i}(),msgSubscribe:function(){var t=u(n.default.mark(function t(){var e,i,s,r,o;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.GUID();case 2:e=t.sent,i=this.ActiveID,s="/Actives/"+i+"/",r=(0,a.formatTime)(new Date),o={Subscribe:s,msgID:e,msgType:0,msgTime:r},this.sendSocketMessage(o);case 8:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),proccessMsg:function(){var t=u(n.default.mark(function t(){var e,i,s,r,o,c,u,h,l,g,d;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.GUID();case 2:return e=t.sent,i=new Date,s=(0,a.formatTime)(new Date),t.next=7,this.onSocketMessage();case 7:r=t.sent,o=r.msgType,this.msgType=o,console.log(o),t.prev=11,t.t0=o,t.next=0===t.t0?15:1===t.t0?17:2===t.t0?24:3===t.t0?27:4===t.t0?31:5===t.t0?33:6===t.t0?35:7===t.t0?43:8===t.t0?48:9===t.t0?54:10===t.t0?64:11===t.t0?72:12===t.t0?78:86;break;case 15:return r.IsError?(0,a.showToast)("订阅失败："+r.ErrMsg):(0,a.showToast)(r.ErrMsg),t.abrupt("break",86);case 17:return this.buttonStateChanged("报名","0",!0,!0),r.IsError?(0,a.showToast)("报名失败："+r.ErrMsg):(0,a.showToast)(r.ErrMsg),this.seq="剩余举牌次数：".concat(r.SeqBills,"次，已报名份数：").concat(r.Signups,"份，还可报名：").concat(r.SeqSignups),this.SeqBills=r.SeqBills,this.Signups=r.Signups,this.SeqSignups=r.SeqSignups,t.abrupt("break",86);case 24:return r.IsError?(0,a.showToast)(r.ErrMsg):(this.MyBills=r.MyBills,this.SeqBills=r.SeqBills,(0,a.showToast)(r.ErrMsg),this.buttonStateChanged("举牌","1",!0,!0)),this.timerState(null),t.abrupt("break",86);case 27:return r.IsError?(console.log("登录失败："+r.ErrMsg),c="你暂未登录，请点击确定去登录！",(0,a.defaultShowModal)(c).then(function(t){t.confirm?(console.log("用户点击确定"),(0,a.navigateTo)("../../ucenter/login/login")):t.cancel&&console.log("用户点击取消")})):this.UserID=r.UserID,u={ActiveID:this.ActiveID,UserID:this.UserID,msgID:e,msgType:6,msgTime:s},this.sendSocketMessage(u),t.abrupt("break",86);case 31:return r.IsError?(this.buttonStateChanged("托管","2",!0,!0),(0,a.showToast)("托管失败!"+r.ErrMsg)):this.buttonStateChanged("取消托管","2",!0,!0),t.abrupt("break",86);case 33:return r.IsError?(this.buttonStateChanged("取消托管","2",!0,!0),(0,a.showToast)("取消托管失败!")):this.buttonStateChanged("托管","2",!0,!0),t.abrupt("break",86);case 35:return this.timerDurationTitle=r.TimerDurationTitle,0===r.TimerDurationValue?this.timerState(null):(h=i.getTime()+r.TimerDurationValue,this.seqTime.setTime(h),this.timerState(this.seqTime)),this.buttonsList=r.ButtonsList,this.onPriceUpdateEvent(r.Price,r.AllBills,r.LastBills),this.onUpdateAllSignups(r.AllSignups,r.MaxSignups),this.onUpdateMySignups(r.MySignups,r.SeqSignups),this.onUpdateMyBills(r.MyBills,r.MySeqBills),t.abrupt("break",86);case 43:return this.onUpdateAllSignups(r.AllSignups,r.MaxSignups),this.buttonStateChanged("参与下一期","4",!1,!1),this.buttonStateChanged("填写收货地址","3",!1,!1),r.AllSignups===r.MaxSignups?(this.buttonStateChanged("举牌","1",!0,!0),this.buttonStateChanged("托管","2",!0,!0),this.buttonStateChanged("报名","0",!1,!1)):(this.buttonStateChanged("举牌","1",!1,!1),this.buttonStateChanged("托管","2",!1,!1),(0,a.showToast)("报名成功，即将开团！"),this.buttonStateChanged("报名","0",!0,!0)),t.abrupt("break",86);case 48:return(0,a.showToast)("价格已更新......！"),this.BillStat="总举牌次数："+r.AllBills+"次",r.Bills.length>0&&(this.newPrice="￥".concat(r.Bills[0].Price),this.newBill=r.Bills[0].bill,this.newFace=r.Bills[0].bill.face,this.newNick="领先人：".concat(r.Bills[0].nick),l=new Date,g=l.getTime()+r.SeqMiniSecounds,this.seqTime.setTime(g)),r.Bills.length>1&&(this.lastbills=r.Bills),1===r.Bills.length&&this.timerState(this.seqTime),t.abrupt("break",86);case 54:return d=i.getTime(),this.seqTime.setTime(d+r.SeqMiniSecounds),console.log(this.seqTime),this.timerDurationTitle="开拍准备",this.buttonStateChanged("报名","0",!1,!1),this.buttonStateChanged("托管","1",!0,!1),this.buttonStateChanged("自动举牌中","2",!0,!1),this.buttonStateChanged("填写收货地址","3",!1,!1),this.buttonStateChanged("参与下一期","4",!1,!1),t.abrupt("break",86);case 64:return this.times="等待首牌",this.timerState(null),this.newPrice="￥"+r.currPrice,0===r.ActiveType?(this.buttonStateChanged("自动举牌中","1",!0,!1),this.buttonStateChanged("托管","2",!0,!1)):(this.buttonStateChanged("举牌","1",!0,!0),this.buttonStateChanged("托管","2",!0,!0)),this.buttonStateChanged("报名","0",!1,!1),this.buttonStateChanged("填写收货地址","3",!1,!1),this.buttonStateChanged("参与下一期","4",!1,!1),t.abrupt("break",86);case 72:return this.timerState(null),this.times="已成交",this.newCurrent="成交价",this.newCurrentBidder="中拍人",this.UserID===r.WinsBill.UserID?((0,a.showToast)("恭喜，您已中拍！点击确定去填写订单信息吧！"),this.buttonStateChanged("报名","0",!1,!1),this.buttonStateChanged("举牌","1",!1,!1),this.buttonStateChanged("托管","2",!1,!1),this.buttonStateChanged("参与下一期","4",!1,!1),this.buttonStateChanged("填写收货地址","3",!0,!0)):(this.buttonStateChanged("报名","0",!1,!1),this.buttonStateChanged("举牌","1",!1,!1),this.buttonStateChanged("托管","2",!1,!1),this.buttonStateChanged("填写收货地址","3",!1,!1),this.buttonStateChanged("参与下一期","4",!0,!0)),t.abrupt("break",86);case 78:return this.onTimerStatus="活动流拍",this.OnTimerDowns="-",this.buttonStateChanged("报名","0",!1,!1),this.buttonStateChanged("举牌","1",!1,!1),this.buttonStateChanged("托管","2",!1,!1),this.buttonStateChanged("填写收货地址","3",!1,!1),this.buttonStateChanged("参与下一期","4",!0,!0),t.abrupt("break",86);case 86:t.next=92;break;case 88:t.prev=88,t.t1=t["catch"](11),console.error("处理消息出错："),console.error(t.t1);case 92:case"end":return t.stop()}},t,this,[[11,88]])}));function e(){return t.apply(this,arguments)}return e}(),buttonStateChanged:function(t,e,i,n){this.buttonsList.map(function(s,a,r){r[e].ButtonText=t,r[e].ButtonVisibility=i,r[e].ButtonEnabled=n})},onUpdateAllSignups:function(t,e){this.currSignups="总已报名份数：".concat(t,"份"),this.maxSignups="总需报名份数：".concat(e,"份")},onUpdateMySignups:function(t,e){this.signups="我已报名份数：".concat(t,"份"),this.seqSignups="还可报名份数：".concat(e,"份")},onUpdateMyBills:function(t,e){this.myBills="我的举牌次数：".concat(t,"次"),this.seqBills="剩余可用次数：".concat(e,"次"),this.mySeqBills=t},onPriceUpdateEvent:function(t,e,i){this.allBills=e,i.length>0?(this.newPrice="￥".concat(i[0].bill.Price),this.newBill=i[0].bill,this.newFace=i[0].face,this.newNick="领先人：".concat(i[0].nick),this.newCity="".concat(i[0].bill.Province," ").concat(i[0].bill.City),this.newCurrentBidder="当前领先出价人",this.newCurrent="当前出价"):(this.newPrice="￥".concat(t),this.newCurrent="起拍价"),i.length>1&&(this.lastBills=i)},billTap:function(){var t=u(n.default.mark(function t(e){var i,s,r,o,c,u,h,l,g,d,p,f;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return i=e,s=this.ActiveID,r=this.num,o=this.Price,t.next=6,this.GUID();case 6:c=t.sent,u=(0,a.formatTime)(new Date),console.log("switch",e),t.t0=i,t.next="报名"===t.t0?12:"举牌"===t.t0?16:"托管"===t.t0?19:"取消托管"===t.t0?22:"填写收货地址"===t.t0?25:"参与下一期"===t.t0?29:33;break;case 12:return h={ActiveID:s,Shares:r,msgID:c,msgType:1,msgTime:u},this.sendSocketMessage(h),this.show=!this.show,t.abrupt("break",33);case 16:return l={ActiveID:s,Price:o,msgID:c,msgType:2,msgTime:u},this.sendSocketMessage(l),t.abrupt("break",33);case 19:return g={ActiveID:s,msgID:c,msgType:4,msgTime:u},this.sendSocketMessage(g),t.abrupt("break",33);case 22:return d={ActiveID:s,msgID:c,msgType:5,msgTime:u},this.sendSocketMessage(d),t.abrupt("break",33);case 25:return p=!0,f=this.orderID,(0,a.navigateTo)("../ucenter/addressShipping/addressShipping?disabled="+p+"&OrderID="+f),t.abrupt("break",33);case 29:return t.next=31,this.getNextActive();case 31:return t.sent,t.abrupt("break",33);case 33:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),seqDisplay:function(){var t=this.seqTime,e=new Date,i=t-e,n=Math.floor(i/1e3),s=Math.floor(Math.floor(n/60)/60)%24,a=Math.floor(Math.floor(Math.floor(n/60)/60)/24)%30,r=Math.floor(n/60)%60,o=n%60,c=Math.floor(i/100)%10;if(o<=0)this.times="";else{s<10&&(s="0"+s),r<10&&(r="0"+r),o<10&&(o="0"+o);var u=(a>0?a+"天":"")+s+":"+r+":"+o+"."+c;this.times=u}},timerState:function(t){var e=this;null!==t?t instanceof Date?t.getTime()<(new Date).getTime()?console.error("设置倒计时器无效，日期时间必须是未来的时间！"):(clearInterval(this.timer),this.timer=setInterval(function(){e.seqDisplay()},100)):console.error("传入日期时间格式不正确！"):clearInterval(this.timer)},GUID:function(){return new Promise(function(t,e){for(var i="",n=1;n<=32;n++){var s=Math.floor(16*Math.random()).toString(16);i+=s,8!=n&&12!=n&&16!=n&&20!=n||(i+="-")}t(i)})}}});e.default=b}).call(this,i("543d")["default"])}},[["2baa","common/runtime","common/vendor"]]]);