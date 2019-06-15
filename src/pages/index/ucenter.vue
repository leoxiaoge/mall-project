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
		<view class="teng-gold teng-flex-between">
			<view class="teng-left teng-flex">
				<text class="icon-gold"></text>
				<text class="teng-ticket">我的入场券</text>
				<text class="teng-number">1669</text>
			</view>
			<view class="teng-right teng-recharge">
				<button class="btn">去充值</button>
			</view>
		</view>
		<view class="teng-order">
			<view class="teng-order-head teng-flex-between">
				<view class="teng-my-order">
					<text>我的订单</text>
				</view>
				<view class="teng-all-orders">
					<text class="teng-all-orders-text">全部订单</text>
					<uni-icon :size="20" color="#bbb" type="arrowright" />
				</view>
			</view>
			<view class="teng-order-list">
				<uni-grid :options="lists" :is-order="true" :show-border="false" :show-out-border="false" :column-num="4" />
			</view>
		</view>
		<view class="">
			<uni-list v-for="(item, i) in listItem" :key="i">
				<uni-list-item :title="item.title" :thumb="item.icon" :navigatePath="item.navigateTo" />
			</uni-list>
		</view>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	import { request, navigateTo } from '@/common/utils/util'
	import { ProductCategoryListGet } from '@/common/config/api'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default Vue.extend({
		components: {
			uniGrid,
			uniList,
			uniListItem,
			uniIcon
		},
		data() {
			return {
				title: '我的',
				lists: [{
          image: '/static/icon/icon_pending_address.png',
					text: '待填地址',
					status: '0',
          navigateTo: 'orderList'
        },
        {
          image: '/static/icon/icon_pending_payment.png',
					text: '待付款',
					status: '1',
          navigateTo: 'orderList'
        },
        {
          image: '/static/icon/icon_pending_receipt.png',
					text: '待收货',
					status: '2',
          navigateTo: 'orderList'
        },
        {
          image: '/static/icon/icon_pending_order.png',
					text: '待晒单',
					status: '3',
          navigateTo: 'orderList'
        }],
				listItem: [{
					icon: '/static/icon/icon_auction.png',
					title: '我的竞拍',
					navigateTo: 'myAuction'
				},{
					icon: '/static/icon/icon_order.png',
					title: '我的晒单',
					navigateTo: 'myOrder'
				},{
					icon: '/static/icon/icon_address.png',
					title: '收货地址',
					navigateTo: 'shippingAddress'
				},{
					icon: '/static/icon/icon_share.png',
					title: '分享得豪礼',
					navigateTo: 'sharePromotion'
				},{
					icon: '/static/icon/icon_feedback.png',
					title: '帮助反馈',
					navigateTo: 'helpAndFeedback'
				}]
			}
		},
		onLoad() {
			let data = {
				id : '0'
			}
			request(ProductCategoryListGet, data).then(function(res) {
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
		height: 100rpx
	}

	.teng-gold {
		padding: 20upx 30upx;
		background-color: #fff
	}
	
  .icon-gold {
		background: url(../../static/icon/icon_gold.png) center no-repeat;
    background-size: 100%;
    width: 36upx;
    height: 36upx;
	}

	.teng-ticket {
		margin-left: 15upx;
	}

	.teng-number {
		font-size: 48upx;
		color: #f37900;
		line-height: 1.6;
		margin-left: 24upx;
	}
	
	.teng-recharge button {
		font-size: 36upx;
		background-color: #fe7f00;
		color: #fff;
		line-height: 1.8;
		border-radius: 4upx;
		border: none;
	}

	.teng-order-head {
		background-color: #fff;
		padding: 20upx 30upx;
		border-top: 2upx solid #e6e6e6
	}

	.teng-order-list {
		background-color: #fff;
		border-bottom: 2upx solid #e6e6e6
	}
</style>
