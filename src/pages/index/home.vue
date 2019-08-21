<template>
	<view class="container">
		<!-- #ifdef MP-WEIXIN -->
		<show-tips></show-tips>
		<!-- #endif -->
		<mescroll-uni @down="downCallback" @up="upCallback">
			<view class="content">
				<view class="search-swiper">
					<view class="search" @click="search">
						<image class="search-icon" :src="searchIcon" />
						<input placeholder="搜索好物" placeholder-class="placeholder" disabled="true" />
					</view>
					<!-- 轮播 -->
					<view class="i-padding-wrap">
						<view class="page-section swiper">
							<view class="page-section-spacing">
								<swiper
									class="swiper-box round-dot"
									:indicator-dots="indicatorDots"
									:autoplay="autoplay"
									:interval="interval"
									:duration="duration"
									:circular="circular"
									:indicator-active-color="indicatorActiveColor"
									:easing-function="easing"
								>
									<swiper-item v-for="(item, index) in swiper" :key="index">
										<image :src="item.AdPicUrl" mode="aspectFill" />
									</swiper-item>
								</swiper>
							</view>
						</view>
					</view>
				</view>
				<!-- 分类导航 -->
				<view class="teng-option">
					<view class="teng-options"></view>
					<view class="teng-options-grid">
						<uni-grid
							:options="list"
							:show-border="false"
							:show-out-border="false"
							:column-num="4"
							@click="listClick"
						/>
					</view>
				</view>
				<!-- 滚动公告 -->
				<view class="uni-swiper-msg">
					<view class="i-swiper-msg-icon">
						<image src="/static/icon/icon_notice.png" mode="aspectFit" />
					</view>
					<swiper
						class="uni-swiper-wrapper"
						vertical="true"
						autoplay="true"
						circular="true"
						interval="3000"
						:display-multiple-items="multiple"
					>
						<block v-for="(item, index) in LastTranActiveList" :key="index">
							<swiper-item>
								<view class="i-item-msg">
									<view class="teng-notice-content">
										<text>恭喜</text>
										<text class="i-notice-original">{{item.OrderUserNick}}</text>以
										<text class="i-notice-original">¥{{item.OrderMoney}}</text>
										<text>元拍得</text>
										<text>{{item.ProductName}}</text>
									</view>
								</view>
							</swiper-item>
						</block>
					</swiper>
					<view class="notice-more" @click="noticeList">更多</view>
				</view>
				<!-- 正在竞拍 -->
				<product-list-being :options="productListIng" @lower="lower" />
				<!-- 即将开拍 -->
				<product-list :options="productList" />
			</view>
		</mescroll-uni>
	</view>
