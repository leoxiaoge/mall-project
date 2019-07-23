<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" scroll-x>
			<view
				v-for="(tab,index) in tabBars"
				:key="index"
				class="swiper-tab-list"
				:class="ListType==tab.type ? 'active' : ''"
				:id="tab.id"
				:data-current="tab.type"
				@click="tapTab"
			>{{tab.name}}</view>
		</scroll-view>
		<mescroll-uni top="104" @down="downCallback" @up="upCallback">
			<block v-for="(item,index2) in activeList" :key="index2">
				<media-list
					:options="item"
					:show-status="true"
					@close="close(index1,index2)"
					@click="goDetail(item)"
				></media-list>
			</block>
		</mescroll-uni>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
import { MyActiveList } from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
import mediaList from "@/components/media-list/media-list.vue";
export default Vue.extend({
	components: {
		MescrollUni,
		mediaList
	},
	data() {
		return {
			mescroll: [],
			ListType: 1,
			activeList: [],
			tabBars: [
				{
					id: "0",
					name: "正在拍",
					type: "1"
				},
				{
					id: "1",
					name: "已拍中",
					type: "2"
				},
				{
					id: "2",
					name: "未拍中",
					type: "3"
				}
			]
		};
	},
	onLoad(options: any) {},
	methods: {
		/*下拉刷新的回调 */
		downCallback(mescroll: any) {
			// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			this.mescroll = mescroll;
			mescroll.resetUpScroll();
		},
		/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
		upCallback(mescroll: any) {
			//联网加载数据
			this.getListDataFromNet(
				mescroll.num,
				mescroll.size,
				(curPageData: any) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if (mescroll.num == 1) this.activeList = []; //如果是第一页需手动制空列表
					this.activeList = this.activeList.concat(curPageData); //追加新数据
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
				let activeList: any = await this.getActiveList(pageNum, pageSize);
				this.activeList = activeList;
				console.log("data", this.activeList);
				//联网成功的回调
				successCallback && successCallback(activeList);
			} catch (e) {
				//联网失败的回调
				errorCallback && errorCallback();
			}
		},
		// 获取
		getActiveList(pageNum: string, pageSize: string) {
			return new Promise((sesolve, reject) => {
				let ListType = this.ListType;
				let data = {
					ListType: ListType,
					PageID: pageNum,
					PageSize: pageSize
				};
				request(MyActiveList, data).then((res: any) => {
					sesolve(res.ActiveList);
				});
			});
		},
		async tapTab(e: any) {
			console.log(e);
			let type = e.target.dataset.current;
			let mescroll: any = this.mescroll;
			this.ListType = type;
			this.downCallback(mescroll);
		},
		goDetail(e: any) {
			uni.navigateTo({
				url: "/pages/template/tabbar/detail/detail?title=" + e.title
			});
		}
	}
});
</script>

<style>
.uni-tab-bar-loading {
	text-align: center;
	font-size: 28upx;
	color: #999;
}
.uni-swiper-tab {
	width: 100%;
	background-color: #fff;
}
.swiper-tab-list {
	width: 33.33%;
}
</style>
