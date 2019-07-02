<template>
	<view>
		<scroll-view id="tab-bar" class="i-swiper-tab" scroll-x>
			<view
				v-for="(tab, index) in tabBars"
				:key="index"
				class="swiper-tab-list"
				:class="current==tab.status ? 'active' : ''"
				:data-id="tab.id"
				:data-current="tab.status"
				@click="tapTab"
			>{{tab.name}}</view>
		</scroll-view>
		<mescroll-uni top="100" @down="downCallback" @up="upCallback">
			<block v-for="(item, index) in orderList" :key="index">
				<media-list :options="item" @click="goDetail(item)"></media-list>
			</block>
		</mescroll-uni>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
import { OrderListGet } from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
import mediaList from "@/components/order-list/order-list.vue";

export default Vue.extend({
	components: {
		MescrollUni,
		mediaList
	},
	data() {
		return {
			current: 0,
			OrderStatus: 0,
			orderList: [], // 订单列表
			tabBars: [
				{
					name: "全部",
					id: "0",
					status: ""
				},
				{
					name: "待付款",
					id: "1",
					status: "1"
				},
				{
					name: "待发货",
					id: "2",
					status: "2"
				},
				{
					name: "待收货",
					id: "3",
					status: "3"
				},
				{
					name: "待晒单",
					id: "4",
					status: "4"
				}
			],
			mescroll: []
		};
	},
	onLoad(options: any) {
		console.log(options);
		let status = options.status;
		this.current = status;
	},
	methods: {
		// 点击选项卡
		tapTab(e: any) {
			this.current = e.target.dataset.current;
			this.OrderStatus = e.target.dataset.current;
			let mescroll: any = this.mescroll;
			this.downCallback(mescroll);
		},
		/*下拉刷新的回调 */
		downCallback(mescroll: any) {
			// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			this.mescroll = mescroll;
			mescroll.resetUpScroll();
		},
		/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
		upCallback(mescroll: any) {
			//联网加载数据
			this.getListDataFromNet(mescroll.num,mescroll.size,(curPageData: any) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if (mescroll.num == 1) this.orderList = []; //如果是第一页需手动制空列表
					this.orderList = this.orderList.concat(curPageData); //追加新数据
				},
				() => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				}
			);
		},
		/*联网加载列表数据
			实际项目以您服务器接口返回的数据为准,无需本地处理分页.
			* */
		async getListDataFromNet(
			pageNum: any,
			pageSize: any,
			successCallback: any,
			errorCallback: any
		) {
			console.log(pageNum, pageSize);
			try {
				let orderList: any = await this.getOrderList(pageNum, pageSize);
				this.orderList = orderList;
				console.log("data", this.orderList);
				//联网成功的回调
				successCallback && successCallback(orderList);
			} catch (e) {
				//联网失败的回调
				errorCallback && errorCallback();
			}
		},
		getOrderList(pageNum: any, pageSize: any) {
			return new Promise((sesolve, reject) => {
				let OrderStatus = this.OrderStatus;
				let data = {
					OrderStatus: OrderStatus,
					PageID: pageNum,
					PageSize: pageSize
				};
				request(OrderListGet, data).then((res: any) => {
					console.log(res);
					sesolve(res.OrderList);
				});
			});
		},
		goDetail(e: any) {
			console.log(e);
			uni.navigateTo({
				url: "../orderDetail/orderDetail?id=" + e.OrderID
			});
		}
	}
});
</script>

<style>
page {
	width: 100%;
	height: 100%;
}
.content {
	width: 100%;
	height: 100%;
}
.swiper {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	overflow: scroll;
}
.active {
	color: #fe7f00;
}
.i-tab-bar-loading {
	text-align: center;
	font-size: 28upx;
	color: #999;
}
.i-swiper-tab {
	height: 98upx;
	line-height: 98upx;
	background-color: #fff;
	border-bottom: 2upx solid #f4f4f4;
}
.scroll-view-list {
	width: 100%;
	height: 100%;
}
</style>