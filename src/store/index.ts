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
		}
		// #endif
	}
})

export default store