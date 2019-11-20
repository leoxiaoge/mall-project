<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="product-list" v-if="product.length == 1">
			<scroll-view scroll-x class="scroll-list" @scrolltolower="scrolltolower">
				<view class="product-item-one" v-for="(item,index) in product" :key="index">
					<view class="product-item-flex" @click="productDetailsTo(item.Active.ID)">
						<view class="teng-image-view teng-image-one">
							<image class="product-image-one img" :src="item.ProductPicList[0]" mode="aspectFit" />
							<image class="teng-order-show-status" :src="statusIconDone" v-if="item.Status === 4" />
							<image class="teng-order-show-status" :src="statusIconFlow" v-if="item.Status === 5" />
						</view>
						<!-- <view class="teng-active-type-name">
							<text class="teng-active-type-name-text">{{item.Active.ActiveTypeName}}</text>
						</view>-->
						<view class="product-content">
							<view class="product-price-title">
								<view class="product-active-text">
									<text>{{item.ProductTitle}}</text>
								</view>
							</view>
							<view class="product-prices" v-if="item.Status === 4">
								<view class="product-current-bid">恭喜</view>
								<view class="product-prices-text">{{item.Active.LastBillUserName}}</view>
								<view class="product-current-bid">已</view>
								<view class="product-prices-text">{{item.Price}}</view>
								<view class="product-current-bid">拍得</view>
							</view>
							<view class="product-prices" v-if="item.Status !== 4">
								<view class="product-prices-text">￥{{item.Price}}</view>
								<view class="product-current-bid">当前出价</view>
							</view>
							<view class="product-prices" v-if="item.Active.LastBillUserName && item.Status == 4">
								<view class="product-user-text">{{item.Active.LastBillUserName}}</view>
							</view>
							<view class="product-times">
								<!-- 倒计时 -->
								<view class="product-countdown-text">{{item.countdownText}}</view>
								<uni-countdown :original="true" :seconds="item.seconds" />
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="product-list" v-else-if="product.length == 2">
			<scroll-view scroll-x class="scroll-list" @scrolltolower="scrolltolower">
				<view class="product-item-two" v-for="(item,index) in product" :key="index">
					<view class @click="productDetailsTo(item.Active.ID)">
						<view class="teng-image-view teng-image-two">
							<image class="product-image img" :src="item.ProductPicList[0]" mode="aspectFit" />
							<image class="teng-order-show-status" :src="statusIconDone" v-if="item.Status === 4" />
							<image class="teng-order-show-status" :src="statusIconFlow" v-if="item.Status === 5" />
						</view>
						<!-- <view class="teng-active-type-name">
							<text class="teng-active-type-name-text">{{item.Active.ActiveTypeName}}</text>
						</view>-->
						<view class="product-price-title">
							<view class="product-active-text">{{item.ProductTitle}}</view>
						</view>
						<view class="product-prices" v-if="item.Status === 4">
							<view class="product-current-bid">恭喜</view>
							<view class="product-prices-text">{{item.Active.LastBillUserName}}</view>
							<view class="product-current-bid">已</view>
							<view class="product-prices-text">{{item.Price}}</view>
							<view class="product-current-bid">拍得</view>
						</view>
						<view class="product-price" v-if="item.Status != 4">
							<view class="product-price-text">出价：￥{{item.Price}}</view>
						</view>
						<view class="product-price">
							<view class="product-user-text">{{item.Active.LastBillUserName}}</view>
						</view>
					</view>
					<view class="product-time">
						<!-- 倒计时 -->
						<view class="product-countdown-text">{{item.countdownText}}</view>
						<uni-countdown :original="true" :seconds="item.seconds" />
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="product-list" v-else>
			<scroll-view scroll-x class="scroll-list" @scrolltolower="scrolltolower">
				<view class="product-item" v-for="(item,index) in product" :key="index">
					<view class @click="productDetailsTo(item.Active.ID)">
						<view class="teng-image-view">
							<image class="product-image img" :src="item.ProductPicList[0]" mode="aspectFit" />
							<image class="teng-order-show-status" :src="statusIconDone" v-if="item.Status === 4" />
							<image class="teng-order-show-status" :src="statusIconFlow" v-if="item.Status === 5" />
						</view>
						<!-- <view class="teng-active-type-name">
							<text class="teng-active-type-name-text">{{item.Active.ActiveTypeName}}</text>
						</view>-->
						<view class="product-price-title">
							<view class="product-active-text">{{item.ProductTitle}}</view>
						</view>
						<view class="product-prices" v-if="item.Status === 4">
							<view class="product-current-bid">恭喜</view>
							<view class="product-prices-text">{{item.Active.LastBillUserName}}</view>
							<view class="product-current-bid">已</view>
							<view class="product-prices-text">{{item.Price}}</view>
							<view class="product-current-bid">拍得</view>
						</view>
						<view class="product-price" v-if="item.Status != 4">
							<view class="product-price-text">出价：￥{{item.Price}}</view>
						</view>
						<view class="product-price">
							<view class="product-user-text">{{item.Active.LastBillUserName}}</view>
						</view>
					</view>
					<view class="product-time">
						<!-- 倒计时 -->
						<view class="product-countdown-text">{{item.countdownText}}</view>
						<uni-countdown :original="true" :seconds="item.seconds" />
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
			statusIconDone: "/static/icon/icon_done.png",
			statusIconFlow: "/static/icon/icon_flow.png"
		};
	},
	computed: {
		product() {
			let list: any = this.options;
			console.log(list);
			list.map((item: any) => {
				if (item.Status == 0 || item.Status == 1) {
					item.countdownText = "距离开拍";
				} else if (item.Status == 2) {
					item.countdownText = "准备倒计时";
				} else if (item.Status == 3) {
					item.countdownText = "落拍倒计时";
				}
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
				item.seconds =
					days * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds;
			});
			list = JSON.parse(JSON.stringify(list));
			return list;
		}
	},
	methods: {
		productDetailsTo(activeID: string) {
			navigateTo(
				"/pages/mall/productDetailsPage/productDetailsPage?activeID=" + activeID
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
	color: #4d4d4d;
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

.teng-order-show-status {
	position: absolute;
	left: 10%;
	top: 10%;
	width: 100upx;
	height: 100upx;
}

.teng-active-type-name {
	position: absolute;
	left: 0;
	top: 0;
	line-height: 1.6;
	background: linear-gradient(45deg, #eba866, #fe7f00);
	border-radius: 0 100upx 100upx 0;
	opacity: 0.8;
	padding: 0 12upx 0 8upx;
}

.teng-active-type-name-text {
	font-size: 24upx;
	line-height: 1.4;
	color: #fff;
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
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 10upx;
}

.product-countdown-text {
	margin-right: 10upx;
}

.product-time {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	text-align: center;
}

.image {
	width: 100%;
	height: 100%;
}
</style>
