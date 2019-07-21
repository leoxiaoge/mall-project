<template>
	<view class="container">
		<!-- 轮播 -->
		<view class="i-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper
						class="swiper-box"
						:indicator-dots="indicatorDots"
						:autoplay="autoplay"
						:interval="interval"
						:duration="duration"
						:circular="circular"
						:indicator-active-color="indicatorActiveColor"
					>
						<swiper-item v-for="(item, index) in swiper" :key="index">
							<image :src="item" mode="aspectFill" />
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
			<view class="i-product-title">{{product.ProductTitle}}</view>
			<view class="i-product-name">{{product.ProductName}}</view>
		</view>
		<view v-if="msgType === 2">
			<view class="i-product-last-transaction">
				<view class="i-product-status">手动举牌</view>
				<view class="i-product-last-transaction-content">
					<view class="i-product-last-transaction-text">上期成交：</view>
					<view class="i-product-last-transaction-price">¥{{lastPrice}}</view>
				</view>
			</view>
		</view>
		<view class="i-product-distance-shooting">
			<view class="i-product-distance-shooting-text">{{timerDurationTitle}}</view>
			<view class="i-product-line" v-if="times"></view>
			<view class="i-product-distance-shooting-time">{{times}}</view>
		</view>
		<view class="i-product-current-bid">
			<view class="i-product-current-bid-head">当前出价</view>
			<view class="i-product-current-bid-price">{{newPrice}}</view>
			<view class="i-product-current-bid-icon">
				<img :src="leading" />
				<text>当前领先出价人</text>
			</view>
			<view class="i-product-current-bid-user">
				<img :src="newFace" />
				<view class="i-product-current-bid-name">{{newNick}}</view>
				<view class="i-product-current-bid-address">{{newCity}}</view>
			</view>
		</view>
		<view class="i-product-bill">
			<view
				class="i-bill"
				:class="(item.IsWin === 0?'':'i-active')"
				v-for="(item, index) in lastbills"
				:key="index"
			>
				<view class="i-bill-image i-flex">
					<image :src="item.UserNick" />
					<view class="i-bill-user">{{item.UserMobile}}</view>
				</view>
				<view class="i-bill-IsWin i-bill-out" v-if="item.IsWin === 0">出局{{item.bill.Province}}</view>
				<view class="i-bill-IsWin i-bill-pre" v-else>预选</view>
				<view class="i-bill-province">{{item.Province}}{{item.City}}</view>
				<view class="i-bill-price">{{item.Price}}</view>
			</view>
		</view>
		<view class="i-product-all-bill uni-list-cell-navigate uni-navigate-right" @click="activePath">
			<view class="i-product-all-bill-text">
				<view class="i-product-all-bill-records">全部出价记录</view>
				<view class="i-product-all-bill-length">
					<text class="i-product-all-bill-text-item">{{allBills}}</text>
					<text class="i-product-all-bill-text-total">条</text>
				</view>
			</view>
		</view>
		<view class="i-product-all-bill uni-list-cell-navigate uni-navigate-right" @click="activePath">
			<view class="i-product-all-bill-text">
				<view class="i-product-all-bill-records">我的出价记录</view>
				<view class="i-product-all-bill-length">
					<text class="i-product-all-bill-text-item">{{mySeqBills}}</text>
					<text class="i-product-all-bill-text-total">条</text>
				</view>
			</view>
		</view>
		<view class="i-product-table">
			<view class="i-product-table-tr">
				<view class="i-product-table-td">
					<view class="i-product-table-content">
						<img :src="src" />
						<view class="i-product-table-text">
							<text class="i-product-table-text-content">起拍价</text>
							<text class="i-product-table-text-content-item">¥0.00</text>
						</view>
					</view>
				</view>
				<view class="i-product-table-td">
					<view class="i-product-table-content">
						<img :src="src" />
						<view class="i-product-table-text">
							<text class="i-product-table-text-content">加价幅度</text>
							<text class="i-product-table-text-content-item">¥0.01</text>
						</view>
					</view>
				</view>
			</view>
			<view class="i-product-table-tr">
				<view class="i-product-table-td">
					<view class="i-product-table-content">
						<img :src="src" />
						<view class="i-product-table-text">
							<text class="i-product-table-text-content">举牌次数</text>
							<text class="i-product-table-text-content-item">5次/份</text>
						</view>
					</view>
				</view>
				<view class="i-product-table-td">
					<view class="i-product-table-content">
						<img :src="src" />
						<view class="i-product-table-text">
							<text class="i-product-table-text-content">落拍倒计时</text>
							<text class="i-product-table-text-content-item">10s</text>
						</view>
					</view>
				</view>
			</view>
			<view class="i-product-table-tr">
				<view class="i-product-table-td">
					<view class="i-product-table-content">
						<img :src="src" />
						<view class="i-product-table-text">
							<text class="i-product-table-text-content">可买份数</text>
							<text class="i-product-table-text-content-item">5份</text>
						</view>
					</view>
				</view>
				<view class="i-product-table-td">
					<view class="i-product-table-content">
						<img :src="src" />
						<view class="i-product-table-text">
							<text class="i-product-table-text-content">所需费用</text>
							<text class="i-product-table-text-content-item">3张</text>
						</view>
					</view>
				</view>
			</view>
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
				<view v-if="tabIndex === 0">
					<i-past :options="pastList" />
				</view>
				<view v-else-if="tabIndex === 1">
					<i-show :options="showList" />
				</view>
				<view v-else>
					<i-rule :options="ruleList" />
				</view>
			</view>
		</view>
		<view class="kong"></view>
		<view class="i-product-join">
			<view class="i-product-button-list">
				<block v-for="(item, index) in buttonsList" :key="index">
					<block v-if="item.ButtonType === 0 && item.ButtonVisibility">
						<button class="btn join-btn" v-show="!show" @click.stop.prevent="hidePopup">立即参与</button>
						<i-popup
							:disabled="item.ButtonEnabled"
							:show="show"
							:num="SeqBills"
							@change="change"
							@hidePopup="hidePopup"
							@click.stop.prevent="billTap(item.ButtonText)"
						/>
					</block>
					<block v-if="item.ButtonType === 1 && item.ButtonVisibility">
						<view class="i-product-placad">
							<view class="i-placard-remaining-num">
								<view class="i-placard-remaining">剩余次数：</view>
								<view class="i-placard-num">{{SeqBills}}</view>
							</view>
							<view class="i-placard-button-view">
								<view class="i-placard-button">
									<button
										class="btn"
										:disabled="!item.ButtonEnabled"
										@click.stop.prevent="billTap(item.ButtonText)"
									>{{item.ButtonText}}</button>
								</view>
							</view>
						</view>
					</block>
					<block v-if="item.ButtonType === 2 && item.ButtonVisibility">
						<view class="i-placard-button i-placard-active">
							<button
								class="btn"
								:disabled="!item.ButtonEnabled"
								@click.stop.prevent="billTap(item.ButtonText)"
							>{{item.ButtonText}}</button>
						</view>
					</block>
					<block v-if="item.ButtonType === 3 && item.ButtonVisibility">
						<button
							class="btn join-btn"
							:disabled="!item.ButtonEnabled"
							@click.stop.prevent="billTap(item.ButtonText)"
						>{{item.ButtonText}}</button>
					</block>
					<block v-if="item.ButtonType === 4 && item.ButtonVisibility">
						<button
							class="btn join-btn"
							:disabled="!item.ButtonEnabled"
							@click.stop.prevent="billTap(item.ButtonText)"
						>{{item.ButtonText}}</button>
					</block>
				</block>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	formatTime,
	showToast,
	showModal
} from "@/common/utils/util";
import {
	ProductGet,
	PastTransactionsListGet,
	OrderDryingListGet,
	GetActiveByID
} from "@/common/config/api";
import iPast from "@/components/i-past/i-past.vue";
import iShow from "@/components/i-show/i-show.vue";
import iRule from "@/components/i-rule/i-rule.vue";
import iPopup from "@/components/i-popup/i-popup.vue";
let socketOpen: boolean = false;
let socketMsgQueue: any = [];
export default Vue.extend({
	components: {
		iPast,
		iShow,
		iRule,
		iPopup
	},
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 500,
			circular: true,
			indicatorActiveColor: "#fe7f00",
			disabled: false, // 按钮disabled

			swiper: [],
			title: "服务",
			id: "",
			product: "",
			num: "1", // 剩余次数

			activeDetail: "", // 活动详情
			lastPrice: "",

			tabIndex: 0, // 默认往期成交
			pastList: [], // 往期成交列表
			showList: [], // 晒单列表
			ruleList: "", // 竞拍规则
			show: false, // 显示弹窗

			label: ["零风险", "正品承诺", "极速发货", "公平公正"],
			tab: ["往期成交", "分享晒单", "竞拍规则"],
			src: "/static/icon_experience.png",
			leading: "/static/icon/icon_leading.png",

			ActiveID: "",
			Price: "",
			msgID: "",
			msgType: "",
			timer: 0,
			buttonsList: [], // 按钮类型，0表示报名按钮、1表示举牌按钮、2表示托管按钮、3表示填写地址按钮，4表示参与下一期按钮
			price: "", // 最新价格
			allBills: "", // 全部举牌次数
			lastBills: [], // 出价列表
			timerDurationTitle: "", // 状态对应要显示的标题
			onTimerStatus: "", // 活动通知
			OnTimerDowns: "", // 成交通知

			seq: "", // 更新我的剩余举牌次数
			MyBills: "", // 举牌响应消息（包含我的举牌次数、剩余可用次数）
			SeqBills: "", // 举牌响应消息（剩余可用次数）
			Signups: "", // 报名份数
			SeqSignups: "", // 剩下报名份数
			mySeqBills: "", // 我的出价记录
			UserID: "", // 登录成功，提示用户
			tapbtn: "", // 托管
			BillStat: "", // 总举牌次数
			newPrice: "", // 领先价格
			newBill: "", // 领先人全部信息
			newNick: "", // 当前领先人
			newFace: "", // 当前领先人头像
			newCity: "", // 当前领先人所在城市
			lastbills: [], // 出局列表
			times: "", // 倒计时
			seqTime: new Date() // 初始Date时间
		};
	},
	onLoad(options: any) {
		this.id = options.id;
    this.ActiveID = options.id;
    this.websocket();
	},
	onShow() {
		this.UserID = uni.getStorageSync("SessionKey").ID;
		this.getProduct();
		this.getActiveByID();
		this.getPastTransactionsList();
		this.getOrderDryingList();
	},
	methods: {
		// 获取产品详情
		getProduct() {
			let ProductID = this.id;
			let data = {
				ProductID: ProductID
			};
			request(ProductGet, data).then((res: any) => {
				console.log("Product", res);
				this.product = res.Product;
				this.swiper = res.Product.ProductPicList;
				this.Price = res.Product.ProductPrice;
			});
		},
		// 获取活动详情
		getActiveByID() {
			let ActiveID = this.ActiveID;
			let data = {
				ActiveID: ActiveID
			};
			request(GetActiveByID, data).then((res: any) => {
				console.log("活动详情", res);
				this.activeDetail = res.ActiveDetail;
			});
		},
		// 选项卡
		tabClick(index: number) {
			this.tabIndex = index;
		},
		// 往期成交列表
		getPastTransactionsList() {
			let ProductID = this.id;
			let data = {
				ProductID: ProductID
			};
			request(PastTransactionsListGet, data).then((res: any) => {
				console.log(res);
				let pastList = res.OrderList;
				pastList.map((item: any) => {
					item.percentage = (
						(item.OrderMoneys / item.OrderPrimeCost) *
						100
					).toFixed(2);
				});
				this.pastList = pastList;
			});
		},
		change(val: any) {
			console.log(val);
			this.num = val;
		},
		hidePopup() {
			this.show = !this.show;
		},
		// 获取用户晒单列表
		getOrderDryingList() {
			let ProductID = this.id;
			let data = {
				ProductID: ProductID
			};
			request(OrderDryingListGet, data).then((res: any) => {
				this.showList = res.OrderList;
			});
		},
		activePath() {
			let id = this.id;
			navigateTo("../activeBilList/activeBilList?id=" + id);
		},
		productDetailsUparsePath() {
			let id = this.id;
			navigateTo("../productDetailsUparse/productDetailsUparse?id=" + id);
		},
		websocket() {
			uni.connectSocket({
				url: "wss://websocket.tengpaisc.com:8888/"
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
			});
			uni.onSocketError(res => {
				console.log("WebSocket连接打开失败，请检查！");
			});
			this.onSocketMessage();
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
			return new Promise((sesolve, reject) => {
				uni.onSocketMessage((res: any) => {
					console.log("收到服务器内容：" + res.data);
					let msg = JSON.parse(res.data);
					console.log(msg);
					this.proccessMsg();
					sesolve(msg);
				});
			});
		},
		// 向服务器发送登录请求
		async reqLogin() {
			let GUID: any = await this.GUID();
			const Appkey = "3957399";
			const SessionKey = uni.getStorageSync("SessionKey");
			let ActiveID = this.ActiveID;
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
			let ActiveID = this.ActiveID;
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
		// 处理消息的函数，用于解析从服务器webSocket收到的各种消息
		async proccessMsg() {
			let GUID: any = await this.GUID();
			let dt = new Date();
			let msgTime = formatTime(new Date());
			let msg: any = await this.onSocketMessage();
			let msgType = msg.msgType;
			this.msgType = msgType;
			console.log(msgType);
			try {
				switch (msgType) {
					case 0:
						// 订阅响应消息
						if (msg.IsError) {
							showToast("订阅失败：" + msg.ErrMsg);
						} else {
							showToast(msg.ErrMsg);
						}
						break;
					case 1:
						// 报名响应消息
						if (msg.IsError) {
							showToast("报名失败：" + msg.ErrMsg);
						} else {
							this.buttonStateChanged("报名", "0", true, true);
							showToast(msg.ErrMsg);
						}
						// 更新我的剩余举牌次数
						this.seq = `剩余举牌次数：${msg.SeqBills}次，已报名份数：${msg.Signups}份，还可报名：${msg.SeqSignups}`;
						this.SeqBills = msg.SeqBills;
						this.Signups = msg.Signups;
						this.SeqSignups = msg.SeqSignups;
						break;
					case 2:
						// 举牌响应消息（包含我的举牌次数、剩余可用次数）
						if (msg.IsError) {
							showToast(msg.ErrMsg);
						} else {
							this.MyBills = msg.MyBills;
							this.SeqBills = msg.SeqBills;
							showToast(msg.ErrMsg);
						}
						this.buttonStateChanged("举牌", "1", true, true);
						this.timerState(null);
						break;
					case 3:
						// 登录响应消息
						if (msg.IsError) {
							showToast("登录失败：" + msg.ErrMsg);
						} else {
							// 登录成功，提示用户
							this.UserID = msg.UserID;
							let initMsg = {
								ActiveID: this.ActiveID,
								UserID: this.UserID,
								msgID: GUID,
								msgType: 6,
								msgTime: msgTime
							};
							this.sendSocketMessage(initMsg);
						}
						break;
					case 4:
						// 托管响应
						if (msg.IsError) {
							this.buttonStateChanged("托管", "2", true, true);
							showToast("托管失败!" + msg.ErrMsg);
						} else {
							this.buttonStateChanged("取消托管", "2", true, true);
						}
						break;
					case 5:
						// 取消托管响应消息
						if (msg.IsError) {
							this.buttonStateChanged("取消托管", "2", true, true);
							showToast("取消托管失败!");
						} else {
							this.buttonStateChanged("托管", "2", true, true);
						}
						break;
					case 6:
						// 活动详情页初始化响应
						this.timerDurationTitle = msg.TimerDurationTitle; // 状态对应要显示的标题
						// 倒计时显示文本
						// 判断是否需要倒计时，如果不需要则清除倒计时器
						if (msg.TimerDurationValue === 0) {
							this.timerState(null);
						} else {
							let tm = dt.getTime() + msg.TimerDurationValue;
							this.seqTime.setTime(tm);
							this.timerState(this.seqTime);
						}
						// 处理按钮的初始状态列表
						this.buttonsList = msg.ButtonsList;
						// 更新最近出价人列表信息，更新全部举牌次数、我的举牌次数、和最新价格
						this.onPriceUpdateEvent(msg.Price, msg.AllBills, msg.LastBills);
						break;
					case 7:
						// 报名进度更新推送
						// 隐藏其它按钮
						this.buttonStateChanged("参与下一期", "4", false, false);
						this.buttonStateChanged("填写收货地址", "3", false, false);
						if (msg.AllSignups === msg.MaxSignups) {
							this.buttonStateChanged("举牌", "1", true, true);
							this.buttonStateChanged("托管", "2", true, true);
							// 已满员，隐藏掉报名按钮
							this.buttonStateChanged("报名", "0", false, false);
						} else {
							this.buttonStateChanged("举牌", "1", false, false);
							this.buttonStateChanged("托管", "2", false, false);
							// 还需要继续报名，显示报名按钮
							this.buttonStateChanged("报名", "3", true, true);
						}
						break;
					case 8:
						// 价格更新通知
						showToast("价格已更新......！");
						// 更新全部举牌次数、我的举牌次数、和最新价格
						this.BillStat = "总举牌次数：" + msg.AllBills + "次";
						// 更新最后出价人信息
						if (msg.Bills.length > 0) {
							this.newPrice = `￥${msg.Bills[0].Price}`;
							this.newBill = msg.Bills[0].bill;
							this.newFace = msg.Bills[0].bill.face;
							this.newNick = `领先人：${msg.Bills[0].nick}`;
							// 计算剩余时长
							let dt = new Date();
							let tm = dt.getTime() + msg.SeqMiniSecounds;
							this.seqTime.setTime(tm);
						}
						// 更新最近出局人信息
						if (msg.Bills.length > 1) {
							this.lastbills = msg.Bills;
						}
						// 判断是否需要启动计时器，如果只有一个出价，肯定就是需要启动的，因为计时器未启动
						if (msg.Bills.length === 1) {
							this.timerState(this.seqTime);
						}
						break;
					case 9:
						//计算剩余时间，并重置剩余时间
						let dt_time = dt.getTime();
						this.seqTime.setTime(dt_time + msg.SeqMiniSecounds);
						console.log(this.seqTime);
						// 设置倒计时标题为即将开拍
						this.timerDurationTitle = "开拍准备";
						// 隐藏掉报名按钮
						this.buttonStateChanged("报名", "0", false, false);
						// 禁用举牌、托管按钮
						this.buttonStateChanged("托管", "1", true, false);
						this.buttonStateChanged("自动举牌中", "2", true, false);
						// 隐藏其它按钮
						this.buttonStateChanged("填写收货地址", "3", false, false);
						this.buttonStateChanged("参与下一期", "4", false, false);
						break;
					case 10:
						// 活动正式开始，但是目前尚未有人出价，所以收到此消息，先停止计时器，并显示为 “等待先手”
						this.times = "等待首牌";
						// 清除计时器
						this.timerState(null);
						// 设置价格
						this.newPrice = "￥" + msg.currPrice;
						// 判断活动类型，如果是人工举牌，显示托管、举牌；如果是自动举牌，举牌按钮更改为“自动举牌中”，其它按钮全部隐藏
						if (msg.ActiveType === 0) {
							// 停用其它按钮，仅剩下举牌按钮，且举牌按钮状态显示为自动举牌中
							this.buttonStateChanged("自动举牌中", "1", true, false);
							this.buttonStateChanged("托管", "2", true, false);
						} else {
							// 启用举牌、托管按钮
							this.buttonStateChanged("举牌", "1", true, true);
							this.buttonStateChanged("托管", "2", true, true);
						}
						// 隐藏掉报名、填写地址、参与下一期按钮
						this.buttonStateChanged("报名", "0", false, false);
						this.buttonStateChanged("填写收货地址", "3", false, false);
						this.buttonStateChanged("参与下一期", "4", false, false);
						break;
					case 11:
						// 活动结束通知
						this.timerState(null);
						this.times = "已成交";
						// 判断是否当前用户，如果是当前用户，则需要弹出收货地址和订单信息处理界面
						if (this.UserID === msg.WinsBill.UserID) {
							// 当前用户
							showToast("恭喜，您已中拍！点击确定去填写订单信息吧！");
							// 隐藏其它按钮
							this.buttonStateChanged("报名", "0", false, false);
							this.buttonStateChanged("举牌", "1", false, false);
							this.buttonStateChanged("托管", "2", false, false);
							this.buttonStateChanged("参与下一期", "4", false, false);
							// 触发填写地址按钮的显示，其它按钮隐藏
							this.buttonStateChanged("填写收货地址", "3", true, true);
						} else {
							// 隐藏掉其它按钮
							this.buttonStateChanged("报名", "0", false, false);
							this.buttonStateChanged("举牌", "1", false, false);
							this.buttonStateChanged("托管", "2", false, false);
							this.buttonStateChanged("填写收货地址", "3", false, false);
							// 触发下一期按钮的显示，其它按钮隐藏
							this.buttonStateChanged("参与下一期", "4", true, true);
						}
						break;
					case 12:
						// 活动流拍通知
						this.onTimerStatus = "活动流拍";
						this.OnTimerDowns = "-";
						// 隐藏掉其它按钮
						this.buttonStateChanged("报名", "0", false, false);
						this.buttonStateChanged("举牌", "1", false, false);
						this.buttonStateChanged("托管", "2", false, false);
						this.buttonStateChanged("填写收货地址", "3", false, false);
						// 触发下一期按钮的显示，其它按钮隐藏
						this.buttonStateChanged("参与下一期", "4", true, true);
						break;
				}
			} catch (e) {
				console.error("处理消息出错：");
				console.error(e);
			}
		},

		// 定义按钮处理函数
		buttonStateChanged(text: any, type: any, isDisplay: any, isEnabled: any) {
			this.buttonsList.map((item: any, i: any, value: any) => {
				value[type].ButtonText = text;
				value[type].ButtonVisibility = isDisplay;
				value[type].ButtonEnabled = isEnabled;
			});
		},

		// 更新价格事件
		onPriceUpdateEvent(startPrice: any, allBills: any, lastBills: any) {
			// 更新全部举牌次数、我的举牌次数、和最新价格
			this.allBills = allBills; // '活动总举牌次数：' + allBills + '次'
			if (lastBills.length > 0) {
				// 有人出价，按最后出价人
				this.newPrice = `￥${lastBills[0].bill.Price}`;
				this.newBill = lastBills[0].bill;
				this.newFace = lastBills[0].face;
				this.newNick = `领先人：${lastBills[0].nick}`;
				this.newCity = `${lastBills[0].bill.Province} ${lastBills[0].bill.City}`;
			} else {
				// 未有人出价，按起拍价
				this.newPrice = `￥${startPrice}`;
			}
			// 更新最近出局人信息
			if (lastBills.length > 1) {
				this.lastBills = lastBills;
			}
		},
		async billTap(type: any) {
			let action = type;
			let ActiveID = this.ActiveID;
			let num = this.num;
			let Price = this.Price;
			let GUID: any = await this.GUID();
			let msgTime = formatTime(new Date());
			console.log("switch", type);
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
			}
		},
		// 下面处理倒计时的显示，实际上时间是由服务器webSocket返回的
		seqDisplay() {
			let seqTime: any = this.seqTime;
			let date: any = new Date();
			let between: number = seqTime - date;
			let sec: number = Math.floor(between / 1000);
			let hours: any = Math.floor(Math.floor(sec / 60) / 60) % 24;
			let days = Math.floor(Math.floor(Math.floor(sec / 60) / 60) / 24) % 30;
			let minutes: any = Math.floor(sec / 60) % 60;
			let seconds: any = sec % 60;
			let minisec: number = Math.floor(between / 100) % 10;
			if (seconds <= 0) {
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
				let times =
					(days > 0 ? days + "天" : "") +
					hours +
					":" +
					minutes +
					":" +
					seconds +
					"." +
					minisec;
				this.times = times;
			}
		},
		// 倒计时
		timerState(type: any) {
			if (type === null) {
				clearInterval(this.timer);
				return;
			}
			if (!(type instanceof Date)) {
				console.error("传入日期时间格式不正确！");
				return;
			}
			if (type.getTime() < new Date().getTime()) {
				// 时间错误，时间必须是未来的日期时间
				console.error("设置倒计时器无效，日期时间必须是未来的时间！");
				return;
			}
			// 清除旧的倒计时器
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				this.seqDisplay();
			}, 100);
		},
		// 下面是生成随机GUID的函数
		GUID() {
			return new Promise((sesolve, reject) => {
				let guid = "";
				for (let i = 1; i <= 32; i++) {
					let n = Math.floor(Math.random() * 16.0).toString(16);
					guid += n;
					if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
				}
				sesolve(guid);
			});
		}
	}
});
</script>

