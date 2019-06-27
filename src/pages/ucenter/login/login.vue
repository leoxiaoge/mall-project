
<template>
	<view class="container">
    <view class="i-header-logo">
			<image :src="logo"></image>
		</view>
    <view class="i-login-mobile i-border-bottom i-flex-between">
      <view class="i-login-content i-flex">
        <image class="i-login-mobile-image" />
        <input class="i-login-mobile-input" :value="Mobile" placeholder="请输入手机号码" @input="mobileInput" />
      </view>
      <view class="i-login-set-code">
        <button class="i-button-get" :disabled="disabled" @click="getCode" >
          {{time}}
        </button>
      </view>
    </view>
    <view class="i-login-code i-border-bottom">
      <view class="i-login-content i-flex">
        <image class="i-login-code-image" />
        <input class="i-login-code-input" :value="LoginCode" placeholder="验证码" @input="codeInput" />
      </view>
    </view>
    <view class="i-login-radio">
      <label class="radio">
        <radio @click="radioClick" :checked="checked" color="#fe7f00" />我已阅读并同意《腾拍商场购物协议》
      </label>
    </view>
    <view class="i-login-button-view">
      <button class="btn i-login-button" @click="userLogin">登录</button>
    </view>
    <!-- #ifdef MP-WEIXIN -->		
    <view class="mp-weixin">
      <button class="i-login-weixin" open-type="getUserInfo" @getuserinfo="getuserinfo"></button>
    </view>
    <!-- #endif -->
  </view>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { request, navigateTo, showToast } from '@/common/utils/util'
  import { UserLogin, GetLoginCode } from '@/common/config/api'
  import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default Vue.extend({
    components: {
			uniIcon
		},
		data() {
			return {
        logo: '/static/icon/icon_login.png',
        checked: true,
        Mobile: '',
        LoginCode: '',

        time: '获取验证码',
        currentTime: 60,
        disabled: false,
        interval: ''
			}
		},
		onLoad(options) {
      console.log(options)
    },
    onUnload() {
      let interval: any = this.interval
      clearInterval(interval)
    },
		methods: {
      mobileInput(e: any) {
        console.log(e)
        this.Mobile = e.detail.value
      },
      codeInput(e: any) {
        console.log(e)
        this.LoginCode = e.detail.value
      },
      getCode(e: any) {
        console.log(e)
        let Mobile = this.Mobile
        if (!Mobile) {
          showToast('手机号码不能为空！')
          return
        }
        this.getLoginCode()
        let currentTime: any = this.currentTime
        this.time = currentTime + 's后可重发'
        this.disabled = true
        let interval: any = setInterval(() => {
          this.time = (currentTime - 1) + 's后可重发'
          currentTime--
          if (currentTime <= 0) {
            clearInterval(interval)
            this.time = '重新获取'
            this.currentTime = 60
            this.disabled = false
          }
        }, 1000)
        this.interval = interval
      },
      getLoginCode() {
        let Mobile = this.Mobile
				let data = {
					Mobile: Mobile
        }
		  	request(GetLoginCode, data).then((res: any) => {
          console.log(res)
          showToast('发送成功！')
        })
      },
      radioClick() {
        this.checked = !this.checked
      },
      userLogin() {
        let Mobile = this.Mobile
        let LoginCode  = this.LoginCode
        if (!Mobile) {
          showToast('手机号码不能为空！')
          return
        }
        if (!LoginCode) {
          showToast('验证码不能为空！')
          return
        }
				let data = {
          Mobile: Mobile,
          LoginCode: LoginCode
        }
		  	request(UserLogin, data).then((res: any) => {
          console.log(res)
          let SessionKey = res.SessionKey
          let UserInfo = res.UserInfo
          uni.setStorageSync('SessionKey', SessionKey)
          uni.setStorageSync('UserInfo', UserInfo)
          showToast('登录成功！')
        })
      },
      getuserinfo(e: any) {
        console.log(e)
      }
		}
	})
</script>

<style>

  page {
    background-color: #fff;
  }

	.i-header-logo {
    padding:  80upx 0 80upx 0;
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
    background: url(/static/icon/icon_login_mobile.png) center no-repeat;
    background-size: 100%;
    width: 36upx;
    height: 52upx;
  }

  .i-login-code-image {
    background: url(/static/icon/icon_login_code.png) center no-repeat;
    background-size: 100%;
    width: 36upx;
    height: 52upx;
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

  .i-button-get {
    background-color: #fff;
    font-size: 32upx;
    color: #fe7f00;
  }

  uni-button:after {
    content: " ";
    width: 200%;
    height: 200%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    box-sizing: border-box;
    border-radius: 10px;
  }

  uni-button[disabled]:not([type]), uni-button[disabled][type=default] {
    color: rgba(0,0,0,.3);
    background-color: #fff;
  }

  .i-login-button {
    font-size: 32upx;
    line-height: 80upx;
    width: 80%;
    color: #fff;
    background-color: #fe7f00;
    border-radius: 100upx;
    margin-top: 40upx;
  }

  .i-login-weixin {
    background: url(/static/icon/icon_wechat.png) center no-repeat;
    background-size: 100%;
    width: 88upx;
    height: 88upx;
    margin-top: 160upx;
  }
</style>
