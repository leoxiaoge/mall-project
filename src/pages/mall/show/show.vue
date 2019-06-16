<template>
	<view class="content">
    <view class="teng-show-order-list" v-for="(item, index) in list" :key="index">
			<view class="teng-show-userinfo">
				 <view class="teng-show-user">
			  	<image class="logo" :src="item.img" />
			  </view>
				<view class="teng-show-title">
					<view class="teng-show-name">{{item.name}}</view>
					<view class="teng-show-time">{{item.date}}</view>
				</view>
			</view>
			<view class="teng-show-order" v-for="(i, idx) in item.shop" :key="idx">
				<view class="teng-show-order-images">
					<image :src="i.img" />
				</view>
				<view class="teng-show-order-content">
					<view class="teng-show-order-content-title">{{i.title}}</view>
					<view class="teng-show-order-content-date">成交时间：{{i.date}}</view>
					<view class="teng-show-order-content-price">
						<text>成交价：</text>
						<text class="teng-show-order-content-price-text teng-original">{{i.price}}</text>
					</view>
				</view>
			</view>
			<view class="teng-show-content">
				<view class="teng-show-content-text">{{item.content}}</view>
			</view>
			<view class="teng-show-content-images">
				<view class="teng-show-content-image" v-for="(y, ydx) in item.comtentImg" :key="ydx">
					<image :src="y.img" />
				</view>
			</view>
		</view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { ProductPaiListGet } from '@/common/config/api'
	export default Vue.extend({
		data() {
			return {
				list: [{
					img: '../../../static/logo.png',
					name : '小明同学',
					date: '2019-06-12 23:12:53',
					shop: [{
						img: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
						title: 'title',
						date: '2019-06-12 23:12:53',
						price: '12.6'
					}],
					content: '好东西非常好',
					comtentImg: [{
						img: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg'
					},{
						img: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg'
					}]
				},{
					img: '../../../static/logo.png',
					name : '小明同学',
					data: '2019-06-12 23:12:53',
					shop: [{
						img: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
						title: 'title',
						data: '2019-06-12 23:12:53',
						price: '12.6'
					}],
					content: '好东西非常好',
					comtentImg: [{
						img: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg'
					},{
						img: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg'
					}]
				},{
					img: '../../../static/logo.png',
					name : '小明同学',
					data: '2019-06-12 23:12:53',
					shop: [{
						img: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
						title: 'title',
						data: '2019-06-12 23:12:53',
						price: '12.6'
					}],
					content: '好东西非常好',
					comtentImg: [{
						img: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg'
					},{
						img: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg'
					}]
				}]
			}
		},
		onLoad(options) {
      console.log('onLoad', options)
      let data = {

      }
			request(ProductPaiListGet, data).then((res: any) => {
        console.log(res)
      })
		},
		methods: {

		}
	})
</script>

<style>
	.teng-show-order-list {
		padding: 20upx 30upx;
		background-color: #fff;
		border-bottom: 2upx solid #f4f4f4
	}

	.teng-show-userinfo {
		display: flex;
		align-items: center;
		padding: 10upx 0
	}

	.teng-show-user image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%
	}

	.teng-show-title {
		margin-left: 20upx
	}
	
	.teng-show-name {
		font-size: 36upx;
		color: #6a6a6a;
	}

	.teng-show-time {
		font-size: 28upx;
		color: #616161;
	}

	.teng-show-order {
		display: flex;
		align-items: center;
		background-color: #e6e6e6;
		border-radius: 8upx;
		padding: 10upx 20upx
	}

	.teng-show-order-images image{
		width: 105upx;
		height: 105upx;
		border-radius: 4upx;
	}

	.teng-show-order-content {
		margin-left: 20upx;
	}

	.teng-show-order-content-title {
		font-size: 32upx;
		color: #4d4d4d
	}

	.teng-show-order-content-date {
		font-size: 24upx;
		color: #616161
	}

	.teng-show-order-content-price {
		display: flex;
		align-items: center
	}

	.teng-show-order-content-price-text {
		font-size: 36upx;
	}

	.teng-show-content {
		padding: 20upx 0
	}

	.teng-show-content-text {
		font-size: 32upx;
		color: #525252
	}

	.teng-show-content-images {
		display: flex;
		align-items: center;
		flex-wrap: wrap
	}

	.teng-show-content-image {
		width: 33.33%
	}

	.teng-show-content-image image {
		height: 200upx;
	}
</style>
