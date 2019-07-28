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
import { request, navigateTo, showToast, showModal } from "@/common/utils/util";
import {
	OrderListGet,
	OrderPay,
	OrderConfirmReceiving
} from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
import mediaList from "@/components/order-list/order-list.vue";

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
			id: "", // 选择产品ID
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
			mescroll: []
		};
	},
	onLoad(options: any) {
		console.log(options);
		let status = options.status;
		this.current = status;
		this.OrderStatus = status;
		this.$store.dispatch("getUserOpenId");
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
			return new Promise((sesolve, reject) => {
				let OrderStatus = this.current;
				if (OrderStatus == "-1") {
					let data = {
						PageID: pageNum,
						PageSize: pageSize
					};
					request(OrderListGet, data)
						.then((res: any) => {
							sesolve(res.OrderList);
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
							sesolve(res.OrderList);
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
			this.id = e;
		},
		async action(e: any) {
			console.log("action", e);
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
					let mescroll = this.mescroll;
					if (res.IsError) {
						showToast(res.ErrMsg);
					} else {
						showToast("确认收货成功！");
						this.downCallback(mescroll);
					}
					break;
				case "去支付":
					this.payment();
					break;
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
				"../orderDetail/orderDetail?id=" + e.ID + "&OrderID=" + e.OrderID
			);
		},
		// 晒单上传
		goOrderDrying(e: any) {
			console.log(e);
			navigateTo(
				"../orderDryingUpload/orderDryingUpload?id=" +
					e.ID +
					"&OrderID=" +
					e.OrderID
			);
		},
		// 订单确认收货
		orderConfirmReceiving() {
			return new Promise((sesolve, reject) => {
				let OrderID = this.orderID;
				let data = {
					OrderID: OrderID
				};
				request(OrderConfirmReceiving, data).then((res: any) => {
					sesolve(res);
					console.log(res);
				});
			});
		},
		// 订单支付
		async payment() {
			let payment: any = await this.payMoneySubmit();
			let paymentData = JSON.parse(payment);
			let mescroll: any = this.mescroll;
			uni.requestPayment({
				timeStamp: paymentData.timeStamp,
				nonceStr: paymentData.nonceStr,
				package: paymentData.package,
				signType: "MD5",
				paySign: paymentData.paySign,
				success() {
					showToast("支付成功！!");
					mescroll.resetUpScroll();
				},
				fail() {
					showModal("支付失败，用户取消支付!");
				}
			});
		},
		// 支付API
		async payMoneySubmit() {
			let state: any = this.$store.state;
			let OpenID = state.openid;
			let OrderID = this.orderID;
			let PayTypeID = this.PayTypeID;
			return new Promise((sesolve, reject) => {
				let data = {
					OrderID: OrderID,
					PayTypeID: PayTypeID,
					OpenID: OpenID
				};
				request(OrderPay, data).then((res: any) => {
					console.log(res);
					sesolve(res.PayParam);
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
}
.scroll-view-list {
	width: 100%;
	height: 100%;
}
</style>