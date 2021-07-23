<template>
  <div class="bottom-bar">
    <!-- 全选 -->
    <div class="select-content">
      <check-button
        :is-checked="isSelectAll"
        @click.native="checkClick"
        class="select-all"
      ></check-button>
      <span>全选</span>
    </div>

    <!-- 合计 -->
    <div class="price">合计:{{ totalPrice }}</div>

    <!-- 去计算 -->
    <div class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/common/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) {
        return false;
      }
      return !this.$store.state.cartList.find((item) => {
        return !item.checked;
      });
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
  font-size: 15px;
}
.select-content {
  display: flex;
  /* 居中对齐弹性盒的各项 */
  align-items: center;
  margin-left: 10px;
  width: 70px;
}
.select-all {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: red;
  text-align: center;
  color: #fff;
}
</style>