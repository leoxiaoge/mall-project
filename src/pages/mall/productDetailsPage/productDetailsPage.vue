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
		<view class="i-product-last-transaction">
			<view class="i-product-status">手动举牌</view>
			<view class="i-product-last-transaction-content">
				<view class="i-product-last-transaction-text">上期成交：</view>
				<view class="i-product-last-transaction-price">¥0.86</view>
			</view>
		</view>
		<view class="i-product-distance-shooting">
			<view class="i-product-distance-shooting-text">距离开拍</view>
			<view class="i-product-line"></view>
			<view class="i-product-distance-shooting-time">00:07:26</view>
		</view>
		<view class="i-product-distance-shooting">
			<view class="i-product-distance-shooting-time">00:07:26</view>
		</view>
		<view class="i-product-distance-shooting-end">
			<view class="i-product-distance-shooting-time-end">竞拍结束</view>
		</view>
		<view class="i-product-distance-shooting">
			<view class="i-product-distance-shooting-text">
				<text>我已消耗</text>
				<text>5</text>
				<text>拍币/赠币</text>
			</view>
			<view class="i-product-line"></view>
			<view class="i-product-distance-shooting-time">00:07:26</view>
		</view>
		<view class="i-product-current-bid">
			<view class="i-product-current-bid-head">当前出价</view>
			<view class="i-product-current-bid-price">¥0.86</view>
			<view class="i-product-current-bid-icon">
				<img :src="leading" />
				<text>当前领选出价人</text>
			</view>
			<view class="i-product-current-bid-user">
				<img :src="src" />
				<view class="i-product-current-bid-name">领选出价人</view>
				<view class="i-product-current-bid-address">广东 深圳</view>
			</view>
		</view>
		<view class="i-product-bill">
			<view
				class="i-bill"
				:class="(item.IsWin === 0?'':'i-active')"
				v-for="(item, index) in BillLists"
				:key="index"
			>
				<view class="i-bill-image i-flex">
					<image :src="item.UserNick" />
					<view class="i-bill-user">{{item.UserMobile}}</view>
				</view>
				<view class="i-bill-IsWin i-bill-out" v-if="item.IsWin === 0">出局</view>
				<view class="i-bill-IsWin i-bill-pre" v-else>预选</view>
				<view class="i-bill-province">{{item.Province}}{{item.City}}</view>
				<view class="i-bill-price">{{item.Price}}</view>
			</view>
		</view>
		<view class="i-product-all-bill uni-list-cell-navigate uni-navigate-right" @click="activePath">
			<view class="i-product-all-bill-text">
				<view class="i-product-all-bill-records">全部出价记录</view>
				<view class="i-product-all-bill-length">
					<text class="i-product-all-bill-text-item">12345</text>
					<text class="i-product-all-bill-text-total">条</text>
				</view>
			</view>
		</view>
		<view class="i-product-all-bill uni-list-cell-navigate uni-navigate-right" @click="activePath">
			<view class="i-product-all-bill-text">
				<view class="i-product-all-bill-records">我的出价记录</view>
				<view class="i-product-all-bill-length">
					<text class="i-product-all-bill-text-item">8</text>
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
				<block v-if="tabIndex === 0">
					<i-past :options="pastList" />
				</block>
				<block v-else-if="tabIndex === 1">
					<i-show :options="showList" />
				</block>
				<block v-else>
					<i-rule :options="ruleList" />
				</block>
			</view>
		</view>
		<view class="kong"></view>
		<view class="i-product-join">
			<button class="btn join-btn" v-show="!show" @click="hidePopup">立即参与</button>
			<button class="btn join-btn" @click="hidePopup">参与下一期</button>
			<block>
				<i-popup :show="show" :num="num" @change="change" @hidePopup="hidePopup" />
			</block>
			<view class="i-product-placad">
				<view class="i-placard-remaining-num">
					<view class="i-placard-remaining">剩余次数：</view>
					<view class="i-placard-num">{{num}}</view>
				</view>
				<view class="i-placard-button-view">
					<view class="i-placard-button">
						<button class="btn" :disabled="disabled" @click="bill">举牌</button>
					</view>
					<view class="i-placard-button i-placard-active">
						<button class="btn" :disabled="disabled">托管</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo, formatTime } from "@/common/utils/util";
