<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // 1、 创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // probeType: 3,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // console.log(this.scroll);
    // 2、监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position); // 打印的这个位置坐标不是在当前组件里使用 所以要把他通过自定义事件传出去
      this.$emit("scroll", position);
    });
    // 3、监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>