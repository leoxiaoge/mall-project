<template>
	<view class="content">
    <image class="logo" src="../../static/logo.png"></image>
   	<view>
      <text class="title" @click="openLink">{{title}}</text>
    </view>
		<!-- 技师|项目 -->
		<view class="">
			
		</view>
		<share></share>
	</view>
</template>

<script lang="ts">
	import Vue from 'vue'
	export default Vue.extend({
		data() {
			return {
				loadModal: false,
				title: '自助服务'
			}
		},
		onLoad() {
			console.log('onLoad')
		},
		onShow() {
			console.log('onShow')
		},
		onShareAppMessage() {
			return {
				title: '魔术师',
				path: '/pages/index/index'
			}
		},
		methods: {
			openLink() {
				uni.navigateTo({
          url: "../service/reward/reward"
        })
			}
		}
	});
</script>

<style>
	.content {
		text-align: center;
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
