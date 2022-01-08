<template>
  <Loader v-if="isLoading" />
  <div v-else>
    <div v-if="team" class="profile">
      <div class="info">
        <img :src="team.crestUrl" alt="">
        <h1>{{ team.name }}</h1>
        <h4>ShortName: {{ team.shortName }}</h4>
        <h4>Founded: {{ team.founded }}</h4>
        <h4>Club Colors: {{ team.clubColors }}</h4>
        <h4>Address: {{ team.address }}</h4>
        <h4>Phone: {{ team.phone }}</h4>
        <h4>Email: {{ team.email }}</h4>
        <h4>Venue: {{ team.venue }}</h4>
        <h4>Website: {{ team.website }}</h4>
      </div>
      <div v-if="team.squad" class="player info">
        <h2>Players</h2>
        <Card v-for="player in team.squad" :key="player.id" :title="player.name" :link="{ name: 'Player', params: { id: player.id }}" :subtitle="player.position" :text=true />
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
  setup (props) {
    const team = ref(null)
    const isLoading = ref(true)

    const getTeam = async () => {
      try {
        const { data } = await axios.get(`https://api.football-data.org/v2/teams/${props.id}`, {
          headers: { 'X-Auth-Token': '1219b37dbeeb4f80ae814c6503484f76' }
        })
        team.value = data
        console.log(data)
      } catch (err) {
        console.log(err)
      }
      isLoading.value = false
    }

    getTeam()

    return { team, isLoading }
  }
}
</script>
