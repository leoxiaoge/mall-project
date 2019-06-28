<template>
	<view class="container">
    <view class="i-comment-item" v-for="(item, indexes) in orderList" :key="indexes">
			<view class="i-comment-date">{{item.OrderComment.CreatedDate}}</view>
			<view class="i-comment-title">{{item.ProductName}}</view>
			<view class="i-comment-comment">{{item.OrderComment.Comment}}</view>
			<view class="i-comment-pic">
				<view class="i-comment-pic-item" v-for="(i, index) in item.ProductPicList" :key="index">
					<img :src="i|url" :data-src="i" :data-urls="item.ProductPicList" @tap="previewImage" />
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
		onLoad(options: any) {
			this.getOrderDryingList()
      console.log('onLoad', options)
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
			} else {
				this.status = 'nomore'
			}
			console.log(this.orderList)
		},
		methods: {
			getOrderDryingList() {
				let PageID = this.PageID
				let PageSize = this.PageSize
				let UserInfo: any = uni.getStorageSync('UserInfo')
				let UserID = UserInfo.ID
				let data = {
					PageID: PageID,
					PageSize: PageSize,
					UserID: UserID
        }
		  	request(OrderDryingListGet, data).then((res: any) => {
					this.orderList = this.reload ? res.OrderList : this.orderList.concat(res.OrderList)
					this.Totals  = res.Totals
					uni.stopPullDownRefresh()
				})
			},
			previewImage(e: any) {
				console.log(e)
				let current: any = e.currentTarget.dataset.src
				let urlString: any = e.currentTarget.dataset.urls
				let urls: any = urlString.split(",")
				uni.previewImage({
					current: current,
					urls: urls
				})
			}
		}
	})
</script>

<style>
	.i-comment-item {
		margin: 0 30upx;
		padding: 10upx 0;
		border-bottom: 2upx solid #f4f4f4;
	}

	.i-comment-date {
		font-size: 28upx;
		color: #616161;
	}

	.i-comment-title {
		font-size: 32upx;
		color: #333232;
	}

	.i-comment-comment {
		font-size: 28upx;
		color: #333232;
	}

	.i-comment-pic {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.i-comment-pic-item {
		width: calc(33.33% - 2px);
		margin: 20upx;
		padding: 20upx;
	}

	.i-comment-pic-item img {
		width: 162upx;
		height: 162upx;
	}
</style>
