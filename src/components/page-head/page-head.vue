<template name="page-head">
	<view class="uni-page-head">
		<view class="uni-page-head-title">{{title}}</view>
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
