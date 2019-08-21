<template>
	<view class="container">
		<view class="search">
			<i-search
				:iconSrc="iconSrc"
				:focus="focus"
				@blur="blur"
				@search="search"
				@manager="manager"
				@scan="scan"
			></i-search>
		</view>
		<view class="product-list">
			<product-list :options="productList" />
		</view>
		<view class="no" v-if="noShow">
			<i-no :thumb="thumb" :title="title"></i-no>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo, showToast } from "@/common/utils/util";
import { ProductSearchListGet } from "@/common/config/api";
import iSearch from "@/components/i-search/i-search.vue";
import iNo from "@/components/u-no/u-no.vue";
import productList from "@/components/product-search-list/product-search-list.vue";
export default Vue.extend({
	components: {
		iSearch,
		iNo,
		productList
	},
	data() {
		return {
			pageNum: 1,
			pageSize: 10,
			keyword: "",
			pageCount: 1,
			productList: [],
			focus: false,
			noShow: false,
			thumb: "http://www.mescroll.com/img/mescroll-empty.png?v=1",
			title: "暂无搜索数据",
			iconSrc: {
				logo: "/static/icon/icon_search.png",
				voice: "/static/img/icon_voice.png",
				scan: "/static/img/icon_scan.png",
				clear: "/static/img/icon_clear.png"
			}
		};
	},
	onLoad(options) {
		console.log("onLoad", options);
	},
	onReachBottom() {
		if (this.pageNum < this.pageCount) {
			this.pageNum++;
			this.getListDataFromNet();
		}
	},
	methods: {
		blur(e: any) {
			this.keyword = e;
			this.pageNum = 1;
			this.getListDataFromNet();
		},
		search(e: any) {
			this.keyword = e;
			this.pageNum = 1;
			this.getListDataFromNet();
		},
		manager(e: any) {
			this.keyword = e;
			this.pageNum = 1;
			this.getListDataFromNet();
		},
		scan(e: any) {
			this.keyword = e.result;
			this.pageNum = 1;
			this.getListDataFromNet();
		},
		async getListDataFromNet() {
			let pageNum = this.pageNum;
			let pageSize = this.pageSize;
			let productList: any = await this.getProductSearchList(pageNum, pageSize);
			if (this.pageNum == 1) this.productList = [];
			this.productList = this.productList.concat(productList);
			if (this.productList.length <= 0) {
				this.noShow = true;
			} else {
				this.noShow = false;
			}
		},
		getProductSearchList(pageNum: number, pageSize: number) {
			return new Promise((sesolve, reject) => {
				let Keyword = this.keyword;
				if (!Keyword) {
					showToast("请输入搜索词！");
					return;
				}
				let data = {
					PageID: pageNum,
					PageSize: pageSize,
					Keyword: Keyword
				};
				request(ProductSearchListGet, data)
					.then((res: any) => {
						console.log(res);
						this.pageCount = res.PageCount;
						sesolve(res.ProductList);
					})
					.catch((err: any) => {
						console.log(err);
					});
			});
		}
	}
});
</script>

<style>
page {
	background-color: #fff;
}
.search {
	margin: 20upx 20upx 0 20upx;
}
</style>
