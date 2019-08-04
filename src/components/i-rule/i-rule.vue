<template>
	<view class="content">
    <view class="uni-padding-wrap">
		  <uParse :content="article" @preview="preview" @navigate="navigate" />
  	</view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo, showModal } from '@/common/utils/util'
  import { ProductGet } from '@/common/config/api'
	import uParse from '@/components/uParse/src/wxParse.vue'
	var htmlString = `
<img src="http://api.tengpaisc.com/upload/0697de3744b7d12e15eb171b47d247a.jpg" />
    `;
	export default Vue.extend({
    components: {
			uParse
		},
		data() {
			return {
				id: '',
				article: htmlString
			}
		},
		onLoad(options: any) {
			this.id = options.id
			this.getProduct()
      console.log('onLoad', options)
		},
		methods: {
			getProduct() {
				let ProductID = this.id
				let data = {
					ProductID: ProductID
        }
		  	request(ProductGet, data).then((res: any) => {
					this.article = res.Product.ProductDesc
        })
      },
      preview(src: any, e: any) {
				// do something
				console.log("src: " + src);
			},
			navigate(href: any, e: any) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
				showModal("点击链接为：" + href)
			}
		}
	})
</script>

<style>
	
</style>