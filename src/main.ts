import Vue from 'vue'
import App from './App.vue'
import pageHead from './components/page-head.vue'

Vue.config.productionTip = false

Vue.component('page-head', pageHead)

new App().$mount()