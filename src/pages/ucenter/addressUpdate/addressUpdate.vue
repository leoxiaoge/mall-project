<template>
	<view class="container">
    <view class="">
      <textarea :value="pickerText" disabled placeholder="请点击下面的按钮进行选择"></textarea>
      <button type="default" @click="showMulLinkageThreePicker">三级城市联动</button>
    </view>
		<view class="i-add-button i-button">
			<button class="btn">添加</button>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
  import { UserAddressListGet } from '@/common/config/api'
  import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	export default Vue.extend({
		components: {
			mpvueCityPicker
		},
		data() {
			return {
        AddressID: '', // 收货地址ID 
        pickerText: '',
        themeColor: '#007AFF',
        cityPickerValueDefault: [0, 0, 1],
			}
		},
		onLoad(options) {
			this.getUserAddressList()
      console.log('onLoad', options)
		},
		methods: {
			getUserAddressList() {
				let data = {
					
        }
		  	request(UserAddressListGet, data).then((res: any) => {
					console.log(res)
					
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
        console.log(e)
        this.pickerText = JSON.stringify(e)
      }
    }
	})
</script>

<style>
  page {
		background-color: #fff;
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
