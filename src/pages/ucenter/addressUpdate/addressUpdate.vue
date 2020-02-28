<template>
	<view class="container">
		<view class="i-content">
			<view class="i-address i-line i-flex">
				<view class="i-address-left">收货人</view>
				<view class="i-address-right">
					<input class="i-input" :value="realName" @input="onrealNameInput" placeholder="请填写收货人" />
				</view>
			</view>
			<view class="i-address i-line i-flex">
				<view class="i-address-left">手机号码</view>
				<view class="i-address-right">
					<input
						class="i-input"
						type="number"
						:value="Mobile"
						@input="onMobileInput"
						placeholder="请填写手机号码"
						maxlength="11"
					/>
				</view>
			</view>
			<view class="i-address i-line i-flex">
				<view class="i-address-left">所在区域</view>
				<view class="i-address-right" @click="showMulLinkageThreePicker">
					<input class="i-input" :value="(Province + City + Area)" disabled placeholder="请选择所在区域" />
				</view>
			</view>
			<view class="i-address i-line i-flex">
				<view class="i-address-left">详细地址</view>
				<view class="i-address-right">
					<input class="i-input" :value="Address" @blur="onAddressInput" placeholder="请填写详细地址" />
				</view>
			</view>
			<view class="i-address i-flex">
				<view class="i-address-left">邮政编码</view>
				<view class="i-address-right">
					<input
						class="i-input"
						type="number"
						:value="ZipCode"
						@input="onZipCodeInput"
						placeholder="请填写邮政编码（选填）"
					/>
				</view>
			</view>
			<view class="i-address i-flex i-default" v-if="!disabled">
				<view class="uni-list-cell-db">设为默认地址</view>
				<switch
					:checked="IsDefault === 1"
					@change="switch1Change"
					color="#fe7f00"
					style="transform:scale(0.8)"
				/>
			</view>
		</view>
		<view class="i-add-button i-button">
			<button class="btn" @click="updateAddress">{{saveButton}}</button>
		</view>
		<mpvue-city-picker
			:themeColor="themeColor"
			ref="mpvueCityPicker"
			:pickerValueDefault="cityPickerValueDefault"
			@onCancel="onCancel"
			@onConfirm="onConfirm"
		></mpvue-city-picker>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	redirectTo,
	navigateBack,
	showToast,
	onShareAppMessage
} from "@/common/utils/util";
import {
	UserAddressListGet,
	UserAddressUpdate,
	UserAddressSetDefault,
	OrderAddressSubmit
} from "@/common/config/api";
import mpvueCityPicker from "@/components/mpvue-citypicker/mpvueCityPicker.vue";
export default Vue.extend({
	components: {
		mpvueCityPicker
	},
	data() {
		return {
			productID: "",
			saveButton: "保存",
			disabled: false,
			orderID: "",
			addressID: 0, // 收货地址ID
			realName: "",
			Mobile: "",
			Province: "",
			City: "",
			Area: "",
			Address: "",
			ZipCode: "",
			IsDefault: 0,
			themeColor: "#fe7f00",
			cityPickerValueDefault: [0, 0, 1]
		};
	},
	onLoad(options: any) {
		this.productID = options.productID;
		if (options.disabled) {
			let disabled = JSON.parse(options.disabled);
			if (disabled) {
				this.disabled = disabled;
				this.saveButton = "订单提交地址";
			}
		}
		this.orderID = options.orderID;
		this.addressID = options.addressID;
		this.getUserAddressList();
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		getUserAddressList() {
			let AddressID = this.addressID;
			if (AddressID == 0) {
				return;
			}
			let data = {
				AddressID: AddressID
			};
			request(UserAddressListGet, data).then((res: any) => {
				console.log(res);
				let addressList = res.AddressList[0];
				this.realName = addressList.realName;
				this.Mobile = addressList.Mobile;
				this.Province = addressList.Province;
				this.City = addressList.City;
				this.Area = addressList.Area;
				this.Address = addressList.Address;
				this.ZipCode = addressList.ZipCode;
				this.IsDefault = addressList.IsDefault;
			});
		},
		// 三级联动选择
		showMulLinkageThreePicker() {
			console.log(this.$refs.mpvueCityPicker);
			let refs: any = this.$refs;
			refs.mpvueCityPicker.show();
		},
		onCancel(e: any) {
			console.log(e);
		},
		onConfirm(e: any) {
			let label = e.label;
			let address: any = label.split("-");
			let Province = address[0];
			let City = address[1];
			let Area = address[2];
			this.Province = Province;
			this.City = City;
			this.Area = Area;
		},
		onrealNameInput(e: any) {
			this.realName = e.target.value;
		},
		onMobileInput(e: any) {
			this.Mobile = e.target.value;
		},
		onAddressInput(e: any) {
			this.Address = e.target.value;
		},
		onZipCodeInput(e: any) {
			this.ZipCode = e.target.value;
		},
		switch1Change(e: any) {
			if (e.target.value) {
				this.IsDefault = 1;
			} else {
				this.IsDefault = 0;
			}
			console.log("switch1 发生 change 事件，携带值为", e.target.value);
		},
		async updateAddress() {
			await this.userAddressUpdate();
			if (this.IsDefault === 1) {
				await this.setDefaultAddress();
			}
			showToast("保存成功！");
			navigateBack(1);
		},
		// 设置当前收货地址为默认的
		async setDefaultAddress() {
			let AddressList: any = await this.getUserAddress();
			return new Promise((resolve, reject) => {
				let AddressID = this.addressID;
				if (AddressID == 0 || !AddressID) {
					AddressID = AddressList.pop().ID;
				}
				let data = {
					AddressID: AddressID
				};
				request(UserAddressSetDefault, data).then((res: any) => {
					resolve(res);
					uni.setStorageSync("addressID", AddressID);
				});
			});
		},
		// 获取全部地址
		getUserAddress() {
			return new Promise((resolve, reject) => {
				let data = {};
				request(UserAddressListGet, data).then((res: any) => {
					resolve(res.AddressList);
				});
			});
		},
		// 新增或修改收货地址
		userAddressUpdate() {
			return new Promise((resolve, reject) => {
				let AddressID = this.addressID;
				let realName = this.realName;
				let Mobile = this.Mobile;
				let Province = this.Province;
				let City = this.City;
				let Area = this.Area;
				let Address = this.Address;
				let ZipCode = this.ZipCode;
				let IsDefault = this.IsDefault;
				if (!AddressID) {
					AddressID = 0;
				}
				if (!realName) {
					showToast("请填写收货人!");
					return;
				}
				if (!Mobile) {
					showToast("请填写手机号码!");
					return;
				}
				if (!Province && !City && !Area) {
					showToast("请选择所在区域!");
					return;
				}
				if (!Address) {
					showToast("请填写详细地址!");
					return;
				}
				if (this.disabled) {
					let data = {
						AddressID: AddressID,
						realName: realName,
						Mobile: Mobile,
						Province: Province,
						City: City,
						Area: Area,
						Address: Address,
						ZipCode: ZipCode,
						IsDefault: IsDefault
					};
					request(UserAddressUpdate, data).then((res: any) => {
						console.log(res);
						this.orderAddressSubmit();
					});
				} else {
					let data = {
						AddressID: AddressID,
						realName: realName,
						Mobile: Mobile,
						Province: Province,
						City: City,
						Area: Area,
						Address: Address,
						ZipCode: ZipCode,
						IsDefault: IsDefault
					};
					request(UserAddressUpdate, data).then((res: any) => {
						resolve(res);
					});
				}
			});
		},
		orderAddressSubmit() {
			let OrderID = this.orderID;
			let AddressID = this.addressID;
			let data = {
				OrderID: OrderID,
				AddressID: AddressID
			};
			request(OrderAddressSubmit, data).then((res: any) => {
				showToast("订单提交收货地址成功！");
				redirectTo(
					"../orderDetail/orderDetail?productID=" +
						this.productID +
						"&OrderID=" +
						this.orderID
				);
			});
		}
	}
});
</script>

<style>
.i-address {
	padding: 24upx 30upx;
}

.i-address-left {
	width: 20%;
	min-width: 110upx;
}

.i-address-right {
	width: 80%;
	margin-left: 40upx;
}

.i-line {
	border-bottom: 2upx solid #f4f4f4;
}

.i-default {
	border-top: 20upx solid #f4f4f4;
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
