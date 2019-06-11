<template>
	<view>
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
    <!-- 滚动公告 -->
    <view class="uni-swiper-msg">
			<view class="uni-swiper-msg-icon">
				<image src="https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png" mode="widthFix"></image>
			</view>
			<swiper vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in msg" :key="index">
					<navigator>{{item}}</navigator>
				</swiper-item>
			</swiper>
	  </view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
      duration: 500,
      

      swiper:[{
        images: ''
      }],
      msg : [
        '恭喜 小明同学 以 ￥0.86 拍得美的空调...',
        '恭喜 xtihi 以 ￥4.8 拍得大疆无人机...',
				'恭喜 小明同学 以 ￥0.86 拍得美的空调...',
				'恭喜 xtihi 以 ￥4.8 拍得大疆无人机...',
				'恭喜 小明同学 以 ￥0.86 拍得美的空调...'
			]
		};
	},
	methods: {
		getLocation: function() {
			uni.request({
				url: "/rest.ashx",
				success: res => {}
			});
		}
	}
};
</script>

<style>
</style>