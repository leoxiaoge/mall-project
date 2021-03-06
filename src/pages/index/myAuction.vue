<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="swiper-tab" scroll-x>
			<view
				v-for="(tab,index) in tabBars"
				:key="index"
				class="swiper-tab-list product-item"
				:class="ListType==tab.type ? 'active' : ''"
				@click="tapTab(tab.type)"
			>
				<view class="name">{{tab.name}}</view>
				<view class="line"></view>
			</view>
		</scroll-view>
		<mescroll-uni top="100" @down="downCallback" @up="upCallback" v-if="sessionkey">
			<block v-for="(item,index2) in activeList" :key="index2">
				<media-list
					:options="item"
					:status-done="item.statusDone"
					:status-flow="item.statusFlow"
					@close="close(index1,index2)"
					@click="productDetailsTo(item.Active.ID)"
				></media-list>
			</block>
		</mescroll-uni>
		<view class="i-login" v-if="!sessionkey">
			<!-- #ifdef MP-WEIXIN -->
			<button
				class="btn i-login-button"
				open-type="getUserInfo"
				@getuserinfo="getUserInfo"
				v-if="!scopeUserInfo"
			>微信授权</button>
			<button
				class="btn i-login-button"
				:loading="loading"
				open-type="getPhoneNumber"
				@getphonenumber="getPhoneNumber"
				v-if="scopeUserInfo"
			>马上登录</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<button class="btn i-login-button" @click="loginPath">马上登录</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	showToast,
	navigateTo,
	formatTime,
	onShareAppMessage
} from "@/common/utils/util";
import { MyActiveList, GetWXPhone } from "@/common/config/api";
import MescrollUni from "@/components/mescroll-diy/mescroll-beibei.vue";
import mediaList from "@/components/media-list/media-list.vue";
export default Vue.extend({
	components: {
		MescrollUni,
		mediaList
	},
	data() {
		return {
			scopeUserInfo: false,
			mescroll: [],
			ListType: 1,
			activeList: [],
			sessionkey: "",
			iv: "",
			encryptedData: "",
			avatarUrl: "",
			nickName: "",
			refUserID: "",
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
					name: "我的参与",
					type: "3"
				}
			]
		};
	},
	onLoad(options: any) {},
	onShow() {
		this.useInfo();
		// #ifdef MP-WEIXIN
		this.authorize();
		// #endif
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
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
					let type = this.ListType;
					this.activeList.map((item: any) => {
						if (type == 2) {
							item.Active.ShowDate = formatTime(
								new Date(item.Active.MyBillDate)
							);
						} else if (type == 3) {
							item.Active.ShowDate = formatTime(
								new Date(item.Active.MySignupDate)
							);
						}
					});
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
				let activeList: any = await this.getActiveList(pageNum, pageSize);
				//联网成功的回调
				successCallback && successCallback(activeList);
			} catch (e) {
				//联网失败的回调
				errorCallback && errorCallback();
			}
		},
		// 获取
		getActiveList(pageNum: string, pageSize: string) {
			return new Promise((resolve, reject) => {
				let ListType = this.ListType;
				let data = {
					ListType: ListType,
					PageID: pageNum,
					PageSize: pageSize
				};
				request(MyActiveList, data)
					.then((res: any) => {
						resolve(res.ActiveList);
					})
					.catch((err: any) => {
						let mescroll: any = this.mescroll;
						mescroll.endErr();
					});
			});
		},
		async tapTab(e: any) {
			let type = e;
			let mescroll: any = this.mescroll;
			this.ListType = type;
			this.downCallback(mescroll);
		},
		useInfo() {
			this.sessionkey = uni.getStorageSync("SessionKey");
		},
		// 获取用户信息
		authorize() {
			if (!this.scopeUserInfo) {
				uni.login({
					provider: "weixin",
					success: loginRes => {
						if (loginRes) {
							// 获取用户信息
							uni.getUserInfo({
								provider: "weixin",
								success: (e: any) => {
									if (e.errMsg === "getUserInfo:ok") {
										this.scopeUserInfo = true;
										this.nickName = e.userInfo.nickName;
										this.avatarUrl = e.userInfo.avatarUrl;
									}
								}
							});
						}
					}
				});
			}
		},
		async getUserInfo(e: any) {
			if (e.detail.userInfo) {
				let avatarUrl: string = e.detail.userInfo.avatarUrl;
				let nickName: string = e.detail.userInfo.nickName;
				this.avatarUrl = avatarUrl;
				this.nickName = nickName;
				this.scopeUserInfo = true;
				showToast("授权成功，请点击授权手机号!");
			} else {
				showToast("更好的体验，请进行授权！");
			}
		},
		async getPhoneNumber(e: any) {
			if (e.detail.iv && e.detail.encryptedData) {
				this.iv = e.detail.iv;
				this.encryptedData = e.detail.encryptedData;
				let data: any = await this.GetWXPhone();
				let SessionKey = data.SessionKey;
				let UserInfo = data.UserInfo;
				uni.setStorageSync("SessionKey", SessionKey);
				uni.setStorageSync("UserInfo", UserInfo);
				this.useInfo();
				this.tapTab(this.ListType);
			} else {
				showToast("更好的体验，请进行授权！");
			}
		},
		async GetWXPhone() {
			// #ifdef MP-WEIXIN
			await this.$store.dispatch("checkSession");
			// #endif
			let OpenID: string = this.$store.state.openid;
			let WXSessionKey: string = this.$store.state.sessionKey;
			let iv: string = this.iv;
			let encryptedData: string = this.encryptedData;
			let WxFace: string = this.avatarUrl;
			let WxNick: string = this.nickName;
			let refUserID: string = this.refUserID;
			if (uni.getStorageSync("scene")) {
				refUserID = uni.getStorageSync("scene");
			}
			return new Promise((resolve, reject) => {
				let data = {
					OpenID: OpenID,
					WXSessionKey: WXSessionKey,
					iv: iv,
					encryptedData: encryptedData,
					WxFace: WxFace,
					WxNick: WxNick,
					RefUserID: refUserID
				};
				request(GetWXPhone, data).then((res: any) => {
					showToast("登录成功！");
					resolve(res);
				});
			});
		},
		// 马上登录
		loginPath() {
			navigateTo("../ucenter/login/login");
		},
		// 详情
		productDetailsTo(activeID: string) {
			navigateTo(
				"/pages/mall/productDetailsPage/productDetailsPage?activeID=" + activeID
			);
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

.swiper-tab {
	width: 100%;
	background-color: #fff;
	height: 98upx;
}

.uni-swiper-tab {
	width: 100%;
	background-color: #fff;
}

.swiper-tab-list {
	width: 33.33%;
}

.product-item {
	position: relative;
	display: inline-block;
	overflow: hidden;
	height: 98upx;
	line-height: 98upx;
}

.product-item .name {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-weight: 600;
}

.active .name {
	color: #fe7f00;
}

.active .line {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translate(-50%, 0);
	width: 100upx;
	height: 6upx;
	background-color: #fe7f00;
	border-radius: 8upx;
}

.i-login {
	position: fixed;
	margin: 0 auto;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.i-login-button {
	width: 220upx;
	height: 72upx;
	font-size: 28upx;
	line-height: 72upx;
	color: #fff;
	background: linear-gradient(180deg, #f98b1b, #f76102);
	border-radius: 100upx;
	border: none;
}
</style>
