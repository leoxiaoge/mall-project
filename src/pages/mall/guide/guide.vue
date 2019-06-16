<template>
	<view class="content">
    <view class="uni-padding-wrap">
		  <uParse :content="article" @preview="preview" @navigate="navigate" />
  	</view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
  import { ProductPaiListGet } from '@/common/config/api'
  import uParse from '@/components/uParse/src/wxParse.vue'
  var htmlString = `
<p>图文介绍，内容待定</p>
    `
	export default Vue.extend({
    components: {
			uParse
		},
		data() {
			return {
				article: htmlString
			}
		},
		onLoad(options) {
			this.getData()
      console.log('onLoad', options)
		},
		methods: {
			getData() {
				let data = {
					
        }
		  	request(ProductPaiListGet, data).then((res: any) => {
          console.log(res)
        })
      },
      preview(src: any, e: any) {
				// do something
				console.log("src: " + src);
			},
			navigate(href: any, e: any) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
				uni.showModal({
					content : "点击链接为：" + href,
					showCancel:false
				})
			}
		}
	})
</script>

<style>
	
</style>