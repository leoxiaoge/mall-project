<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="uni-product-list">
			<scroll-view scroll-x class="list" @scrolltolower="lower">
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
import pageHead from "@/components/page-head.vue";
import uniCountdown from '@/components/uni-countdown/uni-countdown.vue';
export default Vue.extend({
  components: {
    pageHead,
    uniCountdown
	},
  name: 'productListBeing',
	props: {
		options: {
			type: Array,
			default() {
				return [];
			}
		},
    title: {
			type: String,
			default: '正在竞拍'
		}
	},
	data() {
		return {
      PageCount: 1,
      pageNum: 1,
      pageSize: 10,
      productList: []
    };
  },
  created() {
    this.getHomeProductList();
  },
  computed: {
			product() {
        let list: any = this.productList
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
				return list
      }
    },
	methods: {
    productDetailsTo(id: any, activeID: any) {
			navigateTo('../mall/productDetailsPage/productDetailsPage?id=' + id + '&activeID='+ activeID)
    },
    getHomeProductList() {
      let pageNum = this.pageNum;
      let pageSize = this.pageSize
      let data = {
        PageID: pageNum,
        PageSize: pageSize,
        SearchType: 'home1'
      }
      request(HomeProductListGet, data).then((res: any) => {
        console.log(res.ProductList)
        if (pageNum === 1) {
          this.productList = [];
        }
        this.productList = this.productList.concat(res.ProductList);
        this.PageCount = res.PageCount;
      })
    },
    lower() {
      console.log('lower')
      if (this.pageNum < this.PageCount) {
        this.pageNum++;
        this.getHomeProductList();
      }
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
    margin-left: 30upx;
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
