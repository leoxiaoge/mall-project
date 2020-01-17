<template>
	<view class="content">
		<model-popup
			:show="type === 'middle-img' && show"
			position="middle"
			mode="insert"
			@hidePopup="togglePopup('')"
		>
			<view class="uni-center center-box">
				<image class="image" src="/static/registered.png" mode="aspectFit" />
				<!-- #ifdef MP-WEIXIN -->
				<view>
					<button
						class="registered-button"
						:loading="loading"
						open-type="getUserInfo"
						@getuserinfo="getUserInfo"
						v-if="!scopeUserInfo"
					>微信授权</button>
				</view>
				<view>
					<button
						class="registered-button"
						:loading="loading"
						open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber"
						v-if="scopeUserInfo"
					>授权手机号</button>
				</view>
				<!-- #endif -->
				<!-- #ifndef MP-WEIXIN -->
				<view>
					<button class="registered-button" @click="loginPath">立即注册</button>
				</view>
				<!-- #endif -->
			</view>
		</model-popup>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import modelPopup from "@/components/model-popup/model-popup.vue";
export default Vue.extend({
	name: "iRegistered",
	components: {
		modelPopup
	},
	props: {
		options: {
			type: Array,
			default() {
				return [];
			}
		},
		show: {
			type: Boolean,
			default: false
		},
		scopeUserInfo: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			type: "middle-img"
		};
	},
	methods: {
		togglePopup(type: string) {
			this.type = type;
		},
		getUserInfo(e: any) {
			console.log(e);
			this.$emit("getUserInfo", e);
		},
		getPhoneNumber(e: any) {
			console.log(e);
			this.$emit("getPhoneNumber", e);
		},
		// 登录页
		loginPath() {
			this.$emit("loginPath");
		}
	}
});
</script>

<style>
@charset "UTF-8";

.content {
	position: fixed;
	z-index: 999;
}

.center-box {
	position: relative;
}

.image {
	width: 600upx;
	height: 700upx;
}

.registered-button {
	position: absolute;
	left: 50%;
	bottom: 10%;
	transform: translate(-50%, 0);
	width: 60%;
	font-size: 32upx;
	line-height: 80upx;
	color: #fff;
	background: linear-gradient(180deg, #f98b1b, #f76102);
	border-radius: 100upx;
	border: 2upx solid #fff;
}
</style>