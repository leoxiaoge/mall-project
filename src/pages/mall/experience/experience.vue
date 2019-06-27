<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="categoryClickMain(index)" :key="index" v-for="(item,index) in categoryList" :class="categoryActive==index?'active':''">
					{{item.CategoryName}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'" scroll-with-animation>
				<view class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index">
					<view class="teng-item-images">
			  		<image class="nav-right-item-image" :src="item.ProductPics|url" />
						<image class="teng-order-show-status" :src="statusIcon" />
					</view>
					<view class="teng-content">
				   	<view class="teng-title">{{item.ProductTitle}}</view>
						<view class="teng-type">
							<text class="teng-type-text" v-if="item.HistoryActive">{{item.HistoryActive}}</text>
							<text class="teng-type-text" v-if="item.HistorySales">{{item.HistorySales}}</text>
							<text class="teng-type-text" v-if="item.HistoryTimes">{{item.HistoryTimes}}</text>
						</view>
						<view class="teng-footer">
							<view class="teng-pirce">
								<text class="teng-pirce-text">上期成交：</text>
								<text class="teng-price-number">¥{{item.ProductPrice}}</text>
							</view>
							<view class="teng-jion-btn">
								<button class="btn teng-btn">{{item.ProductPrimeCost}}</button>
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
				this.categoryClickMain(0)
			},
			// 商品列表
			categoryClickMain(index: any): void {
        let item: any = this.categoryList[index]
        console.log(item)
        this.categoryActive = index;
        let CategoryID = item.ID
        let data = {
          PageID: 1,
          PageSize: 10,
          CategoryID: CategoryID
        }
			  request(ProductPaiListGet, data).then((res: any) => {
					let subCategoryList = res.ProductList
					subCategoryList.map((item: any) => {
						item.HistoryActive = item.HistoryActive === 0 ? '手动举牌' : '自动举牌'
						item.HistorySales = item.HistorySales === 0 ? '十元区' : ''
						item.HistoryTimes = item.HistoryTimes === 0 ? '' : '定时开始'
						item.ProductPrimeCost = item.ProductPrimeCost === 0 ? '参加竞拍' : '参加下一期'
					})
					this.subCategoryList = subCategoryList
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
		width: 25%;
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
		width: 75%;
	}

	.nav-right-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 220upx;
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
		width: 100%;
		margin-left: 10upx;
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
		width: 96upx;
		font-size: 24upx;
		line-height: 1.6;
		text-align: center;
		margin-right: 10upx;
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
