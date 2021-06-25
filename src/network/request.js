import axios from 'axios'
export function request(config) {
    // 1、创建axios实例
    const instance1 = axios.create({
        baseURL: "http://123.207.32.32:8000",
        timeout: 5000
    })

    // 2axios拦截器
    instance1.interceptors.request.use(config => {
        return config
    }, err => {

    })
    instance1.interceptors.response.use(res => {
        return res.data
    }, err => {
        // console.log(err); 
    })

    // 3、发送真正的网络请求
    return instance1(config)
}