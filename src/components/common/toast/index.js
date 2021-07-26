import Toast from './Toast'
const obj = {}

// main.js中一使用插件就会执行install函数 先把插件创建出来
// 分为4步
obj.install = function (Vue) {
    // 1、创建组件构造器 是对Toast组件封装成插件 所以要把组件传来
    const toastConstrustor = Vue.extend(Toast)
    // 2
    const toast = new toastConstrustor()
    // 3
    toast.$mount(document.createElement('div'))
    // 4
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}
export default obj