<template>
	<view class="container">
    <view class="i-address">
			<view class="i-address-item" v-for="(item, index) in addressList" :key="index">
				<view class="i-address-user i-flex">
					<text class="i-address-name">{{item.realName}}</text>
					<text class="i-address-mobile">{{item.Mobile}}</text>
				</view>
				<view class="i-address-text">
					<text>{{item.Province}}{{item.City}}{{item.Area}}{{item.Address}}{{item.ZipCode}}</text>
				</view>
				<view class="i-address-bottom i-flex-between">
					<view class="i-address-default i-flex">
						<view class="i-address-icon">
							<uni-icon :type="type" :color="isDefault?'#007aff':'#8f8f94'" size="28" @click="switchActive" />
						</view>
						<view class="i-address-default-text">设为默认</view>
					</view>
					<view class="i-address-operating i-flex">
						<view class="i-address-edit">编辑</view>
						<view class="i-address-delete">删除</view>
					</view>
				</view>
			</view>
			<view class="i-address-toast" v-if="addressList">
				<text>最多可添加5个地址</text>
			</view>
		</view>
		<view class="i-uno">
			<u-no :title="noTitle" :thumb="noIcon"></u-no>
		</view>
		<view class="i-add-button i-button">
			<button class="btn" @click="addAddress">添加地址</button>
		</view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { UserAddressListGet } from '@/common/config/api'
	import uNo from '@/components/u-no/u-no.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default Vue.extend({
		components: {
			uNo,
			uniIcon
		},
		data() {
			return {
				addressList: [], // 用户收货地址列表
				type: 'checkbox-filled', // 默认icon
				isDefault: false,
				noTitle: '您还没有可以用收货地址喔~',
				noIcon: '/static/icon/icon_no_address.png'
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
					this.addressList = res.AddressList
				})
				console.log(this.addressList)
			},
			switchActive() {
				this.isDefault = !this.isDefault
			},
			// 添加地址
			addAddress() {
				navigateTo('../addressUpdate/addressUpdate')
			}
		}
	})
</script>

<style>
  page {
		background-color: #fff;
	}

  .i-address-item {
		padding: 20upx 0;
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
