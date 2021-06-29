<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content">
      <home-swiper :cbanners="banners"></home-swiper>
      <home-recommend :crecommend="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="barClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <ul>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
      <li>a</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import Scroll from "components/commom/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

// 导入轮播图的组件
import HomeSwiper from "./homeComponents/HomeSwiper";

// 导入推荐组件
import HomeRecommend from "./homeComponents/HomeRecommend";

// 导入feature组件
import FeatureView from "./homeComponents/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1、请求多个数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    // 事件监听相关的方法
    barClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },

    // 网络请求 数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 导航栏是固定定位 */
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  z-index: 999;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 999;
}
.content {
  height: 300px;
}
</style>
