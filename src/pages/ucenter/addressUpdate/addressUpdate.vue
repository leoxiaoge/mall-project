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
					<input class="i-input" type="number" :value="Mobile" @input="onMobileInput" placeholder="请填写手机号码" maxlength="11"/>
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
					<input class="i-input" type="number" :value="ZipCode" @input="onZipCodeInput" placeholder="请填写邮政编码（选填）" />
				</view>
			</view>
    </view>
		<view class="i-add-button i-button">
			<button class="btn" @click="updateAddress">保存</button>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo, redirectTo, showToast } from '@/common/utils/util'
  import { UserAddressListGet, UserAddressUpdate } from '@/common/config/api'
  import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default Vue.extend({
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				AddressID: 0, // 收货地址ID 
				realName: '',
				Mobile: '',
				Province: '',
				City: '',
				Area: '',
				Address: '',
				ZipCode: '',
				IsDefault: 0,
        themeColor: '#fe7f00',
        cityPickerValueDefault: [0, 0, 1],
			}
		},
		onLoad(options: any) {
			let id = options.id
			this.AddressID = options.id
			this.getUserAddressList(id)
      console.log('onLoad', options)
		},
		methods: {
			getUserAddressList(id: any) {
				console.log(id)
				if (id == 0) {
					return;
				}
				let data = {
					AddressID: id
        }
		  	request(UserAddressListGet, data).then((res: any) => {
					console.log(res)
					let addressList = res.AddressList[0]
					this.realName = addressList.realName
					this.Mobile = addressList.Mobile
					this.Province = addressList.Province
					this.City = addressList.City
					this.Area = addressList.Area
					this.Address = addressList.Address
					this.ZipCode = addressList.ZipCode
					this.IsDefault = addressList.IsDefault
        })
      },
      // 三级联动选择
			showMulLinkageThreePicker() {
        console.log(this.$refs.mpvueCityPicker)
        let refs:any = this.$refs
				refs.mpvueCityPicker.show()
      },
      onCancel(e: any) {
        console.log(e)
      },
      onConfirm(e: any) {
				let label = e.label
				let address: any = label.split("-");
				let Province = address[0]
				let City = address[1]
				let Area = address[2]
				this.Province = Province
				this.City = City
				this.Area = Area
			},
			onrealNameInput(e: any) {
				this.realName = e.target.value
			},
			onMobileInput(e: any) {
				this.Mobile = e.target.value
			},
			onAddressInput(e: any) {
				this.Address = e.target.value
			},
			onZipCodeInput(e: any) {
        this.ZipCode = e.target.value
      },
			// 新增或修改收货地址
			updateAddress() {
				let AddressID = this.AddressID
				let realName = this.realName
				let Mobile = this.Mobile
				let Province = this.Province
				let City = this.City
				let Area = this.Area
				let Address = this.Address
				let ZipCode = this.ZipCode
				let IsDefault = this.IsDefault
				if (!AddressID) {
					AddressID = 0
				}
				if (!realName) {
					showToast('请填写收货人!')
					return;
				}
				if (!Mobile) {
					showToast('请填写收货人!')
					return;
				}
				if (!Province && !City && !Area) {
					showToast('请填写收货人!')
					return;
				}
				if (!Address) {
					showToast('请填写收货人!')
					return;
				}
				if (!IsDefault) {
					IsDefault = 0
				}
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
        }
		  	request(UserAddressUpdate, data).then((res: any) => {
					console.log(res)
					showToast('保存成功！')
					redirectTo('../addressShipping/addressShipping')
        })
			}
    }
	})
</script>

<style>
  page {
		background-color: #fff;
  }

	.i-address {
		padding: 20upx 30upx;
	}

	.i-address-left {
		min-width: 110upx;
	}

	.i-address-right {
		margin-left: 40upx;
	}

	.i-line {
		border-bottom: 2upx solid #f4f4f4;
	}
  
	.i-address-bottom {
		border-top: 2upx solid #f4f4f4;
		border-bottom: 2upx solid #f4f4f4;
		padding: 10upx 30upx;
	}

	.i-add-button button{
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
