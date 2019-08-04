<template>
	<view class="content">
		<view class="teng-share">
			<view class="teng-share-content">
				<view class="teng-share-code" @click="preview(code, code)">
					<img :src="code" />
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="teng-share-list">
					<button class="teng-share-text" open-type="share">
						<img :src="wechat" />
						<view class="teng-share-list-text">一键转发好友</view>
					</button>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<view class="teng-redeem">
			<button class="btn redeem-btn" @click="exchange">积分兑换</button>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo, previewImage } from "@/common/utils/util";
import { GetWxacode } from "@/common/config/api";
export default Vue.extend({
	data() {
		return {
			code: [],
			wechat: "/static/icon/icon_share_wechat.png"
		};
	},
	onLoad(options: any) {
		this.getWxacode();
	},
	onShareAppMessage(res) {
		if (res.from === "button") {
			console.log(res.target);
		}
		return {
			title: "腾拍商场",
			path: "/pages/index/home"
		};
	},
	methods: {
		getWxacode() {
			let data = {};
			request(GetWxacode, data).then((res: any) => {
				this.code = res.CodeValue;
			});
		},
		preview(current: any, urls: any) {
			urls = [urls]
			console.log(urls)
			previewImage(current, urls);
		},
		exchange() {
			navigateTo("../../mall/exchange/exchange");
		}
	}
});
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

.teng-share-code img {
	width: 100%;
	height: 100%;
}

.teng-share-list {
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
}

.teng-share-text {
	text-align: center;
	background-color: #fff;
}

.teng-share-text img {
	width: 68upx;
	height: 68upx;
}

.teng-share-list-text {
	font-size: 24upx;
	color: #7a7a7a;
}

.teng-redeem button {
	font-size: 36upx;
	color: #fff;
	background-color: #fe7f00;
	border-radius: 100upx;
	margin: 0 60upx;
}
</style>
