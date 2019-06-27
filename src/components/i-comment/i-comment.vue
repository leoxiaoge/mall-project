<template>
	<view class="i-content">
		<view class="">
      <img src="" />
    </view>
    <view class="">
      <view class="">
        <view class="">
          <view class=""></view>
          <view class=""></view>
        </view>
        <view class=""></view>
      </view>
      <view class=""></view>
      <view class=""></view>
      <view class="">
        <img src="" />
      </view>
    </view>
	</view>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'iComment',
		props: {
			type: {
				type: String,
				default: ''
			},
			num: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
        disabled: false
      }
		},
		methods: {
			
		}
	})
</script>

<style>
  @charset "UTF-8";
  
  
</style>