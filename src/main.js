import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 搞一个翻译给他爷翻译孙子的话
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
