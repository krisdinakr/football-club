<template>
  <Navbar />
  <div class="container">
    <router-view class="content"/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 1rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3e4642;
  position: relative;
}

#app .container {
  display: flex;
  margin: 0 auto;
  max-width: 90%;
  padding: 0.5rem;
}

#app .content {
  width: 100%;
}

.info {
  padding: 0 1.25rem;
}
</style>
