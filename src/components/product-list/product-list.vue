<template>
	<view class="uni-common-pb">
		<page-head :title="title"></page-head>
		<view class="uni-product-list">
			<view class="uni-product" v-for="(item,index) in product" :key="index">
				<view class="image-view">
					<image class="uni-product-image" :src="item.image"></image>
				</view>
				<view class="uni-product-title">{{item.title}}</view>
				<view class="uni-product-price">
					<text class="uni-product-price-favour">￥{{item.originalPrice}}</text>
					<text class="uni-product-price-original">￥{{item.favourPrice}}</text>
					<text class="uni-product-tip">{{item.tip}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
  export default {
    name: 'productList',
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
      },
      title: {
				type: String,
				default: '即将开拍'
			}
		},
    data() {
      return {}
    },
    computed: {
			product() {
        console.log(this.options)
        let list = this.options
				return list
      }
    },
    methods: {
      
    }
};
</script>

<style>
	
</style>
