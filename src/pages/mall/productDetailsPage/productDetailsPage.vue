<template>
	<view class="container">
		<!-- 轮播 -->
		<view class="i-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper
						class="swiper-box square-dot"
						:indicator-dots="indicatorDots"
						:autoplay="autoplay"
						:interval="interval"
						:duration="duration"
						:circular="circular"
						:indicator-active-color="indicatorActiveColor"
					>
						<swiper-item v-for="(item, index) in swiper" :key="index">
							<image :src="item" mode="aspectFit" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 标签 -->
		<view class="i-label">
			<view class="i-label-item" v-for="(item, index) in label" :key="index">
				<view class="i-point"></view>
				<view class="i-label-item-text">{{item}}</view>
				<view class="i-point"></view>
			</view>
		</view>
		<view class="i-product-head">
			<view class="i-product-title" v-if="active.ActiveNo && activeDetail.ProductTitle">
				<text class="active-no">[{{active.ActiveNo}}期]</text>
				<text class="i-product-title">{{activeDetail.ProductTitle}}</text>
			</view>
			<view class="i-product-name">{{activeDetail.ProductName}}</view>
		</view>
		<view class="i-product-last-transaction-flex">
			<view class="i-product-price" v-if="activeDetail.ProductPrice">
				<text>市场价：</text>
				<text class="i-product-price-text">¥{{activeDetail.ProductPrice}}</text>
			</view>
			<view class="i-product-last-transaction">
				<!-- <view class="i-product-status">{{active.ActiveTypeName}}</view> -->
				<view class="i-product-last-transaction-content" v-if="active.PrevActiveMoney">
					<view class="i-product-last-transaction-text">上期成交:</view>
					<view class="i-product-last-transaction-price">¥{{active.PrevActiveMoney}}</view>
				</view>
			</view>
		</view>
		<view
			class="i-product-distance-shooting"
			:class="(times?'i-active-shooting':'i-shooting')"
			v-if="times || timerDurationTitle"
		>
			<view class="i-product-distance-shooting-text" v-if="timerDurationTitle">{{timerDurationTitle}}</view>
			<view class="i-product-line" v-if="times && timerDurationTitle"></view>
			<view class="i-product-distance-shooting-time" v-if="times">{{times}}</view>
		</view>
		<view class="i-product-current-bid">
			<view class="i-product-current-bid-head">{{newCurrent}}</view>
			<view class="i-product-current-bid-price">{{newPrice}}</view>
			<view class="i-product-current-bid-icon" v-if="newCurrentBidder">
				<image :src="leading" />
				<text>{{newCurrentBidder}}</text>
			</view>
			<view class="i-product-current-bid-user" v-if="newFace || newNick">
				<image :src="newFace" />
				<view class="i-product-current-bid-name uni-ellipsis">{{newNick}}</view>
				<view class="i-product-current-bid-address">{{newCity}}</view>
			</view>
		</view>
		<view class="i-product-bill">
			<view
				class="i-bill"
				:class="(item.IsWin === 0?'':'i-active')"
				v-for="(item, index) in lastBills"
				:key="index"
			>
				<view class="i-bill-image i-flex">
					<image :src="item.face" />
					<view class="i-bill-user uni-ellipsis">{{item.nick}}</view>
				</view>
				<view class="i-bill-IsWin i-bill-out" v-if="item.bill.IsWin === 0">出局</view>
				<view class="i-bill-IsWin i-bill-pre" v-else>预选</view>
				<view class="i-bill-province">{{item.bill.Province}}</view>
				<view class="i-bill-price">{{item.bill.Price}}</view>
			</view>
		</view>
		<view class="i-list-line"></view>
		<view class="i-product-all-bill uni-list-cell-navigate uni-navigate-right" @click="allActivePath">
			<view class="i-product-all-bill-text">
				<view class="i-product-all-bill-records">全部出价记录</view>
				<view class="i-product-all-bill-length">
					<text class="i-product-all-bill-text-item">{{allBills}}</text>
					<text class="i-product-all-bill-text-total">条</text>
				</view>
			</view>
		</view>
		<view class="i-product-all-bill uni-list-cell-navigate uni-navigate-right" @click="myActivePath">
			<view class="i-product-all-bill-text">
				<view class="i-product-all-bill-records">我的出价记录</view>
				<view class="i-product-all-bill-length">
					<text class="i-product-all-bill-text-item">{{myBills}}</text>
					<text class="i-product-all-bill-text-total">条</text>
				</view>
			</view>
		</view>
		<view class="i-product-table" v-if="activeShow">
			<product-table :options="active" />
		</view>
		<view
			class="i-product-details uni-list-cell-navigate uni-navigate-right"
			@click="productDetailsUparsePath"
		>
			<view class="i-product-details-text">商品详情</view>
		</view>
		<view class="i-product-tab-content">
			<view class="i-product-tab">
				<view class="i-product-tab-item">
					<view
						class="i-product-tab-item-tab"
						:class="(tabIndex === index?'i-active':'')"
						v-for="(item, index) in tab"
						:key="index"
						@click="tabClick(index)"
					>{{item}}</view>
				</view>
				<view class="i-product-tab-line"></view>
			</view>
			<view class="components">
				<scroll-view v-if="tabIndex === 0" scroll-y @scrolltolower="tolowerPast">
					<i-past :options="pastList" />
				</scroll-view>
				<scroll-view v-else-if="tabIndex === 1" scroll-y @scrolltolower="tolowerShow">
					<i-show :options="showList" />
				</scroll-view>
				<view v-else>
					<i-rule :options="ruleList" />
				</view>
			</view>
		</view>
		<view class="i-kong"></view>
		<view class="i-product-join">
			<!-- #ifdef MP-WEIXIN -->
			<form @submit="formSubmit" report-submit="true" report-submit-timeout="“2”">
				<!-- #endif -->
				<view class="i-placard-form">
					<block v-if="seqBillsShow">
						<view class="i-placard-remaining-num">
							<view class="i-placard-remaining">剩余次数：</view>
							<view class="i-placard-num">{{SeqBills}}</view>
						</view>
					</block>
					<view class="i-placard-end">
						<block v-for="(item, index) in buttonsList" :key="index">
							<block v-if="item.ButtonType === 0 && item.ButtonVisibility">
								<button
									class="btn join-btn"
									:style="'width:'+width+'px'"
									v-show="!show"
									@click.stop.prevent="hidePopup(item.ButtonText)"
									formType="submit"
								>{{item.ButtonText}}</button>
								<i-popup
									:disabled="item.ButtonEnabled"
									:show="show"
									:options="active"
									:buttonText="item.ButtonText"
									:num="SeqBills"
									:min="1"
									:signups="signups"
									:seqSignups="seqSignups"
									@change="change"
									@hidePopup="hidePopup"
									@submit="submit"
									@click="billTap(item.ButtonText)"
								/>
							</block>
							<block v-if="item.ButtonType === 1 && item.ButtonVisibility">
								<button
									class="btn i-placard-button i-placard-active"
									:disabled="!item.ButtonEnabled"
									@click.stop.prevent="billTap(item.ButtonText)"
									formType="submit"
								>{{item.ButtonText}}</button>
							</block>
							<block v-if="item.ButtonType === 2 && item.ButtonVisibility">
								<button
									class="btn i-placard-button i-placard-active"
									:disabled="!item.ButtonEnabled"
									formType="submit"
									@click.stop.prevent="billTap(item.ButtonText)"
								>{{item.ButtonText}}</button>
							</block>
							<block v-if="item.ButtonType === 3 && item.ButtonVisibility">
								<button
									class="btn join-btn"
									:style="'width:'+width+'px'"
									:disabled="!item.ButtonEnabled"
									formType="submit"
									@click.stop.prevent="billTap(item.ButtonText)"
								>{{item.ButtonText}}</button>
							</block>
							<block v-if="item.ButtonType === 4 && item.ButtonVisibility">
								<button
									class="btn join-btn"
									:style="'width:'+width+'px'"
									:disabled="!item.ButtonEnabled"
									formType="submit"
									@click.stop.prevent="billTap(item.ButtonText)"
								>{{item.ButtonText}}</button>
							</block>
						</block>
					</view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
			</form>
			<!-- #endif -->
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	formatTime,
	vibrateLong,
	vibrateShort,
	showToast,
	showModal,
	showErrorToast,
	defaultShowModal,
	onShareAppMessage
} from "@/common/utils/util";
import {
	ProductGet,
	PastTransactionsListGet,
	OrderDryingListGet,
	GetActiveByID,
	NextActiveGet,
	AddUserFormID
} from "@/common/config/api";
import iPast from "@/components/i-past/i-past.vue";
import iShow from "@/components/i-show/i-show.vue";
import iRule from "@/components/i-rule/i-rule.vue";
import iPopup from "@/components/i-popup/i-popup.vue";
import productTable from "@/components/product-table/product-table.vue";
let socketOpen: boolean = false;
let socketMsgQueue: any = [];
export default Vue.extend({
	components: {
		iPast,
		iShow,
		iRule,
		iPopup,
		productTable
	},
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 500,
			circular: true,
			indicatorActiveColor: "#fe7f00",
			disabled: false, // 按钮disabled
			swiper: [], // 产品轮播
			productID: "", // 商品ID
			orderID: "", // 订单ID
			product: "", // 商品
			num: "1", // 剩余次数
			pageID: 1, // 页码
			pageSize: 10, // 每页条数
			hasPastNext: false, // 是否还有往期成交下一页
			hasOrderNext: false, // 是否还有晒单下一页
			width: 0, // 设置系统宽度
			activeDetail: "", // 活动详情
			activeShow: false, // 是否有活动内容数据
			active: "", // 活动内容
			activeType: 0, // 判断是否是自动举牌还是手工举牌,activeType==0自动，1手工
			tabIndex: 0, // 默认往期成交
			pastList: [], // 往期成交列表
			showList: [], // 晒单列表
			ruleList: "", // 竞拍规则
			show: false, // 显示弹窗
			label: ["零风险", "正品承诺", "极速发货", "公平公正"],
			tab: ["往期成交", "分享晒单", "竞拍规则"],
			src: "/static/icon_experience.png",
			leading: "/static/icon/icon_leading.png",
			activeID: "", // 活动ID
			Price: "", // 价格
			msgID: "", // GUID
			msgType: "", // 消息类型
			timer: 0, // 计时器
			newCurrent: "", // 当前出价文字
			newCurrentBidder: "", // 当前领先出价人文字
			buttonsList: [], // 按钮类型，0表示报名按钮、1表示举牌按钮、2表示托管按钮、3表示填写地址按钮，4表示参与下一期按钮
			price: "", // 最新价格
			lastBills: [], // 出价列表
			timerDurationTitle: "", // 状态对应要显示的标题
			currSignups: "", // 总已报名份数
			maxSignups: "", // 总需报名份数
			signups: "", // 我已报名份数
			seqSignups: "", // 还可报名份数
			allBills: "0", // 全部举牌次数
			myBills: "0", // 我的举牌次数,我的出价记录
			seqBills: "0", // 剩余可用次数
			seqBillsShow: false, // 显示剩余举牌次数文字
			seq: "", // 更新我的剩余举牌次数
			MyBills: "", // 举牌响应消息（包含我的举牌次数、剩余可用次数）
			SeqBills: "0", // 举牌响应消息（剩余可用次数）
			Signups: "", // 报名份数
			SeqSignups: "0", // 剩下报名份数
			mySeqBills: "0", // 我的出价记录
			UserID: "", // 登录成功，提示用户
			tapbtn: "", // 托管
			BillStat: "", // 总举牌次数
			newPrice: "", // 领先价格
			newBill: "", // 领先人全部信息
			newNick: "", // 当前领先人
			newFace: "", // 当前领先人头像
			newCity: "", // 当前领先人所在城市
			times: "", // 倒计时
			seqTime: new Date() // 初始Date时间
		};
	},
	onLoad(options: any) {
		this.activeID = options.activeID;
		let windowWidth: any = uni.getSystemInfoSync().windowWidth;
		this.width = windowWidth;
	},
	onShow() {
		this.UserID = uni.getStorageSync("UserInfo").ID;
		this.websocket();
		this.getActiveByID();
		this.getPastTransactionsList();
	},
	onHide() {
		uni.closeSocket();
	},
	onUnload() {
		uni.hideToast();
		uni.closeSocket();
		uni.onSocketClose(res => {
			console.log("WebSocket 已关闭！");
		});
	},
	onPullDownRefresh() {
		uni.onSocketClose(res => {
			console.log("WebSocket 已关闭！");
		});
		this.getActiveByID();
	},
	onReachBottom() {
		switch (this.tabIndex) {
			case 0:
				if (!this.hasPastNext) {
					this.pageID++;
					this.getPastTransactionsList();
				}
				break;
			case 1:
				if (!this.hasOrderNext) {
					this.pageID++;
					this.getOrderDryingList();
				}
				break;
		}
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		// 获取活动详情
		getActiveByID() {
			let ActiveID = this.activeID;
			let data = {
				ActiveID: ActiveID
			};
			request(GetActiveByID, data).then((res: any) => {
				this.activities(res.ActiveDetail);
			});
		},
		// 选项卡
		tabClick(index: number) {
			this.tabIndex = index;
			console.log(this.pageID);
			switch (index) {
				case 0:
					this.pageID = 1;
					this.hasPastNext = false;
					this.getPastTransactionsList();
					break;
				case 1:
					this.pageID = 1;
					this.hasOrderNext = false;
					this.getOrderDryingList();
					break;
			}
		},
		// 往期成交列表
		getPastTransactionsList() {
			let ActiveID = this.activeID;
			let PageID = this.pageID;
			let PageSize = this.pageSize;
			let data = {
				ActiveID: ActiveID,
				PageID: PageID,
				PageSize: PageSize
			};
			request(PastTransactionsListGet, data).then((res: any) => {
				if (PageID === 1) this.pastList = [];
				this.pastList = this.pastList.concat(res.OrderList);
				this.pastList.map((item: any) => {
					item.percentage = (
						((item.OrderPrimeCost - item.OrderMoneys) / item.OrderPrimeCost) *
						100
					).toFixed(2);
					item.CreatedTime = formatTime(new Date(item.Created));
					item.UserNick = decodeURIComponent(item.UserNick);
				});
				if (res.PageCount <= PageID) {
					this.hasPastNext = true;
				}
			});
		},
		// 获取用户晒单列表
		getOrderDryingList() {
			let ProductID = this.productID;
			let PageID = this.pageID;
			let PageSize = this.pageSize;
			let data = {
				ProductID: ProductID,
				PageID: PageID,
				PageSize: PageSize
			};
			request(OrderDryingListGet, data).then((res: any) => {
				if (PageID === 1) this.showList = [];
				this.showList = this.showList.concat(res.OrderList);
				this.showList.map((item: any) => {
					item.UserNick = decodeURIComponent(item.UserNick);
					item.SendGoodsDateTime = formatTime(new Date(item.SendGoodsDate));
				});
				if (res.PageCount <= PageID) {
					this.hasOrderNext = true;
				}
			});
		},
		change(val: any) {
			console.log(val);
			this.num = val;
		},
		async hidePopup(e: any) {
			switch (e) {
				case "参与下一期":
					let nexActive: any = await this.getNextActive();
					this.activities(nexActive);
					uni.closeSocket();
					this.websocket();
					break;
				default:
					this.show = !this.show;
			}
		},
		// 获取下一期活动
		getNextActive() {
			return new Promise((resolve, reject) => {
				let ActiveID = this.activeID;
				let data = {
					ActiveID: ActiveID
				};
				request(NextActiveGet, data).then((res: any) => {
					console.log(res);
					resolve(res.NexActive);
				});
			});
		},
		// 处理活动内容
		activities(res: any) {
			this.swiper = res.ProductPicList;
			this.Price = res.ProductPrice;
			this.activeDetail = res;
			this.active = res.Active;
			this.activeShow = true;
			this.activeType = res.Active.ActiveType;
			this.activeID = res.Active.ID;
			this.productID = res.ID;
		},
		tolowerShow(e: any) {
			console.log("tolowerShow", e);
		},
		// 全部记录
		allActivePath() {
			let activeID = this.activeID;
			navigateTo("../activeBilList/activeBilList?activeID=" + activeID);
		},
		// 我的出价记录
		myActivePath() {
			console.log(this.activeID);
			let activeID = this.activeID;
			let userID: string = uni.getStorageSync("UserInfo").ID;
			if (!userID) {
				let content: string = "你暂未登录，请点击确定去登录！";
				defaultShowModal(content).then((res: any) => {
					if (res.confirm) {
						console.log("用户点击确定");
						navigateTo("../../ucenter/login/login");
					} else if (res.cancel) {
						console.log("用户点击取消");
					}
				});
			} else {
				navigateTo(
					"../activeBilList/activeBilList?activeID=" +
						activeID +
						"&userID=" +
						userID
				);
			}
		},
		// 产品详情
		productDetailsUparsePath() {
			let productID = this.productID;
			navigateTo(
				"../productDetailsUparse/productDetailsUparse?productID=" + productID
			);
		},
		websocket() {
			uni.connectSocket({
				url: "wss://websocket.tengpaisc.com"
			});
			uni.onSocketOpen((res: any) => {
				console.log("WebSocket连接已打开！");
				socketOpen = true;
				for (let i = 0; i < socketMsgQueue.length; i++) {
					this.sendSocketMessage(socketMsgQueue[i]);
				}
				socketMsgQueue = [];
				this.msgSubscribe();
				this.reqLogin();
				this.onSocketMessage();
			});
			uni.onSocketError(res => {
				console.log(res);
				console.log("WebSocket连接打开失败，请检查！");
				// 断线调用函数
				showErrorToast("断线重连中...");
				this.websocket();
			});
		},
		sendSocketMessage(msg: any) {
			let data: string = JSON.stringify(msg);
			console.log("发送数据", socketOpen, msg);
			if (socketOpen) {
				uni.sendSocketMessage({
					data: data
				});
			} else {
				socketMsgQueue.push(msg);
			}
		},
		onSocketMessage() {
			uni.onSocketMessage((res: any) => {
				let msg = JSON.parse(res.data);
				console.log("收到服务器内容：", msg);
				this.proccessMsg(msg);
			});
		},
		// 向服务器发送登录请求
		async reqLogin() {
			let GUID: any = await this.GUID();
			// #ifdef MP-WEIXIN
			var Appkey = "3957399";
			// #endif
			// #ifdef H5
			var Appkey = "1867997";
			// #endif
			// #ifdef APP-PLUS
			var Appkey = "1867997";
			// #endif
			const SessionKey = uni.getStorageSync("SessionKey");
			let ActiveID = this.activeID;
			let UserID = this.UserID;
			let ConnectionState = false;
			let msgTime = formatTime(new Date());
			let reqLogin: any = {
				ActiveID: ActiveID,
				AppKey: Appkey,
				SessionKey: SessionKey,
				msgID: GUID,
				msgType: 3,
				msgTime: msgTime
			};
			this.sendSocketMessage(reqLogin);
		},
		// 发送对该活动的消息订阅
		async msgSubscribe() {
			let GUID: any = await this.GUID();
			let ActiveID = this.activeID;
			let url = "/Actives/" + ActiveID + "/";
			let msgTime = formatTime(new Date());
			let reqSubscribe = {
				Subscribe: url,
				msgID: GUID,
				msgType: 0,
				msgTime: msgTime
			};
			this.sendSocketMessage(reqSubscribe);
		},
		async init() {
			let GUID: any = await this.GUID();
			let msgTime = formatTime(new Date());
			let initMsg = {
				ActiveID: this.activeID,
				UserID: this.UserID,
				msgID: GUID,
				msgType: 6,
				msgTime: msgTime
			};
			this.sendSocketMessage(initMsg);
		},
		// 处理消息的函数，用于解析从服务器webSocket收到的各种消息
		async proccessMsg(msg: any) {
			let GUID: any = await this.GUID();
			let dt = new Date();
			let msgTime = formatTime(new Date());
			let msgType = msg.msgType;
			this.msgType = msgType;
			console.log(msgType);
			if (msg == null) {
				return;
			}
			try {
				switch (msgType) {
					case 0:
						// 订阅响应消息
						if (msg.IsError) {
							showToast("订阅失败：" + msg.ErrMsg);
						}
						break;
					case 1:
						// 重新置为可用，不管结果如何，因为报名后仍可以继续报名
						// 报名响应消息
						if (msg.IsError) {
							if (this.UserID) {
								if (msg.ErrMsg.includes("帐户余额不足")) {
									let content: string = msg.ErrMsg;
									defaultShowModal(content).then((res: any) => {
										if (res.confirm) {
											console.log("用户点击确定");
											navigateTo("../../ucenter/recharge/recharge");
										} else if (res.cancel) {
											console.log("用户点击取消");
										}
									});
								} else {
									// 报名失败
									showToast(msg.ErrMsg);
								}
							} else {
								let content: string = "你暂未登录，请点击确定去登录！";
								defaultShowModal(content).then((res: any) => {
									if (res.confirm) {
										navigateTo("../../ucenter/login/login");
									} else if (res.cancel) {
										console.log("用户点击取消");
									}
								});
							}
						} else {
							// 更新我的报名信息事件
							this.onUpdateMySignups &&
								this.onUpdateMySignups(msg.Signups, msg.SeqSignups);
							this.buttonStateChanged &&
							  this.buttonStateChanged("已报名", "0", true, true);
							// 剩余举牌次数
							this.SeqBills = msg.SeqBills;
							showToast(msg.ErrMsg);
						}
						break;
					case 2:
						// 举牌响应消息（包含我的举牌次数、剩余可用次数）
						if (msg.IsError) {
							showToast(msg.ErrMsg);
						} else {
							this.onUpdateMyBills &&
								this.onUpdateMyBills(msg.MyBills, msg.MySeqBills);
							// 如果活动为手工举牌，显示举牌按钮
							if (this.activeType === 1) {
								this.buttonStateChanged &&
									this.buttonStateChanged("举牌", "2", true, true);
							}
							this.SeqBills = msg.SeqBills;
						}
						break;
					case 3:
						// 登录响应消息
						if (msg.IsError) {
							console.log("登录失败：" + msg.ErrMsg);
							let content: string = "你暂未登录，请点击确定去登录！";
							defaultShowModal(content).then((res: any) => {
								if (res.confirm) {
									console.log("用户点击确定");
									navigateTo("../../ucenter/login/login");
								} else if (res.cancel) {
									console.log("用户点击取消");
								}
							});
						} else {
							// 登录成功，提示用户
							this.UserID = msg.UserID;
						}
						this.init();
						break;
					case 4:
						// 托管响应
						if (msg.IsError) {
							this.buttonStateChanged &&
								this.buttonStateChanged("托管", "1", true, true);
							showToast("托管失败!" + msg.ErrMsg);
						} else {
							this.buttonStateChanged &&
								this.buttonStateChanged("取消托管", "1", true, true);
						}
						break;
					case 5:
						// 取消托管响应消息
						if (msg.IsError) {
							this.buttonStateChanged &&
								this.buttonStateChanged("取消托管", "1", true, true);
							showToast("取消托管," + msg.ErrMsg);
						} else {
							this.buttonStateChanged &&
								this.buttonStateChanged("托管", "1", true, true);
						}
						break;
					case 6:
						// 活动详情页初始化响应
						this.timerDurationTitle = msg.TimerDurationTitle; // 状态对应要显示的标题
						if (this.activeType === 1) {
							this.times = msg.TimerDurationText;
						}
						// 倒计时显示文本，Status：0表示等待开团，1表示即将成团，2表示准备倒计时，3表示正在竟拍，4表示成功完成（活动结束），5表示活动流拍
						this.productStatus(msg.Status);
						// 判断是否需要倒计时，如果不需要则清除倒计时器,不显示times
						if (msg.TimerDurationValue === 0) {
							this.times = "";
							this.timerState(null);
						} else {
							let dt = new Date();
							let tm = dt.getTime() + msg.TimerDurationValue;
							this.seqTime.setTime(tm);
							this.timerState(this.seqTime);
						}
						// 处理按钮的初始状态列表
						this.buttonsEvent(msg.ButtonsList);
						// 更新最近出价人列表信息，更新全部举牌次数、我的举牌次数、和最新价格
						this.onPriceUpdateEvent &&
							this.onPriceUpdateEvent(msg.Price, msg.AllBills, msg.LastBills);
						// 更新全局报名状态信息
						this.onUpdateAllSignups &&
							this.onUpdateAllSignups(msg.AllSignups, msg.MaxSignups);
						// 更新我的报名状态信息
						this.onUpdateMySignups &&
							this.onUpdateMySignups(msg.MySignups, msg.SeqSignups);
						this.onUpdateMyBills &&
							this.onUpdateMyBills(msg.MyBills, msg.MySeqBills);
						break;
					case 7:
						// 报名进度更新推送
						this.onUpdateAllSignups &&
							this.onUpdateAllSignups(msg.AllSignups, msg.MaxSignups);
						// 隐藏其它按钮
						this.buttonStateChanged &&
							this.buttonStateChanged("参与下一期", "4", false, false);
						this.buttonStateChanged &&
							this.buttonStateChanged("填写收货地址", "3", false, false);
						if (msg.AllSignups === msg.MaxSignups) {
							this.seqBillsShow = true;
							// 如果活动为手工举牌，显示举牌按钮
							if (this.activeType === 0) {
								this.buttonStateChanged &&
									this.buttonStateChanged("举牌", "2", false, false);
								this.buttonStateChanged &&
									this.buttonStateChanged("托管", "1", false, false);
							} else {
								this.buttonStateChanged &&
									this.buttonStateChanged("举牌", "2", true, true);
								this.buttonStateChanged &&
									this.buttonStateChanged("托管", "1", true, true);
							}
							// 已满员，隐藏掉报名按钮
							this.buttonStateChanged &&
								this.buttonStateChanged("报名", "0", false, false);
						} else {
							this.buttonStateChanged &&
								this.buttonStateChanged("举牌", "2", false, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("托管", "1", false, false);
							// 还需要继续报名，显示报名按钮
							this.buttonStateChanged &&
								this.buttonStateChanged("已报名", "0", true, true);
						}
						break;
					case 8:
						// 价格更新通知
						this.seqBillsShow = true;
						// 更新全部举牌次数、我的举牌次数、和最新价格
						this.BillStat = "总举牌次数：" + msg.AllBills + "次";
						// 更新最后出价人信息
						if (msg.Bills.length > 0) {
							this.newPrice = `￥${msg.Bills[0].Price}`;
							this.newBill = msg.Bills[0].bill;
							this.newFace = msg.Bills[0].bill.face;
							this.newNick = `领先人：${decodeURIComponent(msg.Bills[0].nick)}`;
						}
						// 更新最近出局人信息
						if (msg.Bills.length > 1) {
							this.lastBills = msg.Bills;
						}
						if (msg.SeqMiniSecounds > 0) {
							// 计算剩余时长
							let dt = new Date();
							let tm = dt.getTime() + msg.SeqMiniSecounds;
							this.seqTime.setTime(tm);
							this.timerState(this.seqTime);
						}
						// 更新价格事件
						this.onPriceUpdateEvent &&
							this.onPriceUpdateEvent(msg.Price, msg.AllBills, msg.Bills);
						break;
					case 9:
						// 活动准备时
						this.seqBillsShow = true;
						//计算剩余时间，并重置剩余时间
						let dt = new Date();
						dt.setTime(dt.getTime() + msg.SeqMiniSecounds);
						this.timerState(dt);
						// 设置倒计时标题为即将开拍
						this.timerDurationTitle = "准备倒计时";
						// 隐藏掉报名按钮
						this.buttonStateChanged &&
							this.buttonStateChanged("报名", "0", false, false);
						// 禁用举牌、托管按钮，如果活动为手工举牌，显示举牌按钮
						if (this.activeType === 0) {
							this.buttonStateChanged &&
								this.buttonStateChanged("自动举牌中", "2", false, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("托管", "1", false, false);
						} else {
							this.buttonStateChanged &&
								this.buttonStateChanged("举牌", "2", true, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("托管", "1", true, false);
						}
						// 隐藏其它按钮
						this.buttonStateChanged &&
							this.buttonStateChanged("填写收货地址", "3", false, false);
						this.buttonStateChanged &&
							this.buttonStateChanged("参与下一期", "4", false, false);
						break;
					case 10:
						this.seqBillsShow = true;
						// 活动正式开始，但是目前尚未有人出价，所以收到此消息，先停止计时器，并显示为 “等待首牌”
						this.timerDurationTitle = "落拍到时时";
						this.times = "等待首牌";
						this.SeqBills = msg.SeqBills;
						// 清除计时器
						this.timerState(null);
						// 设置价格
						this.newPrice = "￥" + msg.currPrice;
						// 判断活动类型，如果是人工举牌，显示托管、举牌；如果是自动举牌，举牌按钮更改为“自动举牌中”，其它按钮全部隐藏
						if (msg.ActiveType === 0) {
							// 停用其它按钮，仅剩下举牌按钮，且举牌按钮状态显示为自动举牌中
							this.buttonStateChanged &&
								this.buttonStateChanged("自动举牌中", "2", false, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("托管", "1", false, false);
						} else {
							// 启用举牌、托管按钮
							this.buttonStateChanged &&
								this.buttonStateChanged("举牌", "2", true, true);
							if (msg.IsTap) {
								this.buttonStateChanged &&
									this.buttonStateChanged("取消托管", "1", true, true);
							} else {
								this.buttonStateChanged &&
									this.buttonStateChanged("托管", "1", true, true);
							}
						}
						// 隐藏掉报名、填写地址、参与下一期按钮
						this.buttonStateChanged &&
							this.buttonStateChanged("报名", "0", false, false);
						this.buttonStateChanged &&
							this.buttonStateChanged("填写收货地址", "3", false, false);
						this.buttonStateChanged &&
							this.buttonStateChanged("参与下一期", "4", false, false);
						break;
					case 11:
						// 活动结束通知
						this.seqBillsShow = false;
						this.timerState(null);
						this.timerDurationTitle = "活动结束";
						this.times = "已成交";
						this.newCurrent = "成交价";
						this.newCurrentBidder = "中拍人";
						// 判断是否当前用户，如果是当前用户，则需要弹出收货地址和订单信息处理界面
						if (this.UserID === msg.WinsBill.bill.UserID) {
							vibrateLong(); // 长震动
							// 当前用户
							showToast("恭喜，您已中拍！点击确定去填写订单信息吧！");
							// 隐藏其它按钮
							this.buttonStateChanged &&
								this.buttonStateChanged("报名", "0", false, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("举牌", "2", false, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("托管", "1", false, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("参与下一期", "4", false, false);
							// 触发填写地址按钮的显示，其它按钮隐藏
							this.buttonStateChanged &&
								this.buttonStateChanged("填写收货地址", "3", true, true);
							this.orderID = msg.WinsOrder.OrderID;
						} else {
							// 隐藏掉其它按钮
							this.buttonStateChanged &&
								this.buttonStateChanged("报名", "0", false, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("举牌", "1", false, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("托管", "2", false, false);
							this.buttonStateChanged &&
								this.buttonStateChanged("填写收货地址", "3", false, false);
							// 触发下一期按钮的显示，其它按钮隐藏
							this.buttonStateChanged &&
								this.buttonStateChanged("参与下一期", "4", true, true);
						}
						break;
					case 12:
						// 解除托管
						break;
					case 13:
						// 活动流拍通知
						this.timerDurationTitle = "活动流拍";
						// 隐藏掉其它按钮
						this.buttonStateChanged &&
							this.buttonStateChanged("报名", "0", false, false);
						this.buttonStateChanged &&
							this.buttonStateChanged("举牌", "1", false, false);
						this.buttonStateChanged &&
							this.buttonStateChanged("托管", "2", false, false);
						this.buttonStateChanged &&
							this.buttonStateChanged("填写收货地址", "3", false, false);
						// 触发下一期按钮的显示，其它按钮隐藏
						this.buttonStateChanged &&
							this.buttonStateChanged("参与下一期", "4", true, true);
						break;
				}
			} catch (e) {
				console.error("处理消息出错：" + e);
			}
		},

		// 定义按钮处理函数
		buttonStateChanged(text: any, type: any, isDisplay: any, isEnabled: any) {
			this.buttonsList = JSON.parse(JSON.stringify(this.buttonsList));
			this.buttonsList.map((item: any, i: any, value: any) => {
				value[type].ButtonText = text;
				value[type].ButtonVisibility = isDisplay;
				value[type].ButtonEnabled = isEnabled;
			});
			this.buttonsEvent(this.buttonsList);
		},

		// 处理按列表事件
		buttonsEvent(event: any) {
			this.buttonsList = JSON.parse(JSON.stringify(event));
		},

		// 当前活动状态
		productStatus(event: any) {
			// Status:0表示等待开团，1表示即将成团，2表示准备倒计时，3表示正在竟拍，4表示成功完成（活动结束），5表示活动流拍
			switch (event) {
				case 0:
					this.seqBillsShow = false;
					break;
				case 1:
					this.seqBillsShow = false;
					break;
				case 2:
					this.seqBillsShow = true;
					break;
				case 3:
					this.seqBillsShow = true;
					break;
				case 4:
					this.seqBillsShow = false;
					break;
				case 5:
					this.seqBillsShow = false;
					break;
			}
		},

		// 更新全局报名信息
		onUpdateAllSignups(curr: string, max: string) {
			this.currSignups = `总已报名份数：${curr}份`;
			this.maxSignups = `总需报名份数：${max}份`;
		},

		// 更新我的报名信息
		onUpdateMySignups(curr: string, seq: string) {
			this.signups = `我已报名份数：${curr}份`;
			this.seqSignups = `还可报名份数：${seq}份`;
		},

		// 更新我的举牌信息
		onUpdateMyBills(mybills: string, seqbills: string) {
			this.myBills = `我的举牌次数：${mybills}次`;
			this.seqBills = `剩余可用次数：${seqbills}次`;
			this.myBills = mybills;
			this.SeqBills = seqbills;
		},

		// 更新价格事件
		onPriceUpdateEvent(startPrice: any, allBills: any, lastBills: any) {
			// 更新全部举牌次数、我的举牌次数、和最新价格
			if (lastBills.length > 0) {
				console.log("oneBills", lastBills);
				// 有人出价，按最后出价人
				this.newBill = lastBills[0].bill;
				this.newFace = lastBills[0].face;
				this.newNick = `领先人：${decodeURIComponent(lastBills[0].nick)}`;
				this.newCity = `${lastBills[0].bill.Province}`;
				this.newPrice = `￥${lastBills[0].bill.Price}`;
				let active: any = this.active;
				if (active.ActiveStatus === 4) {
					this.newCurrent = "本期成交";
					this.newCurrentBidder = "本期成交人";
				} else {
					this.newCurrent = "当前出价";
					this.newCurrentBidder = "当前领先出价人";
				}
			} else {
				// 未有人出价，按起拍价
				this.newBill = "";
				this.newFace = "";
				this.newNick = "";
				this.newCity = "";
				this.newCurrentBidder = "";
				this.newPrice = `￥${startPrice}`;
				this.newCurrent = "起拍价";
			}
			this.allBills = allBills; // '活动总举牌次数：' + allBills + '次'
			// 更新最近出局人信息
			this.lastBills = lastBills.slice(1, 3);
			this.lastBills.map((item: any) => {
				item.nick = decodeURIComponent(item.nick);
			});
		},
		formSubmit(e: any) {
			console.log("formId", e);
			let formId = e.detail.formId;
			let OpenID = this.$store.state.openid;
			let data = {
				FormID: formId,
				OpenID: OpenID
			};
			request(AddUserFormID, data).then((res: any) => {
				console.log(res);
			});
		},
		async billTap(type: any) {
			let action = type;
			let ActiveID = this.activeID;
			let num = this.num;
			let Price = this.Price;
			let GUID: any = await this.GUID();
			let msgTime = formatTime(new Date());
			console.log("switch", type);
			if (type === "已报名") {
				action = "报名";
			}
			switch (action) {
				case "报名":
					let SignupMsg = {
						ActiveID: ActiveID,
						Shares: num,
						msgID: GUID,
						msgType: 1,
						msgTime: msgTime
					};
					this.sendSocketMessage(SignupMsg);
					this.show = !this.show;
					break;
				case "举牌":
					let billMsg = {
						ActiveID: ActiveID,
						Price: Price,
						msgID: GUID,
						msgType: 2,
						msgTime: msgTime
					};
					this.sendSocketMessage(billMsg);
					break;
				case "托管":
					let tapMsg = {
						ActiveID: ActiveID,
						msgID: GUID,
						msgType: 4,
						msgTime: msgTime
					};
					this.sendSocketMessage(tapMsg);
					break;
				case "取消托管":
					let cancelTapMsg = {
						ActiveID: ActiveID,
						msgID: GUID,
						msgType: 5,
						msgTime: msgTime
					};
					this.sendSocketMessage(cancelTapMsg);
					break;
				case "填写收货地址":
					let disabled = true;
					let productID = this.productID;
					let OrderID = this.orderID;
					navigateTo(
						"/pages/ucenter/addressShipping/addressShipping?disabled=" +
							disabled +
							"&productID=" +
							productID +
							"&orderID=" +
							OrderID
					);
					break;
				case "参与下一期":
					let nexActive: any = await this.getNextActive();
					this.activities(nexActive);
					uni.closeSocket();
					this.websocket();
					break;
			}
		},
		// 倒计时
		timerState(time: any) {
			if (time === null) {
				clearInterval(this.timer);
				return;
			}
			if (!(time instanceof Date)) {
				console.error("传入日期时间格式不正确！");
				return;
			}
			if (time.getTime() < new Date().getTime()) {
				// 时间错误，时间必须是未来的日期时间
				console.error("设置倒计时器无效，日期时间必须是未来的时间！");
				return;
			}
			// 清除旧的倒计时器
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.seqDisplay(time);
			}, 100);
		},
		// 下面处理倒计时的显示，实际上时间是由服务器webSocket返回的
		seqDisplay(time: any) {
			let date: any = new Date();
			let between: any = time - date;
			let sec: any = Math.floor(between / 1000);
			let hours: any = Math.floor(Math.floor(sec / 60) / 60) % 24;
			let days: any =
				Math.floor(Math.floor(Math.floor(sec / 60) / 60) / 24) % 30;
			let minutes: any = Math.floor(sec / 60) % 60;
			let seconds: any = sec % 60;
			let minisec: any = Math.floor(between / 100) % 10;
			if (seconds < 0) {
				this.times = "";
			} else {
				if (hours < 10) {
					hours = "0" + hours;
				}
				if (minutes < 10) {
					minutes = "0" + minutes;
				}
				if (seconds < 10) {
					seconds = "0" + seconds;
				}
				hours = +hours + days * 24;
				let times = hours + ":" + minutes + ":" + seconds + "." + minisec;
				this.times = times;
			}
		},
		// 下面是生成随机GUID的函数
		GUID() {
			return new Promise((resolve, reject) => {
				let guid = "";
				for (let i = 1; i <= 32; i++) {
					let n = Math.floor(Math.random() * 16.0).toString(16);
					guid += n;
					if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
				}
				resolve(guid);
			});
		}
	}
});
</script>

<style>
.i-label {
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: #b25a01;
	background-color: rgba(254, 127, 0, 0.3);
	height: 70upx;
}

.i-point {
	width: 10upx;
	height: 10upx;
	background-color: rgba(254, 127, 0, 0.2);
	border-radius: 50%;
}

.swiper-box {
	height: 440upx;
}

.active-no {
	color: #4d4d4d;
	font-weight: 600;
	margin-right: 10upx;
}

.i-label-item {
	display: flex;
	justify-content: center;
	align-items: center;
}

.i-label-item-text {
	margin: 0 10upx;
}

.i-product-head {
	padding: 20upx 30upx 4upx 30upx;
}

.i-product-title {
	font-size: 32upx;
	color: #4d4d4d;
	line-height: 1.2;
}

.i-product-price {
	margin: 0 30upx;
	line-height: 1.8;
}

.i-product-price-text {
	font-size: 36upx;
	color: #7a7a7a;
	text-decoration: line-through;
}

.i-product-current-bid {
	margin: 20upx 30upx;
	text-align: center;
}

.i-product-current-bid-head {
	font-size: 30upx;
	font-weight: 500;
	color: #414141;
}

.i-product-current-bid-price {
	font-size: 56upx;
	font-weight: 600;
	color: #fe7f00;
}

.i-product-current-bid-icon {
	position: relative;
}

.i-product-current-bid-icon image {
	width: 100%;
	height: 140upx;
}

.i-product-current-bid-icon text {
	position: absolute;
	top: 14upx;
	left: 0;
	right: 0;
	font-size: 38upx;
	font-weight: 600;
	color: #fffefe;
}

.i-product-current-bid-user image {
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
}

.i-product-current-bid-name {
	text-align: center;
	font-size: 30upx;
	font-weight: 600;
	color: #fe7f00;
}

.i-product-current-bid-address {
	font-size: 28upx;
	font-weight: 600;
	color: #848484;
}

.i-product-last-transaction-flex {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.i-product-last-transaction {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 30upx;
}

.i-product-status {
	font-size: 28upx;
	text-align: center;
	color: #fe7f00;
	border-radius: 100upx;
	border: 2upx solid #fe7f00;
	padding: 0 30upx;
}

.i-product-last-transaction-content {
	display: flex;
	align-items: flex-end;
	margin-left: 35upx;
}

.i-product-last-transaction-text {
	font-size: 28upx;
	margin-right: 8upx;
	color: #000000;
}

.i-product-last-transaction-price {
	font-size: 48upx;
	line-height: 1.2;
	color: #fe7f00;
	font-weight: 600;
}

.i-product-distance-shooting {
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 80upx;
	border-radius: 100upx;
	text-align: center;
	margin: 20upx 30upx;
	padding: 0 30upx;
}

.i-shooting {
	border: 2upx solid #4d4d4d;
}

.i-active-shooting {
	border: 2upx solid #fe7f00;
}

.i-shooting .i-product-distance-shooting-text {
	font-size: 42upx;
	font-weight: 600;
	color: #4d4d4d;
}

.i-active-shooting .i-product-distance-shooting-text {
	font-size: 30upx;
	color: #4d4d4d;
}

.i-product-distance-shooting-text {
	padding: 0 20upx;
}

.i-product-line {
	width: 2upx;
	height: 60upx;
	background-color: #717171;
}

.i-product-distance-shooting-time {
	font-size: 58upx;
	line-height: 88upx;
	font-weight: 600;
	color: #fe7f00;
}

.i-product-distance-shooting-end {
	text-align: center;
	margin: 10upx 30upx;
	padding: 0 30upx;
	border: 2upx solid #717171;
	border-radius: 100upx;
}

.i-product-distance-shooting-time-end {
	font-size: 58upx;
	line-height: 88upx;
	font-weight: 600;
	color: #010101;
}

.i-product-table {
	display: table;
	width: calc(100% - 30px);
	border-collapse: collapse;
	box-sizing: border-box;
	margin: 30upx 30upx;
}

.i-product-tab {
	border-top: 2upx solid #f4f4f4;
	border-bottom: 2upx solid #f4f4f4;
}

.i-product-tab-item {
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 100upx;
}

.i-active {
	color: #fe7f00;
}

.i-product-join {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 10;
	margin: 0;
	background-color: #fff;
	border-top: 2upx solid #f4f4f4;
}

.i-placard-form {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.i-placard-end {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.i-placard-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.join-btn {
	width: 100%;
	color: #fff;
	background: linear-gradient(180deg, #f98b1b, #f76102);
}

.i-placard-remaining-num {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 30upx;
}

.i-placard-remaining {
	font-size: 28upx;
	color: #5c5c5c;
}

.i-placard-num {
	font-size: 48upx;
	color: #fe7c13;
	font-weight: 600;
}

.i-bill {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120upx;
	font-size: 32upx;
	line-height: 120upx;
	border-bottom: 2upx solid #f4f4f4;
	padding: 0 30upx;
}

.i-bill-out {
	color: #30a900;
}

.i-bill-pre {
	color: #fe7f00;
}

.i-active {
	color: #fe7f00;
}

.i-bill-image {
	min-width: 260upx;
}

.i-bill-image image {
	width: 84upx;
	height: 84upx;
	border-radius: 50%;
}

.i-bill-user {
	width: 200upx;
	margin-left: 20upx;
}

.i-bill-province {
	width: 160upx;
	text-align: center;
}

.i-product-all-bill {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2upx solid #f4f4f4;
}

.i-list-line {
	height: 24upx;
	background-color: #f4f4f4;
}

.i-list-cell-navigate {
	font-size: 30upx;
	padding: 22upx 30upx;
	line-height: 48upx;
	position: relative;
	display: flex;
	box-sizing: border-box;
	width: 100%;
	flex: 1;
	justify-content: space-between;
	align-items: center;
}

.i-product-all-bill-text {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.i-product-all-bill-records {
	font-size: 28upx;
	color: #474747;
}

.i-product-all-bill-length {
	font-size: 28upx;
}

.i-product-all-bill-text-item {
	color: #fe7f00;
	margin-left: 20upx;
	margin-right: 10upx;
}

.i-placard-button {
	height: 90upx;
	font-size: 30upx;
}

.i-placard-button button {
	color: #fe7c13;
	background-color: #fff;
	border-left: 2upx solid #f4f4f4;
}

.i-placard-active {
	color: #fff;
	background-color: #fe7c13;
	border-left: 2upx solid #f4f4f4;
}

.btn {
	font-size: 44upx;
	height: 106upx;
	line-height: 98upx;
	border-radius: 0;
	margin: 0;
	padding: 0 40upx;
}

.btn:after {
	border: none;
	border-radius: 0;
}

button[disabled]:not([type]),
button[disabled][type="default"] {
	color: #fff;
	background-color: #c0c0c0;
}
</style>
