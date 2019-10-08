<template name="page-head">
	<view class="page-head">
		<view class="page-head-title">{{title}}</view>
	</view>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "page-head",
	props: {
		title: {
			type: String,
			default: ""
		}
	}
});
</script>
<style>
.page-head {
	padding: 4upx;
	text-align: center;
}

.page-head-title {
	display: inline-block;
	padding: 0 40upx;
	font-size: 36upx;
	font-weight: 600;
	height: 88upx;
	line-height: 88upx;
	color: #3e3e3e;
	box-sizing: border-box;
}
</style>
