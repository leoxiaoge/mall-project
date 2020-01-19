import Vue from 'vue'
import Vuex from 'vuex'
import { request } from "@/common/utils/util";
import { GetWXOpenID } from "@/common/config/api";
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		hasBack: false,
		hasApi: "",
		hasData: "",
		loginProvider: "",
		code: null,
		openid: null,
		sessionKey: null
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		handlBack(state, back) {
			state.hasBack = back;
		},
		handleApi(state, api) {
			state.hasApi = api;
		},
		handData(state, data) {
			state.hasData = data;
		},
		logout(state) {
			state.hasLogin = false;
			state.openid = null;
		},
		setCode(state, code) {
			state.code = code;
		},
		setOpenid(state, openid) {
			state.openid = openid;
		},
		SessionKey(state, sessionKey) {
			state.sessionKey = sessionKey;
		}
	},
	actions: {
		scopeUserInfo: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				uni.authorize({
					scope: "scope.userInfo",
					success() {
						uni.getSetting();
					}
				});
				uni.login({
					provider: 'weixin',
					success(loginRes) {
						console.log(loginRes.authResult);
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success(infoRes: any) {
								console.log('用户昵称为：' + infoRes.userInfo.nickName);
							}
						});
					}
				});
			})
		},
		// #ifdef MP-WEIXIN
		checkSession: async function ({
			commit,
			state,
			dispatch
		}) {
			return await new Promise((resolve, reject) => {
				wx.checkSession({
					success() {
						resolve();
						console.log("session_key 未过期，并且在本生命周期一直有效");
					},
					fail() {
						dispatch('getUserOpenId');
						resolve();
						console.log("session_key 已经失效，需要重新执行登录流程");
					}
				})
			})
		},
		// #endif
		// #ifdef MP-WEIXIN
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				uni.login({
					success: (e: any) => {
						commit('login')
						let JSCode = e.code;
						let data = {
							JSCode: JSCode
						};
						request(GetWXOpenID, data).then((res: any) => {
							commit('setOpenid', res.OpenID);
							commit('SessionKey', res.WXSessionKey);
							resolve(res);
						});
					},
					fail: () => {
						let err = "接口调用失败，将无法正常使用开放接口等服务";
						reject(err)
					}
				})
			})
		},
		// #endif
		// #ifdef H5
		// 公众号登录https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html
		getJDKWXOpenID: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				let ua: any = window.navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					let appid = "wxe6bee6124bdf2d63";
					let redirect_uri = encodeURIComponent(location.href);
					let code = getUrlParam("code");
					if (!code && !state.openid) {
						window.location.replace(
							"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
							appid +
							"&redirect_uri=" +
							redirect_uri +
							"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
						);
					}
					if (code && !state.openid && code !== uni.getStorageSync("code")) {
						let JSCode = code;
						commit('setCode', JSCode);
						uni.setStorageSync("code", code);
						let data = {
							JSCode: JSCode
						};
						request(GetWXOpenID, data).then((res: any) => {
							commit('setOpenid', res.OpenID);
							commit('SessionKey', res.WXSessionKey);
							resolve(res);
						});
					}
				}
			})
		}
		// #endif
	}
})

// 判断公众号截取code
const getUrlParam = (name: any) => {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
};

export default store