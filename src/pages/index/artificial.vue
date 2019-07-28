<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view
					class="nav-left-item"
					@click="categoryClickMain(index)"
					:key="index"
					v-for="(item,index) in categoryList"
					:class="categoryActive==index?'active':''"
				>{{item.CategoryName}}</view>
			</scroll-view>
			<scroll-view
				class="nav-right"
				scroll-y
				:scroll-top="scrollTop"
				@scroll="scroll"
				@scrolltolower="lower"
				:style="'height:'+height+'px'"
				scroll-with-animation
			>
				<view class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index">
					<view class="teng-item-images">
						<image class="nav-right-item-image" :src="item.ProductPicList[0]" />
						<block v-if="item.Active.ActiveStatus === 4">
							<image class="teng-order-show-status" :src="statusIconDone" />
						</block>
						<block v-if="item.Active.ActiveStatus === 5">
							<image class="teng-order-show-status" :src="statusIconFlow" />
						</block>
					</view>
					<view class="teng-content">
						<view class="teng-title">{{item.ProductTitle}}</view>
						<view class="teng-type">
							<view class="teng-type-item" v-for="(i, idx) in item.Active.ActiveTagList" :key="idx">
								<text class="teng-type-text">{{i}}</text>
							</view>
						</view>
						<view class="teng-footer">
							<view class="teng-pirce">
								<block v-if="item.Active.PrevActiveMoney > 0">
									<text class="teng-pirce-text">上期成交：</text>
									<text class="teng-price-number">¥{{item.Active.PrevActiveMoney}}</text>
								</block>
							</view>
							<view class="teng-jion-btn">
								<button class="btn teng-btn" @click="productDetailsTo(item.ID, item.Active.ID)">{{item.activeButton}}</button>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
import { HomeProductListGet, ProductCategoryListGet, ProductPaiListGet } from "@/common/config/api";
export default Vue.extend({
	data() {
		return {
			categoryList: [],
			subCategoryList: [],
			categoryActive: 0,
			height: 0,
			scrollTop: 0,
			scrollHeight: 0,
			categoryID: "",
			pageNum: 0,
			pageSize: 10,
			pageCount: 1,
			statusIconDone: "/static/icon/icon_done.png",
			statusIconFlow: "/static/icon/icon_flow.png"
		};
	},
	onLoad() {
		let windowHeight: any = uni.getSystemInfoSync().windowHeight;
		this.height = windowHeight;
		this.getCategory();
	},
	methods: {
		scroll(e: any) {
			this.scrollHeight = e.detail.scrollHeight;
		},
		getCategory() {
			let data = {};
			request(ProductCategoryListGet, data).then((res: any) => {
				this.categoryList = res.CategoryList;
				this.categoryClickMain(0);
			});
		},
		// 商品列表
		categoryClickMain(index: any) {
			return new Promise((sesolve, reject) => {
				let item: any = this.categoryList[index];
				this.categoryActive = index;
				this.categoryID = item.ID;
				this.pageNum = 0;
				this.lower();
			});
		},
		getProductPaiList() {
			return new Promise((sesolve, reject) => {
				let CategoryID = this.categoryID;
				let pageNum = this.pageNum;
				let pageSize = this.pageSize;
				let data = {
					PageID: pageNum,
					PageSize: pageSize,
					CategoryID: CategoryID,
					ActiveType: 1
				};
				request(ProductPaiListGet, data).then((res: any) => {
					let subCategoryList = res.ProductList;
					subCategoryList.map((item: any) => {
						item.activeButton =
							item.Active.ActiveStatus === (4 || 5) ? "参加下一期" : "参加竞拍";
					});
					this.pageCount = res.PageCount;
					sesolve(subCategoryList);
				});
			});
		},
		async lower() {
			if (this.pageNum < this.pageCount) {
				this.pageNum++;
				let subCategoryList: any = await this.getProductPaiList();
				if (this.pageNum === 1) {
					this.subCategoryList = subCategoryList;
				} else {
					this.subCategoryList = this.subCategoryList.concat(subCategoryList);
				}
			}
		},
		productDetailsTo(id: any, activeID: any) {
			navigateTo("../mall/productDetailsPage/productDetailsPage?id=" + id + '&activeID=' + activeID);
		}
	}
});
</script>

<style>
.page-body {
	display: flex;
}

.nav {
	display: flex;
	width: 100%;
}

.nav-left {
	width: 25%;
	border-right: solid 1px #ededed;
}

.nav-left-item {
	height: 100upx;
	border-bottom: solid 1px #ededed;
	font-size: 30upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #f3f4f3;
}

.nav-right {
	width: 75%;
}

.nav-right-item {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 28upx;
	border-bottom: 2upx solid #f4f4f4;
	margin-left: 20upx;
	padding: 20upx 20upx 20upx 0;
}

.teng-item-images {
	position: relative;
}

.nav-right-item-image {
	width: 120upx;
	height: 120upx;
	border-radius: 8upx;
}

.teng-order-show-status {
	position: absolute;
	left: 0;
	top: 0;
	width: 80upx;
	height: 80upx;
}

.active {
	color: #fe7f00;
	background-color: #e4e4e4;
}

.teng-title {
	word-break: break-all;
	display: -webkit-box;
	overflow: hidden;
	line-height: 1.5;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
}

.teng-content {
	width: 100%;
	margin-left: 20upx;
}

.teng-title {
	font-size: 28upx;
	line-height: 1.6;
	color: #757575;
}

.teng-type {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.teng-type-text {
	font-size: 24upx;
	line-height: 1.6;
	text-align: center;
	margin-right: 10upx;
	padding: 2upx 10upx;
	color: #fe7f00;
	border: 2upx solid #fe7f00;
	border-radius: 100upx;
}

.teng-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 10upx;
}

.teng-pirce-text {
	font-size: 24upx;
	color: #333;
}

.teng-price-number {
	font-size: 32upx;
	color: #fe7f00;
}

.teng-btn {
	font-size: 24upx;
	line-height: 2.4;
	color: #fff;
	background-color: #fe7f00;
	border-radius: 100upx;
	margin: 0;
}
</style>