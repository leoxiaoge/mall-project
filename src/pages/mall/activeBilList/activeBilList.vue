<template>
	<view class="container">
    <view class="i-bill" :class="(item.IsWin === 0?'':'i-active')" v-for="(item, index) in BillLists" :key="index">
			<view class="i-bill-image i-flex">
				<image :src="item.UserNick" />
				<view class="i-bill-user">{{item.UserMobile}}</view>
			</view>
			<view class="i-bill-IsWin" v-if="item.IsWin === 0">出局</view>
			<view class="i-bill-IsWin" v-else>预选</view>
			<view class="i-bill-province">{{item.Province}}{{item.City}}</view>
			<view class="i-bill-price">{{item.Price}}</view>
		</view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { ActiveBillListGet } from '@/common/config/api'
	export default Vue.extend({
		data() {
			return {
				id: '',
				BillList: [],

				BillLists: [{
					UserNick: '/static/icon_experience.png',
					UserMobile: 'dsd',
					Province: '广东',
					City: '深圳',
					Price: '125.6',
					IsWin: 0
				},{
					UserNick: '/static/icon_experience.png',
					UserMobile: '17688734674',
					Province: '广东',
					City: '深圳',
					Price: '125.6',
					IsWin: 1
				}]
			}
		},
		onLoad(options: any) {
			console.log('onLoad', options)
			this.id = options.id
			this.getActiveBillList()
		},
		methods: {
			getActiveBillList() {
				let ActiveID = this.id 
				let data = {
          ActiveID: ActiveID,
          PageID: 1,
          PageSize: 10
        }
		  	request(ActiveBillListGet, data).then((res: any) => {
					console.log(res)
					this.BillList = res.BillList
        })
			}
		}
	})
</script>

<style>
	.container {
		background-color: #fff;
		padding: 0 30upx;
	}

  .i-bill {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120upx;
		font-size: 32upx;
		line-height: 120upx;
		border-bottom: 2upx solid #f4f4f4;
	}

	.i-active {
		color: #fe7f00;
	}

	.i-bill-image {
		min-width: 260upx;
	}

	.i-bill-image image {
		width: 84upx;
		height: 84upx;
	}

	.i-bill-user {
		margin-left: 20upx;
	}
</style>
