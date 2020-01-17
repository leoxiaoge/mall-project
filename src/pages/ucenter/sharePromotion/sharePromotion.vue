<template>
	<view class="content">
		<view class="teng-share">
			<view class="teng-share-head">
				<view class="teng-share-head-image">
					<image :src="commission" />
				</view>
				<view class="teng-share-head-text">
					<text>{{shareTitle}}</text>
				</view>
			</view>
			<view class="teng-share-content">
				<!-- #ifndef APP-PLUS -->
				<view class="teng-share-code" @click="preview(code, code)">
					<view class="teng-share-code-img">
						<img :src="code" v-if="code" mode="widthFix" />
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<view class="teng-share-code">
					<view class="teng-share-code-img">
						<img :src="code" v-if="code" mode="widthFix" />
					</view>
				</view>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="teng-share-list">
					<view class="teng-share-text">
						<image :src="wechat" />
						<button class="teng-share-list-text" open-type="share">一键转发好友</button>
					</view>
				</view>
				<!-- #endif -->
			</view>
			<view class="teng-commission">
				<button class="teng-commission-button" @click="commissionTo">我的佣金</button>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	previewImage,
	upload,
	onShareAppMessage
} from "@/common/utils/util";
import {
	GetWxacode,
	GetSystemConfig,
	GetShareTitle,
	OrderDryingUpload
} from "@/common/config/api";
export default Vue.extend({
	data() {
		return {
			commissionValue: "",
			shareTitle: "",
			code: "",
			commission: "/static/icon/icon_commission.png",
			wechat: "/static/icon/icon_share_wechat.png"
		};
	},
	onLoad(options: any) {},
	onShow() {
		this.getSystemConfig();
		this.getShareTitle();
	},
	onPullDownRefresh() {
		this.getSystemConfig();
		this.getShareTitle();
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		async getSystemConfig() {
			let res: any = await this.getWxacode();
			this.code = res.CodeValue;
			let data = {};
			request(GetSystemConfig, data).then((res: any) => {
				this.commissionValue = res.ConfigValue.CommissionValue;
			});
		},
		getShareTitle() {
			let data = {};
			request(GetShareTitle, data).then((res: any) => {
				this.shareTitle = res.ShareTitle;
			});
		},
		getWxacode() {
			return new Promise((resolve, reject) => {
				let data = {};
				request(GetWxacode, data).then((res: any) => {
					resolve(res);
				});
			});
		},
		preview(current: any, urls: any) {
			urls = [urls];
			previewImage(current, urls);
		},
		commissionTo() {
			navigateTo("../commission/commission");
		}
	}
});
</script>

<style>
.teng-share {
	padding: 30upx 30upx;
	border-radius: 10upx;
}

.teng-share-head {
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	background-color: #fe7f00;
	padding: 30upx 80upx;
}

.teng-share-head-image {
	display: flex;
	align-items: center;
}

.teng-share-head-image image {
	width: 100upx;
	height: 100upx;
}

.teng-share-head-text {
	margin-left: 30upx;
}

.teng-share-head-text text {
	color: #fff;
}

.teng-share-content {
	background-color: #fff;
	padding: 40upx 60upx;
}

.teng-share-code {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin: 10upx 0 40upx 0;
}

.teng-share-code-img {
	width: 500upx;
	height: 500upx;
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
	width: 88upx;
	height: 88upx;
}

.teng-share-list-text {
	font-size: 28upx;
	line-height: 2.4;
	color: #fff;
	background-color: #fe7f00;
	border-radius: 60upx;
	margin: 10upx 0;
	padding: 0 60upx;
}

.teng-commission {
	margin-top: 40upx;
}

.teng-commission-button {
	color: #fff;
	background-color: #fe7f00;
	border-radius: 100upx;
}
</style>
