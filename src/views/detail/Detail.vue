<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav-bar"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      :probe-type="3"
      @scroll="scrollContent"
      ref="scroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods-info="goods"></detail-base-info>
      <detail-shop-info :shop-info="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :goods-param="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailBottomBar from "./childComponents/DetailBottomBar";

import GoodsList from "components/content/goods/GoodsList";

import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend,
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      // currentIndex: 0,
    };
  },
  mixins: [backTopMixin],
  created() {
    // 1、保存传入的iid
    this.iid = this.$route.params.iid;
    // 2、根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // 打印详情接口里的全部数据
      console.log(res);
      const data = res.result;

      // 1.获取轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3、创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4、获取商品详细信息
      this.detailInfo = data.detailInfo;
      // 5、获取商品参数信息
      this.paramInfo = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6、获取商品评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 3.获取推荐信息
    getRecommend().then((res1) => {
      // 打印推荐接口里的全部数据
      console.log(res1);
      this.recommends = res1.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();

      // 详情图片加载完下能获取准确的offsetTop值
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    },
    // scroll组件中发射出的事件携带这位置信息
    scrollContent(position) {
      const positionY = -position.y;
      // 回到顶部
      this.isShowBackTop = positionY > 1000;

      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          // this.currentIndex !== i &&
          i < length - 1 &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          // this.currentIndex = i;
          this.$refs.nav.currentIndex = i;
        }
      }
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    // 点击商品加入购物车
    addToCart() {
      // 获取购物车需要展示的信息存到product对象里面
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 将商品添加到购物车
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product);
    },
  },
  mounted() {
    const newrefresh = debounce(this.$refs.scroll.refresh, 800);
    this.$bus.$on("detailItemImageLoad", () => {
      // console.log("推荐数据到详情页");
      newrefresh();
    });
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;

  /* 只有给父元素设置了固定的高度，可滚动区域(.content)的100%才有意义
  因为这个100%是相对父元素而言的，父元素设置的高度是多少，我就是指多少*/
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>