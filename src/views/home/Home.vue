<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 下面的这个是影子 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="barClick"
      ref="tabControl1"
      class="tab-control-shodow"
      v-show="isTabFixed"
    ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :cbanners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <home-recommend :crecommend="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="barClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

// 导入轮播图的组件
import HomeSwiper from "./homeComponents/HomeSwiper";

// 导入推荐组件
import HomeRecommend from "./homeComponents/HomeRecommend";

// 导入feature组件
import FeatureView from "./homeComponents/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    Scroll,
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixins: [backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    console.log("xaiohui");
  },
  //钩子函数 回来时监听位置
  activated() {
    // 回来时回到之前离开的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  // 记录离开时的位置
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    // 1、请求多个数据
    this.GHMultidata();
    this.GHGoods("pop");
    this.GHGoods("new");
    this.GHGoods("sell");
  },
  mounted() {
    // 用防抖函数对你要执行的函数进行一次包装 所以refresh不应该带()
    // 通过ref拿到的肯定不是在created函数里写的
    const refresh = debounce(this.$refs.scroll.refresh, 800);
    // 接收孙子发来的请求

    this.$bus.$on("itemImageLoad", () => {
      // console.log("推荐数据到首页");
      refresh();
    });
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 父组件访问子组件
    // backTop() {
    //   this.$refs.scroll.scrollTo(0, 0);
    // },

    contentScroll(position) {
      // 1、返回顶部的监听
      // console.log(position);
      this.isShowBackTop = -position.y > 1000;
      // 2、tab-control的吸顶效果 大于时 傀儡显示出来
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.GHGoods(this.currentType);
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 网络请求 数据
    GHMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    GHGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 导航栏是固定定位 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */

  /* z-index: 999; */
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control-shodow {
  position: relative;
  z-index: 999;
}
</style>
