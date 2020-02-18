<template>
	<view class="content">
		<view class="mention-msg">
			<view class="mention">
				<image class="icon" :src="icon" mode="aspectFit" />
				<view class="box">
					<view class="mention-msg-text animate">{{notice}}</view>
				</view>
			</view>
			<view class="mention" v-if="noMentionMoney">
				<view class="mention-money-msg">待提现：</view>
				<view class="mention-money-no">{{noMentionMoney}}</view>
			</view>
		</view>
		<mescroll-uni top="75" bottom="120" @down="downCallback" @up="upCallback">
			<view class="content">
				<view class="commission-list" v-for="(item, index) in commissionList" :key="index">
					<view class="commission-created">
						<view class="commission-refUserNick">{{item.PayUserNick}}</view>
						<view class="commission-createdDateTime">{{item.CreatedDateTime}}</view>
					</view>
					<view class="commission-money">
						<text
							class="commission-money-text"
							:class="{'commission-money-bg':item.Status == 0}"
						>{{item.CommissionMoneyText}}</text>
						<text
							class="commission-status-name"
							:class="{'commission-status-bg':item.Status == 0}"
						>{{item.StatusName}}</text>
					</view>
				</view>
			</view>
		</mescroll-uni>
		<view class="mention-bottom" v-if="mentionMoney">
			<view class="mention-bottom-text">累计已提现金额：</view>
			<view class="mention-bottom-money">{{mentionMoney}}</view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, formatTime, onShareAppMessage } from "@/common/utils/util";
import { GetUserCommissionList } from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
export default Vue.extend({
	components: {
		MescrollUni
	},
	data() {
		return {
			notice: "满100元以上可联系客服申请提现",
			commissionList: [],
			noMentionMoney: "", // 待返现总金额
			mentionMoney: "", // 已返现总金额
			icon: "/static/icon/icon_broadcast.png",
			mescroll: null
		};
	},
	onLoad(options: any) {
		console.log("onLoad", options);
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
					if (mescroll.num == 1) this.commissionList = [];
					this.commissionList = this.commissionList.concat(curPageData);
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
				let lastTranActiveList: any = await this.getUserCommissionList(
					pageNum,
					pageSize
				);
				successCallback && successCallback(lastTranActiveList);
			} catch (e) {
				errorCallback && errorCallback();
			}
		},
		getUserCommissionList(pageNum: any, pageSize: any) {
			return new Promise((resolve, reject) => {
				let data = {
					PageID: pageNum,
					PageSize: pageSize
				};
				request(GetUserCommissionList, data)
					.then((res: any) => {
						let commissionList = res.CommissionList;
						commissionList.map((item: any) => {
							item.CreatedDateTime = formatTime(new Date(item.CreatedDate));
							item.CommissionMoneyText = `+${item.CommissionMoney}`;
							item.RefUserNick = `(${decodeURIComponent(item.RefUserNick)})`;
							item.PayUserNick = `(${decodeURIComponent(item.PayUserNick)})`;
						});
						this.noMentionMoney = `¥${res.NoMentionMoney}`;
						this.mentionMoney = `¥${res.MentionMoney}`;
						resolve(commissionList);
					})
					.catch((err: any) => {
						let mescroll: any = this.mescroll;
						mescroll.endErr();
					});
			});
		}
	}
});
</script>

<style>
.box {
	width: 100%;
	margin: 0 auto;
	overflow: hidden;
}

.animate {
	font-size: 12px;
	color: #767676;
	display: inline-block;
	white-space: nowrap;
	animation: 5s wordsLoop linear infinite normal;
}

@keyframes wordsLoop {
	0% {
		transform: translateX(100%);
		-webkit-transform: translateX(100%);
	}
	100% {
		transform: translateX(-100%);
		-webkit-transform: translateX(-100%);
	}
}

@-webkit-keyframes wordsLoop {
	0% {
		transform: translateX(100%);
		-webkit-transform: translateX(100%);
	}
	100% {
		transform: translateX(-100%);
		-webkit-transform: translateX(-100%);
	}
}
.content {
	background-color: #fff;
}

.mention-msg {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 75upx;
	background-color: #f0f0f0;
	padding: 0 30upx;
}

.mention {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.icon {
	width: 32upx;
	height: 32upx;
	margin-right: 12upx;
}

.mention-msg-text {
	font-size: 24upx;
	color: #767676;
	margin-left: 8upx;
}

.mention-money-msg {
	font-size: 24upx;
	line-height: 1.6;
	color: #767676;
}

.mention-money-no {
	font-size: 48upx;
	line-height: 1.6;
	color: #fe7f00;
	font-weight: 600;
}

.commission-list {
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 2upx solid #e1e1e1;
	margin: 0 30upx;
	padding: 30upx 0;
}

.commission-list:last-child {
	border-bottom: none;
}

.commission-created {
	font-size: 30upx;
	color: #616161;
}

.commission-createdDateTime {
	font-size: 28upx;
	color: #616161;
}

.commission-refUserNick {
	font-size: 28upx;
	color: #db8f42;
	margin-left: 8upx;
}

.commission-money {
	font-size: 32upx;
	color: #fa7d00;
}

.commission-money-text {
	margin-right: 12upx;
}

.commission-status-name {
	font-size: 20upx;
	color: #fff;
	background-color: #b3b3b3;
	border-radius: 8upx;
	padding: 8upx 12upx;
}

.commission-money-bg {
	color: #fa7d00;
}

.commission-status-bg {
	background-color: #fe7f00;
}

.mention-bottom {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	padding: 0 30upx;
	border-top: 2upx solid #cdcdcd;
	z-index: 999;
}

.mention-bottom-text {
	font-size: 30upx;
	color: #888888;
}

.mention-bottom-money {
	font-size: 48upx;
	color: #fe7f00;
}
</style>