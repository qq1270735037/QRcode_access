
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
// main.js
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
//将默认单位改为rpx
uni.$u.config.unit = 'rpx'
//引入自定义的tabBar组件
import tabBar from "components/tabBar/tabBar.vue"
Vue.component('tab-bar', tabBar)//使用tabBar组件
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif