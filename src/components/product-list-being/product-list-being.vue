<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="uni-product-list">
			<scroll-view scroll-x class="list" @scrolltolower="scrolltolower">
        <view class="product-item" v-for="(item,index) in product" :key="index">
          <view class="" @click="productDetailsTo(item.ID, item.Active.ID)">
            <view class="teng-image-view">
              <image class="uni-product-image img" :src="item.ProductPicList[0]"></image>
            </view>
            <view class="product-price-title">
              <view class="product-price-text uni-ellipsis">{{item.ProductTitle}}</view>
            </view>
            <view class="product-price">
              <view class="product-price-text">￥{{item.ProductPrice}}</view>
            </view>
            <view class="product-price">
              <view class="product-price-text">{{item.Active.LastBillUserName}}</view>
            </view>
          </view>
          <view class="uni-product-time">
            <!-- 倒计时 -->
            <uni-countdown :original="true" :hour="item.Active.hour" :minute="item.Active.minute" :second="item.Active.second" />
          </view>
        </view>
      </scroll-view>
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
  name: 'productListBeing',
	props: {
		options: {
			type: Array
		},
    title: {
			type: String,
			default: '正在竞拍'
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
			navigateTo('../mall/productDetailsPage/productDetailsPage?id=' + id + '&activeID='+ activeID)
    },
    scrolltolower() {
      this.$emit('lower');
    }
  }
});
</script>

<style>

  .teng-image-view {
    height: 140upx;
    margin: 12upx 0;
    padding: 0 30upx;
  }

	.list {
    white-space:nowrap;
    background-color: #fff
  }

  .product-item {
    display: inline-block;
    padding-left: 20upx;
    overflow: hidden;
    width: 33.33%;
  }

  .product-price {
    text-align: center;
  }

  .product-price-text {
    line-height: 1.8;
    padding: 0 20upx;
  }

  .uni-product-time {
    text-align: center;
  }

  .img {
    width: 100%;
    height: 100%;
    margin: 10upx 0
  }
</style>
