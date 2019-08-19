<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	mpType: "app",
	onLaunch() {
		console.log("App Launch");
		// #ifdef APP-PLUS
    // 锁定屏幕方向
    plus.screen.lockOrientation("portrait-primary"); //锁定
    // 检测升级
    uni.request({
      url: "https://uniapp.dcloud.io/update", //检查更新的服务器地址
      data: {
        appid: plus.runtime.appid,
        version: plus.runtime.version,
        imei: plus.device.imei
      },
      success: (res: any) => {
        console.log("success", res);
        if (res.statusCode == 200 && res.data.isUpdate) {
          let openUrl =
            plus.os.name === "iOS" ? res.data.iOS : res.data.Android;
          // 提醒用户更新
          uni.showModal({
            title: "更新提示",
            content: res.data.note ? res.data.note : "是否选择更新",
            success: showResult => {
              if (showResult.confirm) {
                plus.runtime.openURL(openUrl);
              }
            }
          });
        }
      }
    });
    // #endif
		// #ifdef MP-WEIXIN
		const updateManager: any = uni.getUpdateManager();

		updateManager.onCheckForUpdate((res: any) => {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate);
		});

		updateManager.onUpdateReady((res: any) => {
			uni.showModal({
				title: "更新提示",
				content: "新版本已经准备好，是否重启应用？",
				success(res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					}
				}
			});
		});

		updateManager.onUpdateFailed((res: any) => {
			// 新的版本下载失败
		});
		// #endif
	},
	onShow() {
		console.log("App Show");
	},
	onHide() {
		console.log("App Hide");
	}
});
</script>

<style>
/*每个页面公共css */
@import "./common/uni.css";
@import "./common/main.css";

page {
	background-color: #f4f4f4;
	font-size: 28rpx;
	line-height: 1.8;
	color: #333;
	font-family: Helvetica Neue, Helvetica, sans-serif;
	--red: #e54d42;
	--orange: #f37b1d;
	--yellow: #fbbd08;
	--olive: #8dc63f;
	--green: #39b54a;
	--cyan: #37bfc8;
	--blue: #0081ff;
	--purple: #6739b6;
	--mauve: #9c26b0;
	--pink: #e03997;
	--brown: #a5673f;
	--grey: #8799a3;
	--gray: #aaa;
	--black: #333;
	--white: #fff;
	--gradualRed: linear-gradient(45deg, #f43f3b, #ec008c);
	--gradualOrange: linear-gradient(45deg, #fe7f00, #fe083e);
	--gradualGreen: linear-gradient(45deg, #39b54a, #8dc63f);
	--gradualPurple: linear-gradient(45deg, #9000ff, #5e00ff);
	--gradualPink: linear-gradient(45deg, #ec008c, #6739b6);
	--gradualBlue: linear-gradient(45deg, #0081ff, #37bfc8);
	--gradualCyan: linear-gradient(45deg, #37bfc8, #0da7b3);
}

.container {
	box-sizing: border-box;
	background-color: #fff;
	font-family: PingFangSC-Light, helvetica, "Heiti SC";
	position: relative;
}

view,
image,
text,
navigator {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}

view,
text {
	font-family: PingFangSC-Light, helvetica, "Heiti SC";
	color: #333;
}

text {
	color: #7a7a7a;
}

.bg-gradual-red {
	background-image: var(--gradualRed);
	color: #fff;
}

.bg-orange {
	background-color: var(--orange);
	color: #fff;
}

.bg-gradual-orange {
	background-image: var(--gradualOrange);
	color: #fff;
}

.teng-flex {
	display: flex;
	align-items: center;
}

.teng-flex-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.teng-flex-end {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.teng-original {
	color: #fe7f00;
}

.uni-header-logo {
	padding: 30upx;
	text-align: center;
	margin-top: 10upx;
}

.uni-header-logo image {
	width: 140upx;
	height: 140upx;
}

.uni-hello-text {
	color: #7a7e83;
}

.uni-hello-addfile {
	text-align: center;
	line-height: 300upx;
	background: #fff;
	padding: 50upx;
	margin-top: 10px;
	font-size: 38upx;
	color: #808080;
}

.i-flex {
	display: flex;
	align-items: center;
}

.i-flex-between {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.i-flex-end {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.i-original {
	color: #fe7f00;
}

button {
	border: none;
	border-radius: 0;
}

button::after {
	border: none;
}

.btn {
	border: none;
	border-radius: 0;
}

uni-button:after {
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

image {
	width: 100%;
	height: 100%;
}

.i-kong {
	height: 98upx;
}

button[disabled]:not([type]),
button[disabled][type="default"] {
	color: rgba(0, 0, 0, 0.3);
	background-color: #fff;
}
</style>
