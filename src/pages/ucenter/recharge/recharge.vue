<template>
	<view class="container">
		<view class="teng-recharge">
			<view
				class="teng-recharge-item"
				:class="{'teng-recharge-item-active':payIndex == index}"
				v-for="(item, index) in payList"
				:key="index"
				@click="changePayment(index)"
			>
				<view class="teng-recharge-price">{{item.PayMoney}}元</view>
				<view class="teng-recharge-description" v-if="item.VirtualMoney">兑{{item.VirtualMoney}}个入场券</view>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="payment-method">
			<view class="payment-method-head">
				<text>选择支付方式</text>
			</view>
			<radio-group @change="radioChange">
				<label
					class="uni-list-cell uni-list-cell-pd"
					v-for="(item, index) in providerList"
					:key="index"
				>
					<view class="payment-method-item">
						<view class="payment-method-icon">
							<img :src="item.icon" />
						</view>
						<view class="payment-method-name">{{item.name}}</view>
					</view>
					<view>
						<radio :value="item.value" :checked="index === current" :color="color" />
					</view>
				</label>
			</radio-group>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<form @submit="formSubmit" report-submit="true" report-submit-timeout="“2”">
			<!-- #endif -->
			<view class="teng-recharge-bottom teng-flex-between">
				<view class="teng-recharge-total-price">
					<text>支付金额：</text>
					<text class="teng-recharge-total-price-number">¥{{payMoney}}</text>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<button
					class="btn payment-btn bg-gradual-orange"
					formType="submit"
					@click="payment"
					:loading="loading"
				>支付</button>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<button class="btn payment-btn bg-gradual-orange" @click="paymentH5" :loading="loading">支付</button>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<button class="btn payment-btn bg-gradual-orange" @click="requestPayment" :loading="loading">支付</button>
				<!-- #endif -->
			</view>
			<!-- #ifdef MP-WEIXIN -->
		</form>
		<!-- #endif -->
	</view>
</template>

