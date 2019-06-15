<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="uni-product-list">
			<scroll-view scroll-x class="list">
        <view class="item" v-for="(item,index) in product" :key="index">
          <view class="teng-image-view">
				  	<image class="uni-product-image img" :src="item.image"></image>
				  </view>
				<view class="uni-product-title">{{item.title}}</view>
				<view class="uni-product-price">
					<text class="uni-product-price">￥{{item.favourPrice}}</text>
				</view>
        <view class="uni-product-time">
          <!-- 倒计时 -->
		    	<uni-countdown :original="true" :hour="12" :minute="12" :second="12" />
        </view>
        </view>
      </scroll-view>
		</view>
	</view>
</template>

<script>
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
      return {}
    },
    computed: {
			product() {
        console.log(this.options)
        let list = this.options
				return list
      }
    },
    methods: {
      
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
