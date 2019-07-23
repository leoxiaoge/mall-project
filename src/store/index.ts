import Vue from 'vue'
import Vuex from 'vuex'

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
		// lazy loading openid
		async getUserOpenId({
			commit,
			state
		}) {
			console.log('12')
			return await new Promise((resolve, reject) => {
				console.log('12', state.openid)
				if (state.openid) {
					resolve(state.openid)
				} else {
					console.log(12)
				}
			})
		}
	}
})

export default store
