<template>
	<view class="content">
    <view class="" v-for="(item, index) in list" :key="index">
			<view class="">
				 <view class="">
			  	<image class="logo" :src="item.img" />
			  </view>
				<view class="">
					<view class="">{{item.name}}</view>
					<view class="">{{item.date}}</view>
				</view>
			</view>
			<view class="" v-for="(i, idx) in item.shop" :key="idx">
				<view class="">
					<image :src="i.img" />
				</view>
				<view class="">
					<view class="">{{i.title}}</view>
					<view class="">{{i.date}}</view>
					<view class="">{{i.price}}</view>
				</view>
			</view>
			<view class="">
				<view class=""></view>
			</view>
			<view class="" v-for="(y, ydx) in item.comtentImg" :key="ydx">
				<image :src="y.img" />
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
	.content {
		text-align: center;
		height: 400upx;
	}
  .logo{
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
  }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
