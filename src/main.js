import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 因为你在index.js导出的插件是obj,还没有起名字，所以在导入的时候可以起名字
import toast from 'components/common/toast'
// 图片懒加载
import VueLazyLoad from 'vue-lazyload'

// 解决300ms延迟
import FastClick from 'fastclick'

FastClick.attach(document.body)
// 使用插件
Vue.use(toast)

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.config.productionTip = false



// 搞一个翻译给他爷翻译孙子的话
Vue.prototype.$bus = new Vue()
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
