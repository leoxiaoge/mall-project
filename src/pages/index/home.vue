<template>
	<view class="content">
    <!-- 轮播 -->
		<view class="i-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper
						class="swiper-box"
						:indicator-dots="indicatorDots"
						:autoplay="autoplay"
						:interval="interval"
						:duration="duration"
            :circular="circular"
            :indicator-active-color="indicatorActiveColor"
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
    <!-- 滚动公告 -->
    <view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<image src="/static/icon/icon_notice.png" mode="widthFix"></image>
			</view>
			<swiper class="uni-swiper-wrapper" vertical="true" autoplay="true" circular="true" interval="3000" display-multiple-items="2">
        <block v-for="(item, index) in LastTranActiveList" :key="index">
          <swiper-item>
            <view class="i-item-msg">
              <text class="teng-notice-content">恭喜<text class="i-notice-original">{{item.ProductName}}</text>以<text class="i-notice-original">¥{{item.OrderMoney}}</text>元拍得</text>
            </view>
          </swiper-item>
        </block>
			</swiper>
      <view class="notice-more" @click="noticeList">更多</view>
	  </view>
    <!-- 正在竞拍 -->
    <product-list-being :options="productList" />
    <!-- 即将开拍 -->
    <product-list :options="productListIng" />
	</view>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo, formatTime } from '@/common/utils/util'
  import { AdsListGet, LastTransactionListGet, HomeProductListGet } from '@/common/config/api'
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
        circular: true,
        indicatorActiveColor: '#fe7f00',
        
        productList: [], // 正在竞拍列表
        productListIng: [], // 即将开拍列表
        productListData: [], // 正在竞拍新列表
        swiperGridHeight: '0px',
        swiperGridWidth: '100%',
        swiper:[],
        LastTranActiveList: [], // 最新成交列表

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
        newTime: ''
      }
    },
    onLoad() {
      // this.newTime = formatTime(new Date());
      // console.log(new Date())
      this.getAdsList()
      this.getLastTransactionList()
      this.getHomeProductList()
      this.getHomeProductListIng()
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
      // 获取最新成交列表
      getLastTransactionList() {
        let data = {}
        request(LastTransactionListGet, data).then((res: any) => {
          console.log(res)
          this.LastTranActiveList = res.LastTranActiveList
        })
      },
      // 首页获取正在竞拍与即将开拍的商品列表
      // 查询类型 : home1=首页的正在竞拍列表, home2=首页的即将开拍列表
      getHomeProductList() {
        let data = {
          PageID: 1,
          PageSize: 10,
          SearchType: 'home1'
        }
        request(HomeProductListGet, data).then((res: any) => {
          console.log(res.ProductList)
          this.productList = res.ProductList
        })
      },
      getHomeProductListIng() {
        let data = {
          PageID: 1,
          PageSize: 10,
          SearchType: 'home2'
        }
        request(HomeProductListGet, data).then((res: any) => {
          console.log(res)
          this.productListIng = res.ProductList
        })
      },
      getPastTransactionsList() {
        let data = {
          PageID: 1,
          PageSize: 10,
          SearchType: 'home2'
        }
        request(HomeProductListGet, data).then((res: any) => {
          console.log(res)
          this.productListIng = res.ProductList
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
      }
    }
	})
</script>

<style>

  .uni-swiper-dots-horizontal {
    position: absolute;
    font-size: 0;
    margin-bottom: 40upx;
    transform-origin:20% 40%;
  }

  .teng-option {
    background-color: #fff;
  }

  .teng-options {
    position: relative;
    top: -14upx;
    background-color: #fff;
    padding-top: 28upx;
    border-radius: 50%
  }

  .teng-options-grid {
    background-color: #fff;
  }

  .uni-swiper-msg {
    border-top: 2upx solid #f4f4f4;
  }

  .uni-swiper-wrapper {
    border-left: 2upx solid #f4f4f4;
  }

  .i-notice-original {
    color: #fe7f00
  }

  .notice-more {
    width: 120upx;
    color: #6a6a6a;
    border-left: 4upx solid #f4f4f4;
    padding-left: 20upx;
    z-index: 10;
  }

  .i-item-msg {
    word-break: break-all;
    display: -webkit-box;
    overflow: hidden;
    line-height:1.5;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1
  }
</style>