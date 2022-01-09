<template>
  <Navbar />
  <div class="container">
    <div class="content">
      <router-view />
    </div>
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
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

.prev-btn {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: 2px solid #cd5b3c;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 550;
  color: #cd5b3c;
}

.prev-btn:hover {
  background: #cd5b3c;
  color: white;
}

::-webkit-scrollbar  {
  width: 0.8rem;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0px 1px 0px 20px #e2d1bd;
  border-radius: 1rem;
}

::-webkit-scrollbar-thumb {
  background: #3e4642;
  border-radius: 1rem;
}

@media screen and (max-width: 600px) {
  #app .container {
    width: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>
