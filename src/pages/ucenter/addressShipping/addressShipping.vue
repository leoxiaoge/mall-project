<template>
	<view class="container">
		<view class="i-address">
			<view class="i-address-item" v-for="(item, index) in addressList" :key="index">
				<button class="address-button" :disabled="!disabled" @click="setAddress(item.ID)">
					<view class="i-address-user i-flex">
						<text class="i-address-name">{{item.realName}}</text>
						<text class="i-address-mobile">{{item.Mobile}}</text>
					</view>
					<view class="i-address-text i-flex">
						<text>{{item.Province}}{{item.City}}{{item.Area}}{{item.Address}}</text>
					</view>
				</button>
				<view class="i-address-bottom i-flex-between">
					<view class="i-address-default i-flex">
						<view class="i-address-icon">
							<uni-icon
								:type="type"
								:color="item.IsDefault === 1?'#fe7f00':'#8f8f94'"
								size="28"
								@click="setDefaultAddress(item.ID)"
							/>
						</view>
						<view class="i-address-default-text">设为默认</view>
					</view>
					<view class="i-address-operating i-flex">
						<view class="i-address-edit i-flex" @click="editAddress(item.ID)">
							<image class="i-edit-address-icon" />
							<text>编辑</text>
						</view>
						<view class="i-address-delete i-flex" @click="deleteAddress(item.IsDefault, item.ID)">
							<image class="i-delete-address-icon" />
							<text>删除</text>
						</view>
					</view>
				</view>
			</view>
			<view class="i-address-toast">
				<text>最多可添加5个地址</text>
			</view>
		</view>
		<view class="i-uno" v-if="isData">
			<u-no :title="noTitle" :thumb="noIcon"></u-no>
		</view>
		<view class="i-add-button i-button" v-if="isMaxData">
			<view class="i-height"></view>
			<button class="btn" @click="addAddress">添加地址</button>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	showToast
} from "@/common/utils/util";
import {
	UserAddressListGet,
	UserAddressDelete,
	UserAddressSetDefault,
	OrderAddressSubmit
} from "@/common/config/api";
import uNo from "@/components/u-no/u-no.vue";
import uniIcon from "@/components/uni-icon/uni-icon.vue";
export default Vue.extend({
	components: {
		uNo,
		uniIcon
	},
	data() {
		return {
			orderID: "",
			addressID: "",
			addressList: [], // 用户收货地址列表
			type: "checkbox-filled", // 默认icon
			isDefault: false,
			disabled: false,
			noTitle: "您还没有可以用收货地址喔~",
			noIcon: "/static/icon/icon_no_address.png",
			isData: false, // 是否有数据
			isMaxData: false // 最多5个
		};
	},
	onLoad(options: any) {
		console.log("onLoad", options);
		this.disabled = options.disabled;
		this.orderID = options.orderID;
	},
	onShow() {
		this.getUserAddressList();
	},
	methods: {
		getUserAddressList() {
			let data = {};
			request(UserAddressListGet, data).then((res: any) => {
				console.log(res);
				this.addressList = res.AddressList;
				if (res.AddressList.length <= 0) {
					this.isData = true;
				}
				if (res.AddressList.length <= 4) {
					this.isMaxData = true;
				}
			});
		},
		// 设置当前收货地址为默认的
		setDefaultAddress(id: any) {
			let AddressID = id;
			let data = {
				AddressID: AddressID
			};
			request(UserAddressSetDefault, data).then((res: any) => {
				console.log(res);
				showToast("设置成功！");
				this.getUserAddressList();
				uni.setStorageSync("addressID", id);
			});
		},
		// 编辑收货地址
		editAddress(id: any) {
			navigateTo("../addressUpdate/addressUpdate?id=" + id);
		},
		// 删除收货地址
		deleteAddress(isDefault: any, id: any) {
			let AddressID = id;
			uni.showModal({
				title: "温馨提示",
				content: "是否删除收货地址！",
				confirmColor: "#fe7f00",
				success: res => {
					if (res.confirm) {
						console.log("用户点击确定");
						let data = {
							AddressID: AddressID
						};
						request(UserAddressDelete, data).then((res: any) => {
							console.log(res);
							showToast("删除成功！");
							this.getUserAddressList();
							if (isDefault === 1) {
								uni.removeStorageSync("addressID");
							}
						});
					} else if (res.cancel) {
						console.log("用户点击取消");
					}
				}
			});
		},
		// 添加地址
		addAddress() {
			let id = 0;
			navigateTo("../addressUpdate/addressUpdate?id=" + id);
		},
		// 设置存储地址
		async setAddress(id: string) {
			uni.setStorageSync("addressID", id);
			this.addressID = id;
			console.log(this.orderID);
			if (this.orderID) {
				let res: any = await this.orderAddressSubmit();
				navigateTo("../orderList/orderList?status=" + "1");
			}
		},
		orderAddressSubmit() {
			return new Promise((sesolve, reject) => {
				let OrderID = this.orderID;
				let AddressID = this.addressID;
				let data = {
					OrderID: OrderID,
					AddressID: AddressID
				};
				request(OrderAddressSubmit, data).then((res: any) => {
					console.log(res);
					showToast("订单提交收货地址成功！")
					sesolve(res);
				});
			});
		}
	}
});
</script>

<style>
page {
	background-color: #fff;
}

.i-address-item {
	padding: 20upx 0;
}

.address-button {
	background-color: #fff;
}

.i-address-user {
	padding: 0 30upx;
}

.i-address-user {
	line-height: 1.6;
}

.i-address-mobile {
	margin-left: 80upx;
}

.i-address-text {
	line-height: 2.4;
	padding: 0 30upx;
}

.i-address-default-text {
	margin-left: 10upx;
	color: #727272;
}

.i-address-operating {
	color: #727272;
}

.i-address-toast {
	text-align: center;
	padding-bottom: 15upx;
}

.i-address-edit text {
	margin: 0 10upx;
}

.i-address-delete {
	margin-left: 10upx;
}

.i-address-delete text {
	margin: 0 10upx;
}

.i-edit-address-icon {
	background: url(https://api.tengpaisc.com/Resources/images/icon_edit_address.png)
		center no-repeat;
	background-size: 100%;
	width: 48upx;
	height: 48upx;
}

.i-delete-address-icon {
	background: url(https://api.tengpaisc.com/Resources/images/icon_delete_address.png)
		center no-repeat;
	background-size: 100%;
	width: 48upx;
	height: 48upx;
}

.i-height {
	height: 98upx;
}

.i-address-bottom {
	border-top: 2upx solid #f4f4f4;
	border-bottom: 2upx solid #f4f4f4;
	padding: 10upx 30upx;
}

.i-add-button button {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 98upx;
	line-height: 98upx;
	font-size: 32upx;
	color: #fff;
	background-color: #fe7f00;
	border: none;
	border-radius: 0;
}
</style>
