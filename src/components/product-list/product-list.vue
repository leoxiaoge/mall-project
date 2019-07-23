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
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
export default Vue.extend({
  components: {
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
					let date1 = item.Active.ActiveEndTime;  //开始时间
          let date2 = new Date();    //结束时间
          let date3 = date2.getTime() - new Date(date1).getTime();   //时间差的毫秒数      
          let subMinutes = Math.floor( date3/(60*1000) ) //获取总共的分钟差
          //计算出相差天数
          let days = Math.floor(date3/(24*3600*1000))
          //计算出小时数
          let leave1 = date3%(24*3600*1000)    //计算天数后剩余的毫秒数
          let hours = Math.floor(leave1/(3600*1000))
          //计算相差分钟数
          let leave2 = leave1%(3600*1000)        //计算小时数后剩余的毫秒数
          let minutes = Math.floor(leave2/(60*1000))
          //计算相差秒数
          let leave3 = leave2%(60*1000)      //计算分钟数后剩余的毫秒数
					let seconds = Math.round(leave3/1000)
					item.Active.day = days
					item.Active.hour = hours
					item.Active.minute = minutes
					item.Active.second = seconds
          console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
				})
				console.log(list)
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
		padding: 0 14upx;
		font-size: 20upx;
		color: #fff;
		background-color: #fe7f00;
		border-radius: 100upx;
	}
</style>