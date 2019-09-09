<template>
	<view class="content">
		<view class="parse">
			<uParse :content="article" @preview="preview" @navigate="navigate" />
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo, onShareAppMessage } from "@/common/utils/util";
import { ProductGet } from "@/common/config/api";
import uParse from "@/components/uParse/src/wxParse.vue";
export default Vue.extend({
	components: {
		uParse
	},
	data() {
		return {
			productID: "",
			article: ""
		};
	},
	onLoad(options: any) {
		this.productID = options.productID;
		this.getProduct();
		console.log("onLoad", options);
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		getProduct() {
			let ProductID = this.productID;
			let data = {
				ProductID: ProductID
			};
			request(ProductGet, data).then((res: any) => {
				this.article = res.Product.ProductDesc;
			});
		},
		preview(src: any, e: any) {
			// do something
			console.log("src: " + src);
		},
		navigate(href: any, e: any) {
			// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
			console.log("href: " + href);
			uni.showModal({
				content: "点击链接为：" + href,
				showCancel: false
			});
		}
	}
});
</script>

<style>
</style>