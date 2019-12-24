<template>
	<view class="content">
		<view class="show-item" v-for="(item, index) in options" :key="index">
			<view class="show-item-userface">
				<image :src="item.UserFace" />
			</view>
			<view class="show-item-content">
				<view class="show-item-user">
					<view class="show-item-user-nick">
						<view class="show-item-usernick">{{item.UserNick}}</view>
						<view class="show-item-date">{{item.SendGoodsDateTime}}</view>
					</view>
					<view class="show-item-moneys">
						<text>成交价</text>
						<text>¥{{item.OrderMoneys}}</text>
					</view>
				</view>
				<view class="show-item-product-name">
					<text>{{item.ProductName}}</text>
				</view>
				<view class="show-item-comment">
					<text>{{item.OrderComment.Comment}}</text>
				</view>
				<view class="show-item-images">
					<view class="show-item-image" v-for="(i, idx) in item.ProductPicList" :key="idx">
						<image :src="i" @click="preview(i, item.ProductPicList)" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { previewImage } from "@/common/utils/util";
export default Vue.extend({
	name: "iShow",
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
		preview(current: any, urls: any) {
			previewImage(current, urls);
		}
	}
});
</script>

<style>
@charset "UTF-8";

.show-item {
	display: flex;
	align-items: flex-start;
	margin: 20upx 30upx 20upx 30upx;
	border-bottom: 2upx solid #f4f4f4;
}

.show-item-userface {
	width: 20%;
}

.show-item-userface image {
	width: 88upx;
	height: 88upx;
	border-radius: 50%;
}

.show-item-content {
	width: 80%;
}

.show-item-user-nick {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.show-item-product-name text {
	font-size: 32upx;
	color: #333232;
}

.show-item-images {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.show-item-image image {
	width: 180upx;
	height: 180upx;
}
</style>