<template>
  <div class="toast" v-show="show">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // 之前的弹窗代码通过props获取
  // props: {
  //   message: {
  //     type: String,
  //     default: "",
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },

  data() {
    return {
      message: "",
      show: false,
    };
  },
  methods: {
    isShow(message, duration) {
      this.show = true;
      this.message = message;
      setTimeout(() => {
        this.show = false;
        this.message = "";
      }, 1500);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 999;
}
</style>