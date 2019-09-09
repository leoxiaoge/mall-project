<template>
	<view class="no">
		<image :src="thumb" mode="aspectFit" :style="'height:'+height+'px'" />
	</view>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "NoTuned",
	props: {
		thumb: {
			type: String,
			default: ""
    },
    height: {
      type: Number,
			default: ""
    }
	},
	data() {
		return {};
	},
	methods: {}
});
</script>

<style>
@charset "UTF-8";

.no {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>