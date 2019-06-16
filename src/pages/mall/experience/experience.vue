<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(item,index)" :key="index" v-for="(item,index) in categoryList" :class="categoryActive==index?'active':''">
					{{item.CategoryName}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				<view class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index">
					<view class="teng-item-images">
			  		<image class="nav-right-item-image" :src="item.logo" />
						<image class="teng-order-show-status" :src="statusIcon" />
					</view>
					<view class="teng-content">
				   	<view class="teng-title">{{item.name}}</view>
						<view class="teng-type">
							<text class="teng-type-text">手动举牌</text>
						</view>
						<view class="teng-footer">
							<view class="teng-pirce">
								<text class="teng-pirce-text">上期成交：</text>
								<text class="teng-price-number">¥{{item.price}}</text>
							</view>
							<view class="teng-jion-btn">
								<button class="btn teng-btn">参加竞拍</button>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { ProductCategoryListGet, ProductPaiListGet } from '@/common/config/api'

	let categoryList: any = [{
		logo: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
		name: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
		status: '1',
		price: '0.86'
	},{
		logo: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
		name: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
		status: '1',
		price: '0.86'
	},{
		logo: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
		name: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
		status: '1',
		price: '0.86'
	}]
	export default Vue.extend({
		data() {
			return {
        categoryList: [],
        subCategoryList: [],
				categoryActive: 0,
				height: 0,
				scrollTop: 0,
				scrollHeight: 0,
				statusIcon: '/static/icon/icon_done.png'
			}
		},
		onLoad() {
			console.log('onLoad')
			let windowHeight: any = uni.getSystemInfoSync().windowHeight
      this.height = windowHeight
		},
		onShow() {
      console.log('onShow')
      this.getCategory()
		},
		methods: {
      scroll(e: any): void {
				this.scrollHeight = e.detail.scrollHeight;
      },
      getCategory(): void{
        let data = {}
			  request(ProductCategoryListGet, data).then((res: any) => {
          this.categoryList = res.CategoryList
				})
				this.subCategoryList = categoryList
			},
			categoryClickMain(categroy: any, index: any): void {
        let i: any = this.categoryList[index]
        console.log(i)
        this.categoryActive = index;
        let CategoryID = i.ID
        let data = {
          PageID: '1',
          PageSize: '10',
          CategoryID: i.ID,
          ActiveType: '1'
        }
			  request(ProductPaiListGet, data).then((res: any) => {
          // this.subCategoryList = res.ProductList
				})
			},
		}
	});
</script>

<style>
	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
		border-right: solid 1px #ededed;
	}

	.nav-left-item {
		height: 100upx;
		border-bottom: solid 1px #ededed;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
    background-color: #f3f4f3;
	}

	.nav-right {
		width: 70%;
	}

	.nav-right-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 220upx;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
		border-bottom: 2upx solid #f4f4f4;
	}

	.teng-item-images {
		position: relative
	}

	.nav-right-item-image {
		width: 120upx;
		height: 120upx;
	}

	.teng-order-show-status {
		position: absolute;
		left: 0;
		top: 0;
		width: 80upx;
		height: 80upx;
	}

	.active {
		color: #fe7f00;
    background-color: #e4e4e4;
	}

	.teng-title {
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
	  line-height:1.5;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
	}

	.teng-content {
		margin-left: 8upx;
	}

	.teng-title {
		font-size: 28upx;
		line-height: 2.4;
		color: #757575;
	}

	.teng-type {
		display: flex;
		justify-content: flex-start;
		align-items: center
	}

	.teng-type-text {
		font-size: 24upx;
		line-height: 1.6;
		padding: 0 10upx;
		color: #fe7f00;
		border: 2upx solid #fe7f00;
		border-radius: 100upx
	}

	.teng-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10upx
	}

	.teng-pirce-text {
		font-size: 24upx;
		color: #333;
	}

	.teng-price-number {
		font-size: 32upx;
		color: #fe7f00;
	}

	.teng-btn {
		font-size: 24upx;
		line-height: 2.4;
		color: #fff;
		background-color: #fe7f00;
		border-radius: 100upx;
		margin: 0
	}
</style>
