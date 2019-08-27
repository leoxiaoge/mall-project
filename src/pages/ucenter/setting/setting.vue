<template>
	<view class="content">
		<view class="list-item userFace" @click="userFaceClick">
			<view class="list-item-user">头像</view>
			<view class="list-item-face">
				<image :src="userFace" />
				<uni-icon :size="20" color="#bbb" type="arrowright" />
			</view>
		</view>
		<view class="list-item userNick" @click="userNickClick">
			<view class="list-item-user">昵称</view>
			<view class="list-item-nick">
				<text>{{userNick}}</text>
				<uni-icon :size="20" color="#bbb" type="arrowright" />
			</view>
		</view>
		<view class="sign-out">
			<button class="signBtn" @click="clear">退出登录</button>
		</view>
		<i-popup-toggle :show="showPopup" position="bottom" @hidePopup="togglePopup('')">
			<view class="popup-bottom">
				<view class="popup-bottom-content">
					<button class="previewImageFull" @click="preview(userFace, userFace)">查看大图</button>
					<button class="chooseImageCamera" @click="chooseImageCamera">拍照换头像</button>
					<button class="chooseImageAlbum" @click="chooseImageAlbum">从相册选择新头像</button>
				</view>
				<view class="cancel">
					<button @click="userFaceClick">取消</button>
				</view>
			</view>
		</i-popup-toggle>
	</view>
</template>

<script lang="ts">
import Vue from "vue";
import {
	request,
	navigateTo,
	showToast,
	defaultShowModal,
	upload,
	previewImage,
	onShareAppMessage
} from "@/common/utils/util";
import {
	GetLoginUser,
	UpdateUserInfo,
	OrderDryingUpload
} from "@/common/config/api";
import uniIcon from "@/components/uni-icon/uni-icon.vue";
import iPopupToggle from "@/components/i-popup-toggle/i-popup-toggle.vue";
export default Vue.extend({
	components: {
		uniIcon,
		iPopupToggle
	},
	data() {
		return {
			userInfo: "",
			userNick: "",
			userFace: "",
			showPopup: false
		};
	},
	onLoad(options) {
		console.log("onLoad", options);
	},
	onShow() {
		this.useInfo();
	},
	onShareAppMessage(e: any) {
		return onShareAppMessage(e);
	},
	methods: {
		async useInfo() {
			let userInfo: any = await this.getLoginUser();
			this.userInfo = userInfo;
			this.userFace = userInfo.userFace;
			this.userNick = decodeURIComponent(userInfo.userNick);
		},
		// 获取当前登录用户的信息
		getLoginUser() {
			return new Promise((sesolve, reject) => {
				let data = {};
				request(GetLoginUser, data).then((res: any) => {
					uni.setStorageSync("UserInfo", res.UserInfo);
					sesolve(res.UserInfo);
				});
			});
		},
		userFaceClick() {
			this.showPopup = !this.showPopup;
		},
		togglePopup() {
			this.showPopup = !this.showPopup;
		},
		preview(current: any, urls: any) {
			urls = [urls];
			previewImage(current, urls);
		},
		chooseImageCamera() {
			uni.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ["camera"], // 使用相机
				success: (res: any) => {
					let filePath = JSON.stringify(res.tempFilePaths[0]);
					this.uploadImage(filePath);
				}
			});
		},
		chooseImageAlbum() {
			uni.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
				sourceType: ["album"], // 从相册选择
				success: (res: any) => {
					let filePath = JSON.stringify(res.tempFilePaths[0]);
					this.uploadImage(filePath);
				}
			});
		},
		uploadImage(filePath: any) {
			let data = {};
			upload(OrderDryingUpload, data, filePath).then((res: any) => {
				let data = JSON.parse(res);
				let picUrl = data.PicUrl;
				this.updateUserInfo(picUrl);
			});
		},
		updateUserInfo(event: any) {
			let UserFace = event;
			let data = {
				UserFace: UserFace
			};
			request(UpdateUserInfo, data).then((res: any) => {
        showToast("更换头像成功！");
        this.showPopup = !this.showPopup;
			});
		},
		userNickClick() {
			navigateTo("../settingUserNick/settingUserNick");
		},
		clear() {
			let content: string = "是否确定退出登录？";
			defaultShowModal(content).then((res: any) => {
				if (res.confirm) {
					console.log("用户点击确定");
					try {
						uni.clearStorageSync();
					} catch (e) {
						showToast("退出登录失败");
					}
				} else if (res.cancel) {
					console.log("用户点击取消");
				}
			});
		}
	}
});
</script>

<style>
.list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10upx 30upx;
	background-color: #fff;
}

.userFace {
	height: 180upx;
	border-bottom: 2upx solid #f4f4f4;
}

.userNick {
	height: 100upx;
}

.list-item-face {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.list-item-face image {
	width: 120upx;
	height: 120upx;
	border-radius: 50%;
}

.sign-out {
	margin-top: 20upx;
}

.signBtn {
  color: #7a7a7a;
  background-color: #fff;
}

.popup-bottom {
	width: 90%;
	opacity: .9;
}

.popup-bottom button {
	color: #7a7a7a;
}

.previewImageFull {
  border-top-left-radius: 10upx;
  border-top-right-radius: 10upx;
}

.chooseImageAlbum {
  border-bottom-left-radius: 10upx;
  border-bottom-right-radius: 10upx;
}

.cancel {
	margin-top: 20upx;
	margin-bottom: 20upx;
}

.cancel button {
  border-radius: 10upx;
}
</style>