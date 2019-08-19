<template>
	<view class="content">
		<mescroll-uni @down="downCallback" @up="upCallback">
			<view class="commission-list" v-for="(item, index) in commissionList" :key="index">
				<view class="commission-created">{{item.CreatedDateTime}}</view>
        <view class="commission-money">{{item.CommissionMoneyText}}</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, formatTime } from "@/common/utils/util";
import { GetUserCommissionList } from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
export default Vue.extend({
  components: {
		MescrollUni
	},
	data() {
		return {
      commissionList: [],
      mescroll: null
		};
	},
	onLoad(options: any) {
		console.log("onLoad", options);
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
			return new Promise((sesolve, reject) => {
				let data = {
					PageID: pageNum,
					PageSize: pageSize
				};
				request(GetUserCommissionList, data)
					.then((res: any) => {
            let commissionList = res.CommissionList;
            commissionList.map((item: any) => {
              item.CreatedDateTime = formatTime(new Date(item.CreatedDate));
              item.CommissionMoneyText = `+${item.CommissionMoney}`
						});
						sesolve(commissionList);
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
.content {
  background-color: #fff;
}

.commission-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2upx solid #e1e1e1;
  margin: 0 30upx;
  padding: 30upx 0;
}

.commission-created {
  font-size: 30upx;
  color: #616161;
}

.commission-money {
  font-size: 32upx;
  font-weight: 600;
  color: #fa7d00;
}
</style>