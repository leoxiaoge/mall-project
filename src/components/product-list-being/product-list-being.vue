<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="uni-product-list">
			<scroll-view scroll-x class="list">
        <view class="item" v-for="(item,index) in product" :key="index">
          <view class="" @click="productDetailsTo(item.ID)">
            <view class="teng-image-view">
              <image class="uni-product-image img" :src="item.ProductPics | url"></image>
            </view>
            <view class="uni-product-title">{{item.ProductName}}</view>
            <view class="uni-product-price">
              <text class="uni-product-price">￥{{item.ProductPrice}}</text>
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

<script>
  import { request, navigateTo } from '@/common/utils/util'
  import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
  export default {
    components: {
      uniCountdown
	  },
    name: 'productListBeing',
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
      },
      title: {
				type: String,
				default: '正在竞拍'
			}
    },
    data() {
      return {
        
      }
    },
    computed: {
			product() {
        let list = this.options
				list.map(item => {
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
      productDetailsTo(id) {
				navigateTo('../mall/productDetailsPage/productDetailsPage?id=' + id)
			}
    }
};
</script>

<style>
  .uni-product-title {
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    line-height:1.5;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1
  }

  .teng-image-view {
    margin: 12upx 0;
  }

	.list {
    white-space:nowrap;
    background-color: #fff
  }

  .item {
    display: inline-block;
    width: 240upx;
    margin-left: 30upx;
    overflow: hidden;
    text-align: center
  }

  .img {
    width: 160upx;
    height: 120upx;
    margin: 10upx 0
  }
</style>
