<template>
	<view class="content">
		<view class="uParse">
			<uParse :content="article" @preview="preview" @navigate="navigate" />
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
import uParse from "@/components/uParse/src/wxParse.vue";
var htmlString = `
<img src="http://api.tengpaisc.com/upload/4692acf65f67e39412e2890787911f6.jpg" />
    `;
export default Vue.extend({
	components: {
		uParse
	},
	data() {
		return {
			article: htmlString
		};
	},
	onLoad(options: any) {
		console.log("onLoad", options);
	},
	methods: {
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
page {
	background-color: #fff;
}
</style>