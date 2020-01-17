<template>
	<view class="content">
		<view class="list-item userFace" @click="userFaceClick">
			<view class="list-item-user">头像</view>
			<view class="list-item-face">
				<image :src="userFace" mode="aspectFill" />
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

<script>
import {
	request,
	navigateTo,
	showToast,
	defaultShowModal,
	upload,
	previewImage,
	navigateBack,
	onShareAppMessage
} from "@/common/utils/util";
import {
	GetLoginUser,
	UpdateUserInfo,
	OrderDryingUpload
} from "@/common/config/api";
import uniIcon from "@/components/uni-icon/uni-icon.vue";
import iPopupToggle from "@/components/i-popup-toggle/i-popup-toggle.vue";
export default {
	components: {
		uniIcon,
		iPopupToggle
	},
	data() {
		return {
			userInfo: "",
			userNick: "",
			userFace: "",
			imageSrc: "",
			showPopup: false
		};
	},
	onLoad(options) {
		console.log("onLoad", options);
	},
	onShow() {
		this.useInfo();
	},
	onPullDownRefresh() {
		this.useInfo();
	},
	onShareAppMessage(e) {
		return onShareAppMessage(e);
	},
	methods: {
		async useInfo() {
			let userInfo = await this.getLoginUser();
			this.userInfo = userInfo;
			this.userFace = userInfo.userFace;
			this.userNick = decodeURIComponent(userInfo.userNick);
		},
		// 获取当前登录用户的信息
		getLoginUser() {
			return new Promise((resolve, reject) => {
				let data = {};
				request(GetLoginUser, data).then(res => {
					uni.setStorageSync("UserInfo", res.UserInfo);
					resolve(res.UserInfo);
				});
			});
		},
		userFaceClick() {
			this.showPopup = !this.showPopup;
		},
		togglePopup() {
			this.showPopup = !this.showPopup;
		},
		preview(current, urls) {
			urls = [urls];
			previewImage(current, urls);
		},
		chooseImageCamera() {
			uni.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"],
				sourceType: ["camera"],
				success: res => {
					var imageSrc = res.tempFilePaths[0];
					uni.uploadFile({
						url: "https://unidemo.dcloud.net.cn/upload",
						filePath: imageSrc,
						fileType: "image",
						name: "data",
						success: res => {
							console.log("uploadImage success, res is:", res);
							uni.showToast({
								title: "上传成功",
								icon: "success",
								duration: 1000
							});
							this.imageSrc = imageSrc;
							console.log(this.imageSrc);
							this.uploadImage();
						},
						fail: err => {
							console.log("uploadImage fail", err);
							uni.showModal({
								content: err.errMsg,
								showCancel: false
							});
						}
					});
				},
				fail: err => {
					console.log("chooseImage fail", err);
				}
			});
		},
		chooseImageAlbum() {
			uni.chooseImage({
				count: 1,
				sizeType: ["original", "compressed"],
				sourceType: ["album"],
				success: res => {
					var imageSrc = res.tempFilePaths[0];
					uni.uploadFile({
						url: "https://unidemo.dcloud.net.cn/upload",
						filePath: imageSrc,
						fileType: "image",
						name: "data",
						success: res => {
							console.log("uploadImage success, res is:", res);
							showToast("上传成功")
							this.imageSrc = imageSrc;
							console.log(this.imageSrc);
							this.uploadImage();
						},
						fail: err => {
							console.log("uploadImage fail", err);
							showToast(err.errMsg)
						}
					});
				},
				fail: err => {
					console.log("chooseImage fail", err);
				}
			});
		},
		uploadImage() {
			let filePath = this.imageSrc;
			let data = {};
			upload(OrderDryingUpload, data, filePath).then(res => {
				let data = JSON.parse(res);
				let picUrl = data.PicUrl;
				this.updateUserInfo(picUrl);
			});
		},
		updateUserInfo(event) {
			let UserFace = event;
			let data = {
				UserFace: UserFace
			};
			request(UpdateUserInfo, data).then(res => {
				showToast("更换头像成功！");
				this.showPopup = !this.showPopup;
				this.useInfo();
			});
		},
		userNickClick() {
			navigateTo("../settingUserNick/settingUserNick");
		},
		clear() {
			let content = "是否确定退出登录？";
			defaultShowModal(content).then(res => {
				if (res.confirm) {
					console.log("用户点击确定");
					try {
						navigateBack(1);
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
};
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
	position: fixed;
	bottom: 80upx;
	left: 50%;
	right: 50%;
	transform: translate(-50%, 0);
	width: 80%;
	height: 80upx;
	line-height: 80upx;
	font-size: 36upx;
	border-radius: 60upx;
	border: none;
	color: #fff;
	background: linear-gradient(180deg, #f98b1b, #f76102);
}

.popup-bottom {
	width: 90%;
	opacity: 0.9;
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