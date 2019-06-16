<template>
	<view class="content">
    <uni-collapse :accordion="true">
			<uni-collapse-item :show-animation="true" :title="items.CategoryName" v-for="(items, index) in list" :key="index">
				<view class="teng-help-list" v-for="(item, i) in items.HelpDetailList" :key="i">
					<view class="teng-question teng-help-list-text">
						<image :src="iconQuestion" />
						<text>{{item.Question}}</text>
					</view>
					<view class="teng-answe teng-help-list-text">
						<image :src="iconAnswe" />
						<text>{{item.Answe}}</text>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<view class="teng-feedback">
			<button class="button">建议反馈</button>
		</view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
  import { HelpListGet } from '@/common/config/api'
  import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'

	export default Vue.extend({
    components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				list: [],
				iconQuestion: '/static/icon/icon_question.png',
				iconAnswe: '/static/icon/icon_answe.png'
			}
		},
		onLoad(options) {
			this.getData()
      console.log('onLoad', options)
		},
		methods: {
			getData() {
				let data = {}
		  	request(HelpListGet, data).then((res: any) => {
          this.list = res.HelpList
        })
			}
		}
	})
</script>

<style>
  .teng-help {
		padding: 10upx 30upx 0 30upx;
	}
	.teng-help-list-text {
		display: flex;
		align-items: flex-start;
		padding: 10upx 30upx;
	}
	.teng-help-list-text image{
		width: 36upx;
		height: 36upx;
		margin: 10upx 0;
	}
	.teng-help-list-text text {
		width: 100%;
		font-size: 28upx;
		color: #868686;
		margin-left: 20upx;
	}
	.teng-feedback {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100upx;
	}
	.button {
		height: 100upx;
		font-size: 30upx;
		color: #616161;
		line-height: 100upx;
	}

	.button:after {
		border: none;
		height: 100upx;
	}
</style>