<script>
import {
	request,
	navigateTo,
	showModal,
	onShareAppMessage
} from "@/common/utils/util";
import {
	PayMoneyListGet,
	PayMoneySubmit,
	AddUserFormID,
	GetWXOpenID
} from "@/common/config/api";
export default {
	data() {
		return {
			title: "request-payment",
			loading: false,
			price: 1,
			color: "#fe7f00",
			current: 0,
			providerList: [
				{
					name: "微信",
					id: "wxpay",
					value: "wxpay",
					icon: "/static/icon/icon_wxpay.png"
				},
				{
					name: "支付宝",
					id: "alipay",
					value: "alipay",
					icon: "/static/icon/icon_alipay.png"
				}
			],
			payList: [],
			payIndex: 0,
			moneyID: "", // 支付金额对应的ID
			payMoney: "",
			payTypeID: 1 // 支付方式ID 微信小程序支付传1
		};
	},
	onLoad: function() {
		this.getPayMoneyList();
		this.getProvider();
	},
	onShareAppMessage(e) {
		return onShareAppMessage(e);
	},
	methods: {
		getProvider() {
			uni.getProvider({
				service: "payment",
				success: e => {
					console.log("payment success:" + JSON.stringify(e));
					let providerList = [];
					e.provider.map(value => {
						switch (value) {
							case "wxpay":
								providerList.push({
									name: "微信",
									icon: "/static/icon/icon_wxpay.png",
									id: value,
									value: value,
									loading: false
								});
								break;
							case "alipay":
								providerList.push({
									name: "支付宝",
									icon: "/static/icon/icon_alipay.png",
									id: value,
									value: value,
									loading: false
								});
								break;
							default:
								break;
						}
					});
					// this.providerList = providerList;
				},
				fail: e => {
					console.log("获取支付通道失败：", e);
				}
			});
		},
		getPayMoneyList() {
			let data = {};
			request(PayMoneyListGet, data).then(res => {
				console.log(res);
				this.payList = res.PayMoneyList;
				this.moneyID = res.PayMoneyList[0].ID;
				this.payMoney = res.PayMoneyList[0].PayMoney;
			});
		},
		// 选择支付金额
		changePayment(index) {
			this.payIndex = index;
			let payList = this.payList;
			let intemIndex = payList[index].ID;
			this.moneyID = intemIndex;
			console.log(intemIndex);
			this.payMoney = payList[index].PayMoney;
		},
		async payment() {
			console.log("发起支付");
			this.loading = true;
			let payment = await this.payMoneySubmit();
			let paymentData = JSON.parse(payment);
			console.log(paymentData);
			console.log(paymentData.timeStamp);
			uni.requestPayment({
				timeStamp: paymentData.timeStamp,
				nonceStr: paymentData.nonceStr,
				package: paymentData.package,
				signType: "MD5",
				paySign: paymentData.paySign,
				success: res => {
					showToast("充值成功！");
				},
				fail: res => {
					showModal("支付失败，用户取消支付！");
				},
				complete: () => {
					this.loading = false;
				}
			});
		},
		// #ifdef H5
		async paymentH5() {
			this.loading = true;
			let payment = await this.payMoneySubmit();
			let paymentData = JSON.parse(payment);
		},
		// #endif
		// 获取OpenID
		getWXOpenID() {
			return new Promise((sesolve, reject) => {
				uni.login({
					success: e => {
						console.log("login success", e);
						let JSCode = e.code;
						let data = {
							JSCode: JSCode
						};
						request(GetWXOpenID, data).then(res => {
							console.log(res);
							sesolve(res.OpenID);
						});
					},
					fail: e => {
						console.log("fail", e);
						this.loading = false;
					}
				});
			});
		},
		// 小程序消息模版FormID
		formSubmit(e) {
			let formId = e.detail.formId;
			let data = {
				FormID: formId
			};
			request(AddUserFormID, data).then(res => {
				console.log(res);
			});
		},
		// 支付API
		async payMoneySubmit() {
			let OpenID = await this.getWXOpenID();
			return new Promise((sesolve, reject) => {
				let MoneyID = this.moneyID;
				let PayTypeID = this.payTypeID;
				let data = {
					MoneyID: MoneyID,
					PayTypeID: PayTypeID,
					OpenID: OpenID
				};
				request(PayMoneySubmit, data).then(res => {
					console.log(res);
					sesolve(res.PayParam);
				});
			});
		},
		// APP支付
		// #ifdef APP-PLUS
		radioChange(e) {
			console.log(e);
			let value = e.target.value;
			this.payTypeID = value;
		},
		// #endif
		// #ifdef APP-PLUS
		async requestPayment(e, index) {
			this.loading = true;
			let orderInfo = await this.getOrderInfo(e.id);
			console.log("得到订单信息", orderInfo);
			uni.requestPayment({
				provider: e.id,
				orderInfo: orderInfo.data,
				success: e => {
					console.log("success", e);
					showToast("充值成功！");
				},
				fail: e => {
					console.log("fail", e);
					showModal("支付失败!");
				},
				complete: () => {
					this.loading = false;
				}
			});
		},
		// #endif
		getOrderInfo() {
			let appid = "";
			// #ifdef APP-PLUS
			appid = plus.runtime.appid;
			// #endif
			return new Promise((sesolve, reject) => {
				let MoneyID = this.moneyID;
				let PayTypeID = this.payTypeID;
				let data = {
					MoneyID: MoneyID,
					PayTypeID: PayTypeID,
					appid: appid
				};
				request(PayMoneySubmit, data).then(res => {
					console.log(res);
					sesolve(res);
				});
			});
		}
	}
};
</script>

<style>
page {
	background-color: #fff;
}

.teng-recharge {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	background-color: #fff;
	padding: 0 10upx;
}

.teng-recharge-item {
	width: calc(33.33% - 30upx);
	color: #333;
	background-color: #fff;
	border-radius: 20upx;
	text-align: center;
	margin-top: 20upx;
	padding: 40upx 0;
	border: 2upx solid #f4f4f4;
}

.teng-recharge-item-active {
	color: #fff;
	background-color: #ff8300;
}

.teng-recharge-item-active .teng-recharge-price {
	color: #fff;
}

.teng-recharge-item-active .teng-recharge-description {
	color: #fff;
}

.teng-recharge-price {
	font-size: 36upx;
	color: #333;
}

.teng-recharge-description {
	font-size: 24upx;
	color: #5a5a5a;
}

.teng-recharge-bottom {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100upx;
	background-color: #f4f4f4;
}

.teng-recharge-total-price {
	font-size: 32upx;
	padding: 0 30upx;
}

.teng-recharge-total-price-number {
	color: #ff0000;
}

.payment-method {
	padding: 30upx 0;
}

.payment-method-head {
	height: 80upx;
	line-height: 80upx;
	background-color: #f4f4f4;
	margin-top: 80upx;
	padding: 0 30upx;
}

.payment-method-head text {
	font-size: 32upx;
}

.payment-method-item {
	display: flex;
	align-items: center;
}

.payment-method-icon {
	display: flex;
	justify-content: center;
	align-items: center;
}

.payment-method-icon img {
	width: 64upx;
	height: 64upx;
}

.payment-method-name {
	margin-left: 20upx;
}

.payment-btn {
	width: 240upx;
	margin: 0;
	border: none;
	border-radius: 0;
	line-height: 100upx;
}
</style>
