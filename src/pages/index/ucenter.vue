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
			<view class="userInfo-mobile">
				<text>17688734674</text>
			</view>
		</view>
		<view class="cu-list menu shadow-lg">
			<view class="cu-item arrow" @click="VIPCard">
				<view class="content">
					<image src="http://r.handnear.com/wx_miniProgram/image/icon/icon_vip.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">我的会员卡</text>
				</view>
				<view class="item-text">1张</view>
			</view>
			<view class="cu-item arrow" @click="historyOrder">
				<view class="content">
					<image src="http://r.handnear.com/wx_miniProgram/image/icon/icon_order.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">自助历史订单</text>
				</view>
				<view class="item-text">离场后生成</view>
			</view>
			<view class="cu-item arrow" @click="shopOrder">
				<view class="content">
					<image src="http://r.handnear.com/wx_miniProgram/image/icon/icon_shopping.png" class="png" mode="aspectFit"></image>
					<text class="text-grey">商城订单</text>
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
				alert("11")
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
		border: 4rpx solid #76c9cf;
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
		font-size: 34rpx;
		margin-bottom: 10rpx;
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

	.vipPayBox {
		width: 559rpx;
		height: 430rpx;
		position: absolute;
		top: 2%;
		left: 50%;
		transform: translateX(-50%);
		background-color: #fff;
		border-radius: 8rpx;
	}

	.vipPayBox-title {
		line-height: 96rpx;
		height: 96rpx;
		text-align: center;
		position: relative;
		margin-top: 24rpx;
		font-size: 36rpx;
		color: #000
	}

	.vipPayBox-main {
		height: 209rpx;
		width: 100%;
		position: relative;
	}

	.vipCardId {
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		color: #000;
		position: absolute;
		top: 28rpx;
		left: 0rpx;
	}

	.shouldPayMoney {
		width: 100%;
		text-align: center;
		font-size: 60rpx;
		color: #000;
		position: absolute;
		top: 91rpx;
		left: 0rpx;
	}

	.vipPayBox-ipt {
		width: 481rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f2f5f5;
		font-size: 30rpx;
		color: #262626;
		margin-left: 30rpx;
		padding-left: 19rpx;
	}

	.vipPayBox-authCodeBox {
		position: relative;
	}

	.vipPayBox-authCode {
		width: 370rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f2f5f5;
		font-size: 30rpx;
		color: #262626;
		padding-left: 19rpx;
		position: absolute;
		left: 30rpx;
		top: 20rpx;
	}

	.timer {
		position: absolute;
		left: 401rpx;
		top: 20rpx;
		width: 110rpx;
		height: 61rpx;
		background-color: #e0fdff;
		border-radius: 0 8rpx 8rpx 0;
		color: gray;
		font-size: 30rpx;
		text-align: center;
		padding-top: 20rpx;
		padding-left: 20rpx;
	}

	.vipPayBox-authCodeBtn {
		position: absolute;
		left: 401rpx;
		top: 20rpx;
		width: 110rpx;
		height: 61rpx;
		background-color: #e0fdff;
		border-radius: 0 8rpx 8rpx 0;
		color: #37bfc7;
		font-size: 30rpx;
		text-align: center;
		padding-top: 20rpx;
		padding-left: 20rpx;
	}

	.vipPayBox-checkCard {
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 36rpx;
		background-color: #37bfc8;
		color: #fefefe;
		position: absolute;
		bottom: 0rpx;
		right: 0rpx;
		border-radius: 0 0 8rpx 0rpx;
	}

	.vipPayBox-cancel {
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 36rpx;
		background-color: #fff;
		color: #000000;
		position: absolute;
		bottom: 0rpx;
		left: 0 rpx;
		border-top: 1rpx solid #e0e0e0;
		border-radius: 0 0 0rpx 8rpx;
	}

	.UCenter-bg {
		height: 500rpx;
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
		background: -webkit-linear-gradient(-180deg, #37bfc8, #149ea8);
		background: linear-gradient(-180deg, #37bfc8, #149ea8);
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

	map,
	.mapBox {
		left: 0;
		z-index: 99;
		mix-blend-mode: screen;
		height: 100rpx;
	}

	map,
	.mapBox {
		width: 750rpx;
		height: 300rpx;
	}

	.text-xl {
		margin-top: 20rpx;
	}

	.cu-list{
		background-color: #fff;
	}

	.cu-item{
		padding: 0;
	}

	.lines-grey{
		font-size: 32rpx;
	}

	.item-text{
		font-size: 30rpx;
		color: #a8a8a8;
	}
</style>
