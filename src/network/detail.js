import { request } from './request'
// 导出一个详情接口
export function getDetail(iid) {
    return request({
        url: "/detail",
        params: {
            iid
        }
    })
}

// 商品推荐信息的获取接口
export function getRecommend() {
    return request({
        url: "/recommend",

    })
}
// 2商品信息类
export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this.services = services
        this.realPrice = itemInfo.lowNowPrice
    }
}

// 3、商家信息类
export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}

// 商品参数信息的类
export class GoodsParams {
    constructor(info, rule) {
        //注：images可能没有值(某些商品有值，某些商品没有值)
        this.image = info.image ? info.image[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}
