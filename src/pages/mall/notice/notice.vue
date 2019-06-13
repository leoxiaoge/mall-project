<template>
	<view class="content">
    <view class="" v-for="(item, index) in list" :key="index">
      <view class="">
        <view class="">
          <text class="">恭喜<text class="">{{item.name}}</text>以<text class="">{{item.price}}</text>元拍得</text>
        </view>
        <view class="">
          <text class="">{{item.title}}</text>
          <text class="">({{item.state}})</text>
        </view>
      </view>
      <view class="">
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
          state: '自动举牌',
          date: '2019-06-13 23:12:53'
        },{
          name: '李四',
          price: '0.88',
          title: '相机',
          state: '人工举牌',
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
	.content {
		text-align: center;
		height: 400upx;
	}
  .logo{
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
  }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
