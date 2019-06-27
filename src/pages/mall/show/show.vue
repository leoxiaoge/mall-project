<template>
	<view class="content">
    <view class="teng-show-order-list" v-for="(item, index) in orderList" :key="index">
			<view class="teng-show-userinfo">
				 <view class="teng-show-user">
			  	<image class="logo" :src="item.UserFace" />
			  </view>
				<view class="teng-show-title">
					<view class="teng-show-name">{{item.UserNick}}</view>
					<view class="teng-show-time">{{item.Updated}}</view>
				</view>
			</view>
			<view class="teng-show-order">
				<view class="teng-show-order-images">
					<image :src="item.ProductPicList[0]" />
				</view>
				<view class="teng-show-order-content">
					<view class="teng-show-order-content-title">{{item.ProductName}}</view>
					<view class="teng-show-order-content-date">成交时间：{{item.Created}}</view>
					<view class="teng-show-order-content-price">
						<text>成交价：</text>
						<text class="teng-show-order-content-price-text teng-original">{{item.OrderMoneys}}</text>
					</view>
				</view>
			</view>
			<view class="teng-show-content">
				<view class="teng-show-content-text">{{item.OrderComment.Comment}}</view>
			</view>
			<view class="teng-show-content-images">
				<view class="teng-show-content-image" v-for="(i, idx) in item.OrderComment.CommentPicList" :key="idx">
					<image :src="i" :data-src="i" :data-urls="item.OrderComment.CommentPicList" @tap="previewImage" />
				</view>
			</view>
		</view>
		<uni-load-more :status="status" :content-text="contentText" />
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { OrderDryingListGet } from '@/common/config/api'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	export default Vue.extend({
		components: {
			uniLoadMore
		},
		data() {
			return {
				PageID: 1,
				PageSize: 10,
				orderList: [],
				reload: false,
				status: '',
				Totals: 0,
				contentText: {
					contentdefault: '',
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多数据了'
				}
			}
		},
		onLoad(options) {
      console.log('onLoad', options)
      this.getOrderDryingList()
		},
		onPullDownRefresh() {
			this.reload = true
			this.PageID = 1
			this.getOrderDryingList()
		},
		onReachBottom() {
			let orderList: any = this.orderList
			if (orderList.length < this.Totals) {
				//说明已有数据，目前处于上拉加载
				this.PageID++
				this.status = 'loading'
				this.reload = false
				this.status = 'more'
        this.getOrderDryingList()
			} else if (orderList.length === this.Totals) {
				this.status = 'nomore'
			}
		},
		methods: {
			getOrderDryingList() {
				let PageID = this.PageID
				let PageSize = this.PageSize
				let data = {
          PageID: PageID,
					PageSize: PageSize
				}
				request(OrderDryingListGet, data).then((res: any) => {
					this.orderList = this.reload ? res.OrderList : this.orderList.concat(res.OrderList)
					this.Totals  = res.Totals
					uni.stopPullDownRefresh()
					console.log(this.orderList)
				})
			},
			previewImage(e: any) {
				let current: any = e.target.dataset.src
				console.log(current)
				let urls: any = e.target.dataset.urls
				console.log(urls)
				uni.previewImage({
					urls: urls
				})
			}
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
		font-size: 32upx;
	}

	.teng-show-content {
		padding: 20upx 0
	}

	.teng-show-content-text {
		font-size: 30upx;
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
