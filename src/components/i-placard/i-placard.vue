<template>
	<view class="i-content">
		<view class="i-placard-remaining-num">
			<view class="i-placard-remaining">剩余次数：</view>
			<view class="i-placard-num">
        {{num}}
			</view>
		</view>
		<view class="i-placard-button-view">
			<view class="i-placard-button">
				<button class="btn" :disabled="disabled">举牌</button>
			</view>
			<view class="i-placard-button i-placard-active">
				<button class="btn" :disabled="disabled">托管</button>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
  import Vue from 'vue'
  export default Vue.extend({
    name: 'iPlacard',
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
  
  .i-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2upx solid #f4f4f4;
    width: 100%;
    height: 90upx;
  }

  .i-placard-remaining-num {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
  }

  .i-placard-remaining {
    font-size: 28upx;
    color: #5c5c5c;
  }

  .i-placard-num {
    font-size: 48upx;
    color: #fe7c13;
    font-weight: 600;
  }

  .i-placard-button-view {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .i-placard-button {
    width: 200upx;
    font-size: 30upx;
  }

  .i-placard-button button {
    color: #fe7c13;
    background-color: #fff;
    border-left: 2upx solid #f4f4f4;
  }

  .i-placard-active button{
    color: #fff;
    background-color: #fe7c13;
    border-left: 2upx solid #f4f4f4;
  }

  .btn {
    border: none;
    border-radius: 0;
  }

  .btn:after {
    border: none;
    border-radius: 0;
  }
</style>