import {
	ProductGet,
	PastTransactionsListGet,
	OrderDryingListGet
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
			num: "9999", // 剩余次数

			tabIndex: 0, // 默认往期成交
			pastList: [], // 往期成交列表
			showList: [], // 晒单列表
			ruleList: "", // 竞拍规则
			show: false, // 显示弹窗

			label: ["零风险", "正品承诺", "极速发货", "公平公正"],
			tab: ["往期成交", "分享晒单", "竞拍规则"],
			src: "/static/icon_experience.png",
			leading: "/static/icon/icon_leading.png",

		};
	},
	onLoad(options: any) {
		this.id = options.id;
		this.getProduct();
		this.getPastTransactionsList();
		this.getOrderDryingList();
		this.websocket();
	},
	methods: {
		// 获取产品详情
		getProduct() {
			let ProductID = this.id;
			let data = {
				ProductID: ProductID
			};
			request(ProductGet, data).then((res: any) => {
				console.log(res);
				this.product = res.Product;
				this.swiper = res.Product.ProductPicList;
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
		// websocket连接
		async websocket() {
			let msgLogin = await this.reqLogin();
			let msgSubscribe = await this.msgSubscribe();
			uni.connectSocket({
				url: "wss://websocket.tengpaisc.com:8888/"
			});
			uni.onSocketOpen((res: any) => {
				console.log("WebSocket连接已打开！", "握手成功！");
				socketOpen = true;
				for (let i = 0; i < socketMsgQueue.length; i++) {
					sendSocketMessage(socketMsgQueue[i]);
				}
				socketMsgQueue = [];
				sendSocketMessage(msgLogin);
				sendSocketMessage(msgSubscribe);
			});
			uni.onSocketError(res => {
				console.log("WebSocket连接打开失败，请检查！");
			});
			function sendSocketMessage(msg: any) {
				console.log("发送数据", socketOpen, msg);
				if (socketOpen) {
					uni.sendSocketMessage({
						data: msg
					});
				} else {
					socketMsgQueue.push(msg);
				}
			}
			return new Promise((sesolve, reject) => {
				uni.onSocketMessage((res: any) => {
					console.log("收到服务器内容：" + res.data);
					let data = JSON.parse(res.data);
					console.log(data);
					sesolve(data)
				});
			});
		},
		// 向服务器发送登录请求
		async reqLogin() {
			let GUID: any = await this.GUID();
			return new Promise((sesolve, reject) => {
				const Appkey = "3957399";
				const SessionKey = uni.getStorageSync("SessionKey");
				let ActiveID = 1;
				let UserID = 0;
				let ConnectionState = false;
				let msgTime = formatTime(new Date());
				console.log(GUID);
				let reqLogin: any = {
					ActiveID: ActiveID,
					AppKey: Appkey,
					SessionKey: SessionKey,
					msgID: GUID,
					msgType: 3,
					msgTime: msgTime
				};
				let msgLogin = JSON.stringify(reqLogin);
				sesolve(msgLogin);
			});
		},
		// 发送对该活动的消息订阅
		async msgSubscribe() {
			let GUID: any = await this.GUID();
			return new Promise((sesolve, reject) => {
				let ActiveID = 1;
				let url = "/Actives/" + ActiveID + "/";
				let msgTime = formatTime(new Date());
				let reqSubscribe = {
					Subscribe: url,
					msgID: GUID,
					msgType: 0,
					msgTime: msgTime
				};
				let msgSubscribe = JSON.stringify(reqSubscribe);
				sesolve(msgSubscribe);
			});
		},
		//下面是生成随机GUID的函数
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
		},
		// 举牌消息，通常是用户点击UI上的举牌按钮后，会触发此事件
		bill() {
			let msgTime = formatTime(new Date());
			let billMsg = {
				ActiveID: this.ActiveID,
				Price: this.Price,
				msgID: this.msgID,
				msgType: 2,
				msgTime: msgTime
			}
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

.i-active {
	color: #fe7f00;
}

.i-product-join {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 10;
}

.join-btn {
	height: 106upx;
	line-height: 106upx;
	color: #fff;
	background-color: #fe7c13;
}

.i-product-placard {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 90upx;
	display: flex;
	align-items: center;
}

.i-placard-remaining-num {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60%;
	background-color: #fff;
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
}

.i-placard-button-view {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.i-placard-button {
	width: 200upx;
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
	border: none;
	border-radius: 0;
}

.btn:after {
	border: none;
	border-radius: 0;
}
</style>
