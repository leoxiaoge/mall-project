<template>
	<view class="container">
		<block v-for="(item, index) in order" :key="index">
			<view class="order-status">
				<view class="order-status-image">
					<image :src="icon" />
				</view>
				<view class="order-status-text">
					<view class="order-status-name">{{item.OrderStatusName}}</view>
					<view class="order-status-toast">请在24小时内付款</view>
				</view>
			</view>
			<button class="order-address" @click="addressPath" v-if="item.Address">
				<view class="order-address-content">
					<view class="order-address-user">
						<text class="order-address-name">{{item.Address.realName}}</text>
						<text class="order-address-mobile">{{item.Address.Mobile}}</text>
					</view>
					<view class="order-address-content">
						<text>{{item.Address.Province}}</text>
						<text>{{item.Address.City}}</text>
						<text>{{item.Address.Area}}</text>
						<text>{{item.Address.Address}}</text>
					</view>
				</view>
				<view class="arrowright">
					<uni-icon type="arrowright" size="24" />
				</view>
			</button>
			<view class="order-toast">
				<text>温馨提示：信息确认后不可修改</text>
			</view>
			<view class="order-product">
				<view class="order-product-image">
					<swiper
						class="swiper-box"
						:indicator-dots="indicatorDots"
						:autoplay="autoplay"
						:interval="interval"
						:duration="duration"
						:circular="circular"
					>
						<swiper-item v-for="(i, idx) in item.ProductPicList" :key="idx">
							<image :src="i" mode="aspectFill" />
						</swiper-item>
					</swiper>
				</view>
				<view class="order-product-content">
					<view class="order-product-head">
						<view class="order-product-name">{{item.ProductName}}</view>
						<view class="order-product-num">x1</view>
					</view>
					<view class="order-product-status">
						<text class="order-product-status-btn">{{item.OrderTypeName}}</text>
					</view>
					<view class="order-product-price">
						<view class="order-product-money">成交价：{{item.OrderMoneys}}</view>
						<view class="order-product-cost">小计：¥{{item.OrderMoneys}}</view>
					</view>
				</view>
			</view>
			<view class="order-product-total">
				<text>合计：¥{{item.OrderMoneys}}</text>
			</view>
			<view class="order-information">
				<view class="order-information-head">
					<view class="i-label"></view>
					<view class="order-information-text">订单信息</view>
				</view>
				<view class="order-information-item i-flex-between">
					<view class="order-information-order-id">
						<text>订单编号：{{item.OrderID}}</text>
						<text></text>
					</view>
					<!-- #ifndef H5 -->
					<view class="order-information-copy" @click="setClipboard(item.OrderID)">
						<text>复制</text>
					</view>
					<!-- #endif -->
				</view>
				<view class="order-information-item">
					<text>创建时间：</text>
					<text>{{item.CreatedTime}}</text>
				</view>
				<view class="order-information-item">
					<text>支付方式：</text>
					<text>{{item.PayType === 1 ? '微信' : '其他'}}</text>
				</view>
				<view class="order-information-item">
					<text>交易时间：</text>
					<text>{{item.UpdatedTime}}</text>
				</view>
				<view class="order-information-item" v-if="item.PayOrderNO">
					<text>交易号：</text>
					<text>{{item.PayOrderNO}}</text>
				</view>
				<view class="order-information-item" v-if="item.ExpressNo">
					<text>货运单号：</text>
					<text>{{item.ExpressNo}}</text>
				</view>
				<view class="order-information-item" v-if="item.SendGoodsDate">
					<text>发货时间：</text>
					<text>{{item.SendGoodsDateTime}}</text>
				</view>
				<view class="order-information-item" v-if="item.ExpressName">
					<text>货运公司：</text>
					<text>{{item.ExpressName}}</text>
				</view>
			</view>
			<view class="order-express" v-if="item.LocusesList.length > 0">
				<view class="order-express-head">
					<view class="i-label"></view>
					<view class="order-express-information">物流信息</view>
				</view>
				<view class="order-express-content">
					<uni-steps :options="item.LocusesList" :active="active" direction="column" />
				</view>
			</view>
			<view class="i-kong"></view>
			<view class="order-action" v-for="(i, idx) in item.ActionButtons" :key="idx">
				<button class="btn action-button" @click="actionButton(i.btn)">{{i.btn}}</button>
			</view>
		</block>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	formatTime,
	showToast,
	showModal,
	onShareAppMessage
} from "@/common/utils/util";
import {
	OrderListGet,
	OrderConfirmReceiving,
	OrderPay,
	GetWXOpenID
} from "@/common/config/api";
import uniIcon from "@/components/uni-icon/uni-icon.vue";
import uniSteps from "@/components/uni-steps/uni-steps.vue";
// #ifdef H5
import wx from "jweixin-module"; // 微信公众号（H5）JSSDK
// #endif
export default Vue.extend({
	components: {
		uniIcon,
		uniSteps
	},
	data() {
		return {
			indicatorDots: false,
			autoplay: false,
			interval: 5000,
			duration: 500,
			circular: true,
			active: 0,
			productID: "",
			orderID: "", // 订单ID
			PayTypeID: 1, // 支付类型ID 微信小程序支付传1
			icon: "",
			order: [],
			address: []
		};
	},
	onLoad(options: any) {
		this.productID = options.productID;
		this.orderID = options.OrderID;
	},
	onShow() {
		this.getOrderList();
		// #ifdef MP-WEIXIN
		this.$store.dispatch("checkSession");
		// #endif
	},
	onPullDownRefresh() {
		this.getOrderList();
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		getOrderList() {
			let OrderID = this.orderID;
			let data = {
				OrderID: OrderID
			};
			request(OrderListGet, data).then((res: any) => {
				console.log(res.OrderList[0]);
				let orderList: any = res.OrderList;
				this.order = orderList;
				orderList.map((item: any) => {
					item.CreatedTime = formatTime(new Date(item.Created));
					item.UpdatedTime = formatTime(new Date(item.Updated));
					item.SendGoodsDateTime = formatTime(new Date(item.SendGoodsDate));
					if (item.OrderStatus === 0) {
						this.icon = "/static/icon/icon_order-status1.png";
					} else if (item.OrderStatus === 1) {
						this.icon = "/static/icon/icon_order-status2.png";
					} else if (item.OrderStatus === 2) {
						this.icon = "/static/icon/icon_order-status3.png";
					} else if (item.OrderStatus === 3) {
						this.icon = "/static/icon/icon_order-status4.png";
					} else {
						this.icon = "/static/icon/icon_order-status5.png";
					}
				});
			});
		},
		// 复制事件
		setClipboard(data: any) {
			console.log(data);
			uni.setClipboardData({
				data: data,
				success: () => {
					console.log("success");
				}
			});
		},
		addressPath() {
			navigateTo("../addressShipping/addressShipping");
		},
		async actionButton(e: any) {
			console.log(e);
			switch (e) {
				case "填写地址":
					let disabled: boolean = true;
					let orderID = this.orderID;
					navigateTo(
						"../addressShipping/addressShipping?disabled=" +
							disabled +
							"&orderID=" +
							orderID
					);
					break;
				case "确认收货":
					let res: any = await this.orderConfirmReceiving();
					if (res.IsError) {
						showToast(res.ErrMsg);
					} else {
						showToast("确认收货成功！");
						this.getOrderList();
					}
					break;
				// #ifdef MP-WEIXIN
				case "去支付":
					this.payment();
					break;
				// #endif
				// #ifdef H5
				case "去支付":
					this.paymentH5();
					break;
				// #endif
				case "晒单":
					navigateTo(
						"../orderDryingUpload/orderDryingUpload?id=" +
							this.productID +
							"&OrderID=" +
							this.orderID
					);
					break;
			}
		},
		// 订单确认收货
		orderConfirmReceiving() {
			return new Promise((resolve, reject) => {
				let OrderID = this.orderID;
				let data = {
					OrderID: OrderID
				};
				request(OrderConfirmReceiving, data).then((res: any) => {
					resolve(res);
					console.log(res);
				});
			});
		},
		async payment() {
			let that = this;
			let payment: any = await this.payMoneySubmit();
			let paymentData = JSON.parse(payment);
			uni.requestPayment({
				timeStamp: paymentData.timeStamp,
				nonceStr: paymentData.nonceStr,
				package: paymentData.package,
				signType: "MD5",
				paySign: paymentData.paySign,
				success() {
					showToast("支付成功！!");
					that.getOrderList();
				},
				fail() {
					showToast("支付失败，用户取消支付!");
				}
			});
		},
		async paymentH5() {
			let payment: any = await this.payMoneySubmitH5();
			console.log("payment", payment);
			let paymentData = JSON.parse(payment);
			let mweb_url = paymentData.mweb_url;
			let ua: any = window.navigator.userAgent.toLowerCase();
			console.log("判断浏览器的UserAgent", ua.match(/MicroMessenger/i));
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: paymentData.appId, // 必填，公众号的唯一标识
					timestamp: paymentData.timeStamp, // 必填，生成签名的时间戳
					nonceStr: paymentData.nonceStr, // 必填，生成签名的随机串
					signature: paymentData.paySign, // 必填，签名，见附录1   https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
					jsApiList: ["chooseWXPay"] //['chooseWXPay'] // getBrandWCPayquest 必填，需要使用的JS接口列表，这里只写支付的
				});
				wx.chooseWXPay({
					timestamp: paymentData.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: paymentData.nonceStr, // 支付签名随机串，不长于 32 位
					package: paymentData.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
					signType: paymentData.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: paymentData.paySign, // 支付签名
					success: (res: any) => {
						// 支付成功后的回调函数
						showToast("支付成功！!");
						this.getOrderList();
					},
					cancel: (res: any) => {
						showToast("支付失败，用户取消支付！");
					},
					fail: (res: any) => {
						showToast("支付失败！");
					},
					complete: () => {}
				});
			} else {
				let redirect_url = `https://m.tengpaisc.com/pages/ucenter/rechargeSuccessful/rechargeSuccessful`;
				let url = `${mweb_url}&redirect_url=${redirect_url}`;
				window.location.href = url;
			}
		},
		async payMoneySubmitH5() {
			let ua: any = window.navigator.userAgent.toLowerCase();
			console.log(ua.match(/MicroMessenger/i) == "micromessenger");
			if (ua.match(/MicroMessenger/i) == "micromessenger") {
				// #ifdef MP-WEIXIN
				await this.$store.dispatch("checkSession");
				// #endif
				let OpenID = this.$store.state.openid;
				let OrderID = this.orderID;
				let PayTypeID = this.PayTypeID;
				return new Promise((resolve, reject) => {
					let data = {
						OrderID: OrderID,
						PayTypeID: PayTypeID,
						OpenID: OpenID
					};
					request(OrderPay, data).then((res: any) => {
						console.log(res);
						resolve(res.PayParam);
					});
				});
			} else {
				return new Promise((resolve, reject) => {
					let OrderID = this.orderID;
					let PayTypeID = this.PayTypeID;
					let data = {
						OrderID: OrderID,
						PayTypeID: PayTypeID
					};
					request(OrderPay, data).then((res: any) => {
						console.log(res);
						resolve(res.PayParam);
					});
				});
			}
		},
		// 支付API
		async payMoneySubmit() {
			let state: any = this.$store.state;
			let OpenID = state.openid;
			let OrderID = this.orderID;
			let PayTypeID = this.PayTypeID;
			return new Promise((resolve, reject) => {
				let data = {
					OrderID: OrderID,
					PayTypeID: PayTypeID,
					OpenID: OpenID
				};
				request(OrderPay, data).then((res: any) => {
					console.log(res);
					resolve(res.PayParam);
				});
			});
		}
	}
});
</script>

