import Vue from 'vue'
import App from './App.vue'
import pageHead from './components/page-head.vue'

Vue.config.productionTip = false

Vue.component('page-head', pageHead)

Vue.filter('url', (value: any) => {
  console.log('11')
  if (!value) return ''
  value = 'https://api.tengpaisc.com/' + value
  return value
})

new App().$mount()