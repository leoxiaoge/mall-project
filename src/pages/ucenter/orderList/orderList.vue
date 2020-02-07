<template>
	<view>
		<scroll-view id="tab-bar" class="i-swiper-tab" scroll-x>
			<view
				v-for="(item, index) in tabBars"
				:key="index"
				class="swiper-tab-list product-item"
				:class="current===item.status ? 'active' : ''"
				@click="tapTab(item.status)"
			>
				<view class="name">{{item.name}}</view>
				<view class="line"></view>
			</view>
		</scroll-view>
		<mescroll-uni top="100" @down="downCallback" @up="upCallback">
			<block v-for="(item, index) in orderList" :key="index">
				<media-list
					:options="item"
					@click="goDetail(item)"
					@action="action"
					@order="order"
					@product="product"
				></media-list>
			</block>
		</mescroll-uni>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	showToast,
	showModal,
	onShareAppMessage
} from "@/common/utils/util";
import {
	OrderListGet,
	OrderPay,
	OrderConfirmReceiving
} from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
import mediaList from "@/components/order-list/order-list.vue";
// #ifdef H5
import wx from "jweixin-module"; // 微信公众号（H5）JSSDK
// #endif
export default Vue.extend({
	components: {
		MescrollUni,
		mediaList
	},
	data() {
		return {
			current: "",
			OrderStatus: "",
			orderList: [], // 订单列表
			productID: "", // 选择产品ID
			orderID: "", // 选择订单ID
			PayTypeID: 1, // 支付类型ID 微信小程序支付传1
			tabBars: [
				{
					name: "全部",
					id: 0,
					status: "-1"
				},
				{
					name: "待填地址",
					id: 1,
					status: "0"
				},
				{
					name: "待付款",
					id: 2,
					status: "1"
				},
				{
					name: "待发货",
					id: 3,
					status: "2"
				},
				{
					name: "待收货",
					id: 4,
					status: "3"
				},
				{
					name: "待晒单",
					id: 5,
					status: "4"
				}
			],
			mescroll: null
		};
	},
	onLoad(options: any) {
		console.log(options);
		let status = options.status;
		this.current = status;
		this.OrderStatus = status;
		// #ifdef MP-WEIXIN
		this.$store.dispatch("checkSession");
		// #endif
		// #ifdef H5
		document.body.addEventListener("touchmove", (e: any) => {
			document.body.scrollTop = 0;
		});
		// #endif
	},
	onShow() {
		if (this.mescroll) {
			let mescroll: any = this.mescroll;
			this.downCallback(mescroll);
		}
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		// 点击选项卡
		tapTab(e: any) {
			this.current = e;
			let mescroll: any = this.mescroll;
			this.downCallback(mescroll);
		},
		/*下拉刷新的回调 */
		downCallback(mescroll: any) {
			// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			this.mescroll = mescroll;
			mescroll.resetUpScroll();
		},
		/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
		upCallback(mescroll: any) {
			//联网加载数据
			this.getListDataFromNet(
				mescroll.num,
				mescroll.size,
				(curPageData: any) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if (mescroll.num == 1) this.orderList = []; //如果是第一页需手动制空列表
					this.orderList = this.orderList.concat(curPageData); //追加新数据
					console.log("orderList", curPageData, this.orderList);
				},
				() => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				}
			);
		},
		/*联网加载列表数据
			实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			* */
		async getListDataFromNet(
			pageNum: any,
			pageSize: any,
			successCallback: any,
			errorCallback: any
		) {
			try {
				let orderList: any = await this.getOrderList(pageNum, pageSize);
				//联网成功的回调
				successCallback && successCallback(orderList);
			} catch (e) {
				//联网失败的回调
				errorCallback && errorCallback();
			}
		},
		getOrderList(pageNum: any, pageSize: any) {
			return new Promise((resolve, reject) => {
				let OrderStatus = this.current;
				if (OrderStatus == "-1") {
					let data = {
						PageID: pageNum,
						PageSize: pageSize
					};
					request(OrderListGet, data)
						.then((res: any) => {
							resolve(res.OrderList);
						})
						.catch((err: any) => {
							let mescroll: any = this.mescroll;
							mescroll.endErr();
						});
				} else {
					let data = {
						OrderStatus: OrderStatus,
						PageID: pageNum,
						PageSize: pageSize
					};
					request(OrderListGet, data)
						.then((res: any) => {
							resolve(res.OrderList);
						})
						.catch((err: any) => {
							let mescroll: any = this.mescroll;
							mescroll.endErr();
						});
				}
			});
		},
		order(e: any) {
			this.orderID = e;
		},
		product(e: any) {
			this.productID = e;
		},
		async action(e: any) {
			console.log("action", e);
			switch (e) {
				case "填写地址":
					let productID = this.productID;
					let disabled: boolean = true;
					let orderID = this.orderID;
					navigateTo(
						"../addressShipping/addressShipping?disabled=" +
							disabled +
							"&orderID=" +
							orderID +
							"&productID=" +
							productID
					);
					break;
				case "确认收货":
					let res: any = await this.orderConfirmReceiving();
					let mescroll = this.mescroll;
					if (res.IsError) {
						showToast(res.ErrMsg);
					} else {
						showToast("确认收货成功！");
						this.downCallback(mescroll);
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
							this.orderID +
							"&OrderID=" +
							this.orderID
					);
					break;
			}
		},
		goDetail(e: any) {
			console.log(e);
			navigateTo(
				"../orderDetail/orderDetail?productID=" + e.ID + "&OrderID=" + e.OrderID
			);
		},
		// 晒单上传
		goOrderDrying(e: any) {
			console.log(e);
			navigateTo(
				"../orderDryingUpload/orderDryingUpload?productID=" +
					e.ID +
					"&OrderID=" +
					e.OrderID
			);
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
		// 订单支付
		async payment() {
			let payment: any = await this.payMoneySubmit();
			let paymentData = JSON.parse(payment);
			let productID = this.productID;
			let OrderID = this.orderID;
			uni.requestPayment({
				timeStamp: paymentData.timeStamp,
				nonceStr: paymentData.nonceStr,
				package: paymentData.package,
				signType: "MD5",
				paySign: paymentData.paySign,
				success() {
					showToast("支付成功！!");
					navigateTo(
						"../orderDetail/orderDetail?productID=" +
							productID +
							"&OrderID=" +
							OrderID
					);
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
			let productID = this.productID;
			let OrderID = this.orderID;
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
						navigateTo(
							"../orderDetail/orderDetail?productID=" +
								productID +
								"&OrderID=" +
								OrderID
						);
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
				let productID = this.productID;
				let OrderID = this.orderID;
				let redirect_url = `https://m.tengpaisc.com/pages/ucenter/orderDetail/orderDetail?productID=${productID}&OrderID=${OrderID}`;
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
		// 微信小程序支付API
		async payMoneySubmit() {
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
		}
	}
});
</script>

<style>
page {
	width: 100%;
	height: 100%;
}
.content {
	width: 100%;
	height: 100%;
}
.swiper {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	overflow: scroll;
}

.product-item {
	position: relative;
	display: inline-block;
	overflow: hidden;
	height: 98upx;
	line-height: 98upx;
}

.product-item .name {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-weight: 600;
}

.active .name {
	color: #fe7f00;
}

.active .line {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translate(-50%, 0);
	width: 100upx;
	height: 6upx;
	background-color: #fe7f00;
	border-radius: 8upx;
}

.i-tab-bar-loading {
	text-align: center;
	font-size: 28upx;
	color: #999;
}
.i-swiper-tab {
	white-space: nowrap;
	height: 98upx;
	line-height: 98upx;
	background-color: #fff;
	border-bottom: 2upx solid #f4f4f4;
	z-index: 999;
}
.scroll-view-list {
	width: 100%;
	height: 100%;
}
</style>