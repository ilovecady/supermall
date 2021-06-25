import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载的方式把views里面的组件拿过来
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')

// 1、安装插件
Vue.use(VueRouter)
// 2、创建路由
// 创建好路由就可以在里面配置对应的映射关系了
const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: "/home",
        component: Home
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: "/profile",
        component: Profile
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})


// 3、导出路由
export default router