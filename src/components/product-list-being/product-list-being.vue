<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="uni-product-list">
			<scroll-view scroll-x class="list">
        <view class="item" v-for="(item,index) in product" :key="index">
          <view class="image-view">
					<image class="uni-product-image img" :src="item.image"></image>
				</view>
				<view class="uni-product-title">{{item.title}}</view>
				<view class="uni-product-price">
					<text class="uni-product-price-favour">￥{{item.originalPrice}}</text>
					<text class="uni-product-price-original">￥{{item.favourPrice}}</text>
					<text class="uni-product-tip">{{item.tip}}</text>
				</view>
        </view>
      </scroll-view>
		</view>
	</view>
</template>

<script>
  export default {
    name: 'productListBeing',
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
      },
      title: {
				type: String,
				default: '正在竞拍'
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
	.list {
    white-space:nowrap;
  }

  .item {
    display: inline-block;
    width: 240upx;
    margin-left: 30upx;
    overflow: hidden;
  }

  .img {
    width: 160upx;
    height: 120upx;
    margin-bottom: 30upx;
  }
</style>
