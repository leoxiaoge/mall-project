<template>
	<view class="container">
    <image class="logo" src="../../../static/logo.png"></image>
   	<view>
      <text class="title">{{title}}</text>
    </view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { ActiveBillListGet } from '@/common/config/api'
	export default Vue.extend({
		data() {
			return {
				title: '服务'
			}
		},
		onLoad(options) {
			this.getActiveBillList()
      console.log('onLoad', options)
		},
		methods: {
			getActiveBillList() {
				let data = {
          ActiveID: 1,
          PageID: 1,
          PageSize: 10
        }
		  	request(ActiveBillListGet, data).then((res: any) => {
          console.log(res)
        })
			}
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
