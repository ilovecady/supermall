// import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'
export default {
    addCounter(state, payload) {
        payload.count += 1
    },
    addToCart(state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    }
}