<style>
.i-label {
	width: 9upx;
	height: 22upx;
	background-color: #fe7f00;
}
.order-status {
	display: flex;
	align-items: center;
	min-height: 120upx;
	background-color: #fe9400;
	padding: 30upx 0;
}
.order-status-image {
	width: 100upx;
	height: 100upx;
	margin-left: 40upx;
}
.order-status-image image {
	width: 100%;
	height: 100%;
}
.order-status-text {
	margin-left: 20upx;
}
.order-status-name {
	font-size: 34upx;
	color: #fff;
}
.order-status-toast {
	font-size: 28upx;
	color: #fff8ee;
}
.order-address {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20upx 30upx;
	font-size: 36upx;
	background-color: #fff;
}
.order-address-mobile {
	margin-left: 50upx;
}
.order-address-user {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.order-toast {
	padding: 10upx 30upx;
	border-top: 2upx solid #f4f4f4;
	border-bottom: 2upx solid #f4f4f4;
}
.order-toast text {
	font-size: 28upx;
	color: #fe9400;
}
.order-product {
	display: flex;
	align-items: center;
	padding: 20upx 30upx;
}
.order-product-content {
	width: 80%;
	margin-left: 20upx;
}
.order-product-image {
	width: 120upx;
	height: 100upx;
}
.swiper-box {
	width: 100%;
	height: 100%;
}
.order-product-head {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.order-product-price {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.order-product-cost {
	color: #fe7f00;
	font-weight: 600;
}
.order-product-total {
	padding: 10upx 30upx;
	background-color: #e9e9e9;
}
.order-product-total text {
	font-size: 36upx;
	font-weight: 600;
	color: #373737;
}
.order-product-status-btn {
	font-size: 24upx;
	line-height: 1.4;
	color: #fe7f00;
	border: 2upx solid #fe7f00;
	border-radius: 100upx;
	padding: 2upx 14upx;
}
.order-information {
	padding: 0 30upx;
}
.order-information-head {
	display: flex;
	align-items: center;
	margin: 20upx 0;
}
.order-information-text {
	margin-left: 10upx;
	font-weight: 600;
}
.order-information-item {
	margin-left: 20upx;
	line-height: 2.4;
}
.order-express {
	padding: 20upx 30upx;
	border-top: 2upx solid #f4f4f4;
}
.order-express-head {
	display: flex;
	align-items: center;
}
.order-express-information {
	margin-left: 20upx;
	font-weight: 600;
}
.order-express-content {
	margin-right: 20upx;
}

.order-action {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 999;
}

.action-button {
	color: #fff;
	background-color: #fe7f00;
}
</style>