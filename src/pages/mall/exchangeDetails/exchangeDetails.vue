<template>
	<view class="content">
		<view class="uni-padding-wrap i-kong">
			<uParse :content="article" @preview="preview" @navigate="navigate" />
		</view>
		<view class="mask-show" :class="(show?'show':'hide')">
			<view class="mask" @click="hide" @touchmove.stop.prevent="moveHandle" />
			<view class="exchange">
				<view class="exchange-now" v-if="!show">
					<button class="btn exchange-btn" @click="isShow">马上兑换</button>
				</view>
				<view class="exchange-model mask-content">
					<view class="exchange-model-head">
						<text>订单信息确认</text>
					</view>
					<view
						class="exchange-model-address"
						v-for="(item, index) in addressList"
						:key="index"
						@click="addressClick"
					>
						<view class="exchange-model-address-body">
							<view class="exchange-model-address-user">
								<text>{{item.realName}}</text>
								<text class="exchange-model-mobile">{{item.Mobile}}</text>
							</view>
							<view class="exchange-model-address-list">
								<text>{{item.Province}}</text>
								<text>{{item.City}}</text>
								<text>{{item.Area}}</text>
								<text>{{item.Address}}</text>
							</view>
						</view>
						<view class="exchange-model-arrow uni-icon uni-icon-arrowright"></view>
					</view>
					<view class="exchange-model-address" @click="addressClick" v-if="addressList.length <= 0">
						<view class="exchange-model-address-body"></view>
						<view class="exchange-model-arrow uni-icon uni-icon-arrowright"></view>
					</view>
					<view class="exchange-model-integrals">
						<view class="exchange-model-remaining-integrals" v-if="userInfo">
							<text>剩余积分：</text>
							<text>{{userInfo.SeqIntegrals}}</text>
							<text>分</text>
						</view>
						<view class="exchange-model-need-integrals" v-if="integrals">
							<text>所需积分：</text>
							<text>{{integrals}}</text>
							<text>分</text>
						</view>
					</view>
					<view class="exchange-submit">
						<button class="submitBtn" @click="exchangeSubmit">确认订单</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	showToast,
	defaultShowModal
} from "@/common/utils/util";
import {
	ProductGet,
	OrderExchangeSubmit,
	UserAddressListGet,
	GetLoginUser
} from "@/common/config/api";
import uParse from "@/components/uParse/src/wxParse.vue";
export default Vue.extend({
	components: {
		uParse
	},
	data() {
		return {
			id: "",
			addressID: "",
			article: "",
			integrals: "",
			userInfo: "",
			addressList: [],
			show: false
		};
	},
	onLoad(options: any) {
		this.id = options.id;
		this.integrals = options.integrals;
		console.log("onLoad", options);
	},
	onShow() {
		this.getProduct();
	},
	methods: {
		async getProduct() {
			let ProductID = this.id;
			let data = {
				ProductID: ProductID
			};
			request(ProductGet, data).then((res: any) => {
				this.article = res.Product.ProductDesc;
			});
			this.addressID = uni.getStorageSync("addressID");
			let userInfo: any = await this.getLoginUser();
			this.userInfo = userInfo;
			let address: any = await this.getUserAddressList();
			this.addressList = address.AddressList;
		},
		preview(src: any, e: any) {
			// do something
			console.log("src: " + src);
		},
		navigate(href: any, e: any) {
			// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
			console.log("href: " + href);
			uni.showModal({
				content: "点击链接为：" + href,
				showCancel: false
			});
		},
		isShow() {
			this.show = true;
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
		getUserAddressList() {
			return new Promise((resolve, reject) => {
				let AddressID = this.addressID;
				let data = {
					AddressID: AddressID
				};
				request(UserAddressListGet, data).then((res: any) => {
					resolve(res);
				});
			});
		},
		exchangeSubmit() {
			let ExchangeID = this.id;
			let AddressID = this.addressID;
			if (!AddressID) {
				let msg: string = "你还没有默认地址，请点击确定去填写地址信息！";
				defaultShowModal(msg).then((res: any) => {
					console.log(res);
					if (res.confirm) {
						console.log("用户点击确定");
						navigateTo("../../ucenter/addressShipping/addressShipping");
					} else if (res.cancel) {
						console.log("用户点击取消");
					}
				});
			}
			let data = {
				ExchangeID: ExchangeID,
				AddressID: AddressID
			};
			request(OrderExchangeSubmit, data).then((res: any) => {
				this.show = false;
				let content: string = "兑换成功，请点击确定查看订单！";
				defaultShowModal(content).then((res: any) => {
					console.log(res);
					if (res.confirm) {
						console.log("用户点击确定");
						let status = "-1";
						navigateTo("../../ucenter/orderList/orderList?status=" + status);
					} else if (res.cancel) {
						console.log("用户点击取消");
					}
				});
				console.log(res);
			});
		},
		hide() {
			this.show = false;
		},
		moveHandle() {
			this.show = false;
		},
		addressClick() {
			let disabled: boolean = true;
			navigateTo(
				"../../ucenter/addressShipping/addressShipping?disabled=" + disabled
			);
		}
	}
});
</script>

<style>
.mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 10;
	background: rgba(0, 0, 0, 0.3);
	display: none;
	z-index: 998;
}

.mask-content {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	background-color: #fff;
	transform: translateY(100%);
	transition: all 0.4s ease;
	z-index: 999;
}

.show .mask-content {
	transform: translateY(0);
}

.show .mask {
	display: block;
}

.exchange {
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 999;
}

.exchange-btn {
	color: #fff;
	background-color: #fe7f00;
}

.exchange-model {
	background-color: #fff;
}

.exchange-model-head {
	font-size: 32upx;
	color: #767676;
	text-align: center;
	padding: 20upx 0;
}

.exchange-model-address {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-top: 2upx solid #f4f4f4;
	border-bottom: 2upx solid #f4f4f4;
	padding: 20upx 30upx;
}

.exchange-model-address-user text {
	font-size: 32upx;
}

.exchange-model-mobile {
	margin-left: 60upx;
}

.exchange-model-integrals {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20upx 30upx;
}

.exchange-model-need-integrals text {
	color: #fe7f00;
}

.exchange-submit {
	padding: 20upx 30upx;
}

.submitBtn {
	line-height: 80upx;
	color: #fff;
	background-color: #fe7f00;
	border-radius: 100upx;
}
</style>