<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<style>
.loader-wrapper {
  display: flex;
  min-height: 70vh;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 0.5rem solid #f3f3f3;
  border-radius: 50%;
  border-top: 0.5rem solid #cd5b3c;
  width: 3rem;
  height: 3rem;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
