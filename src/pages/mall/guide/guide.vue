<template>
	<view class="content">
		<view class="uParse">
			<uParse :content="article" @preview="preview" @navigate="navigate" />
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	showModal,
	onShareAppMessage
} from "@/common/utils/util";
import uParse from "@/components/uParse/src/wxParse.vue";
var htmlString = `
<img src="http://api.tengpaisc.com/upload/1b876200e60545e211132bc69081475.jpg" />
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
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		preview(src: any, e: any) {
			// do something
			console.log("src: " + src);
		},
		navigate(href: any, e: any) {
			// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
			console.log("href: " + href);
			showModal("点击链接为：" + href);
		}
	}
});
</script>

<style>
page {
	background-color: #fff;
}
</style>