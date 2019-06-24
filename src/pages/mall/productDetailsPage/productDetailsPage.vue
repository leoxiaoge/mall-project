<template>
	<view class="container">
		<!-- 轮播 -->
    <view class="i-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper
						class="swiper-box"
						:indicator-dots="indicatorDots"
						:autoplay="autoplay"
						:interval="interval"
						:duration="duration"
            :circular="circular"
            :indicator-active-color="indicatorActiveColor"
					>
						<swiper-item v-for="(item, index) in swiper" :key="index">
              <image :src="item" mode="aspectFill" />
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 标签 -->
		<view class="i-label">
			<view class="i-label-item" v-for="(item, index) in tab" :key="index">
				<view class="i-point"></view>
				<view class="i-label-item-text">{{item}}</view>
				<view class="i-point"></view>
			</view>
		</view>
		<view class="i-product-head">
			<view class="i-product-title">{{product.ProductTitle}}</view>
			<view class="i-product-name">{{product.ProductName}}</view>
		</view>
		<view class="i-product-">
			<view class="i-product-">手动举牌</view>
			<view class="i-product-">
				<view class="i-product-">上期成交：</view>
				<view class="i-product-">¥0.86</view>
			</view>
		</view>
		<view class="">
			<view class="">距离开拍</view>
			<view class=""></view>
		</view>
		<view class="i-product-">
			<view class="i-product-">{{product.Created}}</view>
			<view class="i-product-">我已消耗<text>5</text>拍币/赠币</view>
		</view>
		<view class="i-product-">
			<view class="i-product-">当前出价</view>
			<view class="i-product-">¥0.86</view>
			<view class="i-product-">
				<image :src="src" />
				<text>当前领选出价人</text>
			</view>
			<view class="i-product-">
				<image :src="src" />
				<view class="i-product-">领选出价人</view>
				<view class="i-product-">广东 深圳</view>
			</view>
		</view>
		<view class="i-product-">
			<view class="i-product-">
				<view class="i-product-"></view>
				<view class="i-product-"></view>
			</view>
			<view class="i-product-"></view>
			<view class="i-product-"></view>
			<view class="i-product-"></view>
		</view>
		<view class="i-product-" @click="activePath">
			<view class="i-product-">全部出价记录</view>
			<view class="i-product-"></view>
		</view>
		<view class="i-product-">
			<view class="i-product-">
				<view class="i-product-">
					<view class="i-product-"></view>
					<view class="i-product-"></view>
				</view>
			</view>
		</view>
		<view class="i-product-" @click="productDetailsUparsePath">
			<view class="i-product-">商品详情</view>
			<view class="i-product-"></view>
		</view>
		<view class="i-product-">
			<view class="i-product-">

			</view>
			<view class="i-product-"></view>
		</view>
		<view class="i-product-">
			<view class="i-product-">
				<view class="i-product-">剩余次数</view>
				<view class="i-product-">

				</view>
			</view>
			<view class="i-product-">
				<view class="i-product-">
					<button class="btn">举牌</button>
				</view>
				<view class="i-product-">
					<button class="btn">托管</button>
				</view>
			</view>
		</view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo } from '@/common/utils/util'
	import { ProductGet } from '@/common/config/api'
	export default Vue.extend({
		data() {
			return {
				indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        circular: true,
				indicatorActiveColor: '#fe7f00',
				
				swiper: [],
				title: '服务',
				id: '',
				product: '',

				tab: ['零风险', '正品承诺', '极速发货', '公平公正']
			}
		},
		onLoad(options: any) {
      this.id= options.id;
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
					console.log(res)
					this.product = res.Product
					this.swiper = res.Product.ProductPicList
        })
			},
			activePath() {
				let id = this.id
				navigateTo('../activeBilList/activeBilList?id=' + id)
			},
			productDetailsUparsePath() {
				let id = this.id
				navigateTo('../productDetailsUparse/productDetailsUparse?id=' + id)
			}
		}
	})
</script>

<style>
	.i-label {
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #b25a01;
		background-color: rgba(254, 127, 0, 0.3);
		height: 70upx;
	}
	
	.i-point {
		width: 10upx;
		height: 10upx;
		background-color: rgba(254, 127, 0, 0.2);
		border-radius: 50%;
	}

	.i-label-item {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.i-label-item-text {
		margin: 0 10upx;
	}
</style>
