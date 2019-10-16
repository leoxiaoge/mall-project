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
		openid: null
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
			state.openid = code;
		},
		setOpenid(state, openid) {
			state.openid = openid;
		}
	},
	actions: {
		asyncInrement(context) {
			console.log(context)
			return new Promise(resolve => {
				setTimeout(() => {
					context.commit('setOpenid', '');
					resolve();
				}, 100)
			});
		},
		// #ifdef MP-WEIXIN
		getUserOpenId: async function ({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				if (state.openid) {
					resolve(state.openid)
				} else {
					uni.login({
						success: (e: any) => {
							commit('login')
							let JSCode = e.code;
							let data = {
								JSCode: JSCode
							};
							request(GetWXOpenID, data).then((res: any) => {
								commit('setOpenid', res.OpenID)
								resolve(res.OpenID);
							});
						},
						fail: () => {
							let err = "接口调用失败，将无法正常使用开放接口等服务";
							reject(err)
						}
					})
				}
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
					console.log(code);
					if (code == null || code === "") {
						window.location.replace(
							"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
							appid +
							"&redirect_uri=" +
							redirect_uri +
							"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
						);
					}
					let JSCode = code;
					commit('setCode', JSCode);
					let data = {
						JSCode: JSCode
					};
					request(GetWXOpenID, data).then((res: any) => {
						console.log(res);
						commit('setOpenid', res.OpenID);
						resolve(res.OpenID);
					});
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