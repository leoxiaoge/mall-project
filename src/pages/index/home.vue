<template>
	<view>
		<button type="primary" @tap="getLocation">http请求</button>
	</view>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			getLocation: function () {
				uni.request({
					url: '/rest.ashx', 
					success: (res) => {
						
					}
				});
			}
		}
	}
</script>

<style>
	
</style>