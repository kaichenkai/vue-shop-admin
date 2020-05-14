<template>
  <div class="home-view">
      <Home />
  </div>
</template>

<script>
import Home from "../components/home/home.vue"
export default {
  name: "HomeView",
  components: {
    Home
  }
};
</script>

<style lang="less" scoped>
    .home-view {
        height: 100%;
    }
</style>