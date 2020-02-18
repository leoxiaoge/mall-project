<template>
	<view class="content">
		<mescroll-uni @down="downCallback" @up="upCallback">
			<view class="teng-show-order-list" v-for="(item, index) in orderList" :key="index">
				<view class="teng-show-userinfo">
					<view class="teng-show-user">
						<image class="logo" :src="item.UserFace" />
					</view>
					<view class="teng-show-title">
						<view class="teng-show-name">{{item.UserNick}}</view>
						<view class="teng-show-time">{{item.UpdatedTime}}</view>
					</view>
				</view>
				<view class="teng-show-order" @click="productDetailsTo(item.ActiveID)">
					<view class="teng-show-order-images">
						<image :src="item.ProductPicList[0]" />
					</view>
					<view class="teng-show-order-content">
						<view class="teng-show-order-content-title">{{item.ProductName}}</view>
						<view class="teng-show-order-content-date">成交时间：{{item.CreatedTime}}</view>
						<view class="teng-show-order-content-price">
							<text>成交价：</text>
							<text class="teng-show-order-content-price-text teng-original">{{item.OrderMoneys}}</text>
						</view>
					</view>
				</view>
				<view class="teng-show-content">
					<view class="teng-show-content-text">{{item.OrderComment.Comment}}</view>
				</view>
				<view class="teng-show-content-images">
					<view
						class="teng-show-content-image"
						v-for="(i, idx) in item.OrderComment.CommentPicList"
						:key="idx"
					>
						<image :src="i" @click="preview(i, item.OrderComment.CommentPicList)" mode="aspectFill" />
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	formatTime,
	previewImage,
	onShareAppMessage
} from "@/common/utils/util";
import { OrderDryingListGet } from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
export default Vue.extend({
	components: {
		MescrollUni
	},
	data() {
		return {
			mescroll: [],
			orderList: []
		};
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		// 下拉刷新的回调
		downCallback(mescroll: any) {
			this.mescroll = mescroll;
			mescroll.resetUpScroll();
		},
		// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
		upCallback(mescroll: any) {
			this.getListDataFromNet(
				mescroll.num,
				mescroll.size,
				(curPageData: any) => {
					mescroll.endSuccess(curPageData.length);
					if (mescroll.num == 1) this.orderList = [];
					this.orderList = this.orderList.concat(curPageData);
				},
				() => {
					mescroll.endErr();
				}
			);
		},
		// 联网加载列表数据
		async getListDataFromNet(
			pageNum: any,
			pageSize: any,
			successCallback: any,
			errorCallback: any
		) {
			console.log(pageNum, pageSize);
			try {
				let orderList: any = await this.getOrderDryingList(pageNum, pageSize);
				successCallback && successCallback(orderList);
			} catch (e) {
				errorCallback && errorCallback();
			}
		},
		getOrderDryingList(pageNum: any, pageSize: any) {
			return new Promise((resolve, reject) => {
				let data = {
					PageID: pageNum,
					PageSize: pageSize
				};
				request(OrderDryingListGet, data)
					.then((res: any) => {
						console.log(res);
						let orderList = res.OrderList;
						orderList.map((item: any) => {
							item.UpdatedTime = formatTime(new Date(item.Updated));
							item.CreatedTime = formatTime(new Date(item.Created));
							item.UserNick = decodeURIComponent(item.UserNick);
						});
						resolve(orderList);
					})
					.catch((err: any) => {
						let mescroll: any = this.mescroll;
						mescroll.endErr();
					});
			});
		},
		productDetailsTo(activeID: any) {
			navigateTo(
				"../productDetailsPage/productDetailsPage?activeID=" +
					activeID
			);
		},
		preview(current: any, urls: any) {
			previewImage(current, urls);
		}
	}
});
</script>

<style>
.teng-show-order-list {
	padding: 20upx 30upx;
	background-color: #fff;
	border-bottom: 2upx solid #f4f4f4;
}

.teng-show-userinfo {
	display: flex;
	align-items: center;
	padding: 10upx 0;
}

.teng-show-user image {
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
}

.teng-show-title {
	margin-left: 20upx;
}

.teng-show-name {
	font-size: 36upx;
	color: #6a6a6a;
}

.teng-show-time {
	font-size: 28upx;
	color: #616161;
}

.teng-show-order {
	display: flex;
	align-items: center;
	background-color: #e6e6e6;
	border-radius: 8upx;
	padding: 10upx 20upx;
}

.teng-show-order-images image {
	width: 105upx;
	height: 105upx;
	border-radius: 4upx;
}

.teng-show-order-content {
	margin-left: 20upx;
}

.teng-show-order-content-title {
	font-size: 32upx;
	color: #4d4d4d;
	line-height: 1.4;
}

.teng-show-order-content-date {
	font-size: 24upx;
	color: #616161;
}

.teng-show-order-content-price {
	display: flex;
	align-items: center;
}

.teng-show-order-content-price-text {
	font-size: 32upx;
}

.teng-show-content {
	padding: 20upx 0;
}

.teng-show-content-text {
	font-size: 30upx;
	color: #525252;
}

.teng-show-content-images {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.teng-show-content-image {
	width: calc(33.33% - 8px);
	margin: 0 4px;
}

.teng-show-content-image image {
	height: 200upx;
}
</style>
