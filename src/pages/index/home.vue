<template>
	<view class="content">
    <!-- 轮播 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper
						class="swiper"
						:indicator-dots="indicatorDots"
						:autoplay="autoplay"
						:interval="interval"
						:duration="duration"
					>
						<swiper-item v-for="(item, index) in swiper" :key="index">
              <image :src="item.AdPicUrl" mode="aspectFill" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
    <!-- 分类导航 -->
    <view class="teng-option">
      <view class="teng-options"></view>
      <view class="teng-options-grid">
        <uni-grid :options="list" :show-border="false" :show-out-border="false" :column-num="4" />
      </view>
    </view>
    <!-- <view class="" @click="test">test</view> -->
    <!-- 滚动公告 -->
    <view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<image src="/static/icon/icon_notice.png" mode="widthFix"></image>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in msg" :key="index">
					{{item}}
				</swiper-item>
			</swiper>
      <view class="notice-more" @click="noticeList">更多</view>
	  </view>
    <!-- 正在竞拍 -->
    <product-list-being :options="datalist" />
    <!-- 即将开拍 -->
    <product-list :options="data" />
	</view>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
  import { AdsListGet, HomeProductListGet } from '@/common/config/api'
  import uniGrid from '@/components/uni-grid/uni-grid.vue'
  import productList from '@/components/product-list/product-list.vue'
  import productListBeing from '@/components/product-list-being/product-list-being.vue'
  export default Vue.extend({
		components: {
      uniGrid,
      productListBeing,
      productList,
    },
    data() {
      return {
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        
        productList: [],
        
        swiperGridHeight: '0px',
        swiperGridWidth: '100%',
        list: [{
          image: '/static/icon_experience.png',
          text: '体验区',
          navigateTo: 'experience'
        },
        {
          image: '/static/icon_show.png',
          text: '晒单',
          navigateTo: 'show'
        },
        {
          image: '/static/icon_exchange.png',
          text: '兑换',
          navigateTo: 'exchange'
        },
        {
          image: '/static/icon_guide.png',
          text: '新手指南',
          navigateTo: 'guide'
        }],

        swiper:[{
          images: '/static/icon_show.png'
        },{
          images: '/static/icon_show.png'
        },{
          images: '/static/icon_show.png'
        }],
        msg : [
          '恭喜 小明同学 以 ￥0.86 拍得美的空调...',
          '恭喜 xtihi 以 ￥4.8 拍得大疆无人机...',
          '恭喜 小明同学 以 ￥0.86 拍得美的空调...',
          '恭喜 xtihi 以 ￥4.8 拍得大疆无人机...',
          '恭喜 小明同学 以 ￥0.86 拍得美的空调...'
        ],
        datalist: [
          {
            image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
            title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
            originalPrice: 9999,
            favourPrice: 8888,
            tip: '自营'
          },
          {
            image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
            title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
            originalPrice: 9999,
            favourPrice: 8888,
            tip: '自营'
          },
          {
            image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
            title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
            originalPrice: 9999,
            favourPrice: 8888,
            tip: '自营'
          },
          {
            image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
            title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
            originalPrice: 9999,
            favourPrice: 8888,
            tip: '自营'
          }
        ],
        data: [
          {
                      image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product1.jpg',
                      title: 'Apple iPhone X 256GB 深空灰色 移动联通电信4G手机',
                      originalPrice: 9999,
                      favourPrice: 8888,
                      tip: '自营'
                  },
                  {
                      image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product2.jpg',
                      title: 'Apple iPad 平板电脑 2018年新款9.7英寸',
                      originalPrice: 3499,
                      favourPrice: 3399,
                      tip: '优惠'
                  },
                  {
                      image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product3.jpg',
                      title: 'Apple MacBook Pro 13.3英寸笔记本电脑（2017款Core i5处理器/8GB内存/256GB硬盘 MupxT2CH/A）',
                      originalPrice: 12999,
                      favourPrice: 10688,
                      tip: '秒杀'
                  },
                  {
                      image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product4.jpg',
                      title: 'Kindle Paperwhite电纸书阅读器 电子书墨水屏 6英寸wifi 黑色',
                      originalPrice: 999,
                      favourPrice: 958,
                      tip: '秒杀'
                  },
                  {
                      image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product5.jpg',
                      title: '微软（Microsoft）新Surface Pro 二合一平板电脑笔记本 12.3英寸（i5 8G内存 256G存储）',
                      originalPrice: 8888,
                      favourPrice: 8288,
                      tip: '优惠'
                  },
                  {
                      image: 'https://img-cdn-qiniu.dcloud.net.cn/uploads/example/product6.jpg',
                      title: 'Apple Watch Series 3智能手表（GPS款 42毫米 深空灰色铝金属表壳 黑色运动型表带 MQL12CH/A）',
                      originalPrice: 2899,
                      favourPrice: 2799,
                      tip: '自营'
                  }
        ]
      };
    },
    onLoad() {
      this.getAdsList()
      this.getHomeProductList()
    },
    methods: {
      getAdsList() {
        let data = {
          AdName: '首页头部轮播'
        }
        request(AdsListGet, data).then((res: any) => {
          console.log(res)
          this.swiper = res.AdsList[0].AdsViewList
        })
      },
      // 首页获取正在竞拍与即将开拍的商品列表
      getHomeProductList() {
        let data = {
          PageID: 1,
          PageSize: 10,
          SearchType: 'home1'
        }
        request(HomeProductListGet, data).then((res: any) => {
          console.log(res)
          this.productList = res.ProductList
        })
      },
      getLocation: function() {
        uni.request({
          url: "/rest.ashx",
          success: res => {}
        })
      },
      noticeList() {
        navigateTo('../mall/notice/notice')
      },
      test() {
        navigateTo('../ucenter/helpAndFeedback/helpAndFeedback')
      }
    }
	})
</script>

<style>
  .teng-option {
    height: 210upx;
  }
  .teng-options {
    position: relative;
    top: -20upx;
    background-color: #fff;
    padding-top: 100upx;
    border-radius: 50%
  }

  .teng-options-grid {
    position: relative;
    top: -80upx;
    background-color: #fff;
  }

  .uni-swiper-msg {
    border-top: 2upx solid #f4f4f4;
  }

  .notice-more {
    width: 80upx;
    color: #6a6a6a;
    border-left: 4upx solid #f4f4f4;
    padding-left: 20upx;
    z-index: 10;
  }
</style>