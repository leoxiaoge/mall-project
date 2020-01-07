<template>
	<view class="content">
		<page-head :title="title"></page-head>
		<view class="uni-product-list" v-if="product">
			<view class="uni-product product-item" v-for="(item,index) in product" :key="index">
				<view class="i-product-content" @click="productDetailsTo(item.Active.ID)">
					<view class="i-image-view">
						<image class="i-product-image" :src="item.ProductPicList[0]" mode="aspectFit" lazy-load />
						<image class="teng-order-show-status" :src="statusIconDone" v-if="item.Status === 4" lazy-load />
						<image class="teng-order-show-status" :src="statusIconFlow" v-if="item.Status === 5" lazy-load />
					</view>
					<!-- <view class="teng-active-type-name">
						<text class="teng-active-type-name-text">{{item.Active.ActiveTypeName}}</text>
					</view> -->
					<view class="uni-product-title product-title">
						<text class="active-no">[{{item.Active.ActiveNo}}期]</text>
						<text>{{item.ProductTitle}}</text>
					</view>
					<view class="uni-product-price" v-if="item.Active.PrevActiveMoney > 0">
						<text class="uni-product-text">上期成交：</text>
						<text class="uni-product-price-original">￥{{item.Active.PrevActiveMoney}}</text>
					</view>
					<view class="uni-product-title uni-product-price" v-if="item.Active.LastBillUserName">
						<text class="uni-product-text">{{item.Active.LastBillUserName}}</text>
					</view>
				</view>
				<view class="uni-product-prompt">
					<view class="uni-product-time">
						<!-- 倒计时 -->
						<text class="uni-product-away">距离开拍</text>
						<uni-countdown :seconds="item.seconds" />
					</view>
					<view class="uni-product-button">
						<button class="btn" @click="productDetailsTo(item.Active.ID)">{{activeStatus}}</button>
					</view>
				</view>
			</view>
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
	name: "productList",
	props: {
		options: {
			type: Array
		},
		title: {
			type: String,
			default: "即将竞拍"
		}
	},
	data() {
		return {
			activeStatus: "马上参与",
			statusIconDone: "/static/icon/icon_done.png",
			statusIconFlow: "/static/icon/icon_flow.png"
		};
	},
	computed: {
		product() {
			let list: any = this.options;
			list.map((item: any) => {
				try {
					// 0，1，都是可报名状态，2表示正在倒计时准备，3表示正在竟拍（不能报名），4表示活动结束
					switch (item.Status) {
						case 0:
							this.activeStatus = this.activeStatus;
							break;
						case 1:
							this.activeStatus = this.activeStatus;
							break;
						case 2:
							this.activeStatus = this.activeStatus;
							break;
						case 3:
							this.activeStatus = this.activeStatus;
							break;
						case 4:
							let text: any = "参与下一期";
							this.activeStatus = text;
							break;
					}
				} catch (e) {
					console.error("处理消息出错：" + e);
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
		}
	}
});
</script>

<style>
.product-item {
	position: relative;
}

.i-image-view {
	margin: 8upx 0;
	padding: 0 8upx;
}

.i-product-image {
	height: 320upx;
	border-radius: 8upx;
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
	opacity: .8;
	padding: 0 12upx 0 8upx;
}

.teng-active-type-name-text {
	font-size: 24upx;
	line-height: 1.4;
	color: #fff;
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

.i-product-content {
	border-bottom: 2upx dashed #f4f4f4;
}

.active-no {
	color: #4d4d4d;
	font-weight: 600;
	margin-right: 10upx;
}

.uni-product-button button {
	margin: 0;
	padding: 10upx 14upx;
	font-size: 28upx;
	line-height: 1.4;
	color: #fff;
	background-color: #fe7f00;
	border-radius: 40upx;
}
</style>