</template>
<script lang="ts">
import Vue from "vue";
import { request, navigateTo, formatTime } from "@/common/utils/util";
import {
	AdsListGet,
	LastTransactionListGet,
	HomeProductListGet
} from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
import showTips from "@/components/redflower-showTips/redflower-showTips.vue";
import uniGrid from "@/components/uni-grid/uni-grid.vue";
import productListBeing from "@/components/product-list-being/product-list-being.vue";
import productList from "@/components/product-list/product-list.vue";
export default Vue.extend({
	components: {
		MescrollUni,
		showTips,
		uniGrid,
		productListBeing,
		productList
	},
	data() {
		return {
			indicatorDots: true,
			autoplay: true,
			interval: 5000,
			duration: 500,
			circular: true,
			indicatorActiveColor: "#fe7f00",
			easing: "easeInOutCubic",
			multiple: 1,
			searchIcon: "/static/icon/icon_search.png",
			productList: [], // 正在竞拍列表
			productListIng: [], // 即将开拍列表
			productListData: [], // 正在竞拍新列表
			swiperGridHeight: "0px",
			swiperGridWidth: "100%",
			swiper: [],
			LastTranActiveList: [], // 最新成交列表
			PageCount: 1,
			pageNum: 1,
			pageSize: 10,
			list: [
				{
					image: "/static/icon_experience.png",
					text: "品类",
					navigateTo: "experience"
				},
				{
					image: "/static/icon_show.png",
					text: "晒单",
					navigateTo: "show"
				},
				{
					image: "/static/icon_exchange.png",
					text: "兑换",
					navigateTo: "exchange"
				},
				{
					image: "/static/icon_guide.png",
					text: "新手指南",
					navigateTo: "guide"
				}
			],
			mescroll: null
		};
	},
	onLoad(options: any) {
		if (options.scene) {
			let scene = decodeURIComponent(options.scene);
			console.log("scene:" + scene);
			let sessionKey: any = uni.getStorageSync("SessionKey");
			let userInfo: any = uni.getStorageSync("UserInfo");
			if (!sessionKey && !userInfo) {
				// 如果用户未登录，则保存scene
				uni.setStorageSync("scene", scene);
			}
		}
	},
	onShow() {
		if (this.mescroll) {
			let mescroll = this.mescroll;
			this.downCallback(mescroll);
		}
	},
	methods: {
		/*下拉刷新的回调 */
		downCallback(mescroll: any) {
			// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
			this.getAdsList();
			this.getLastTransactionList();
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
					if (mescroll.num == 1) this.productList = []; //如果是第一页需手动制空列表
					this.productList = this.productList.concat(curPageData); //追加新数据
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
			try {
				let productList: any = await this.getHomeProductListIng(
					pageNum,
					pageSize
				);
				this.getHomeProductList();
				//联网成功的回调
				successCallback && successCallback(productList);
			} catch (e) {
				//联网失败的回调
				errorCallback && errorCallback();
			}
		},
		getAdsList() {
			let data = {
				AdName: "首页头部轮播"
			};
			request(AdsListGet, data).then((res: any) => {
				this.swiper = res.AdsList[0].AdsViewList;
			});
		},
		// 获取最新成交列表
		getLastTransactionList() {
			let data = {};
			request(LastTransactionListGet, data).then((res: any) => {
				this.LastTranActiveList = res.LastTranActiveList;
				if (res.LastTranActiveList.length >= 2) {
					this.multiple = 2;
				}
			});
		},
		// 首页获取正在竞拍与即将开拍的商品列表
		// 查询类型 : home1=首页的正在竞拍列表, home2=首页的即将开拍列表
		getHomeProductListIng(pageNum: number, pageSize: number) {
			return new Promise((sesolve, reject) => {
				let data = {
					PageID: pageNum,
					PageSize: pageSize,
					SearchType: "home2"
				};
				request(HomeProductListGet, data)
					.then((res: any) => {
						sesolve(res.ProductList);
					})
					.catch((err: any) => {
						let mescroll: any = this.mescroll;
						mescroll.endErr();
					});
			});
		},
		getHomeProductList() {
			let pageNum = this.pageNum;
			let pageSize = this.pageSize;
			let data = {
				PageID: pageNum,
				PageSize: pageSize,
				SearchType: "home1"
			};
			request(HomeProductListGet, data).then((res: any) => {
				if (pageNum === 1) {
					this.productListIng = [];
				}
				this.productListIng = this.productListIng.concat(res.ProductList);
				this.PageCount = res.PageCount;
			});
		},
		lower(e: any) {
			if (this.pageNum < this.PageCount) {
				this.pageNum++;
				this.getHomeProductList();
			}
		},
		noticeList() {
			navigateTo("../mall/notice/notice");
		},
		search() {
			navigateTo("../mall/search/search");
		},
		// grid页面
		listClick(item: any) {
			let navigate = `../mall/${item.navigateTo}/${item.navigateTo}`;
			navigateTo(navigate);
		}
	}
});
</script>

<style>
.uni-swiper-dots-horizontal {
	position: absolute;
	font-size: 0;
	margin-bottom: 40upx;
	transform-origin: 20% 40%;
}

.teng-option {
	position: relative;
}

.teng-options {
	position: absolute;
	left: -20%;
	top: -24upx;
	background-color: #fff;
	width: 140%;
	height: 80upx;
	border-radius: 50% / 100% 100% 0 0;
}

.search-swiper {
	position: relative;
}

.search {
	position: absolute;
	top: 20upx;
	left: 50%;
	transform: translate(-50%, 0);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90%;
	height: 60upx;
	background-color: rgba(255, 255, 255, 0.4);
	border-radius: 100upx;
	border: 2upx solid #d7d8da;
	z-index: 999;
}

.search-icon {
	width: 28upx;
	height: 28upx;
}

.search input {
	width: 20%;
	color: #707070;
	margin-left: 10upx;
	padding: 10upx 0 10upx 0;
}

.placeholder {
	color: #707070;
}

.teng-options-grid {
	background-color: #fff;
}

.swiper-box {
	height: 480upx;
}

.i-swiper-msg {
	border-top: 2upx solid #f4f4f4;
}

.i-swiper-msg-icon {
	width: 180upx;
	height: 80upx;
	margin-right: 20upx;
}

.uni-swiper-wrapper {
	position: relative;
	width: 90%;
	border-left: 2upx solid #f4f4f4;
	padding-left: 20upx;
}

.i-notice-original {
	color: #fe7f00;
}

.notice-more {
	width: 120upx;
	color: #6a6a6a;
	border-left: 4upx solid #f4f4f4;
	padding-left: 20upx;
	z-index: 10;
}

.i-item-msg {
	word-break: break-all;
	display: -webkit-box;
	overflow: hidden;
	line-height: 1.5;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
}
</style>