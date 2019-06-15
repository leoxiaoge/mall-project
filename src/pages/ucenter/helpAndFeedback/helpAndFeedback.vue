<template>
	<view class="content">
    <uni-collapse :accordion="true">
			<uni-collapse-item :show-animation="true" :title="items.CategoryName" v-for="(items, index) in list" :key="index">
				<!-- <uni-list v-for="(item, i) in items.HelpDetailList" :key="i">
				  <uni-list-item :title="item.Question" thumb="/static/icon/icon_question.png" />
					<uni-list-item :title="item.Answe" thumb="/static/icon/icon_answe.png" />
				</uni-list> -->
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
        list: []
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
