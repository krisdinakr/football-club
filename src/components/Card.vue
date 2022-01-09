<template>
  <div v-if="text" class="card text">
    <div class="card-body text-body">
      <div class="text-wrapper">
        <h4 class="card-title text-title">{{ title }}</h4>
        <h5 class="text-small">{{ subtitle }}</h5>
      </div>
      <router-link :to="{ name: link.name, params: link.params }" class="card-btn btn-text">Details</router-link>
    </div>
  </div>
  <div v-else class="card">
    <figure>
      <img v-if="img" :src="img" :alt="alt" class="card-img">
      <img v-else src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png" alt="No Image" class="card-img">
    </figure>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <router-link :to="{ name: link.name, params: link.params }" class="card-btn">Details</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['img', 'title', 'link', 'alt', 'text', 'subtitle']
}
</script>

<style>
.card {
  width: 15rem;
  background: #e2d1bd;
  border-radius: 1rem;
}

figure {
  height: 9rem;
  margin: 1rem 0.75rem 0 0.75rem;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  -o-object-fit: contain;
}

.card-body {
  padding: 1rem;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.card-btn {
  text-decoration: none;
  padding: 0.25rem 0.75rem;
  background: #cd5b3c;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  color: white;
  font-weight: 550;
  font-size: 0.8rem;
  letter-spacing: 0.8px;
}

.card-btn:hover {
  background: #678478;
}

.text {
  height: 10rem;
}

.text-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
}

.text-wrapper {
  width: 100%;
}

.text-title {
  font-size: 1.4rem;
}

.text-small {
  color: #678478;
  font-size: 1rem;
  font-weight: normal;
  font-style: italic;
  letter-spacing: 0.8px;
}
</style>
