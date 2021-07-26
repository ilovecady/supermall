// import { ADD_COUNTER, ADD_TO_CART } from './mutation-type' 
export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 1、判断cartList中是否有即将添加的商品
            let oldProduct = context.state.cartList.find(item => {
                return item.iid === payload.iid
            })
            // 2、判断oldProduct是否有值
            if (oldProduct) {
                context.commit('addCounter', oldProduct)
                resolve('商品数量+1')
            } else {
                payload.count = 1;
                context.commit('addToCart', payload)
                resolve('添加该商品')
            }
        })
    }
}