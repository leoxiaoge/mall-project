import Vue from 'vue'
import Vuex from 'vuex'
import { request } from "@/common/utils/util";
import { GetWXOpenID } from "@/common/config/api";
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		loginProvider: "",
		openid: null
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true;
			state.loginProvider = provider;
		},
		logout(state) {
			state.hasLogin = false
			state.openid = null
		},
		setOpenid(state, openid) {
			state.openid = openid
		}
	},
	actions: {
		asyncInrement(context) {
			console.log(context)
			return new Promise(resolve => {
				setTimeout(() => {
					context.commit('setOpenid', 'ffs');
					resolve();
				}, 100)
			});
		},
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
							console.log(e)
							commit('login')
							let JSCode = e.code;
							let data = {
								JSCode: JSCode
							};
							request(GetWXOpenID, data).then((res: any) => {
								console.log(res);
								commit('setOpenid', res.OpenID)
								resolve(res.OpenID);
							});
						}
					})
				}
			})
		}
	}
})

export default store
