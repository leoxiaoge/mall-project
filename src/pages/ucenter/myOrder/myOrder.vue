<template>
	<view class="container">
		<mescroll-uni @down="downCallback" @up="upCallback">
			<view class="i-comment-item" v-for="(item, indexes) in orderList" :key="indexes">
				<view class="i-comment-date">{{item.OrderComment.CreatedDateTime}}</view>
				<view class="i-comment-title">{{item.ProductName}}</view>
				<view class="i-comment-comment">{{item.OrderComment.Comment}}</view>
				<view class="i-comment-pic">
					<view class="i-comment-pic-item" v-for="(i, index) in item.OrderComment.CommentPicList" :key="index">
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
			let UserInfo: any = uni.getStorageSync("UserInfo");
			let UserID = UserInfo.ID;
			if (!UserID) {
				navigateTo("../../ucenter/login/login");
				return;
			}
			return new Promise((resolve, reject) => {
				let data = {
					PageID: pageNum,
					PageSize: pageSize,
					UserID: UserID
				};
				request(OrderDryingListGet, data)
					.then((res: any) => {
						console.log(res);
						let orderList = res.OrderList;
						orderList.map((item: any) => {
							item.OrderComment.CreatedDateTime = formatTime(
								new Date(item.OrderComment.CreatedDate)
							);
						});
						resolve(res.OrderList);
					})
					.catch((err: any) => {
						let mescroll: any = this.mescroll;
						mescroll.endErr();
					});
			});
		},
		preview(current: any, urls: any) {
			previewImage(current, urls);
		}
	}
});
</script>

<style>
.i-comment-item {
	background-color: #fff;
	padding: 10upx 30upx;
	border-bottom: 2upx solid #f4f4f4;
}

.i-comment-date {
	font-size: 28upx;
	color: #616161;
}

.i-comment-title {
	font-size: 32upx;
	color: #333232;
}

.i-comment-comment {
	font-size: 28upx;
	color: #333232;
}

.i-comment-pic {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.i-comment-pic-item {
	width: calc(33.33% - 8px);
	margin: 0 4px;
}

.i-comment-pic-item image {
	width: 100%;
	height: 180upx;
}
</style>
