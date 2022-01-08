<template>
  <nav id="nav">
    <div class="logo">
      <router-link :to="{ name: 'Home' }">Football Club</router-link>
    </div>
  </nav>
</template>

<style>
#nav {
  display: flex;
  max-width: 100%;
  padding: 1rem 2rem;
  justify-content: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.logo {
  padding: 0 0.5rem;
}

.logo a {
  font-weight: bold;
  color: #3e4642;
  font-size: 1.5rem;
  text-decoration: none;
}
</style>
