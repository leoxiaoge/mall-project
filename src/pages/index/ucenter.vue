<template>
	<view class="content">
		<view class="UCenter-bg" v-if="sessionkey && userInfo">
			<view class="userInfo-head">
				<!-- #ifdef MP-WEIXIN -->
				<view class="clear" @click="clear">
					<open-data type="userAvatarUrl"></open-data>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view class="userInfo-userFace">
					<image :src="userFace" mode="widthFix" />
				</view>
				<!-- #endif -->
			</view>
			<view class="text-xl">
				<view class="userInfo-txt-name">
					<!-- #ifdef MP-WEIXIN -->
					<open-data type="userNickName"></open-data>
					<!-- #endif -->
					<!-- #ifndef MP-WEIXIN -->
					<view class="userInfo-userNick">
						<text>{{userNick}}</text>
					</view>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="UCenter-bg" v-else>
			<view class="i-no-userInfo-head">
				<text>欢迎来到腾拍商城</text>
			</view>
			<view class="i-login">
				<button class="btn i-login-button" @click="loginPath">马上登录</button>
			</view>
		</view>

		<view class="teng-gold teng-flex-between">
			<view class="teng-left teng-flex">
				<text class="icon-gold"></text>
				<text class="teng-ticket">我的入场券</text>
				<text class="teng-number">{{userInfo.SeqVirtual}}</text>
			</view>
			<view class="teng-right teng-recharge">
				<button class="btn" @click="recharge">去充值</button>
			</view>
		</view>
		<view class="teng-order">
			<view class="teng-order-head teng-flex-between">
				<view class="teng-my-order">
					<text class="teng-my-order-text">我的订单</text>
				</view>
				<view class="teng-all-orders" @click="allOrderClick">
					<text class="teng-all-orders-text">全部订单</text>
					<uni-icon :size="20" color="#bbb" type="arrowright" />
				</view>
			</view>
			<view class="teng-order-list">
				<uni-grid
					ref="uniGrid"
					:options="lists"
					:is-order="true"
					:is-totals="true"
					:show-border="false"
					:show-out-border="false"
					:column-num="4"
					@click="orderClick"
				/>
			</view>
		</view>
		<view class="teng-listItem">
			<uni-list v-for="(item, i) in listItem" :key="i">
				<uni-list-item
					:title="item.title"
					:showBadge="item.showBadge"
					:badgeText="item.badgeText"
					:thumb="item.icon"
					:navigatePath="item.navigateTo"
				/>
			</uni-list>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	showToast,
	defaultShowModal,
	onShareAppMessage
} from "@/common/utils/util";
import { GetLoginUser, OrderSummary } from "@/common/config/api";
import uniGrid from "@/components/uni-grid/uni-grid.vue";
import uniList from "@/components/uni-list/uni-list.vue";
import uniListItem from "@/components/uni-list-item/uni-list-item.vue";
import uniIcon from "@/components/uni-icon/uni-icon.vue";
export default Vue.extend({
	components: {
		uniGrid,
		uniList,
		uniListItem,
		uniIcon
	},
	data() {
		return {
			sessionkey: "",
			userInfo: "",
			userFace: "",
			userNick: "",
			Integrals: "",
			lists: [
				{
					id: 0,
					image: "/static/icon/icon_pending_address.png",
					text: "待填地址",
					status: 0,
					totals: 0,
					navigateTo: "orderList"
				},
				{
					id: 1,
					image: "/static/icon/icon_pending_payment.png",
					text: "待付款",
					status: 1,
					totals: 0,
					navigateTo: "orderList"
				},
				{
					id: 2,
					image: "/static/icon/icon_pending_receipt.png",
					text: "待收货",
					status: 3,
					totals: 0,
					navigateTo: "orderList"
				},
				{
					id: 3,
					image: "/static/icon/icon_pending_order.png",
					text: "待晒单",
					status: 4,
					totals: 0,
					navigateTo: "orderList"
				}
			],
			listItem: [
				{
					icon: "/static/icon/icon_auction.png",
					title: "我的竞拍",
					navigateTo: "myAuction"
				},
				{
					icon: "/static/icon/icon_order.png",
					title: "我的晒单",
					navigateTo: "myOrder"
				},
				{
					icon: "/static/icon/icon_address.png",
					title: "收货地址",
					navigateTo: "addressShipping"
				},
				{
					icon: "/static/icon/icon_exchange.png",
					title: "积分兑换",
					navigateTo: "exchange"
				},
				{
					icon: "/static/icon/icon_share.png",
					title: "分享得豪礼",
					navigateTo: "sharePromotion"
				},
				{
					icon: "/static/icon/icon_feedback.png",
					title: "帮助反馈",
					navigateTo: "helpAndFeedback"
				}
			]
		};
	},
	onLoad() {},
	onShow() {
		this.useInfo();
		this.getOrderSummary();
		this.empty();
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	onNavigationBarButtonTap(e: any) {
		navigateTo("/pages/ucenter/setting/setting");
	},
	methods: {
		async useInfo() {
			this.sessionkey = uni.getStorageSync("SessionKey");
			let userInfo: any = await this.getLoginUser();
			this.userInfo = userInfo;
			this.userFace = userInfo.userFace;
			this.userNick = decodeURIComponent(userInfo.userNick);
			if (userInfo.Integrals) {
				uni.showTabBarRedDot({
					index: 3
				});
			}
			this.listItem.map((item: any, i: any) => {
				if (i === 3) {
					item.showBadge = true;
					item.badgeText = userInfo.Integrals;
				}
			});
		},
		async getOrderSummary() {
			let SummaryList: any = await this.orderSummary();
			let list: any = JSON.parse(JSON.stringify(this.lists));
			console.log(list, SummaryList);
			list.map((item: any) => {
				SummaryList.map((i: any) => {
					if (item.status === i.OrderStatus) {
						item.totals = i.TotalCount;
					}
				});
			});
			let lists = JSON.parse(JSON.stringify(list));
			console.log(lists);
			this.lists = lists;
		},
		orderSummary() {
			return new Promise((sesolve, reject) => {
				let data = {};
				request(OrderSummary, data).then((res: any) => {
					sesolve(res.SummaryList);
				});
			});
		},
		VIPCard() {
			navigateTo("../store/store/store");
		},
		// 马上登录
		loginPath() {
			navigateTo("../ucenter/login/login");
		},
		// 去充值
		recharge() {
			navigateTo("../ucenter/recharge/recharge");
		},
		// 全部订单
		allOrderClick() {
			let status = -1;
			navigateTo("../ucenter/orderList/orderList?status=" + status);
		},
		// 获取当前登录用户的信息
		getLoginUser() {
			return new Promise((sesolve, reject) => {
				let data = {};
				request(GetLoginUser, data).then((res: any) => {
					uni.setStorageSync("UserInfo", res.UserInfo);
					sesolve(res.UserInfo);
				});
			});
		},
		// status=>
		// 等待填写地址 = 0,
		// 等待付款 = 1,
		// 等待发货 = 2,
		// 等待收货 = 3,
		// 等待晒单 = 4,
		// 成功完成 = 5,
		// 订单取消 = 6
		orderClick(item: any) {
			let status = item.status;
			var navigate =
				`../ucenter/${item.navigateTo}/${item.navigateTo}?status=` + status;
			navigateTo(navigate);
		},
		clear() {
			let content: string = "是否确定退出登录？";
			defaultShowModal(content).then((res: any) => {
				if (res.confirm) {
					console.log("用户点击确定");
					try {
						uni.clearStorageSync();
						this.empty();
					} catch (e) {
						showToast("退出登录失败");
					}
				} else if (res.cancel) {
					console.log("用户点击取消");
				}
			});
		},
		// 初始化数据
		empty() {
			this.userInfo = "";
			this.lists = [
				{
					id: 0,
					image: "/static/icon/icon_pending_address.png",
					text: "待填地址",
					status: 0,
					totals: 0,
					navigateTo: "orderList"
				},
				{
					id: 1,
					image: "/static/icon/icon_pending_payment.png",
					text: "待付款",
					status: 1,
					totals: 0,
					navigateTo: "orderList"
				},
				{
					id: 2,
					image: "/static/icon/icon_pending_receipt.png",
					text: "待收货",
					status: 3,
					totals: 0,
					navigateTo: "orderList"
				},
				{
					id: 3,
					image: "/static/icon/icon_pending_order.png",
					text: "待晒单",
					status: 4,
					totals: 0,
					navigateTo: "orderList"
				}
			];
		}
	}
});
</script>

<style>
.userInfo {
	width: 100%;
	height: 250rpx;
	display: flex;
	background-color: #18a2ac;
	border-radius: 10rpx;
	color: #fff;
	position: relative;
	margin-top: 30rpx;
	filter: alpha(
			opacity=100 finishopacity=50 style=1 startx=0,
			starty=0,
			finishx=0,
			finishy=150
		)
		progid:
		DXImageTransform.Microsoft.gradient(
			startcolorstr=red,
			endcolorstr=blue,
			gradientType=1
		);
	-ms-filter: alpha(
			opacity=100 finishopacity=50 style=1 startx=0,
			starty=0,
			finishx=0,
			finishy=150
		)
		progid:
		DXImageTransform.Microsoft.gradient(
			startcolorstr=#37bfc8,
			endcolorstr=#149ea8,
			gradientType=1
		);
	background: -moz-linear-gradient(top, #37bfc8, #149ea8);
	background: -webkit-gradient(
		linear,
		0 0,
		0 bottom,
		from(#37bfc8),
		to(#149ea8)
	);
}

.userInfo-head {
	width: 180rpx;
	height: 180rpx;
	border-radius: 50%;
	border: 4upx solid #fe7f00;
	overflow: hidden;
}

.userInfo-head image {
	width: 100%;
	height: 100%;
}

.userInfo-txt {
	position: absolute;
	top: 85rpx;
	left: 200rpx;
}

.userInfo-txt-name {
	font-size: 30upx;
	color: #fff;
	margin-top: 20urp;
	margin-bottom: 20upx;
}

.userInfo-mobile {
	font-size: 30rpx;
	margin-top: 10rpx;
}

.userInfo-txt-telN {
	width: 140rpx;
	height: 32rpx;
	border: 1rpx solid #bce5e8;
	color: #fff;
	font-size: 24rpx;
	text-align: center;
	border-radius: 3rpx;
}

.userInfo-userNick text {
	font-size: 32upx;
	line-height: 1.8;
	color: #fff;
}

.UCenter-bg {
	display: flex;
	justify-content: center;
	padding-top: 120rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 500;
	padding-top: 30upx;
	padding-bottom: 100upx;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	background: -webkit-linear-gradient(-180deg, #fe7f00, #fe7f00);
	background: linear-gradient(-180deg, #fe7f00, #fe7f00);
}

.UCenter-bg text {
	opacity: 0.9;
}

.UCenter-bg image {
	width: 200rpx;
	height: 200rpx;
}

.UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

.i-no-userInfo-head {
	margin-top: 30upx;
}

.i-no-userInfo-head text {
	font-size: 40upx;
	color: #fff;
}

.i-login {
	margin-top: 20upx;
}

.i-login-button {
	width: 200upx;
	font-size: 28upx;
	line-height: 2.4;
	color: #fe7f00;
	background-color: #fff;
	border-radius: 100upx;
	border: none;
}

.teng-gold {
	padding: 20upx 30upx;
	background-color: #fff;
}

.icon-gold {
	background: url(../../static/icon/icon_gold.png) center no-repeat;
	background-size: 100%;
	width: 36upx;
	height: 36upx;
}

.teng-ticket {
	margin-left: 15upx;
}

.teng-number {
	font-size: 48upx;
	color: #f37900;
	line-height: 1.6;
	margin-left: 24upx;
}

.teng-recharge button {
	font-size: 36upx;
	background-color: #fe7f00;
	color: #fff;
	line-height: 2;
	border-radius: 8upx;
	border: none;
	padding: 0 30upx;
}

.teng-order-head {
	background-color: #fff;
	padding: 20upx 30upx;
	border-top: 2upx solid #e6e6e6;
}

.teng-my-order-text {
	font-size: 32upx;
}

.teng-order-list {
	background-color: #fff;
	border-bottom: 2upx solid #e6e6e6;
	padding: 0 20upx;
}
</style>
