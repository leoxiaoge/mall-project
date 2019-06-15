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
					<text class="uni-product-text">上期成交：</text>
					<text class="uni-product-price-original">￥{{item.favourPrice}}</text>
				</view>
				<view class="uni-product-prompt">
					<view class="uni-product-time">
						<!-- 倒计时 -->
						<text class="uni-product-away">离开拍</text>
						<uni-countdown :hour="12" :minute="12" :second="12" />
					</view>
					<view class="uni-product-button">
						<button class="btn">马上参与</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
  import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
  export default {
		components: {
      uniCountdown
	  },
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
	.uni-product-prompt {
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.uni-product-price {
		text-align: center;
	}
	
	.uni-product-away {
		margin-right: 2upx;
	}

	.uni-product-time {
		display: flex;
		align-items: center;
		padding-right: 2upx;
	}

	.uni-product-button button{
		margin: 0;
		padding: 0 14upx;
		font-size: 20upx;
		color: #fff;
		background-color: #fe7f00;
		border-radius: 100upx;
	}
</style>