<style>
.kong {
	height: 98upx;
}

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

.i-label-item {
	display: flex;
	justify-content: center;
	align-items: center;
}

.i-label-item-text {
	margin: 0 10upx;
}

.i-product-head {
	padding: 20upx 30upx;
}

.i-product-title {
	font-size: 32upx;
	color: #4d4d4d;
	line-height: 1.2;
	font-weight: 600;
}

.i-product-current-bid {
	margin: 0 30upx;
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
	color: #414141;
}

.i-product-current-bid-icon {
	position: relative;
}

.i-product-current-bid-icon img {
	width: 100%;
	height: 140upx;
}

.i-product-current-bid-icon text {
	position: absolute;
	top: 18upx;
	left: 0;
	right: 0;
	font-size: 36upx;
	font-weight: 600;
	color: #fffefe;
}

.i-product-current-bid-user img {
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
}

.i-product-current-bid-name {
	font-size: 30upx;
	font-weight: 600;
	color: #fe7f00;
}

.i-product-current-bid-address {
	font-size: 28upx;
	font-weight: 600;
	color: #848484;
}

.i-product-last-transaction {
	display: flex;
	align-items: center;
	margin: 0 30upx;
}

.i-product-status {
	width: 140upx;
	font-size: 28upx;
	text-align: center;
	color: #fe7f00;
	border-radius: 100upx;
	border: 2upx solid #fe7f00;
}

