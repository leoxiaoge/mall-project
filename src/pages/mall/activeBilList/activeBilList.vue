<template>
	<view class="container">
		<mescroll-uni @down="downCallback" @up="upCallback">
			<view
				class="i-bill"
				:class="(item.IsWin === 0?'i-default':'i-active')"
				v-for="(item, index) in billList"
				:key="index"
			>
				<view class="i-bill-image i-flex">
					<img :src="item.UserFace" />
					<view class="i-bill-user" :class="(item.IsWin === 0?'i-default':'i-active')">{{item.UserMobile}}</view>
				</view>
				<view class="i-bill-IsWin" v-if="item.IsWin === 0">出局</view>
				<view class="i-bill-IsWin" :class="(item.IsWin === 0?'i-default':'i-active')" v-else>预选</view>
				<view class="i-bill-province" :class="(item.IsWin === 0?'i-default':'i-active')">{{item.Province}}{{item.City}}</view>
				<view class="i-bill-price" :class="(item.IsWin === 0?'i-default':'i-active')">{{item.Price}}</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
import { ActiveBillListGet } from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
export default Vue.extend({
	components: {
		MescrollUni
	},
	data() {
		return {
			id: "",
			billList: [],
			mescroll: []
		};
	},
	onLoad(options: any) {
		console.log("onLoad", options);
		this.id = options.id;
	},
	methods: {
		// 下拉刷新的回调
		downCallback(mescroll: any) {
			this.mescroll = mescroll;
			mescroll.resetUpScroll();
		},
		// 上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10
		upCallback(mescroll: any) {
			this.getListDataFromNet(mescroll.num,mescroll.size,(curPageData: any) => {
					mescroll.endSuccess(curPageData.length);
					if (mescroll.num == 1) this.billList = [];
					this.billList = this.billList.concat(curPageData);
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
				let billList: any = await this.getActiveBillList(pageNum, pageSize);
				this.billList = billList;
				successCallback && successCallback(billList);
			} catch (e) {
				errorCallback && errorCallback();
			}
		},
		getActiveBillList(pageNum: any, pageSize: any) {
			return new Promise((sesolve, reject) => {
				let ActiveID = this.id;
				let data = {
					ActiveID: ActiveID,
					PageID: pageNum,
					PageSize: pageSize
				};
				request(ActiveBillListGet, data).then((res: any) => {
					console.log(res);
					sesolve(res.BillList);
				});
			});
		}
	}
});
</script>

<style>
.container {
	height: 100%;
	background-color: #fff;
	padding: 0 30upx;
}

.i-bill {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 120upx;
	font-size: 32upx;
	line-height: 120upx;
	padding: 0 30upx;
	border-bottom: 2upx solid #f4f4f4;
	background-color: #fff;
}

.i-default {
	color: #30a900;
}

.i-active {
	color: #fe7f00;
}

.i-bill-image {
	min-width: 260upx;
}

.i-bill-image img {
	width: 84upx;
	height: 84upx;
	border-radius: 50%;
}

.i-bill-user {
	margin-left: 20upx;
}
</style>
