<template>
	<view class="content">
    <image class="pay" src="https://api.tengpaisc.com/upload/icon_pay.png"></image>
   	<view>
      <text class="title">{{title}}</text>
    </view>
	</view>
</template>

<script lang="ts">
  import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				title: '充值成功！'
			}
		},
		onLoad() {
			console.log('onLoad')
		},
		methods: {
			
		}
	});
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
  .pay{
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
  }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
