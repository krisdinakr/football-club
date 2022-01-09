<template>
<div class="profile" >
  <Loader v-if="isLoading" />
  <div v-else>
    <div v-if="team" >
      <button @click="back" class="prev-btn">Go back</button>
      <div class="profile-content">
        <div class="content-wrapper">
          <img v-if="team.crestUrl" :src="team.crestUrl" alt="" class="profile-img">
          <img v-else src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png" alt="No Image" class="profile-img">
          <div class="profile-info">
            <h1>{{ team.name }}</h1>
            <h5>Short Name: {{ team.shortName }}</h5>
            <h5>Founded: {{ team.founded }}</h5>
            <h5>Club Colors: {{ team.clubColors }}</h5>
            <h5>Address: {{ team.address }}</h5>
            <h5>Phone: {{ team.phone }}</h5>
            <h5>Email: {{ team.email }}</h5>
            <h5>Venue: {{ team.venue }}</h5>
            <h5>Website: {{ team.website }}</h5>
          </div>
        </div>
        <div class="profile-player">
          <h2>Players</h2>
          <div v-if="players" class="player-wrapper">
            <Card v-for="player in team.squad" :key="player.id" :title="player.name" :link="{ name: 'Player', params: { id: player.id }}" :subtitle="player.position" :text=true />
          </div>
          <div v-else>
            Data not available
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import axios from 'axios'
import Loader from '@/components/Loader.vue'
import Card from '@/components/Card.vue'

export default {
  props: ['id'],
  components: { Loader, Card },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  setup (props) {
    const team = ref(null)
    const isLoading = ref(true)
    const players = ref(null)

    const getTeam = async () => {
      try {
        const { data } = await axios.get(`https://api.football-data.org/v2/teams/${props.id}`, {
          headers: { 'X-Auth-Token': '1219b37dbeeb4f80ae814c6503484f76' }
        })
        team.value = data
        if (data.squad && data.squad.length > 1) {
          players.value = data.squad
        }
        console.log(data)
      } catch (err) {
        console.log(err)
      }
      isLoading.value = false
    }

    getTeam()

    return { team, isLoading, players }
  }
}
</script>

<style>
.profile {
  max-width: 90%;
  margin: 1rem auto;
}

.profile-content {
  background: #cd5b3c;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  border-radius: 20px;
  min-height: 75vh;
  padding: 1.25rem 1.8rem;
}

.content-wrapper {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1.25rem;
  gap: 1rem;
  color: #022815;
}

.profile-info h1 {
  margin-bottom: 0.5rem;
}

.profile-info h5 {
  font-size: 1rem;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.profile-img {
  max-width: 20rem;
}

.profile-player {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-player h2 {
  margin-bottom: 0.5rem;
  color: #022815;
}

.player-wrapper {
  margin-top: 1rem;
  padding: 1rem;
  width: 100%;
  height: 23rem;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

</style>
