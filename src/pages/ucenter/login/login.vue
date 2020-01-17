
<template>
	<view class="container">
		<view class="i-header-logo">
			<image :src="logo" />
		</view>
		<view class="i-login-mobile i-border-bottom i-flex-between">
			<view class="i-login-content i-flex">
				<image class="i-login-mobile-image" />
				<input
					class="i-login-mobile-input"
					type="number"
					:focus="focus"
					:value="Mobile"
					placeholder="请输入手机号码"
					@input="mobileInput"
				/>
			</view>
			<view class="i-login-set-code">
				<button class="i-button-get" :disabled="disabled" @click="getCode">{{time}}</button>
			</view>
		</view>
		<view class="i-login-code i-border-bottom">
			<view class="i-login-content i-flex">
				<image class="i-login-code-image" />
				<input
					class="i-login-code-input"
					type="number"
					:value="LoginCode"
					placeholder="验证码"
					@input="codeInput"
				/>
			</view>
		</view>
		<view class="i-login-radio">
			<radio-group name="radio">
				<label class="radio">
					<radio @click.stop.prevent="radioClick" :checked="checked" :color="color" />
				</label>
				<text class="protocol-agree">我已阅读并同意</text>
				<text class="protocol-text" @click="protocol">《腾拍商场购物协议》</text>
			</radio-group>
		</view>
		<view class="i-login-button-view">
			<!-- #ifdef MP-WEIXIN -->
			<button
				class="btn i-login-button"
				:loading="loading"
				:disabled="!checked"
				open-type="getUserInfo"
				@getuserinfo="wxLogin"
			>登录</button>
			<!-- #endif -->
			<!-- #ifndef MP-WEIXIN -->
			<button class="btn i-login-button" :loading="loading" :disabled="!checked" @click="userLogin">登录</button>
			<!-- #endif -->
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import {
	request,
	navigateTo,
	navigateBack,
	showToast,
	onShareAppMessage
} from "@/common/utils/util";
import { UserLogin, GetLoginCode, GetWXOpenID } from "@/common/config/api";
import uniIcon from "@/components/uni-icon/uni-icon.vue";
export default Vue.extend({
	components: {
		uniIcon
	},
	computed: {
		...mapState(["hasLogin"])
	},
	data() {
		return {
			avatarUrl: "",
			nickName: "",
			refUserID: "",
			logo: "/static/icon/icon_login.png",
			checked: true,
			color: "#fe7f00",
			focus: true,
			Mobile: "",
			LoginCode: "",
			loading: false,
			time: "获取验证码",
			currentTime: 60,
			disabled: false,
			interval: ""
		};
	},
	onLoad(options: any) {},
	onUnload() {
		let interval: any = this.interval;
		clearInterval(interval);
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		...mapMutations(["login"]),
		getProvider() {
			return new Promise((resolve, reject) => {
				uni.getProvider({
					service: "oauth",
					success: (res: any) => {
						resolve(res.provider);
					}
				});
			});
		},
		async login() {
			let provider: any = await this.getProvider();
			return new Promise((resolve, reject) => {
				if (~provider.indexOf("weixin")) {
					uni.login({
						provider: "weixin",
						success: (loginRes: any) => {
							let JSCode = loginRes.code;
							console.log(JSCode);
							let data = {
								JSCode: JSCode
							};
							request(GetWXOpenID, data).then((res: any) => {
								resolve(res.OpenID);
							});
						}
					});
				}
			});
		},
		authorize() {
			let that = this;
			uni.login({
				provider: "weixin",
				success(loginRes) {
					console.log("loginRes.authResult", loginRes);
					if (loginRes) {
						// 获取用户信息
						uni.getUserInfo({
							provider: "weixin",
							success(e: any) {
								console.log("getUserInfo", e);
								if (e.errMsg === "getUserInfo:ok") {
									console.log("用户昵称为：" + e.userInfo.nickName);
									that.nickName = e.userInfo.nickName;
									that.avatarUrl = e.userInfo.avatarUrl;
								}
							}
						});
					}
				}
			});
		},
		mobileInput(e: any) {
			this.Mobile = e.detail.value;
		},
		codeInput(e: any) {
			this.LoginCode = e.detail.value;
		},
		getCode(e: any) {
			let Mobile = this.Mobile;
			if (!Mobile) {
				showToast("手机号码不能为空！");
				return;
			}
			this.getLoginCode();
			let currentTime: any = this.currentTime;
			this.time = currentTime + "s后可重发";
			this.disabled = true;
			let interval: any = setInterval(() => {
				this.time = currentTime - 1 + "s后可重发";
				currentTime--;
				if (currentTime <= 0) {
					clearInterval(interval);
					this.time = "重新获取";
					this.currentTime = 60;
					this.disabled = false;
				}
			}, 1000);
			this.interval = interval;
		},
		getLoginCode() {
			let Mobile = this.Mobile;
			let data = {
				Mobile: Mobile
			};
			request(GetLoginCode, data).then((res: any) => {
				console.log(res);
				showToast("发送成功！");
			});
		},
		radioClick() {
			this.checked = !this.checked;
		},
		async wxLogin(e: any) {
			console.log(e);
			let userInfo = e.detail.userInfo;
			this.avatarUrl = userInfo.avatarUrl;
			this.nickName = userInfo.nickName;
			let OpenID: any = await this.login();
			uni.setStorageSync("OpenID", OpenID);
			this.userLogin();
		},
		async userLogin() {
			let Mobile = this.Mobile;
			let LoginCode = this.LoginCode;
			let wxFace = this.avatarUrl;
			let wxNick = encodeURIComponent(this.nickName);
			let refUserID = this.refUserID;
			if (uni.getStorageSync("scene")) {
				refUserID = uni.getStorageSync("scene");
			}
			if (!Mobile) {
				showToast("手机号码不能为空！");
				return;
			}
			if (!LoginCode) {
				showToast("验证码不能为空！");
				return;
			}
			this.loading = true;
			// #ifdef MP-WEIXIN
			let OpenID: any = await this.login();
			// #endif
			let data = {
				Mobile: Mobile,
				LoginCode: LoginCode,
				// #ifdef MP-WEIXIN
				OpenID: OpenID,
				// #endif
				wxFace: wxFace,
				wxNick: wxNick,
				RefUserID: refUserID
			};
			request(UserLogin, data).then((res: any) => {
				this.loading = false;
				let SessionKey = res.SessionKey;
				let UserInfo = res.UserInfo;
				uni.setStorageSync("SessionKey", SessionKey);
				uni.setStorageSync("UserInfo", UserInfo);
				showToast("登录成功！");
				navigateBack(1);
			}).catch((err: any) => {
				this.loading = false;
			});
		},
		getuserinfo(e: any) {
			console.log(e);
		},
		protocol() {
			navigateTo("../protocol/protocol");
		}
	}
});
</script>

