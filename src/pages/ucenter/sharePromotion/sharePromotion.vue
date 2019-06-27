<template>
	<view class="content">
    <view class="teng-share">
			<view class="teng-share-content">
				<view class="teng-share-code">
					<image :src="code" />
				</view>
				<view class="teng-share-list">
					<view class="teng-share-text">
						<image :src="wechat" />
						<view class="teng-share-list-text">微信好友</view>
					</view>
					<view class="teng-share-text">
						<image :src="circle" />
						<view class="teng-share-list-text">朋友圈</view>
					</view>
					<view class="teng-share-text">
						<image :src="qq" />
						<view class="teng-share-list-text">QQ</view>
					</view>
					<view class="teng-share-text">
						<image :src="copy" />
						<view class="teng-share-list-text">复制地址</view>
					</view>
				</view>
			</view>
		</view>
		<view class="teng-view-commission">
			<text>查看我的佣金</text>
			<text>></text>
		</view>
		<view class="teng-redeem">
			<button class="btn redeem-btn">积分兑换</button>
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
				code: '/static/icon/icon_share_code.png',
				wechat: '/static/icon/icon_share_wechat.png',
				circle: '/static/icon/icon_share_circle.png',
				qq: '/static/icon/icon_share_qq.png',
				copy: '/static/icon/icon_share_copy.png'
			}
		},
		onLoad(options) {
			this.getData()
      console.log('onLoad', options)
		},
		methods: {
			getData() {
				let data = {
					
        }
		  	request(ProductPaiListGet, data).then((res: any) => {
          console.log(res)
        })
			}
		}
	})
</script>

<style>

  .teng-share {
    padding: 40upx 60upx;
		border-radius: 10upx;
	}

	.teng-share-content {
		background-color: #fff;
		padding: 40upx 60upx;
	}

	.teng-share-code {
		width: 460upx;
		height: 460upx;
		text-align: center;
		margin: 10upx 20upx 40upx 20upx;
	}

	.teng-share-list {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
	}

	.teng-share-text {
		text-align: center;
	}

	.teng-share-text image {
		width: 68upx;
		height: 68upx;
	}

	.teng-share-list-text {
		font-size: 24upx;
		color: #7a7a7a;
	}

	.teng-view-commission {
		text-align: center;
		margin-bottom: 40upx;
	}

	.teng-redeem button {
		font-size: 36upx;
		color: #fff;
		background-color: #fe7f00;
		border-radius: 100upx;
		margin: 0 60upx;
	}
</style>
