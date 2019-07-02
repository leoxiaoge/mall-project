<template>
	<view>
    <mescroll-uni @down="downCallback" @up="upCallback">
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
        <uni-grid :options="list" :show-border="false" :show-out-border="false" :column-num="4" @click="listClick" />
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
    </mescroll-uni>
	</view>
</template>
<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo, formatTime } from '@/common/utils/util'
  import { AdsListGet, LastTransactionListGet, HomeProductListGet } from '@/common/config/api'
  import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
  import uniGrid from '@/components/uni-grid/uni-grid.vue'
  import productList from '@/components/product-list/product-list.vue'
  import productListBeing from '@/components/product-list-being/product-list-being.vue'
  
  export default Vue.extend({
		components: {
      MescrollUni,
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
        mescroll: []
      }
    },
    onLoad() {
      
    },
    methods: {
      /*下拉刷新的回调 */
      downCallback(mescroll: any) {
        // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
        this.getAdsList();
        this.getLastTransactionList();
        this.getLastTransactionList();
        this.mescroll = mescroll;
        mescroll.resetUpScroll();
      },
      /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
      upCallback(mescroll: any) {
        //联网加载数据
        this.getListDataFromNet(mescroll.num,mescroll.size,(curPageData: any) => {
            //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
            mescroll.endSuccess(curPageData.length);
            //设置列表数据
            console.log(curPageData)
            if (mescroll.num == 1) this.productListIng = []; //如果是第一页需手动制空列表
            this.productListIng = this.productListIng.concat(curPageData); //追加新数据
          },
          () => {
            //联网失败的回调,隐藏下拉刷新的状态
            mescroll.endErr();
          }
        );
      },
      /*联网加载列表数据
        实际项目以您服务器接口返回的数据为准,无需本地处理分页.
        * */
      async getListDataFromNet(
        pageNum: any,
        pageSize: any,
        successCallback: any,
        errorCallback: any
      ) {
        console.log(pageNum, pageSize);
        try {
          let productList: any = await this.getHomeProductList(pageNum, pageSize);
          this.productList = productList;
          let productListIng: any = await this.getHomeProductListIng(pageNum, pageSize);
          this.productListIng = productListIng;
          console.log("data", this.productListIng);
          //联网成功的回调
          successCallback && successCallback(productListIng);
        } catch (e) {
          //联网失败的回调
          errorCallback && errorCallback();
        }
      },
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
      getHomeProductList(pageNum: string, pageSize: string) {
        return new Promise((sesolve, reject) => {
					let data = {
            PageID: pageNum,
            PageSize: pageSize,
            SearchType: 'home1'
          }
          request(HomeProductListGet, data).then((res: any) => {
            console.log(res.ProductList)
            sesolve(res.ProductList)
          })
				})
      },
      getHomeProductListIng(pageNum: string, pageSize: string) {
        return new Promise((sesolve, reject) => {
					let data = {
            PageID: pageNum,
            PageSize: pageSize,
            SearchType: 'home2'
          }
          request(HomeProductListGet, data).then((res: any) => {
            console.log(res.ProductList)
            sesolve(res.ProductList)
          })
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
      },
      // grid页面
      listClick(item: any) {
        let navigate = `../mall/${item.navigateTo}/${item.navigateTo}`
        navigateTo(navigate)
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