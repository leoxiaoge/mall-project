<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="uni-product-list">
			<view class="uni-product" v-for="(item,index) in product" :key="index">
				<view class="i-product-content" @click="productDetailsTo(item.ID, item.Active.ID)">
	        <view class="image-view">
						<image class="uni-product-image" :src="item.ProductPicList[0]"></image>
					</view>
					<view class="uni-product-title product-title">{{item.ProductTitle}}</view>
					<view class="uni-product-price" v-if="item.Active.PrevActiveMoney > 0">
						<text class="uni-product-text">上期成交：</text>
						<text class="uni-product-price-original">￥{{item.Active.PrevActiveMoney}}</text>
					</view>
					<view class="uni-product-title uni-product-price">
						<text class="uni-product-text">{{item.Active.LastBillUserName}}</text>
					</view>
				</view>
				<view class="uni-product-prompt">
					<view class="uni-product-time">
						<!-- 倒计时 -->
						<text class="uni-product-away">离开拍</text>
						<uni-countdown :hour="item.Active.hour" :minute="item.Active.minute" :second="item.Active.minute" />
					</view>
					<view class="uni-product-button">
						<button class="btn" @click="productDetailsTo(item.ID, item.Active.ID)">马上参与</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from '@/common/utils/util';
import { HomeProductListGet } from '@/common/config/api'
import pageHead from "@/components/page-head/page-head.vue";
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
export default Vue.extend({
  components: {
		pageHead,
    uniCountdown
	},
  name: 'productList',
	props: {
		options: {
			type: Array
		},
    title: {
			type: String,
			default: '即将竞拍'
		}
	},
	data() {
		return {
			
		};
  },
  computed: {
			product() {
				let list: any = this.options
				list.map((item: any) => {
					let date: number = item.Active.StartCountCown;
          let day: any = date/(1000 * 60 * 60 * 24)
          let days = parseInt(day);
          let hour: any = (date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          let hours = parseInt(hour);
          let minute: any = (date % (1000 * 60 * 60)) / (1000 * 60)
          let minutes = parseInt(minute);
          let second: any = (date % (1000 * 60)) / 1000;
          let seconds = parseInt(second);
					item.Active.day = days
					item.Active.hour = hours
					item.Active.minute = minutes
					item.Active.second = seconds
          console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
				})
				return list
      }
    },
    methods: {
      productDetailsTo(id: any, activeID: any) {
				navigateTo('../mall/productDetailsPage/productDetailsPage?id=' + id + '&activeID=' + activeID)
			}
    }
});
</script>

<style>

  .uni-product-prompt {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 14upx;
	}

	.product-title {
		padding: 0 10upx;
	}

	.uni-product-price {
		text-align: center;
	}
	
	.uni-product-away {
		margin-right: 2upx;
	}

	.uni-product-time {
		display: flex;
		align-items: center;
		padding-right: 2upx;
	}

	.i-product-content {
		border-bottom: 2upx dashed #f4f4f4;
	}

	.uni-product-button button{
		margin: 0;
		padding: 10upx 14upx;
		font-size: 28upx;
		line-height: 1.4;
		color: #fff;
		background-color: #fe7f00;
		border-radius: 40upx;
	}
</style>