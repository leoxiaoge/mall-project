<template>
	<view class="container">
    
  </view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
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
</style>