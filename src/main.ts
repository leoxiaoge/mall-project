import Vue from 'vue'
import App from './App.vue'
import pageHead from './components/page-head.vue'
import { request, navigateTo } from '@/common/utils/util'

Vue.config.productionTip = false

Vue.component('page-head', pageHead)

new App().$mount()