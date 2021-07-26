<template>
  <!-- 每个项目只有一个tabbar所以可以起id -->
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
};
</script>

<style scoped>
/* 下面的这些样式都是TarBar的样式，至于里面的小组件的样式是放在它组件里面的 */
#tab-bar {
  /* 本身的样式 */
  background-color: #f6f6f6;
  height: 49px;
  border-top: 1px solid #eee;
  /* 盒子阴影 只有盒子的上边缘有阴影*/
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
  /* x为正向右移动 y轴为正想下移动 第三个是透明度的意思 rgba就是颜色 */

  /* 定位相关 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  /* 利用flex进行布局 */
  display: flex;
  text-align: center;

  z-index: 9;
}
</style>