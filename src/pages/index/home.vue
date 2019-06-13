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
						<swiper-item>
							<view class="swiper-item">A</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
    <!-- 分类导航 -->
		<uni-grid :options="list" :show-border="false" :show-out-border="false" :column-num="4" />
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
import uniGrid from '@/components/uni-grid/uni-grid.vue'
import productList from '@/components/product-list/product-list.vue'
import productListBeing from '@/components/product-list-being/product-list-being.vue'
import { navigateTo } from '../../common/utils/util';
export default {
  components: {
    uniGrid,
    productListBeing,
    productList
	},
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
      duration: 500,
      
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
        images: ''
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
	methods: {
		getLocation: function() {
			uni.request({
				url: "/rest.ashx",
				success: res => {}
			})
    },
    noticeList() {
      navigateTo('../mall/notice/notice')
    }
	}
};
</script>

<style>
  .notice-more {
    width: 80upx;
    color: #6a6a6a;
    border-left: 4upx solid #f4f4f4;
    padding-left: 20upx;
  }
</style>