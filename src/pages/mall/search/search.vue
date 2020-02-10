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
		<view v-if="!noShow">
			<load-more :status="status" color="#fe7f00" />
		</view>
		<view class="no" v-if="noShow">
			<i-no :thumb="thumb" :title="title"></i-no>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	showToast,
	showErrorToast,
	formatTime,
	onShareAppMessage
} from "@/common/utils/util";
import { ProductSearchListGet } from "@/common/config/api";
import iSearch from "@/components/i-search/i-search.vue";
import iNo from "@/components/u-no/u-no.vue";
import productList from "@/components/product-search-list/product-search-list.vue";
import loadMore from "@/components/load-more/load-more.vue";
let socketOpen: boolean = false;
let socketMsgQueue: any = [];
export default Vue.extend({
	components: {
		iSearch,
		iNo,
		productList,
		loadMore
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
			isReseMode: false,
			thumb: "http://www.mescroll.com/img/mescroll-empty.png?v=1",
			title: "暂无搜索数据",
			iconSrc: {
				logo: "/static/icon/icon_search.png",
				voice: "/static/img/icon_voice.png",
				scan: "/static/img/icon_scan.png",
				clear: "/static/img/icon_clear.png"
			},
			status: "",
			totals: 0
		};
	},
	onLoad(options) {
		console.log("onLoad", options);
	},
	onShow() {
		this.websocket();
	},
	onHide() {
		uni.closeSocket();
	},
	onUnload() {
		uni.closeSocket();
	},
	onReachBottom() {
		if (this.pageNum < this.pageCount) {
			this.pageNum++;
			this.getListDataFromNet();
		}
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		websocket() {
			uni.connectSocket({
				url: "wss://websocket.tengpaisc.com"
			});
			uni.onSocketOpen((res: any) => {
				console.log("WebSocket连接已打开！");
				uni.hideLoading();
				socketOpen = true;
				for (let i = 0; i < socketMsgQueue.length; i++) {
					this.sendSocketMessage(socketMsgQueue[i]);
				}
				socketMsgQueue = [];
				this.onSocketMessage();
			});
			uni.onSocketError(res => {
				console.log("WebSocket连接打开失败，请检查！");
				// 断线调用函数
				showErrorToast("断线重连中...");
				this.websocket();
			});
		},
		sendSocketMessage(msg: any) {
			let data: string = JSON.stringify(msg);
			console.log("发送数据", socketOpen, msg);
			if (socketOpen) {
				uni.sendSocketMessage({
					data: data
				});
			} else {
				socketMsgQueue.push(msg);
			}
		},
		onSocketMessage() {
			uni.onSocketMessage((res: any) => {
				let msg: any = JSON.parse(res.data);
				console.log("收到服务器内容：" + res.data);
				let msgType = msg.msgType;
				if (msg == null) {
					return;
				}
				try {
					switch (msgType) {
						case 21:
							this.productList.map((item: any) => {
								if (msg.ActiveID === item.Active.ID) {
									if (msg.LastBill) {
										item.Active.LastBillUserName = decodeURIComponent(
											msg.LastBill.nick
										);
										item.Active.LastBillUserFace = msg.LastBill.face;
									}
									item.Price = msg.Price;
									item.Active.SeqMiniSeconds = msg.SeqMiniSeconds;
									item.Status = msg.Status;
								}
							});
							let productLists = JSON.parse(JSON.stringify(this.productList));
							this.productList = productLists;
							console.log(this.productList);
							break;
					}
				} catch (e) {
					console.error("处理消息出错：" + e);
				}
			});
		},
		// 发送对该活动的消息订阅
		msgSubscribe(e: any) {
			console.log("发送对该活动的消息订阅");
			let Activeids = e;
			let msgTime = formatTime(new Date());
			let isReseMode = this.isReseMode;
			let reqSubscribe = {
				msgType: 20,
				msgTime: msgTime,
				isReseMode: isReseMode,
				Activeids: Activeids
			};
			this.sendSocketMessage(reqSubscribe);
		},
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
			let data: any = productList.map((item: any) => item.Active.ID);
			this.msgSubscribe(data);
			if (this.pageNum == 1) {
				this.productList = [];
			} else {
				this.status = "more";
			}
			this.productList = this.productList.concat(productList);
			if (this.totals === this.productList.length) {
				this.status = "nomore";
			}
			if (this.productList.length <= 0) {
				this.noShow = true;
			} else {
				this.noShow = false;
			}
		},
		getProductSearchList(pageNum: number, pageSize: number) {
			return new Promise((resolve, reject) => {
				let Keyword = this.keyword;
				if (!Keyword) {
					showToast("请输入搜索词！");
					return;
				}
				if (!this.noShow) {
					this.status = "loading";
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
						this.totals = res.Totals;
						this.status = "";
						resolve(res.ProductList);
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
