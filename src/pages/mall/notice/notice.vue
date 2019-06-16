<template>
	<view class="content">
    <view class="teng-notice-list" v-for="(item, index) in list" :key="index">
      <view class="teng-notice-head">
        <view class="teng-notice-name">
          <text class="teng-notice-content">恭喜<text class="eng-notice-original">{{item.name}}</text>以<text class="eng-notice-original">¥{{item.price}}</text>元拍得</text>
        </view>
        <view class="teng-notice">
          <text class="teng-notice-title">{{item.title}}</text>
          <text class="teng-notice-status">({{item.status}})</text>
        </view>
      </view>
      <view class="teng-notice-time">
        {{item.date}}
      </view>
    </view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { ProductPaiListGet } from '@/common/config/api'
	export default Vue.extend({
		data() {
			return {
				list: [{
          name: '张三',
          price: '0.66',
          title: '美的空调',
          status: '自动举牌',
          date: '2019-06-13 23:12:53'
        },{
          name: '李四',
          price: '0.88',
          title: '相机',
          status: '人工举牌',
          date: '2019-06-12 23:12:53'
        }]
			}
		},
		onLoad(options) {
      console.log('onLoad', options)
      let data = {

      }
			request(ProductPaiListGet, data).then((res: any) => {
        console.log(res)
      })
		},
		methods: {

		}
	})
</script>

<style>
  page  {
    background-color: #fff
  }
  
  .teng-notice-list {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 0 30upx;
    padding: 20upx 0;
    border-bottom: 2upx solid #f4f4f4
  }

  .eng-notice-original {
    color: #fe7f00
  }

  .teng-notice-title {
    font-weight: 600;
  }

  .teng-notice-status {
    margin-left: 20upx;
  }

  .teng-notice-time {
    font-size: 18upx;
    color: #616161
  }
</style>
