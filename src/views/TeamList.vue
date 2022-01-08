<template>
  <div v-if="count" class="team-list">
    <div class="info">
      <h1>Team of {{ teamList[0].area.name }}</h1>
      <h4>Total : {{ count }} teams</h4>
    </div>
    <div class="container">
      <div v-for="team in teamList" :key="team.id" class="card">
          <figure>
            <img v-if="team.crestUrl" :src="team.crestUrl" :alt="team.shortName" class="card-img">
            <img v-else src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png" alt="No Image" class="card-img">
          </figure>
        <div class="card-body">
          <h5 class="card-title">{{ team.name }}</h5>
          <router-link :to="{ name: 'Profile', params: { id: team.id }}" class="card-btn">Details</router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else>No data team in this area</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'

export default {
  props: ['id'],
  setup (props) {
    const count = ref(null)
    const teamList = ref(null)

    const getTeamList = async () => {
      try {
        const { data } = await axios.get(`https://api.football-data.org/v2/teams?areas=${props.id}`, {
          headers: { 'X-Auth-Token': '1219b37dbeeb4f80ae814c6503484f76' }
        })
        console.log(data)
        teamList.value = data.teams
        count.value = data.count
      } catch (err) {
        console.log(err)
      }
    }

    getTeamList()

    return { teamList, count }
  }
}
</script>

<style>
.team-list {
  margin-bottom: 2rem;
}

.team-list .container {
  display: flex;
  padding: 1rem;
  gap: 1.25rem;
  flex-wrap: wrap;
  justify-content: center;
}

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
  margin-bottom: 1rem;
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
</style>
