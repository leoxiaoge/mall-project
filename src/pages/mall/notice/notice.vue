<template>
	<view class="content">
		<mescroll-uni @down="downCallback" @up="upCallback">
			<view class="i-notice-list" v-for="(item, index) in lastTranActiveList" :key="index" @click="productDetailsTo(item.ID)">
				<view class="i-notice-head">
					<view class="i-notice-name">
						<view class="i-notice-content">
							<text>恭喜</text>
							<text class="i-notice-original i-notice-original-user">{{item.OrderUserNick}}</text>
							<text>以</text>
							<text class="i-notice-original">¥{{item.OrderMoney}}</text>
							<text>元拍得</text>
						</view>
					</view>
					<view class="i-notice-time">{{item.time}}</view>
				</view>
				<view class="i-notice">
					<text class="i-notice-title">{{item.ProductName}}</text>
					<!-- <text class="i-notice-status" v-if="item.ActiveTypeName">({{item.ActiveTypeName}})</text> -->
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
	onShareAppMessage
} from "@/common/utils/util";
import { LastTransactionListGet } from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
export default Vue.extend({
	components: {
		MescrollUni
	},
	data() {
		return {
			lastTranActiveList: [],
			upOption: {
				use: true, // 是否启用上拉加载; 默认true
				auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 20 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: "暂无相关数据"
				}
			},
			mescroll: null
		};
	},
	onLoad(options) {
		console.log(options);
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		// 下拉刷新的回调
		downCallback(mescroll: any) {
			mescroll.optUp.page.size = 20;
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
					if (mescroll.num == 1) this.lastTranActiveList = [];
					this.lastTranActiveList = this.lastTranActiveList.concat(curPageData);
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
			try {
				let lastTranActiveList: any = await this.getLastTransactionList(
					pageNum,
					pageSize
				);
				successCallback && successCallback(lastTranActiveList);
			} catch (e) {
				errorCallback && errorCallback();
			}
		},
		getLastTransactionList(pageNum: any, pageSize: any) {
			return new Promise((resolve, reject) => {
				let data = {
					PageID: pageNum,
					PageSize: pageSize
				};
				request(LastTransactionListGet, data)
					.then((res: any) => {
						let orderList = res.OrderList;
						let lastTranActiveList = res.LastTranActiveList;
						lastTranActiveList.map((item: any) => {
							item.time = formatTime(new Date(item.ActiveEndTime));
							item.OrderUserNick = decodeURIComponent(item.OrderUserNick);
						});
						resolve(lastTranActiveList);
					})
					.catch((err: any) => {
						let mescroll: any = this.mescroll;
						mescroll.endErr();
					});
			});
		},
		productDetailsTo(activeID: string) {
			navigateTo(
				"/pages/mall/productDetailsPage/productDetailsPage?activeID=" +
					activeID
			);
		}
	}
});
</script>

<style>
page {
	background-color: #fff;
}

.i-notice-list {
	margin: 0 30upx;
	padding: 20upx 0;
	border-bottom: 2upx solid #f4f4f4;
}

.i-notice-head {
	display: flex;
	justify-content: space-between;
	justify-items: flex-start;
}

.i-notice-content {
	display: flex;
	align-items: center;
}

.i-notice-original {
	color: #fe7f00;
	font-weight: 600;
}

.i-notice-original-user {
	max-width: 160upx;
	line-height: 1.2;
	word-break: break-all;
	display: -webkit-box;
	overflow: hidden;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
}

.i-notice-title {
	color: #6a6a6a;
	font-weight: 600;
}

.teng-notice-title {
	font-weight: 600;
}

.i-notice-status {
	margin-left: 20upx;
}

.i-notice-time {
	font-size: 28upx;
	color: #616161;
}
</style>
