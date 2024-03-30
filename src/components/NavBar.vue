<script setup>

</script>

<template>
  <div class="nav">
    <div class="nav__logo">
      <router-link to="/">
        <img alt="logo" src="@/assets/logo.svg"/>
      </router-link>
    </div>
    <div class="nav__links">
      <!--后期使用数据库中的内同替代-->
      <slot>
        <router-link to="/about">关于我们</router-link>
        <router-link to="/products">产品展示</router-link>
        <router-link to="/cases">优秀案例</router-link>
        <router-link to="/contact">选择我们</router-link>
        <router-link to="/news">新闻动态</router-link>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.nav__logo img {
  height: 40px;
}

</style>