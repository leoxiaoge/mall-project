<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="product-list" v-if="product.length == 1">
			<scroll-view scroll-x class="scroll-list" @scrolltolower="scrolltolower">
				<view class="product-item-one" v-for="(item,index) in product" :key="index">
					<view class="product-item-flex" @click="productDetailsTo(item.ID, item.Active.ID)">
						<view class="teng-image-view teng-image-one">
							<image class="product-image-one img" :src="item.ProductPicList[0]" mode="aspectFit" />
						</view>
						<view class="product-content">
							<view class="product-price-title">
								<view class="product-active-text">
									<text>{{item.ProductTitle}}</text>
								</view>
							</view>
							<view class="product-prices" v-if="item.Price != undefined">
								<view class="product-prices-text">￥{{item.Price}}</view>
								<view class="product-current-bid">当前出价</view>
							</view>
							<view class="product-prices">
								<view class="product-user-text">{{item.Active.LastBillUserName}}</view>
							</view>
							<view class="product-times">
								<!-- 倒计时 -->
								<uni-countdown
									:original="true"
									:hour="item.Active.hour"
									:minute="item.Active.minute"
									:second="item.Active.second"
								/>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="product-list" v-else-if="product.length == 2">
			<scroll-view scroll-x class="scroll-list" @scrolltolower="scrolltolower">
				<view class="product-item-two" v-for="(item,index) in product" :key="index">
					<view class @click="productDetailsTo(item.ID, item.Active.ID)">
						<view class="teng-image-view teng-image-two">
							<image class="product-image img" :src="item.ProductPicList[0]" mode="aspectFit" />
						</view>
						<view class="product-price-title">
							<view class="product-active-text">{{item.ProductTitle}}</view>
						</view>
						<view class="product-price">
							<view class="product-price-text">￥{{item.ProductPrice}}</view>
						</view>
						<view class="product-price">
							<view class="product-user-text">{{item.Active.LastBillUserName}}</view>
						</view>
					</view>
					<view class="product-time">
						<!-- 倒计时 -->
						<uni-countdown
							:original="true"
							:hour="item.Active.hour"
							:minute="item.Active.minute"
							:second="item.Active.second"
						/>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="product-list" v-else>
			<scroll-view scroll-x class="scroll-list" @scrolltolower="scrolltolower">
				<view class="product-item" v-for="(item,index) in product" :key="index">
					<view class @click="productDetailsTo(item.ID, item.Active.ID)">
						<view class="teng-image-view">
							<image class="product-image img" :src="item.ProductPicList[0]" mode="aspectFit" />
						</view>
						<view class="product-price-title">
							<view class="product-active-text">{{item.ProductTitle}}</view>
						</view>
						<view class="product-price">
							<view class="product-price-text">￥{{item.ProductPrice}}</view>
						</view>
						<view class="product-price">
							<view class="product-user-text">{{item.Active.LastBillUserName}}</view>
						</view>
					</view>
					<view class="product-time">
						<!-- 倒计时 -->
						<uni-countdown
							:original="true"
							:hour="item.Active.hour"
							:minute="item.Active.minute"
							:second="item.Active.second"
						/>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
import { HomeProductListGet } from "@/common/config/api";
import pageHead from "@/components/page-head/page-head.vue";
import uniCountdown from "@/components/uni-countdown/uni-countdown.vue";
export default Vue.extend({
	components: {
		pageHead,
		uniCountdown
	},
	name: "productListBeing",
	props: {
		options: {
			type: Array
		},
		title: {
			type: String,
			default: "正在竞拍"
		}
	},
	data() {
		return {
			productList: []
		};
	},
	computed: {
		product() {
			let list: any = this.options;
			list.map((item: any) => {
				let date: number = item.Active.SeqMiniSeconds;
				let day: any = date / (1000 * 60 * 60 * 24);
				let days = parseInt(day);
				let hour: any = (date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
				let hours = parseInt(hour);
				let minute: any = (date % (1000 * 60 * 60)) / (1000 * 60);
				let minutes = parseInt(minute);
				let second: any = (date % (1000 * 60)) / 1000;
				let seconds = parseInt(second);
				item.Active.day = days;
				item.Active.hour = hours;
				item.Active.minute = minutes;
				item.Active.second = seconds;
			});
			return list;
		}
	},
	methods: {
		productDetailsTo(id: any, activeID: any) {
			navigateTo(
				"/pages/mall/productDetailsPage/productDetailsPage?id=" +
					id +
					"&activeID=" +
					activeID
			);
		},
		scrolltolower() {
			this.$emit("lower");
		}
	}
});
</script>

<style>
.product-list {
	background-color: #fff;
}

.teng-image-view {
	height: 140upx;
	margin: 12upx 0;
	padding: 0 30upx;
}

.product-content {
	width: 65%;
}

.product-prices {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.product-prices-text {
	font-weight: 600;
}

.product-current-bid {
	margin-left: 8upx;
}

.product-image-one {
	width: 100%;
	height: 180upx;
}

.teng-image-one {
	width: 35%;
	height: 100%;
	margin: 12upx 0;
	padding: 0 30upx;
}

.teng-image-two {
	height: 200upx;
	margin: 12upx 0;
	padding: 0 30upx;
}

.product-item-flex {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.scroll-list {
	white-space: nowrap;
}

.product-item {
	display: inline-block;
	overflow: hidden;
	width: 33.33%;
	background-color: #fff;
	padding: 20upx 16upx;
}

.product-item-one {
	display: inline-block;
	padding: 40upx 30upx;
	overflow: hidden;
	width: 100%;
	background-color: #fff;
	padding-bottom: 20upx;
}

.product-item-two {
	display: inline-block;
	padding-left: 20upx;
	padding-right: 20upx;
	overflow: hidden;
	width: 50%;
	background-color: #fff;
	padding-bottom: 20upx;
}

.product-active-text {
	overflow: hidden; 
	white-space: nowrap; 
	text-overflow: ellipsis;
}

.product-price {
	text-align: center;
}

.product-price-text {
	font-weight: 600;
	line-height: 1.8;
	padding: 0 20upx;
}

.product-user-text {
	line-height: 2.2;
}

.product-times {
	margin-top: 10upx;
}

.product-time {
	text-align: center;
}

.image {
	width: 100%;
	height: 100%;
}
</style>
