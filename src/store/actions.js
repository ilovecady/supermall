// import { ADD_COUNTER, ADD_TO_CART } from './mutation-type' 
export default {
    addCart(context, payload) {
        // 1、判断cartList中是否有即将添加的商品
        let oldProduct = context.state.cartList.find(item => {
            return item.iid === payload.iid
        })
        // 2、判断oldProduct是否有值
        if (oldProduct) {
            context.commit('addCounter', oldProduct)
        } else {
            context.commit('addToCart', payload)
        }
    }
}