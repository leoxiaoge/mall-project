<template>
	<view class="content">
		<view class="past-item" v-for="(item, index) in options" :key="index" @click="productDetailsTo(item.ActiveID)">
			<view class="past-item-user">
				<view class="past-item-userface">
					<image :src="item.UserFace" />
				</view>
				<view class="past-item-text">
					<view class="past-item-usernick">
						<text>成交人：</text>
						<text>{{item.UserNick}}</text>
					</view>
					<view class="past-item-moneys">
						<text>成交价：</text>
						<text>¥{{item.OrderMoneys}}</text>
					</view>
				</view>
			</view>
			<view class="past-item-created">
				<view class="past-item-created-text">{{item.CreatedTime}}</view>
				<view class="past-item-crested-saved">
					<text class="past-item-crested-saved-text">节省了</text>
					<text class="past-item-crested-saved-percentage">{{item.percentage}}%</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
export default Vue.extend({
	name: "iPast",
	props: {
		options: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {};
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
@charset "UTF-8";

.content {
	margin: 0 30upx;
}

.past-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2upx solid #f4f4f4;
}

.past-item-usernick {
	max-width: 280upx;
	overflow: hidden;
	white-space: nowrap;
	-o-text-overflow: ellipsis;
	text-overflow: ellipsis;
}

.past-item-usernick text {
	font-size: 28upx;
}

.past-item-moneys text {
	font-size: 28upx;
}

.past-item-crested-saved {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.past-item-user {
	display: flex;
	align-items: center;
}

.past-item-userface {
	display: flex;
	align-items: center;
	margin: 10upx 20upx;
}

.past-item-userface image {
	width: 88upx;
	height: 88upx;
	border-radius: 50%;
}

.past-item-created-text {
	font-size: 28upx;
	line-height: 1.8;
	color: #949494;
}

.past-item-crested-saved-text {
	font-size: 28upx;
	line-height: 1.6;
}

.past-item-crested-saved-percentage {
	font-size: 34upx;
	line-height: 1.2;
	color: #fe7f00;
}
</style>