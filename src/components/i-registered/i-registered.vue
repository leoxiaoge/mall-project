<template>
	<view class="content">
		<uni-popup
			:show="type === 'middle-img'"
			position="middle"
			mode="insert"
			@hidePopup="togglePopup('')"
		>
			<view class="uni-center center-box">
				<image class="image" src="/static/uni.png" mode="aspectFit" />
				<view>
					<button
						class="registered-button"
						:loading="loading"
						open-type="getUserInfo"
						@getuserinfo="getUserInfo"
					>微信授权</button>
				</view>
				<view>
					<button
						class="registered-button"
						:loading="loading"
						open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber"
					>授权手机号</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import { request, navigateTo } from "@/common/utils/util";
import { UserLogin, GetLoginCode, GetWXOpenID } from "@/common/config/api";
import uniPopup from "@/components/uni-popup/uni-popup.vue";
export default Vue.extend({
	name: "iRegistered",
	components: {
		uniPopup
	},
	props: {
		options: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
      type: "middle-img",
      loading: false
		};
	},
	methods: {
		togglePopup(type: string) {
			this.type = type;
    },
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
    async getUserInfo(e: any) {
			console.log(e);
      let userInfo = e.detail.userInfo;
      let OpenID: any = await this.login();
    },
    async getPhoneNumber (e: any) {
			console.log(e)
			console.log(e.detail.errMsg)
			console.log(e.detail.iv)
      console.log(e.detail.encryptedData)
      let OpenID: any = await this.login();
		},
	}
});
</script>

<style>
@charset "UTF-8";

.center-box {
	position: relative;
}

.image {
	width: 600upx;
	height: 600upx;
}

.registered-button {
	position: absolute;
	left: 50%;
	bottom: 10%;
	transform: translate(-50%, 0);
	width: 60%;
	border-radius: 100upx;
}
</style>