<template>
	<view class="u-no">
		<image :src="thumb" mode="widthFix"/>
    <view class="i-title">{{title}}</view>
	</view>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'Uno',
		props: {
			title: {
				type: String,
				default: ''
			},
			thumb: {
				type: String,
				default: ''
			}
		},
		data() {
			return {}
		},
		methods: {
			
		}
	})
</script>

<style>
  @charset "UTF-8";
  
  .u-no {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    text-align: center;
  }

  .u-no image {
    width: 20%;
    height: 100%;
  }

  .i-title {
    font-size: 28upx;
    line-height: 1.8;
    color: #999999;
    margin: 40upx 0;
  }
</style>