<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="swiper-tab-list" :class="tabIndex==index ? 'active' : ''"
			 :id="tab.id" :data-current="index" @click="tapTab">{{tab.name}}</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="changeTab">
			<swiper-item>
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<block v-for="(newsitem,index2) in orderList" :key="index2">
						<media-list :options="newsitem" :show-status="true" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-list>
					</block>
					<view class="uni-tab-bar-loading">
						{{loadingText}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { OrderListGet } from '@/common/config/api'
	import mediaList from '@/components/tab-nvue/mediaList.vue'
	const tpl = [{
		CommentPics: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
		image_list: [
			'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
			'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
			'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg'
		],
		ProductName: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
		OrderStatusName: '去支付',
		OrderStatus: '自动举牌',
		OrderID: '12345688974343',
		price: '3000',
		num: '1',
		ActionButtons: '确认收货'
	},{
		CommentPics: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
		ProductName: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
		OrderStatusName: '去支付',
		OrderStatus: '自动举牌',
		OrderID: '12345688974343',
		price: '2000',
		num: '1'
	},{
		CommentPics: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
		ProductName: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
		OrderStatusName: '去支付',
		OrderStatus: '自动举牌',
		OrderID: '12345688974343',
		price: '4000'
	},{
		CommentPics: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
		ProductName: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
		OrderStatusName: '去支付',
		OrderStatus: '自动举牌',
		OrderID: '12345688974343',
		price: '6000'
	},{
		CommentPics: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
		ProductName: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
		OrderStatusName: '去支付',
		OrderStatus: '自动举牌',
		OrderID: '12345688974343',
		price: '6000'
	}]
	export default Vue.extend({
		components: {
			mediaList
		},
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				orderList: [],
				tabBars: [{
					name: '正在拍',
					id: '0'
				}, {
					name: '已拍中',
					id: '1'
				}, {
					name: '已结束',
					id: '2'
				}],
				loadingText: '加载更多！'
			}
		},
		onLoad(options: any) {
			console.log(options)
			this.getData()
			let id = options.id
			this.tabIndex = id
		},
		methods: {
			getData() {
				let data = {
					OrderStatus: 1
        }
		  	request(OrderListGet, data).then((res: any) => {
          console.log(res)
				})
				let tpldata: any = tpl
				this.orderList = tpldata
			},
			goDetail(e: any) {
				uni.navigateTo({
					url: '/pages/template/tabbar/detail/detail?title=' + e.title
				});
			},
			loadMore(e: any) {
				setTimeout(() => {
					
				}, 1200);
			},
			async changeTab(e: any) {
				console.log(e)
			},
			getElSize(id: any) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			async tapTab(e: any) { //点击tab-bar
				console.log(e)
				this.tabIndex = e.target.dataset.current
				let tpldata: any = tpl
				this.orderList = tpldata
				console.log(tpldata)
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabBars.length; i < length; i++) {
					let aryItem = {
						loadingText: '加载更多...',
						data: []
					};
					ary.push(aryItem);
				}
				return ary;
			}
		}
	})
</script>

<style>
	.uni-tab-bar-loading {
		text-align: center;
		font-size: 28upx;
		color: #999;
	}
	.uni-swiper-tab {
		width: 100%;
		background-color: #fff;
	}
	.swiper-tab-list {
		width: 33.33%;
	}
</style>
