<template>
	<view class="content">
		<view class="userInfo">
			<input class="input" :value="userNick" @blur="blur" />
		</view>
		<view class="save-in">
			<button class="saveBtn" @click="save">保存</button>
		</view>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	showToast,
	onShareAppMessage
} from "@/common/utils/util";
import { GetLoginUser, UpdateUserInfo } from "@/common/config/api";
export default Vue.extend({
	data() {
		return {
			userNick: ""
		};
	},
	onLoad(options: any) {
		this.useInfo();
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		async useInfo() {
			let userInfo: any = await this.getLoginUser();
			this.userNick = decodeURIComponent(userInfo.userNick);
		},
		// 获取当前登录用户的信息
		getLoginUser() {
			return new Promise((sesolve, reject) => {
				let data = {};
				request(GetLoginUser, data).then((res: any) => {
					sesolve(res.UserInfo);
				});
			});
		},
		blur(e: any) {
			this.userNick = e.target.value;
		},
		save() {
			let UserNick = encodeURIComponent(this.userNick);
			if (!UserNick) {
				showToast("请输入昵称！");
				return;
			}
			let data = {
				UserNick: UserNick
			};
			request(UpdateUserInfo, data).then((res: any) => {
				showToast("保存成功！");
			});
		}
	}
});
</script>

<style>
.userInfo {
	background-color: #fff;
}

.input {
	height: 88upx;
	background-color: #fff;
	padding: 0 30upx;
}

.save-in {
	position: fixed;
	bottom: 0;
	width: 100%;
}

.saveBtn {
	color: #fff;
	background-color: #fd7f00;
}
</style>
