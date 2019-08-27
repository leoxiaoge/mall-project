<template>
	<view class="container">
		<image class="logo" src="../../../static/logo.png" />
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo, onShareAppMessage } from "@/common/utils/util";
import { ProductPaiListGet } from "@/common/config/api";
export default Vue.extend({
	data() {
		return {
			title: "服务"
		};
	},
	onLoad(options) {
		this.getData();
		console.log("onLoad", options);
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		getData() {
			let data = {};
			request(ProductPaiListGet, data).then((res: any) => {
				console.log(res);
			});
		}
	}
});
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
}
.logo {
	height: 200upx;
	width: 200upx;
	margin-top: 200upx;
}
.title {
	font-size: 36upx;
	color: #8f8f94;
}
</style>
