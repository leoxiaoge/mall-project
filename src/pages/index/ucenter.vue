<template>
	<view class="content">
    <view class="UCenter-bg">
			<view class="userInfo-head">
				<!-- #ifdef MP-WEIXIN -->
				<open-data type="userAvatarUrl"></open-data>
				<!-- #endif -->
			</view>
			<view class="text-xl">
				<view class="userInfo-txt-name">
					<!-- #ifdef MP-WEIXIN -->
					<open-data type="userNickName"></open-data>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { request, navigateTo } from '@/common/utils/util'
	import { GoodsList } from '@/common/config/api'
	export default Vue.extend({
		data() {
			return {
				title: '我的'
			}
		},
		onLoad() {
			let data = {
				id : '0'
			}
			request(GoodsList, data).then(function(res) {
				console.log(res)
			})
		},
		methods: {
			VIPCard() {
				console.log('11')
				navigateTo('../store/store/store')
			}
		}
	});
</script>

<style>
  .userInfo {
		width: 100%;
		height: 250rpx;
		display: flex;
		background-color: #18a2ac;
		border-radius: 10rpx;
		color: #fff;
		position: relative;
		margin-top: 30rpx;
		filter: alpha(opacity=100 finishopacity=50 style=1 startx=0, starty=0, finishx=0, finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=red, endcolorstr=blue, gradientType=1);
		-ms-filter: alpha(opacity=100 finishopacity=50 style=1 startx=0, starty=0, finishx=0, finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=#37bfc8, endcolorstr=#149ea8, gradientType=1);
		background: -moz-linear-gradient(top, #37bfc8, #149ea8);
		background: -webkit-gradient(linear, 0 0, 0 bottom, from(#37bfc8), to(#149ea8));
	}

	.userInfo-head {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		border: 4upx solid #fe7f00;
		overflow: hidden;
	}

	.userInfo-head image {
		width: 100%;
		height: 100%;
	}

	.userInfo-txt {
		position: absolute;
		top: 85rpx;
		left: 200rpx;
	}

	.userInfo-txt-name {
		font-size: 30upx;
    color: #fff;
    margin-top: 20urp;
		margin-bottom: 20upx;
	}

	.userInfo-mobile {
		font-size: 30rpx;
		margin-top: 10rpx;
	}

	.userInfo-txt-telN {
		width: 140rpx;
		height: 32rpx;
		border: 1rpx solid #bce5e8;
		color: #fff;
		font-size: 24rpx;
		text-align: center;
		border-radius: 3rpx;
	}
	.UCenter-bg {
		height: 280rpx;
		display: flex;
		justify-content: center;
		padding-top: 120rpx;
		overflow: hidden;
		position: relative;
		flex-direction: column;
		align-items: center;
		color: #fff;
		font-weight: 500;
		text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
		background: -webkit-linear-gradient(-180deg, #fe7f00, #fe7f00);
		background: linear-gradient(-180deg, #fe7f00, #fe7f00);
	}

	.UCenter-bg text {
		opacity: 0.9;
	}

	.UCenter-bg image {
		width: 200rpx;
		height: 200rpx;
	}

	.UCenter-bg .gif-wave {
		position: absolute;
		width: 100%;
		bottom: 0;
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}
</style>
