<template>
	<view class="content">
		<view class="i-notice-list" v-for="(item, index) in LastTranActiveList" :key="index">
			<view class="i-notice-head">
				<view class="i-notice-name">
					<text class="i-notice-content">
						<text>恭喜</text>
						<text class="i-notice-original">{{item.OrderUserNick}}</text>
						<text>以</text>
						<text class="i-notice-original">¥{{item.OrderMoney}}</text>
						<text>元拍得</text>
					</text>
				</view>
				<view class="i-notice-time">{{item.time}}</view>
			</view>
			<view class="i-notice">
				<text class="i-notice-title">{{item.ProductName}}</text>
				<text class="i-notice-status">({{item.ActiveTypeName}})</text>
			</view>
		</view>
		<view class="i-uno" v-if="isNo">
			<u-no :title="noTitle" :thumb="noIcon"></u-no>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo, formatTime } from "@/common/utils/util";
import { LastTransactionListGet } from "@/common/config/api";
import uNo from "@/components/u-no/u-no.vue";
export default Vue.extend({
	components: {
		uNo
	},
	data() {
		return {
			LastTranActiveList: [],
			isNo: false,
			noTitle: "还没有最新的成交喔~",
			noIcon: "/static/logo.png"
		};
	},
	onLoad(options) {
		console.log(options);
		this.getLastTransactionList();
	},
	onPullDownRefresh() {
		this.getLastTransactionList();
	},
	methods: {
		getLastTransactionList() {
			let data = {};
			request(LastTransactionListGet, data).then((res: any) => {
				console.log(res);
				uni.stopPullDownRefresh();
				let LastTranActiveList = res.LastTranActiveList;
				if (LastTranActiveList.length <= 0) {
					this.isNo = true;
				} else {
					LastTranActiveList.map((item: any) => {
						item.time = formatTime(new Date(item.ActiveEndTime));
					});
					this.LastTranActiveList = LastTranActiveList;
				}
			});
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

.i-notice-original {
	color: #fe7f00;
	font-weight: 600;
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