<style>
page {
	background-color: #fff;
}

.i-header-logo {
	padding: 80upx 0 80upx 0;
	text-align: center;
}

.i-header-logo image {
	width: 180upx;
	height: 180upx;
}

.i-border-bottom {
	border-bottom: 2upx solid #f4f4f4;
}

.i-login-mobile {
	margin: 0 60upx;
	padding: 20upx 0;
}

.i-login-code {
	margin: 0 60upx;
	padding: 20upx 0;
}

.i-login-mobile-image {
	background: url(https://api.tengpaisc.com/Resources/images/icon_login_mobile.png)
		center no-repeat;
	background-size: 100%;
	width: 36upx;
	height: 52upx;
}

.i-login-code-image {
	background: url(https://api.tengpaisc.com/Resources/images/icon_login_code.png)
		center no-repeat;
	background-size: 100%;
	width: 36upx;
	height: 52upx;
}

.i-login-content {
	width: 65%;
}

.i-login-mobile-input {
	margin-left: 20upx;
}

.i-login-code-input {
	margin-left: 20upx;
}

.i-login-radio {
	margin: 0 60upx;
	padding: 20upx 0;
}

.radio {
	padding: 0;
}

.protocol-agree {
  margin-left: 10upx;
}

.protocol-text {
	color: #fe7f00;
}

.i-button-get {
	background-color: #fff;
	font-size: 32upx;
	color: #fe7f00;
}

button:after {
	content: " ";
	width: 200%;
	height: 200%;
	position: absolute;
	top: 0;
	left: 0;
	border: none;
	-webkit-transform: scale(0.5);
	transform: scale(0.5);
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	box-sizing: border-box;
	border-radius: 10px;
}

button[disabled]:not([type]),
button[disabled][type="default"] {
	color: rgba(0, 0, 0, 0.3);
	background-color: #f4f4f4;
}

.i-login-button {
	font-size: 32upx;
	line-height: 80upx;
	width: 80%;
	color: #fff;
	background: linear-gradient(45deg, #eba866, #fe7f00);
	border-radius: 100upx;
	margin-top: 40upx;
}
</style>
