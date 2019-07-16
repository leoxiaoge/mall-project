import Vue from 'vue'
import App from './App.vue'
import store from './store'
import pageHead from './components/page-head.vue'

Vue.config.productionTip = false
Vue.prototype.$store = store

Vue.component('page-head', pageHead)

new App().$mount()