.i-product-last-transaction-content {
	display: flex;
	align-items: center;
	margin-left: 35upx;
}

.i-product-last-transaction-text {
	font-size: 28upx;
	color: #000000;
}

.i-product-last-transaction-price {
	font-size: 36upx;
	color: #fe7f00;
	font-weight: 600;
}

.i-product-distance-shooting {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 10upx 30upx;
	padding: 0 30upx;
	border: 2upx solid #fe7f00;
	border-radius: 100upx;
	text-align: center;
}

.i-product-distance-shooting-text {
	font-size: 30upx;
	color: #4d4d4d;
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
	width: calc(100% - 60upx);
	border-collapse: collapse;
	box-sizing: border-box;
	margin: 30upx 30upx;
}

.i-product-table-tr {
	display: table-row;
	height: 80rpx;
}

.i-product-table-td {
	display: table-cell;
	border: 2upx solid #c9c9c9;
	vertical-align: middle;
	padding: 0 30upx;
}

.i-product-table-text {
	display: flex;
	align-items: center;
	margin-left: 20upx;
}

.i-product-table img {
	width: 20upx;
	height: 20upx;
}

.i-product-table-content {
	display: flex;
	align-items: center;
}

.i-product-table-text-content {
	font-size: 32upx;
	color: #4d4d4d;
}

.i-product-table-text-content-item {
	font-size: 32upx;
	color: #4d4d4d;
	margin-left: 20upx;
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

.i-product-button-list {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	border-top: 2upx solid #f4f4f4;
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
}

.join-btn {
	width: 100%;
	color: #fff;
	background-image: linear-gradient(-225deg, #fe7f00 35%, #fe7c13);
}

.i-product-placard {
	position: fixed;
	bottom: 0;
	height: 90upx;
	display: flex;
	align-items: center;
}

.i-placard-remaining-num {
	display: flex;
	justify-content: center;
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
}

.i-bill-user {
	margin-left: 20upx;
}

.i-product-all-bill {
	display: flex;
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

.i-product-placad {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: #fff;
	width: 100%;
}

.i-placard-button {
	min-width: 200upx;
	height: 90upx;
	font-size: 30upx;
}

.i-placard-button button {
	color: #fe7c13;
	background-color: #fff;
	border-left: 2upx solid #f4f4f4;
}

.i-placard-active button {
	color: #fff;
	background-color: #fe7c13;
	border-left: 2upx solid #f4f4f4;
}

.btn {
	font-size: 32upx;
	height: 106upx;
	line-height: 98upx;
	border: none;
	border-radius: 0;
}

.btn:after {
	border: none;
	border-radius: 0;
}
</style>
